import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { WhaleApiClient } from '@defichain/whale-api-client'
import { fromAddress } from '@defichain/jellyfish-address'
import { NetworkName } from '@defichain/jellyfish-network'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { useNetwork } from '@contexts/NetworkContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IoSearchSharp, IoCheckmarkCircleOutline } from 'react-icons/io5'

interface SearchProps {
  query: string
}

interface SearchResult {
  url: string
  title: string
  type: string
}

export default function SearchPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const api = useWhaleApiClient()
  const network = useNetwork().name
  const connection = useNetwork().connection
  const router = useRouter()
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

  useEffect(() => {
    setIsSearching(true)
    setIsRedirecting(false)
    void getSearchResults(api, network, props.query).then(data => {
      if (data !== undefined) {
        setIsRedirecting(true)
        void router.push(`${data.url}?network=${connection}`)
      }
      setIsSearching(false)
    })
  }, [props.query])

  if (isRedirecting) {
    return (
      <Container className='pt-12 pb-20'>
        <div className='flex flex-wrap justify-center pt-24 pb-36 animate-pulse'>
          <div className='flex w-full justify-center'>
            <IoCheckmarkCircleOutline size={80} className='text-gray-400 ml-0.5 self-center' />
          </div>
          <span className='text-center text-gray-400 text-xl mt-1'>Redirecting</span>
        </div>
      </Container>
    )
  }

  if (isSearching) {
    return (
      <Container className='pt-12 pb-20'>
        <div className='flex flex-wrap justify-center pt-24 pb-36 animate-pulse'>
          <div className='flex w-full justify-center'>
            <IoSearchSharp size={80} className='text-gray-400 ml-0.5 self-center' />
          </div>
          <span className='text-center text-gray-400 text-xl mt-1'>Searching</span>
        </div>
      </Container>
    )
  }

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
  const query = context.params?.query?.toString().trim() as string

  return {
    props: {
      query: query
    }
  }
}

async function getSearchResults (api: WhaleApiClient, network: NetworkName, query: string): Promise<(SearchResult | undefined)> {
  const txnData = await api.transactions.get(query)
    .then((data: Transaction) => {
      if (data === undefined) {
        return undefined
      }

      return {
        url: `/transactions/${data.txid}`,
        title: data.txid,
        type: 'Transaction'
      }
    })
    .catch(() => {
      return undefined
    })

  if (txnData !== undefined) {
    return txnData
  }

  const blocksData = await api.blocks.get(query)
    .then((data: Block) => {
      if (data === undefined) {
        return undefined
      }

      return {
        url: `/blocks/${data.id}`,
        title: `${data.height}`,
        type: 'Block'
      }
    }).catch(() => {
      return undefined
    })

  if (blocksData !== undefined) {
    return blocksData
  }

  const addressData = fromAddress(query, network)
  if (addressData !== undefined) {
    return {
      url: `/address/${query}`,
      title: query,
      type: 'Address'
    }
  }

  return undefined
}
