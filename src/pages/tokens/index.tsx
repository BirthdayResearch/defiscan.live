import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { tokens } from '@defichain/whale-api-client'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import NumberFormat from 'react-number-format'
import { Link } from '@components/commons/Link'

interface TokensPageData {
  tokens: {
    items: tokens.TokenData[]
    pages: CursorPage[]
  }
}

export default function TokensPage ({ tokens }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head title='Tokens' />

      <div className='flex items-center justify-center pb-6'>
        <div className='bg-pink-50 rounded p-3'>
          🚧 Work in progress, this is an early iteration of defiscan.live/tokens. Some features are not available and
          may not work as expected.
        </div>
      </div>

      <h1 className='text-2xl font-semibold'>Tokens</h1>
      <AdaptiveTable className='mt-6'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
          <AdaptiveTable.Head>NAME</AdaptiveTable.Head>
          <AdaptiveTable.Head>CATEGORY</AdaptiveTable.Head>
          <AdaptiveTable.Head>MINTED</AdaptiveTable.Head>
        </AdaptiveTable.Header>

        {tokens.items.map((data: TokenData) => (
          <TokenRow data={data} key={data.id} />
        ))}
      </AdaptiveTable>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={tokens.pages} path='/tokens' />
      </div>
    </div>
  )
}

function TokenRow ({ data }: { data: TokenData }): JSX.Element {
  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='SYMBOL' className='align-middle'>
        <div className='flex items-center'>
          {(() => {
            if (data.isDAT) {
              const AssetIcon = getAssetIcon(data.symbol)
              return <AssetIcon className='h-8 w-8' />
            }

            const TokenIcon = getTokenIcon(data.symbol)
            return <TokenIcon className='h-8 w-8' />
          })()}
          <div className='font-medium ml-3 text-primary'>
            <Link href={{ pathname: `/tokens/${data.id}` }}>{data.symbol}</Link>
          </div>
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='NAME' className='align-middle'>
        {(() => {
          if (data.isDAT) {
            return data.name.replace('Default Defi token', 'DeFiChain')
          }

          return data.name
        })()}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='CATEGORY' className='align-middle'>
        {(() => {
          if (data.isLPS) {
            return 'LPS'
          }

          if (data.isDAT) {
            return 'DAT'
          }

          return 'DCT'
        })()}
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='MINTED' className='align-middle'>
        {(() => {
          if (data.isLPS) {
            return <div>...</div>
          }

          if (data.id === '0') {
            return <div>...</div>
          }

          return (
            <NumberFormat
              value={data.minted}
              displayType='text'
              thousandSeparator
              decimalScale={2}
            />
          )
        })()}
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokensPageData>> {
  const next = CursorPagination.getNext(context)
  const items = await getWhaleApiClient(context).tokens.list(20, next)
  return {
    props: {
      tokens: {
        items,
        pages: CursorPagination.getPages(context, items)
      }
    }
  }
}
