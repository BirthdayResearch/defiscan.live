import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'

import { getTokenIcon } from '@components/icons/tokens'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoCopyOutline } from 'react-icons/io5'
import { useCallback } from 'react'
import { PoolPairsTable } from '@components/commons/tables/PoolPairs'

interface TokenAssetPageProps {
  token: TokenData
  poolPair: PoolPairData[]
}

export default function TokenAssetPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const TokenIcon = getTokenIcon(props.token.symbol)

  const getPoolPairs = useCallback(() => {
    return props.poolPair.filter((pair) => pair.symbol.includes(props.token.symbol))
  }, [props.poolPair, props.token])

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Breadcrumb items={[
        { path: '/tokens', name: 'Tokens' },
        { path: `/tokens/${props.token.id}`, name: `${props.token.name}`, hide: false, canonical: true }
      ]}
      />
      <div className='flex flex-row flex-wrap items-center my-4'>
        <TokenIcon className='mr-2' />
        <h1 className='text-2xl font-semibold'>{props.token.name}</h1>
      </div>
      <div className='flex flex-col md:flex-row space-x-8'>
        <ListLeft token={props.token} />
        <ListRight token={props.token} />
      </div>
      <div className='mt-10'>
        <h1 className='text-2xl font-semibold'>Token Pairs</h1>
        <PoolPairsTable poolPairs={getPoolPairs()} />
      </div>
    </div>
  )
}

function ListRight ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Decimal'>
          {token.decimal}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Limit'>
          {token.limit}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='LPS'>
          {token.isLPS ? 'Yes' : 'No'}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Tradable'>
          {token.tradeable
            ? <span className='flex flex-wrap items-center'>Yes <IoCheckmarkCircleOutline className='h-4 w-4 text-green-500 ml-1' /></span>
            : <span className='flex flex-wrap items-center'>No <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' /></span>}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Finalized'>
          {token.finalized ? 'Yes' : 'No'}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Destruction Height'>
          {token.destruction.height}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Destruction TX' className='flex space-x-3 items-center'>
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
        <AdaptiveList.Cell name='Category'>
          {token.isDAT ? 'DAT' : 'LPS'}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Symbol'>
          {token.symbolKey}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Net Supply'>
          {token.limit}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Mintable'>
          {token.mintable
            ? <span className='flex flex-wrap items-center'>Yes <IoCheckmarkCircleOutline className='h-4 w-4 text-green-500 ml-1' /></span>
            : <span className='flex flex-wrap items-center'>No <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' /></span>}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Minted'>
          {token.minted}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Creation Height'>
          {token.creation.height}
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Creation Tx' className='flex space-x-3 items-center'>
          <div className='break-all'>{token.creation.tx}</div>
          <CopyButton text={token.creation.tx} />
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      <AdaptiveList.Row>
        <AdaptiveList.Cell name='Creation Tx' className='flex space-x-3 items-center'>
          <div className='break-all'>{token.creation.tx}</div>
          <CopyButton text={token.creation.tx} />
        </AdaptiveList.Cell>
      </AdaptiveList.Row>
      {(token.collateralAddress !== undefined) && (
        <AdaptiveList.Row>
          <AdaptiveList.Cell name='Collateral Address' className='flex space-x-3 items-center'>
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
      className='cursor-pointer outline-none p-1 bg-gray-100 rounded shadow-sm'
    >
      <IoCopyOutline className='h-5 w-5 text-gray-500' />
    </button>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokenAssetPageProps>> {
  const api = getWhaleApiClient(context)
  const id = context.params?.id?.toString() as string
  const token = await api.tokens.get(id)
  const poolPair = await api.poolpairs.list()
  return {
    props: {
      token,
      poolPair
    }
  }
}
