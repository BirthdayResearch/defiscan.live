import classNames from 'classnames'
import { createContext, PropsWithChildren, useState } from 'react'

const OverflowTableContext = createContext<number>(0)

export function OverflowTable (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  const [scroll, setScroll] = useState(0)

  return (
    <div
      data-testid='OverflowTable'
      className={classNames('relative border rounded-lg overflow-x-auto', props.className)}
      onScroll={(ele: any) => setScroll(ele.target?.scrollLeft)}
    >
      <div className='table table-auto border-collapse w-full'>
        <div className='table-row-group'>
          <OverflowTableContext.Provider value={scroll}>
            {props.children}
          </OverflowTableContext.Provider>
        </div>
      </div>
    </div>
  )
}

function Header (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='OverflowTable.Header'
      className={classNames('table-row border-gray-200 bg-gray-50', props.className)}
    >
      {props.children}
    </div>
  )
}

function Row (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid='OverflowTable.Row'
      className={classNames('table-row border-t', props.className)}
    >
      {props.children}
    </div>
  )
}

function Head (props: PropsWithChildren<{ className?: string, sticky?: boolean }>): JSX.Element {
  return (
    <div
      data-testid='OverflowTable.Head'
      className={classNames('table-cell py-3 px-6 text-black text-opacity-60 text-sm font-semibold bg-gray-50', props.className, {
        'sticky left-0': props.sticky
      })}
    >
      {props.children}
    </div>
  )
}

function Cell (props: PropsWithChildren<{ className?: string, sticky?: boolean, width?: string}>): JSX.Element {
  return (
    <OverflowTableContext.Consumer>
      {(left) => (
        <div
          data-testid='OverflowTable.Cell'
          className={classNames('table-cell py-4 px-6', props.className, props.width, {
            'sticky left-0 bg-white': props.sticky!
          })}
        >
          {props.children}
          <div className={classNames(props.width, {
            'h-full absolute inset-y-0 right-0 border-r border-gray-200': props.sticky! && left > 0
          })}
          />
        </div>
      )}
    </OverflowTableContext.Consumer>
  )
}

OverflowTable.Header = Header
OverflowTable.Head = Head
OverflowTable.Row = Row
OverflowTable.Cell = Cell
