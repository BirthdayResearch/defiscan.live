import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export function AdaptiveTable (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveTable'
      className={classNames('lg:border lg:border-gray-200 lg:rounded-lg overflow-hidden w-full dark:border-gray-700', props.className)}
    >
      <div className='table w-full border-collapse'>
        <div className='table-row-group space-y-6'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

function Header (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveTable.Header'
      className={classNames('hidden lg:table-row border-gray-100 bg-gray-50 dark:bg-gray-700', props.className)}
    >
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveTable.Row'
      className={classNames(
        'overflow-hidden flex flex-wrap border rounded-lg border-gray-100',
        'lg:border-0 lg:rounded-none lg:table-row lg:border-t dark:border-gray-700',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

function Head (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveTable.Head'
      className={classNames('table-cell py-3 px-6 text-black text-opacity-60 text-sm font-semibold dark:text-gray-100', props.className)}
    >
      {props.children}
    </div>
  )
}

function Cell (props: PropsWithChildren<{ className?: string, title?: string, testId?: string}>): JSX.Element {
  return (
    <div
      data-testid={`${props.testId === undefined ? 'AdaptiveTable.Cell' : props.testId}`}
      className={classNames('table-cell w-full sm:w-auto flex-grow', props.className)}
    >
      <div className='lg:hidden py-2 px-6 bg-gray-50 text-black text-opacity-60 text-xs font-semibold dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-600'>
        {props.title}
      </div>
      <div className='py-5 px-6'>
        {props.children}
      </div>
    </div>
  )
}

AdaptiveTable.Header = Header
AdaptiveTable.Head = Head
AdaptiveTable.Row = Row
AdaptiveTable.Cell = Cell
