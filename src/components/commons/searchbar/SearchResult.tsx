import { CgSpinner } from 'react-icons/cg'
import { IoCloseCircleSharp, IoSearchSharp } from 'react-icons/io5'
import { Menu } from '@headlessui/react'
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
        <CgSpinner size={52} className='animate-spin text-gray-600' />
      </SearchStatusMessage>
    )
  }

  if (props.searchResults === undefined) {
    return (
      <SearchStatusMessage message='Search by Block Hash, Block Height, Transaction ID, Vault ID or Address'>
        <IoSearchSharp size={96} className='text-gray-400 opacity-30' />
      </SearchStatusMessage>
    )
  }

  if (props.searchResults.length === 0) {
    return (
      <SearchStatusMessage message='No Results'>
        <IoCloseCircleSharp size={88} className='text-gray-400 opacity-30' />
      </SearchStatusMessage>
    )
  }

  return (
    <>
      <Menu.Items className='focus:outline-none' static>
        {props.searchResults.map((searchResult, index) => {
          return (
            <SearchResultRow searchResults={searchResult} index={index} key={searchResult.title} />
          )
        })}
      </Menu.Items>
    </>
  )
}

function SearchResultRow (props: { searchResults: SearchResult, index: number }): JSX.Element {
  return (
    <>
      <Menu.Item as={Fragment}>
        {({ active }) => (
          <SearchResultLink
            href={{ pathname: props.searchResults.url }}
            data-testid={`SearchResultRow.${props.searchResults.type}.${props.searchResults.title}`}
          >
            <div
              className={classNames('bg-white p-3 cursor-pointer', { 'bg-primary-50': active })}
            >
              <div className='flex flex-row items-start gap-x-2'>
                <div className='text-gray-400'>
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
                  <div className='overflow-hidden font-medium overflow-ellipsis'>{props.searchResults.title}</div>
                  <div className='overflow-hidden text-sm text-gray-500'>{props.searchResults.type}</div>
                </div>
              </div>
            </div>
          </SearchResultLink>
        )}
      </Menu.Item>
    </>
  )
}

function SearchStatusMessage (props: PropsWithChildren<{ message: string }>): JSX.Element {
  return (
    <div className='w-full rounded mt-1 bg-white px-4 py-8'>
      <div className='w-full flex flex-col bg-white items-center'>
        {props.children}
        <span className='text-center text-gray-400'>{props.message}</span>
      </div>
    </div>
  )
}
