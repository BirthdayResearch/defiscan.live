import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'

import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoCopyOutline } from 'react-icons/io5'
import { PoolPairsTable } from '@components/commons/tables/PoolPairs'

interface TokenAssetPageProps {
  token: TokenData
}

export default function TokenIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  // TODO(@siradji) Fetch poolpairs in upcoming upstreaming
  const poolpairs: any = [
    {
      id: '4',
      symbol: 'ETH-DFI',
      name: 'Ether-Default Defi token',
      status: true,
      tokenA: {
        symbol: 'ETH',
        id: '1',
        reserve: '9780.54512445',
        blockCommission: '0'
      },
      tokenB: {
        symbol: 'DFI',
        id: '0',
        reserve: '11036692.66519257',
        blockCommission: '0'
      },
      priceRatio: { ab: '0.00088618', ba: '1128.43328513' },
      commission: '0.002',
      totalLiquidity: { token: '328409.39535062', usd: '62057496.7252094383473678' },
      tradeEnabled: true,
      ownerAddress: '8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb',
      rewardPct: '0.14549',
      creation: {
        tx: '9827894c083b77938d13884f0404539daa054a818e0c5019afa1eeff0437a51b',
        height: 466822
      },
      apr: { reward: 0.6353433769288943, total: 0.6353433769288943 }
    }
  ]

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Breadcrumb items={[
        { path: '/tokens', name: 'Tokens' },
        { path: `/tokens/${props.token.id}`, name: `${props.token.name}`, hide: false, canonical: true }
      ]}
      />
      <PageHeading token={props.token} />
      <div className='flex flex-col md:flex-row md:space-x-8'>
        <ListLeft token={props.token} />
        <ListRight token={props.token} />
      </div>
      <div className='mt-10'>
        <h1 className='text-2xl font-semibold'>Token Pairs</h1>
        <PoolPairsTable poolPairs={poolpairs} />
      </div>
    </div>
  )
}

function PageHeading ({ token }: { token: TokenData }): JSX.Element {
  if (token.isDAT) {
    const AssetIcon = getAssetIcon(token.symbol)
    return (
      <div className='flex flex-row flex-wrap items-center my-4'>
        <AssetIcon className='h-8 w-8 mr-4' />
        <h1 data-testid='PageHeading' className='text-2xl font-semibold'>{token.name.replace('Default Defi token', 'DeFiChain')}</h1>
      </div>
    )
  }
  const TokenIcon = getTokenIcon(token.symbol)
  return (
    <div className='flex flex-row flex-wrap items-center my-4'>
      <TokenIcon className='h-8 w-8 mr-2' />
      <h1 className='text-2xl font-semibold'>{token.name}</h1>
    </div>
  )
}

function ListRight ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Decimal'>{token.decimal} Places</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Limit'>{token.limit}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='LPS'>{token.isLPS ? 'Yes' : 'No'}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Tradable'>
          {(() => {
            if (token.tradeable) {
              return (
                <span className='flex flex-wrap items-center'>Yes <IoCheckmarkCircleOutline className='h-4 w-4 text-green-500 ml-1' />
                </span>
              )
            }
            return (
              <span className='flex flex-wrap items-center'>No <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' />
              </span>
            )
          })()}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Finalized'>{token.finalized ? 'Yes' : 'No'}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Destruction Height'>{token.destruction.height}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Destruction TX' className='flex space-x-10 items-center'>
          <div className='break-all'>{token.destruction.tx}</div>
          <CopyButton text={token.destruction.tx} />
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function ListLeft ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Category'>{token.isDAT ? 'DAT' : 'LPS'}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Symbol'>{token.symbolKey}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Net Supply'>{token.limit}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Mintable'>
          {(() => {
            if (token.mintable) {
              return (
                <span className='flex flex-wrap items-center'>Yes <IoCheckmarkCircleOutline className='h-4 w-4 text-green-500 ml-1' /></span>
              )
            }
            return (
              <span className='flex flex-wrap items-center'>No <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' /></span>
            )
          })()}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Minted'>{token.minted}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Creation Height'>{token.creation.height}</AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Creation Tx' className='flex space-x-10 items-center'>
          <div className='break-all'>{token.creation.tx}</div>
          <CopyButton text={token.creation.tx} />
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      {(token.collateralAddress !== undefined) && (
        <AdaptiveList.Row>
          <AdaptiveList.Cell name='Collateral Address' className='flex space-x-10 items-center'>
            <div className='break-all'>{token.collateralAddress}</div>
            <CopyButton text={token.collateralAddress} />
          </AdaptiveList.Cell>
        </AdaptiveList.Row>
      )}
    </AdaptiveList>
  )
}

function CopyButton ({ text }: { text: string }): JSX.Element {
  return (
    <button
      onClick={async () => await navigator.clipboard.writeText(text)}
      className='cursor-pointer outline-none p-2 bg-gray-100 border border-black border-opacity-60 rounded'
    >
      <IoCopyOutline className='h-5 w-5 text-black opacity-60' />
    </button>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokenAssetPageProps>> {
  const api = getWhaleApiClient(context)
  const id = context.params?.id?.toString() as string
  const token = await api.tokens.get(id)

  return {
    props: {
      token
    }
  }
}
