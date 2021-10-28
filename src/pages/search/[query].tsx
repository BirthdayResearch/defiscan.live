import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { WhaleApiClient } from '@defichain/whale-api-client'

interface SearchProps {
  query: string
}

export default function SearchPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <div className='flex flex-wrap justify-center pt-24 pb-36'>
        <div className='rounded text-center w-auto bg-red-100 px-20 py-4' data-testid='SearchPage.NoResults'>
          The requested search term <code className='break-all'>{props.query}</code> could not be found
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SearchProps>> {
  const api = getWhaleApiClient(context)
  const query = context.params?.query?.toString().trim() as string

  const results = await search(api, query)

  if (results === undefined) {
    return {
      props: {
        query: query
      }
    }
  }

  return {
    redirect: {
      statusCode: 302,
      destination: `${results.url}`
    }
  }
}

async function search (api: WhaleApiClient, query: string): Promise<{ id: string, url: string } | undefined> {
  query = query.trim()

  const txnData = await api.transactions.get(query)
    .then(data => {
      return {
        url: `/transactions/${data.txid}`,
        id: data.txid
      }
    })
    .catch(() => {
      return undefined
    })

  if (txnData !== undefined) {
    return txnData
  }

  const blocksData = await api.blocks.get(query)
    .then(data => {
      return {
        url: `/blocks/${data.id}`,
        id: data.id
      }
    }).catch(() => {
      return undefined
    })

  if (blocksData !== undefined) {
    return blocksData
  }

  const addressData = await api.address.getBalance(query)
    .then(data => {
      if (data.length === 0) {
        return undefined
      }

      return {
        url: `/address/${query}`,
        id: query
      }
    })
    .catch(() => {
      return undefined
    })

  if (addressData !== undefined) {
    return addressData
  }

  return undefined
}
