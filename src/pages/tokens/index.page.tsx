import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { Head } from '@components/commons/Head'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { tokens } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React from 'react'
import { TokenTable } from './_components/TokenTable'
import { TokenCards } from './_components/TokenCards'

interface TokensPageData {
  tokens: {
    items: tokens.TokenData[]
    pages: CursorPage[]
  }
}

export default function TokensPage ({ tokens }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Tokens' />
      <h1 className='text-2xl font-medium dark:text-dark-gray-900'>Tokens</h1>

      <div className='my-6 hidden md:block'>
        <TokenTable tokens={tokens.items} />
      </div>

      <div className='my-6 md:hidden'>
        <TokenCards tokens={tokens.items} />
      </div>

      <div className='flex justify-end mt-8'>
        <CursorPagination pages={tokens.pages} path='/tokens' />
      </div>
    </Container>
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
