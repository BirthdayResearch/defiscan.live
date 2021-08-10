
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { MouseEvent, useState } from 'react'
import { FaSearch, FaSort } from 'react-icons/fa'
import { CgSortAz } from 'react-icons/cg'

import { tokens } from '@defichain/whale-api-client'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import { getWhaleApiClient } from '@contexts/WhaleContext'

import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { getTokenIcon } from '@components/icons/tokens'
import { Head } from '@components/commons/Head'
import { Link } from '@components/commons/Link'

interface TokensPageData {
  tokens: {
    items: tokens.TokenData[]
    nextToken: string | null
  }
}

export default function TokensPage ({ tokens }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [items, setItems] = useState(tokens.items)

  function handleSort (e: MouseEvent<HTMLButtonElement>): void {
    const sortBy = e.currentTarget.dataset.sortBy
    if (sortBy === 'tokenName') {
      setItems([...(items.sort((a, b) => a.name.localeCompare(b.name)))])
    } else {
      setItems([...(items.sort((a, b) => parseInt(a.minted) - parseInt(b.minted)))])
    }
  }

  return (
    <div className='container mx-auto px-4 pt-12 pb-20'>
      <Head
        title='Tokens'
      />
      <>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Tokens</h1>
          <div className='space-x-2'>
            <button className='p-3 rounded bg-gray-50 border border-grey-200 shadow-sm'>
              <FaSearch height={40} />
            </button>
            <button className='p-3 rounded bg-gray-50 border border-grey-200 shadow-sm'>
              <CgSortAz height={40} />
            </button>
          </div>
        </div>
        <AdaptiveTable className='mt-6'>
          <AdaptiveTable.Header>
            <AdaptiveTable.Head className='flex items-center'>
              TOKEN NAME <button data-sort-by='tokenName' onClick={(e) => handleSort(e)}><FaSort /></button>
            </AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right'>SYMBOL</AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right'>CATEGORY</AdaptiveTable.Head>
            <AdaptiveTable.Head className='text-right flex items-center'>
              MINTED <button data-sort-by='minted' onClick={(e) => handleSort(e)}><FaSort /></button>
            </AdaptiveTable.Head>
          </AdaptiveTable.Header>
          {items.map((data: TokenData) => (
            <TokenRow data={data} key={data.id} />
          ))}
        </AdaptiveTable>
      </>
    </div>
  )
}

function TokenRow ({ data }: { data: TokenData }): JSX.Element {
  const TokenIcon = getTokenIcon(data.symbol)
  return (
    <AdaptiveTable.Row>
      <AdaptiveTable.Cell title='TOKEN NAME' className='align-middle'>
        <div className='flex items-center space-x-2'>
          <TokenIcon />
          <Link href={{ pathname: `/tokens/${data.id}` }}>
            <a className='ml-16 text-primary'>
              {data.name}
            </a>
          </Link>
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='SYMBOL' className='align-middle lg:text-right'>
        <div>{data.symbol}</div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='CATEGORIES' className='align-middle lg:text-right'>
        <div>{data.isDAT ? 'DAT' : 'LPS'}</div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title='MINTED' className='align-middle lg:text-right'>
        <div>{data.minted}</div>
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TokensPageData>> {
  const items = await getWhaleApiClient(context).tokens.list()
  return {
    props: {
      tokens: {
        items,
        nextToken: items.nextToken ?? null
      }
    }
  }
}
