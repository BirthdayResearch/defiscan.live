import { IoSearchSharp } from 'react-icons/io5'
import { useEffect, useMemo, useState } from 'react'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import debounce from 'lodash.debounce'
import { getScrollParents, shift, size, useFloating } from '@floating-ui/react-dom'
import { Combobox, Transition } from '@headlessui/react'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { fromAddress } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { NetworkName } from '@defichain/jellyfish-network'
import { WhaleApiClient } from '@defichain/whale-api-client'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import { SearchResult, SearchResultTable } from './SearchResult'
import { useRouter } from 'next/router'
import { getEnvironment } from '@contexts/Environment'

interface SearchBarInterface {
  atHeader: boolean
}

export function SearchBar (props: SearchBarInterface): JSX.Element {
  const api = useWhaleApiClient()
  const { name: network, connection } = useNetwork()
  const router = useRouter()

  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined)

  const [selected, setSelected] = useState<SearchResult>()

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs
  } = useFloating({
    placement: 'bottom-end',
    middleware: [shift(),
      size({
        apply ({ reference }) {
          if (refs.floating.current !== null && refs.floating.current !== undefined) {
            Object.assign(refs.floating.current.style, {
              minWidth: '325px',
              width: `${reference.width}px`
            })
          }
        }
      })
    ]
  })

  function updateFloater (): void {
    if ((refs.reference.current == null) || (refs.floating.current == null)) {
      return
    }

    Object.assign(refs.floating.current?.style, {
      width: `${refs.reference.current?.scrollWidth}px`,
      left: `${refs.reference.current?.scrollLeft + (refs.reference.current?.scrollWidth - refs.floating.current?.scrollWidth)}px` ?? ''
    })
  }

  useEffect(() => {
    if ((refs.reference.current == null) || (refs.floating.current == null)) {
      return
    }

    const parents = [...getScrollParents(refs.reference.current)]

    parents.forEach((parent) => {
      parent.addEventListener('resize', updateFloater)
    })

    return () => {
      parents.forEach((parent) => {
        parent.removeEventListener('resize', updateFloater)
      })
    }
  }, [refs.reference, refs.floating, updateFloater])

  async function changeHandler (event): Promise<void> {
    const query = event.target.value.trim()
    setSelected({ title: query, url: '', type: 'Query' })
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

  function onSelect (result: SearchResult): void {
    setSelected(result)
    if (result?.url !== undefined && result?.url !== '') {
      void router.push({ pathname: result.url, query: getEnvironment().isDefaultConnection(connection) ? {} : { network: connection } })
    }
  }

  return (
    <Combobox value={selected} onChange={onSelect} nullable>
      <div className={classNames('flex w-full', { 'md:w-3/4 xl:w-1/2': !props.atHeader })}>
        <div
          className={classNames('flex w-full p-2 rounded-3xl h-10 bg-white dark:bg-gray-800 dark:border-gray-700 border focus-within:border-primary-200')}
          data-testid='SearchBar'
          ref={reference}
        >
          <Combobox.Button as='div' className='flex w-full'>
            <IoSearchSharp size={22} className='dark:text-gray-100 text-gray-600 ml-0.5 self-center' />
            <Combobox.Input
              as='input'
              placeholder='Search Block / Txn / Vault ID and more'
              className='ml-1.5 h-full w-full focus:outline-none dark:bg-gray-800 dark:placeholder-gray-400 dark:text-dark-gray-900'
              data-testid='SearchBar.Input'
              displayValue={(item: SearchResult) => item?.title}
              onChange={onChangeDebounceHandler}
            />
          </Combobox.Button>
        </div>

        <Transition className='absolute'>
          <div
            className='z-40' ref={floating} style={{
              position: strategy,
              top: y ?? '',
              left: x ?? ''
            }}
          >
            <div className='w-full mt-1.5 rounded-md shadow-lg drop-shadow bg-white overflow-hidden dark:bg-gray-800'>
              <SearchResultTable searchResults={searchResults} isSearching={isSearching} />
            </div>
          </div>
        </Transition>
      </div>
    </Combobox>
  )
}

async function getSearchResults (api: WhaleApiClient, network: NetworkName, query: string): Promise<(SearchResult[])> {
  const searchResults: SearchResult[] = []

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
    searchResults.push(txnData)
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
    searchResults.push(blocksData)
  }

  const addressData = fromAddress(query, network)
  if (addressData !== undefined) {
    searchResults.push({
      url: `/address/${query}`,
      title: query,
      type: 'Address'
    })
  }

  const vaultsData = await api.loan.getVault(query)
    .then((data: LoanVaultActive | LoanVaultLiquidated) => {
      if (data === undefined) {
        return undefined
      }

      return {
        url: `/vaults/${data.vaultId}`,
        title: `${data.vaultId}`,
        type: 'Vault'
      }
    }).catch(() => {
      return undefined
    })

  if (vaultsData !== undefined) {
    searchResults.push(vaultsData)
  }

  return searchResults
}
