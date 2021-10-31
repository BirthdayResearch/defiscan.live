import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { Container } from '@components/commons/Container'
import { AddressLink } from '@components/address/AddressLink'

interface TokenAssetPageProps {
  token: TokenData
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
        <div className='break-all'>{token.creation.tx}</div>
      </AdaptiveList.Row>
      {(token.collateralAddress !== undefined && token.collateralAddress !== 'undefined') && (
        <AdaptiveList.Row name='Collateral Address' className='flex space-x-10 items-center'>
          <AddressLink address={token.collateralAddress} className='break-all' />
        </AdaptiveList.Row>
      )}
    </AdaptiveList>
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
