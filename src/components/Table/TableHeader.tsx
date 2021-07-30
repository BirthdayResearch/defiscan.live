import { ReactNode } from 'react'

export interface TableProps {
  className?: string
  children: ReactNode
}

export function TableHeader (props: TableProps): JSX.Element {
  const { className = '', children } = props
  return (
    <div className={`table-header flex ${className}`}>
      {children}
    </div>
  )
}

TableHeader.defaultProps = {
  className: ''
}
