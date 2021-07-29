import { ReactNode } from 'react'

export interface TableProps {
  className?: string
  children?: ReactNode
}

export default function TableHeader (props: TableProps): JSX.Element {
  const { className = '' } = props
  return (
    <div className={`table-header flex ${className}`}>
      {props.children}
    </div>
  )
}

TableHeader.defaultProps = {
  className: ''
}
