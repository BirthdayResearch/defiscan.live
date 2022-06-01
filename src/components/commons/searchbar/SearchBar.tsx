import { IoSearchSharp } from 'react-icons/io5'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import debounce from 'lodash.debounce'
import { getScrollParents, shift, size, useFloating } from '@floating-ui/react-dom'
import { Menu, Transition } from '@headlessui/react'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { fromAddress } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'
import { NetworkName } from '@defichain/jellyfish-network'
import { WhaleApiClient } from '@defichain/whale-api-client'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import { SearchResult, SearchResultTable } from './SearchResult'

interface SearchBarInterface {
  atHeader: boolean
}

export function SearchBar (props: SearchBarInterface): JSX.Element {
  const api = useWhaleApiClient()
  const network = useNetwork().name

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined)

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
    <Menu as={Fragment}>
      <div
        className={classNames('flex w-full', { 'md:w-3/4 xl:w-1/2': !props.atHeader })}
        onFocus={() => {
          setIsActive(true)
        }}
        onBlur={() => {
          setIsActive(false)
        }}
      >
        <div
          className={classNames('flex w-full p-2 rounded-3xl h-10 bg-white border', { 'border-primary-200': isActive })}
          data-testid='SearchBar'
          ref={reference}
        >
          <Menu.Button as={Fragment}>
            <div className='flex w-full'>
              <IoSearchSharp size={22} className='text-gray-600 ml-0.5 self-center' />
              <input
                placeholder='Search Block / Txn / Vault ID and more'
                className='ml-1.5 h-full w-full focus:outline-none'
                data-testid='SearchBar.Input'
                onChange={onChangeDebounceHandler}
              />
            </div>
          </Menu.Button>
        </div>

        <Transition
          show={isActive}
          className='absolute'
        >
          <div
            className='z-40' ref={floating} style={{
              position: strategy,
              top: y ?? '',
              left: x ?? ''
            }}
          >
            <div className='w-full mt-1.5 rounded-md shadow-lg drop-shadow bg-white overflow-hidden'>
              <SearchResultTable searchResults={searchResults} isSearching={isSearching} />
            </div>
          </div>
        </Transition>
      </div>
    </Menu>
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
