import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { Container } from '@components/commons/Container'
import { AddressLink } from '@components/commons/link/AddressLink'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { AddressLinkExternal } from '@components/commons/AddressLink'
import { isNumeric } from '../../utils/commons/StringValidator'

interface TokenAssetPageProps {
  token: TokenData
}

enum TokensWithBackingAddress {
  USDT = 'USDT',
  USDC = 'USDC',
  ETH = 'ETH',
  BTC = 'BTC',
  BCH = 'BCH',
  DOGE ='DOGE',
  LCH = 'LCH'
}

export default function TokenIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-24'>
      <TokenPageHeading token={props.token} />

      <div className='flex flex-col space-y-6 mt-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <ListLeft token={props.token} />
        <ListRight token={props.token} />
      </div>
    </Container>
  )
}

function getName (token: TokenData): string {
  if (token.isDAT) {
    return token.name.replace('Default Defi token', 'DeFiChain')
  }

  return `${token.name}#${token.id}`
}

function TokenPageHeading ({ token }: { token: TokenData }): JSX.Element {
  const name = getName(token)

  return (
    <div>
      <Breadcrumb items={[
        {
          path: '/tokens',
          name: 'Tokens'
        },
        {
          path: `/tokens/${token.id}`,
          name: `${name}`,
          hide: false,
          canonical: true
        }
      ]}
      />

      {(() => {
        const Icon = token.isDAT ? getAssetIcon(token.symbol) : getTokenIcon(token.symbol)

        return (
          <div className='flex flex-row flex-wrap items-center mt-4'>
            <Icon className='h-10 w-10 mr-4' />
            <h1 data-testid='PageHeading' className='text-2xl font-semibold'>
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
      {(() => {
        if (token.symbol in TokensWithBackingAddress) {
          return <BackingAddress tokenName={token.symbol} />
        }
      })()}
    </AdaptiveList>
  )
}

function ListLeft ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Category'>{token.isDAT ? 'DAT' : 'LPS'}</AdaptiveList.Row>
      <AdaptiveList.Row name='Symbol'>{token.displaySymbol}</AdaptiveList.Row>
      <AdaptiveList.Row name='Net Supply'>{token.limit}</AdaptiveList.Row>
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
      <AdaptiveList.Row name='Minted'>{token.minted}</AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Height'>{token.creation.height}</AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Tx' className='flex space-x-10 items-center'>
        <TxIdLink txid={token.creation.tx} className='break-all' />
      </AdaptiveList.Row>
      {(token.collateralAddress !== undefined && token.collateralAddress !== 'undefined') && (
        <AdaptiveList.Row name={'Owner\'s Address'} className='flex space-x-10 items-center'>
          <AddressLink address={token.collateralAddress} className='break-all' />
        </AdaptiveList.Row>
      )}
    </AdaptiveList>
  )
}

function BackingAddress ({ tokenName }: {tokenName: string}): JSX.Element {
  const isEth = tokenName === TokensWithBackingAddress.ETH || tokenName === TokensWithBackingAddress.USDC || tokenName === TokensWithBackingAddress.USDT

  return (
    <AdaptiveList.Row name='Backing Address' className='break-all'>
      {(() => {
        if (isEth) {
          return <AddressLinkExternal url='https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac' text='0x94fa70d079d76279e1815ce403e9b985bccc82ac' testId='BackingAddress.ETH' />
        }
        switch (tokenName) {
          case TokensWithBackingAddress.BCH:
            return <AddressLinkExternal url='https://www.blockchain.com/bch/address/38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf' text='38wFczGqaaGLRub2U7CWeWkMuPDwhMVMRf' testId='BackingAddress.BCH' />
          case TokensWithBackingAddress.LCH:
            return <AddressLinkExternal url='https://live.blockcypher.com/ltc/address/MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE' text='MLYQxJfnUfVqRwfYXjDJfmLbyA77hqzSXE' testId='BackingAddress.LCH' />
          case TokensWithBackingAddress.DOGE:
            return <AddressLinkExternal url='https://dogechain.info/address/D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba' text='D7jrXDgPYck8jL9eYvRrc7Ze8n2e2Loyba' testId='BackingAddress.DOGE' />
          case TokensWithBackingAddress.BTC:
            return <AddressLinkExternal url='https://www.blockchain.com/btc/address/38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT' text='38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT' testId='BackingAddress.BTC' />
          case TokensWithBackingAddress.ETH:
          case TokensWithBackingAddress.USDC:
          case TokensWithBackingAddress.USDT:
            return <AddressLinkExternal url='https://etherscan.io/address/0x94fa70d079d76279e1815ce403e9b985bccc82ac' text='0x94fa70d079d76279e1815ce403e9b985bccc82ac' testId='BackingAddress.ETH' />
        }
      })()}
    </AdaptiveList.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokenAssetPageProps>> {
  const api = getWhaleApiClient(context)
  const id = context.params?.id?.toString().trim() as string

  if (!isNumeric(id)) {
    return { notFound: true }
  }

  const token = await api.tokens.get(id)
  if (token === undefined) {
    return { notFound: true }
  }

  return {
    props: {
      token
    }
  }
}
