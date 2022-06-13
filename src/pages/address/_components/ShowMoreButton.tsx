import React from 'react'
import { CgSpinner } from 'react-icons/cg'

interface ShowMoreButtonProps {
  isLoading: boolean
  next?: string
  handleOnClick: () => void
}

export function ShowMoreButton (props: ShowMoreButtonProps): JSX.Element {
  if (props.next === undefined) {
    return <></>
  }

  if (props.isLoading) {
    return (
      <div className='flex w-full justify-center mt-4'>
        <div className='flex justify-center pt-2 pb-4'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div
      className='flex w-full justify-center mt-4' onClick={props.handleOnClick}
      data-testid='AddressTransactionTable.showMoreBtn'
    >
      <button
        type='button'
        className='w-full md:w-1/3 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded dark:bg-gray-900 dark:border=gray-400 dark:text-dark-primary-500 dark:hover:border-gray-400'
      >
        SHOW MORE
      </button>
    </div>
  )
}
