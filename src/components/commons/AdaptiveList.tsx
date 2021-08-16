import { PropsWithChildren } from 'react'

export function AdaptiveList (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='adaptive_list'
      className={`lg:border lg:rounded-lg overflow-hidden w-full border-gray-200 ${props.className ?? ''}`}
    >
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      className={`border-b border-gray-200 py-3 px-2 ${props.className ?? ''}`}
    >
      {props.children}
    </div>
  )
}

function Cell (props: PropsWithChildren<{name: string, className?: string }>): JSX.Element {
  return (
    <div className='flex items-center'>
      <div className='w-1/3'>
        {props.name}:
      </div>
      <div className={`${props.className ?? ''}`}>
        {props.children}
      </div>
    </div>
  )
}

AdaptiveList.Row = Row
AdaptiveList.Cell = Cell
