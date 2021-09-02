import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'

import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoCopyOutline } from 'react-icons/io5'

interface TokenAssetPageProps {
  token: TokenData
}

export default function TokenIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <TokenPageHeading token={props.token} />
      <div className='flex flex-col md:flex-row md:space-x-8'>
        <ListLeft token={props.token} />
        <ListRight token={props.token} />
      </div>
    </div>
  )
}

function TokenPageHeading ({ token }: { token: TokenData }): JSX.Element {
  const TokenIcon = getTokenIcon(token.symbol)
  return (
    <div>
      <Breadcrumb items={[
        { path: '/tokens', name: 'Tokens' },
        { path: `/tokens/${token.id}`, name: `${token.name}`, hide: false, canonical: true }
      ]}
      />
      <div className='flex flex-row flex-wrap items-center my-4'>
        {(() => {
          const AssetIcon = getAssetIcon(token.symbol)
          if (token.isDAT) {
            return (
              <>
                <AssetIcon className='h-8 w-8 mr-4' />
                <h1
                  data-testid='PageHeading'
                  className='text-2xl font-semibold'
                >{token.name.replace('Default Defi token', 'DeFiChain')}
                </h1>
              </>
            )
          }
          return (
            <>
              <TokenIcon className='h-8 w-8 mr-4' />
              <h1 data-test-id='PageHeading' className='text-2xl font-semibold'>{token.name}</h1>
            </>
          )
        })()}
      </div>
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
              <span className='flex flex-wrap items-center'>Yes <IoCheckmarkCircleOutline className='h-4 w-4 text-green-500 ml-1' />
              </span>
            )
          }
          return (
            <span className='flex flex-wrap items-center'>No <IoAlertCircleOutline className='h-4 w-4 text-gray-500 ml-1' />
            </span>
          )
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Finalized'>{token.finalized ? 'Yes' : 'No'}</AdaptiveList.Row>
      <AdaptiveList.Row name='Destruction Height'>{token.destruction.height}</AdaptiveList.Row>
      <AdaptiveList.Row name='Destruction TX' className='flex space-x-10 items-center'>
        <div className='break-all'>{token.destruction.tx}</div>
        <CopyButton value={token.destruction.tx} />
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function ListLeft ({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name='Category'>{token.isDAT ? 'DAT' : 'LPS'}</AdaptiveList.Row>
      <AdaptiveList.Row name='Symbol'>{token.symbolKey}</AdaptiveList.Row>
      <AdaptiveList.Row name='Net Supply'>{token.limit}</AdaptiveList.Row>
      <AdaptiveList.Row name='Mintable'>
        {(() => {
          if (token.mintable) {
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
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Minted'>{token.minted}</AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Height'>{token.creation.height}</AdaptiveList.Row>
      <AdaptiveList.Row name='Creation Tx' className='flex space-x-10 items-center'>
        <div className='break-all'>{token.creation.tx}</div>
        <CopyButton value={token.creation.tx} />
      </AdaptiveList.Row>
      {(token.collateralAddress !== 'undefined') && (
        <AdaptiveList.Row name='Collateral Address' className='flex space-x-10 items-center'>
          <div className='break-all'>{token.collateralAddress}</div>
          <CopyButton value={token.collateralAddress!} />
        </AdaptiveList.Row>
      )}
    </AdaptiveList>
  )
}

function CopyButton ({ value }: { value: string }): JSX.Element {
  return (
    <button
      onClick={async () => await navigator.clipboard.writeText(value)}
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
