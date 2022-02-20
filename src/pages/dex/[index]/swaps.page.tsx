import { Head } from '@components/commons/Head'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { PoolSwap } from '@defichain/whale-api-client/dist/api/poolpairs'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'

interface SwapsData {
  index: string
  swaps: {
    items: PoolSwap[]
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
                title='Block Height'
                testId='AuctionTable.CollateralForAuction'
                className='lg:w-52'
              />
            </OverflowTable.Header>
            {swaps.items.map(swap => {
              return (
                <OverflowTable.Row key={swap.id}>
                  <OverflowTable.Cell>
                    {swap.txid}
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
                    {swap.block.height}
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

  const next = CursorPagination.getNext(context)
  try {
    const items = await getWhaleApiClient(context).poolpairs.listPoolSwaps(index, 100, next)
    return {
      props: {
        index: index,
        swaps: {
          items,
          pages: CursorPagination.getPages(context, items)
        }
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
