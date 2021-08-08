import { PropsWithChildren } from 'react'

export function AdaptiveTable (props: PropsWithChildren<{className?: string}>): JSX.Element {
  return (
    <div className={`border rounded-lg overflow-hidden w-full ${props.className ?? ''}`}>
      <div className='table w-full border-collapse'>
        <div className='table-row-group'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

function Header (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div className={`table-row border-gray-200 bg-gray-50 ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div className={`table-row border-t border-gray-200 ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

function Head (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div className={`table-cell py-3 px-6 text-black text-opacity-60 text-sm font-semibold ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

function Cell (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div className={`table-cell py-4 px-6 ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

AdaptiveTable.Header = Header
AdaptiveTable.Head = Head
AdaptiveTable.Row = Row
AdaptiveTable.Cell = Cell
