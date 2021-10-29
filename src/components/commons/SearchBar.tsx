import {
  IoCloseCircleSharp,
  IoCubeOutline,
  IoSearchCircleSharp,
  IoSearchSharp,
  IoSwapHorizontalOutline,
  IoWalletOutline
} from 'react-icons/io5'
import { CgSpinner } from 'react-icons/cg'
import React, { useMemo, useState } from 'react'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import debounce from 'lodash.debounce'
import { usePopper } from 'react-popper'
import { Link } from '@components/commons/Link'
import { Transition } from '@headlessui/react'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { fromAddress } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { NetworkName } from '@defichain/jellyfish-network'
import { WhaleApiClient } from '@defichain/whale-api-client'

interface SearchBarInterface {
  collapsable: boolean
}

interface SearchResult {
  url: string
  title: string
  type: string
}

export function SearchBar (props: SearchBarInterface): JSX.Element {
  const api = useWhaleApiClient()
  const network = useNetwork().name

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isCollapse, setIsCollapse] = useState<boolean>(true)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>([])
  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()

  const {
    styles,
    attributes
  } = usePopper(refEle, popperEle, { placement: 'bottom-start' })

  async function changeHandler (event): Promise<void> {
    const query = event.target.value.trim()

    if (query.length > 0) {
      setIsSearching(true)
      const results = await getSearchResults(api, network, query)
      setSearchResults(results)
      setIsSearching(false)
    } else {
      setSearchResults([])
    }
  }

  const onChangeDebounceHandler = useMemo(() => debounce(changeHandler, 200), [])

  return (
    <>
      <div
        className={`flex w-full p-2 rounded h-10 bg-white border ${isActive ? 'border-primary-200' : ''} ${isCollapse ? 'cursor-pointer' : ''}`}
        onClick={() => setIsCollapse(false)}
        ref={setRefEle}
      >
        <IoSearchSharp size={22} className='text-gray-400 ml-0.5 self-center' />
        <Transition
          className='flex w-full'
          enter='transition ease-in duration-200'
          enterFrom='translate-x-0'
          enterTo='opacity-100 translate-x-1'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-x-1'
          leaveTo='opacity-0 translate-y-0'
          show={!isCollapse || !props.collapsable}
        >
          <input
            onChange={onChangeDebounceHandler}
            onFocus={() => setIsActive(true)}
            onBlur={() => {
              setIsActive(false)
              setIsCollapse(true)
            }}
            placeholder='Search by Transaction ID, Block Hash, Block Height or Address'
            className='ml-1.5 w-full focus:outline-none'
            data-testid='SearchBar.Input'
            autoFocus={props.collapsable}
          />
        </Transition>
      </div>

      <Transition
        enter='transition ease-in duration-150'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
        show={isActive}
      >
        <div
          ref={setPopperEle} style={styles.popper} {...attributes.popper}
          className='w-full px-4 lg:px-0 md:w-1/2 lg:w-1/3 z-10'
        >
          <div className='w-full mt-1.5 py-2 px-4 rounded shadow-lg filter drop-shadow bg-white'>
            <SearchResultTable searchResults={searchResults} isSearching={isSearching} />
          </div>
        </div>
      </Transition>
    </>
  )
}

function SearchResultTable (props: { searchResults?: SearchResult[], isSearching: boolean }): JSX.Element {
  if (props.isSearching) {
    return <SearchInProgress />
  }

  if (props.searchResults === undefined) {
    return <SearchNotFound />
  }

  if (props.searchResults.length === 0) {
    return <SearchInitialInfo />
  }

  return (
    <>
      {props.searchResults.map(searchResult => {
        return (
          <SearchResultRow {...searchResult} key={searchResult.title} />
        )
      })}
    </>
  )
}

function SearchResultRow (props: SearchResult): JSX.Element {
  return (
    <Link href={{ pathname: props.url }}>
      <div
        className='rounded mt-1 bg-white py-2 cursor-pointer'
        data-testid={`SearchResultRow.${props.type}.${props.title}`}
      >
        <div className='bg-white flex items-center gap-x-2'>
          {props.type === 'Block' && <IoCubeOutline size={20} />}
          {props.type === 'Transaction' && <IoSwapHorizontalOutline size={30} />}
          {props.type === 'Address' && <IoWalletOutline size={20} />}
          <div className='overflow-hidden'>
            <div className='font-medium overflow-ellipsis'>{props.title}</div>
            <div className='text-sm'>{props.type}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

async function getSearchResults (api: WhaleApiClient, network: NetworkName, query: string): Promise<(SearchResult[] | undefined)> {
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
    return [txnData]
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
    return [blocksData]
  }

  const addressData = fromAddress(query, network)
  if (addressData !== undefined) {
    return [{
      url: `/address/${query}`,
      title: query,
      type: 'Address'
    }]
  }

  return undefined
}

function SearchInitialInfo (): JSX.Element {
  return (
    <div className='w-full rounded mt-1 bg-white p-2'>
      <div className='w-full flex flex-col bg-white items-center'>
        <IoSearchCircleSharp size={96} className='text-gray-400 opacity-30' />
        <span className='text-center text-gray-400'>Search by Transaction ID, Block Hash, Block Height or Address</span>
      </div>
    </div>
  )
}

function SearchNotFound (): JSX.Element {
  return (
    <div className='w-full rounded mt-1 bg-white p-2'>
      <div className='w-full flex flex-col bg-white items-center'>
        <IoCloseCircleSharp size={88} className='text-gray-400 opacity-30' />
        <span className='text-center text-gray-400'>No Results</span>
      </div>
    </div>
  )
}

function SearchInProgress (): JSX.Element {
  return (
    <div className='w-full rounded mt-1 bg-white p-2'>
      <div className='w-full flex flex-col bg-white items-center'>
        <CgSpinner size={52} className='animate-spin text-gray-600' />
        <span className='text-center text-gray-400'>Searching</span>
      </div>
    </div>
  )
}
