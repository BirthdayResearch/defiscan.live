import { PropsWithChildren } from 'react'
import classNames from 'classnames'

export function AdaptiveList (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='AdaptiveList'
      className={classNames(
        'divide-y divide-gray-200 border-gray-200',
        'lg:border lg:rounded-lg',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ name: string, className?: string }>): JSX.Element {
  return (
    <div className='flex items-center py-3 pl-6 pr-4'>
      <div className='min-w-24 lg:min-w-56 flex-shrink-0'>
        {props.name}:
      </div>
      <div className={classNames('text-gray-600', props.className)}>
        {props.children}
      </div>
    </div>
  )
}

AdaptiveList.Row = Row
