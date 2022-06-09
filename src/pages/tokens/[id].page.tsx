import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets/tokens'
import { getWhaleApiClient, useWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { Container } from '@components/commons/Container'
import { AddressLinkExternal } from '@components/commons/link/AddressLink'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { isAlphanumeric, isNumeric } from '../../utils/commons/StringValidator'
import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'
import { Head } from '@components/commons/Head'
import { getTokenName } from '../../utils/commons/token/getTokenName'
import { WhaleApiClient } from '@defichain/whale-api-client'

interface TokenAssetPageProps {
  token: TokenData
}

export default function TokenIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const api = useWhaleApiClient()
  const [burnedAmount, setBurnedAmount] = useState<BigNumber | undefined>(new BigNumber(0))
  const [netSupply, setNetSupply] = useState<BigNumber | undefined>(new BigNumber(0))

  useEffect(() => {
    api.address.listToken('8defichainBurnAddressXXXXXXXdRQkSm').then(data => {
      const filteredTokens = data.filter(token => token.symbol === props.token.symbol)
      if (filteredTokens.length === 1 && filteredTokens[0].symbol !== 'DFI') {
        setBurnedAmount(new BigNumber(filteredTokens[0].amount))
        setNetSupply(new BigNumber(props.token.minted).minus(filteredTokens[0].amount))
      } else {
        setBurnedAmount(undefined)
        setNetSupply(undefined)
      }
    }).catch(() => {
      setNetSupply(undefined)
    })
  }, [])

  return (
    <>
      <Head title={`${props.token.displaySymbol}`} />

      <Container className='pt-4 pb-20'>
        <TokenPageHeading token={props.token} />
        <div className='flex flex-col space-y-6 mt-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
          <ListLeft token={props.token} burnedAmount={burnedAmount} netSupply={netSupply} />
          <ListRight token={props.token} />
        </div>
      </Container>
    </>
  )
}

function TokenPageHeading ({ token }: { token: TokenData }): JSX.Element {
  const name = getTokenName(token)

  return (
    <div>
      <Breadcrumb items={[
        {
          path: '/tokens',
          name: 'Tokens'
        },
        {
          path: `/tokens/${(token.isDAT || token.isLPS) ? token.displaySymbol : token.displaySymbol.concat('-', token.id)}`,
          name: `${name}`,
          canonical: true,
          isCurrentPath: true
        }
      ]}
      />

      {(() => {
        const Icon = token.isDAT ? getAssetIcon(token.symbol) : getTokenIcon(token.symbol)

        return (
          <div className='flex flex-row flex-wrap items-center mt-8'>
            <Icon className='h-10 w-10 mr-4' />
            <h1 data-testid='PageHeading' className='text-2xl font-semibold dark:text-dark-gray-900'>
              {name}
            </h1>
          </div>
        )
      })()}
    </div>
  )
}

