import { PropsWithChildren } from 'react'
import classNames from 'classnames'

export function AdaptiveList (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveList'
      className={classNames('h-full lg:border lg:rounded-lg overflow-hidden w-full border-gray-200', props.className)}
    >
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveList.Row'
      className={classNames('border-b border-gray-200 py-3 px-2', props.className)}
    >
      {props.children}
    </div>
  )
}

function Cell (props: PropsWithChildren<{ name: string, className?: string }>): JSX.Element {
  return (
    <div className='flex items-center'>
      <div className='w-24 lg:w-56 flex-shrink-0'>
        {props.name}:
      </div>
      <div className={classNames('text-gray-500', props.className)}>
        {props.children}
      </div>
    </div>
  )
}

AdaptiveList.Row = Row
AdaptiveList.Cell = Cell
