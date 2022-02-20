import { Head } from '@components/commons/Head'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { BlockLink } from '@components/commons/link/BlockLink'
import { TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { DfTx, OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { SmartBuffer } from 'smart-buffer'
import { fromScript } from '@defichain/jellyfish-address'
import { AddressLink } from '@components/commons/link/AddressLink'
import classNames from 'classnames'

interface SwapsData {
  index: string
  swaps: {
    items: Array<{
      id: string
      sort: string
      txid: string
      txno: number
      poolPairId: string
      fromAmount: string
      fromTokenId: number
      block: {
        hash: string
        height: number
        time: number
        medianTime: number
      }
      addresses: {
        from: string | undefined
        to: string | undefined
      }
    }>
    pages: CursorPage[]
  }
}

export default function SwapsPage ({
  index,
  swaps
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title='Payback Burn Stats' />
      <Container>
        <div className='my-4'>
          <PoolPairSymbol
            poolPairId={index} symbolSizeClassName='h-8 w-8'
            symbolMarginClassName='ml-5' textClassName='ml-16 font-medium'
          />
        </div>
        <div className='my-6'>
          <OverflowTable>
            <OverflowTable.Header>
              <OverflowTable.Head
                title='TxId'
                infoDesc='Estimated based on the number of blocks remaining.'
                testId='AuctionTable.TimeLeft'
              />
              <OverflowTable.Head
                title='From Amount'
                testId='AuctionTable.LoanToken'
              />
              <OverflowTable.Head
                title='From Address'
                testId='AuctionTable.LoanToken'
              />
              <OverflowTable.Head
                title='To Address'
                testId='AuctionTable.LoanToken'
              />
              <OverflowTable.Head
                title='Block Height'
                testId='AuctionTable.CollateralForAuction'
                className='lg:w-52'
              />
            </OverflowTable.Header>
            {swaps.items.map(swap => {
              return (
                <OverflowTable.Row key={swap.id}>
                  <OverflowTable.Cell>
                    <TxIdLink txid={swap.txid} className='break-all' />
                  </OverflowTable.Cell>
                  <OverflowTable.Cell>
                    <div className='flex flex-wrap'>
                      {swap.fromAmount}
                      <TokenSymbol
                        tokenId={swap.fromTokenId}
                        className='ml-1'
                      />
                    </div>
                  </OverflowTable.Cell>
                  <OverflowTable.Cell>
                    <div className='break-all w-24 md:w-64'>
                      <AddressLink
                        address={swap.addresses.from ?? ''}
                        className={classNames(
                          {
                            'text-red-500': swap.addresses.from !== swap.addresses.to,
                            'text-blue-500': swap.addresses.from === swap.addresses.to
                          })}
                      />
                    </div>
                  </OverflowTable.Cell>
                  <OverflowTable.Cell>
                    <div className='break-all w-24 md:w-64'>
                      <AddressLink
                        address={swap.addresses.to ?? ''}
                        className={classNames(
                          {
                            'text-red-500': swap.addresses.from !== swap.addresses.to,
                            'text-blue-500': swap.addresses.from === swap.addresses.to
                          })}
                      />
                    </div>
                  </OverflowTable.Cell>
                  <OverflowTable.Cell>
                    <BlockLink block={swap.block.height.toString()} className='break-all' />
                  </OverflowTable.Cell>
                </OverflowTable.Row>
              )
            })}
          </OverflowTable>
          <div className='flex justify-end mt-4'>
            <CursorPagination pages={swaps.pages} path={`/dex/${index}/swaps`} />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SwapsData>> {
  const index = context.params?.index?.toString().trim() as string
  const api = getWhaleApiClient(context)

  const next = CursorPagination.getNext(context)
  try {
    const items = await api.poolpairs.listPoolSwaps(index, 200, next)

    const _swaps = items.map(async item => {
      const vouts = await getVouts(item.txid)
      const dftx = getDfTx(vouts)

      let from: string | undefined
      let to: string | undefined

      if (dftx !== undefined) {
        if (dftx.name === 'OP_DEFI_TX_POOL_SWAP') {
          from = dftx.data.fromScript !== undefined ? fromScript(dftx.data.fromScript, 'mainnet')?.address : undefined
          to = dftx.data.toScript !== undefined ? fromScript(dftx.data.toScript, 'mainnet')?.address : undefined
        } else {
          from = fromScript(dftx.data.poolSwap.fromScript, 'mainnet')?.address
          to = fromScript(dftx.data.poolSwap.toScript, 'mainnet')?.address
        }
      }

      return {
        id: item.id,
        sort: item.sort,
        txid: item.txid,
        txno: item.txno,
        poolPairId: item.poolPairId,
        fromAmount: item.fromAmount,
        fromTokenId: item.fromTokenId,
        block: {
          hash: item.block.hash,
          height: item.block.height,
          time: item.block.time,
          medianTime: item.block.medianTime
        },
        addresses: {
          from: (from !== undefined ? from : null),
          to: (to !== undefined ? to : null)
        }
      }
    })

    return {
      props: {
        index: index,
        swaps: {
          // @ts-expect-error
          items: await Promise.all(_swaps),
          pages: CursorPagination.getPages(context, items)
        }
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }

  async function getVouts (txid): Promise<TransactionVout[]> {
    const vouts: TransactionVout[] = []
    let voutsResponse = await api.transactions.getVouts(txid, 100)
    vouts.push(...voutsResponse)
    while (voutsResponse.hasNext) {
      voutsResponse = await api.transactions.getVouts(txid, 100, voutsResponse.nextToken)
      vouts.push(...voutsResponse)
    }
    return vouts
  }

  function getDfTx (vouts: TransactionVout[]): DfTx<any> | undefined {
    const hex = vouts[0].script.hex
    const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
    const stack = toOPCodes(buffer)
    if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
      return undefined
    }
    return (stack[1] as OP_DEFI_TX).tx
  }
}
