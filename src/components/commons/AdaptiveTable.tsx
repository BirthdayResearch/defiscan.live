import { PropsWithChildren } from 'react'

export function AdaptiveTable (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div data-testid='adaptive_table' className={`lg:border lg:rounded-lg overflow-hidden w-full ${props.className ?? ''}`}>
      <div className='table w-full border-collapse -mt-6 lg:mt-0'>
        <div className='table-row-group space-y-6'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

function Header (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div data-testid='adaptive_header' className={`hidden lg:table-row border-gray-200 bg-gray-50 ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      className={`overflow-hidden flex flex-wrap border rounded-lg lg:border-0 lg:rounded-none lg:table-row lg:border-t border-gray-200 ${props.className ?? ''}`}
    >
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

function Cell (props: PropsWithChildren<{ className?: string, title?: string }>): JSX.Element {
  return (
    <div className={`table-cell w-full sm:w-auto flex-grow ${props.className ?? ''}`}>
      <div className='lg:hidden py-2 px-6 bg-gray-50 text-black text-opacity-60 text-xs font-semibold'>
        {props.title}
      </div>
      <div className='py-4 px-6'>
        {props.children}
      </div>
    </div>
  )
}

AdaptiveTable.Header = Header
AdaptiveTable.Head = Head
AdaptiveTable.Row = Row
AdaptiveTable.Cell = Cell