function ListRight ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Decimal'>{token.decimal} Places</AdaptiveList.Row>
      <AdaptiveList.Row name='Limit'>{token.limit}</AdaptiveList.Row>
      <AdaptiveList.Row name='LPS'>{token.isLPS ? 'Yes' : 'No'}</AdaptiveList.Row>
      <AdaptiveList.Row name='Tradable'>
        {(() => {
          if (token.tradeable) {
            return (
              <div className='flex flex-wrap items-center'>
                <div>Yes</div>
                <IoCheckmarkCircle className='h-4 w-4 text-green-500 ml-1' />
              </div>
            )
          }
          return (
            <div className='flex flex-wrap items-center'>
              <div>No</div>
              <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' />
            </div>
          )
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Finalized'>{token.finalized ? 'Yes' : 'No'}</AdaptiveList.Row>
      <AdaptiveList.Row name='Destruction Height'>{token.destruction.height}</AdaptiveList.Row>
      <AdaptiveList.Row name='Destruction TX' className='flex space-x-10 items-center'>
        <div className='break-all'>{token.destruction.tx}</div>
      </AdaptiveList.Row>
      <BackingAddress tokenSymbol={token.symbol} />
    </AdaptiveList>
  )
}

function ListLeft ({
  token,
  burnedAmount,
  netSupply
}: { token: TokenData, burnedAmount?: BigNumber, netSupply?: BigNumber }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Category'>
        {(() => {
          if (token.isLPS) {
            return 'LPS'
          }

          if (token.isDAT) {
            return 'DAT'
          }

          return 'DCT'
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Symbol'>{token.displaySymbol}</AdaptiveList.Row>
      <AdaptiveList.Row name='Mintable'>
        {(() => {
          if (token.mintable) {
            return (
              <div className='flex flex-wrap items-center'>
                <div>Yes</div>
                <IoCheckmarkCircle className='h-4 w-4 text-green-500 ml-1' />
              </div>
            )
          }
          return (
            <div className='flex flex-wrap items-center'>
              <div>No</div>
              <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' />
            </div>
          )
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Minted'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={new BigNumber(token.minted).toFixed(8)}
          decimalScale={8}
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Burned'>
        {
          burnedAmount === undefined ? (
            'N/A'
          ) : (
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={burnedAmount.toFixed(8)}
              decimalScale={8}
            />
          )
        }
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Net Supply'>
        {
          netSupply === undefined ? (
            'N/A'
          ) : (
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={netSupply.toFixed(8)}
              decimalScale={8}
            />
          )
        }
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Height'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={token.creation.height}
          decimalScale={8}
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Tx' className='flex space-x-10 items-center'>
        <TxIdLink txid={token.creation.tx} className='break-all' />
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function BackingAddress ({ tokenSymbol }: { tokenSymbol: string }): JSX.Element {
  const tokensWithBackingAddress = ['BCH', 'LTC', 'DOGE', 'BTC', 'ETH', 'USDC', 'USDT']

  if (!tokensWithBackingAddress.includes(tokenSymbol)) {
    return <></>
  }

  return (
    <AdaptiveList.Row name='Backing Address' className='break-all'>
      {(() => {
        switch (tokenSymbol) {
          case 'BCH':
            return (
              <AddressLinkExternal
                url='https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf'
                text='38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf' testId='BackingAddress.BCH'
              />
            )
          case 'LTC':
            return (
              <AddressLinkExternal
                url='https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE'
                text='MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE' testId='BackingAddress.LTC'
              />
            )
          case 'DOGE':
            return (
              <AddressLinkExternal
                url='https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba'
                text='D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba' testId='BackingAddress.DOGE'
              />
            )
          case 'BTC':
            return (
              <AddressLinkExternal
                url='https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT'
                text='38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT' testId='BackingAddress.BTC'
              />
            )
          case 'ETH':
          case 'USDC':
          case 'USDT':
            return (
              <AddressLinkExternal
                url='https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac'
                text='0x94fa70d079d76279e1815ce403e9b985bccc82ac' testId='BackingAddress.ETH'
              />
            )
        }
      })()}
    </AdaptiveList.Row>
  )
}

async function getTokenByParam (param: string, api: WhaleApiClient): Promise<TokenData | undefined> {
  const tokenList: TokenData[] = []

  let tokenResponse = await api.tokens.list(200)
  tokenList.push(...tokenResponse)
  while (tokenResponse.hasNext) {
    tokenResponse = await api.tokens.list(200, tokenResponse.nextToken)
    tokenList.push(...tokenResponse)
  }
  return tokenList.find(t => {
    if (t.isDAT || t.isLPS) {
      return t.displaySymbol.toLowerCase() === param.toLowerCase()
    }
    const i = param.lastIndexOf('-')
    const displaySymbol = param.substring(0, i)
    const id = param.substring(i + 1)
    return t.displaySymbol.toLowerCase() === displaySymbol.toLowerCase() && id === t.id
  })
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokenAssetPageProps>> {
  const api = getWhaleApiClient(context)
  const param = context.params?.id?.toString().trim() as string

  if (!isAlphanumeric(param, '-')) {
    return { notFound: true }
  }

  let token: TokenData | undefined
  if (isNumeric(param)) {
    try {
      token = await api.tokens.get(param)
    } catch (e) {
      return { notFound: true }
    }
  } else {
    token = await getTokenByParam(param, api)
  }

  if (token === undefined) {
    return { notFound: true }
  }

  return {
    props: {
      token
    }
  }
}
