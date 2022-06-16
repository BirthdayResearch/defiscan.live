import { CgSpinner } from 'react-icons/cg'
import { IoCloseCircleSharp, IoSearchSharp } from 'react-icons/io5'
import { Combobox } from '@headlessui/react'
import { Fragment, PropsWithChildren } from 'react'
import { SearchResultLink } from '../link/Link'
import classNames from 'classnames'
import { MdAccountBalanceWallet, MdShield, MdStairs, MdSwapHorizontalCircle } from 'react-icons/md'

export interface SearchResult {
  url: string
  title: string
  type: string
}

export function SearchResultTable (props: { searchResults?: SearchResult[], isSearching: boolean }): JSX.Element {
  if (props.isSearching) {
    return (
      <SearchStatusMessage message='Searching'>
        <CgSpinner size={52} className='animate-spin text-gray-600 dark:text-gray-100' />
      </SearchStatusMessage>
    )
  }

  if (props.searchResults === undefined) {
    return (
      <SearchStatusMessage message='Search by Block Hash, Block Height, Transaction ID, Vault ID or Address'>
        <IoSearchSharp size={96} className='text-gray-400 opacity-30 dark:text-gray-100' />
      </SearchStatusMessage>
    )
  }

  if (props.searchResults.length === 0) {
    return (
      <SearchStatusMessage message='No Results'>
        <IoCloseCircleSharp size={88} className='text-gray-400 opacity-30 dark:text-gray-100 ' />
      </SearchStatusMessage>
    )
  }

  return (
    <>
      <Combobox.Options className='focus:outline-none' static>
        {props.searchResults.map((searchResult, index) => {
          return (
            <SearchResultRow searchResults={searchResult} index={index} key={`${searchResult.type}.${searchResult.title}`} />
          )
        })}
      </Combobox.Options>
    </>
  )
}

function SearchResultRow (props: { searchResults: SearchResult, index: number }): JSX.Element {
  return (
    <>
      <Combobox.Option as={Fragment} value={props.searchResults}>
        {({ active }) => (
          <SearchResultLink
            href={{ pathname: props.searchResults.url }}
            data-testid={`SearchResultRow.${props.searchResults.type}.${props.searchResults.title}`}
          >
            <div
              className={classNames('bg-white dark:bg-gray-800 p-3 cursor-pointer', { 'bg-primary-50 dark:bg-gray-900': active })}
            >
              <div className='flex flex-row items-start gap-x-2'>
                <div className='text-gray-400 dark:text-gray-100'>
                  {(() => {
                    switch (props.searchResults.type) {
                      case 'Block': {
                        return <MdStairs size={24} />
                      }
                      case 'Transaction': {
                        return <MdSwapHorizontalCircle size={24} />
                      }
                      case 'Address': {
                        return <MdAccountBalanceWallet size={24} />
                      }
                      case 'Vault': {
                        return <MdShield size={24} />
                      }
                    }
                  })()}
                </div>
                <div className='overflow-hidden'>
                  <div className='overflow-hidden font-medium overflow-ellipsis dark:text-dark-gray-900'>{props.searchResults.title}</div>
                  <div className='overflow-hidden text-sm text-gray-500 dark:text-gray-100'>{props.searchResults.type}</div>
                </div>
              </div>
            </div>
          </SearchResultLink>
        )}
      </Combobox.Option>
    </>
  )
}

function SearchStatusMessage (props: PropsWithChildren<{ message: string }>): JSX.Element {
  return (
    <div className='w-full rounded mt-1 bg-white dark:bg-gray-800 px-4 py-8'>
      <div className='w-full flex flex-col bg-white dark:bg-gray-800 items-center'>
        {props.children}
        <span className='text-center text-gray-400 dark:text-gray-100'>{props.message}</span>
      </div>
    </div>
  )
}
