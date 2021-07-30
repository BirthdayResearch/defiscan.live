import { ReactNode } from 'react'

interface TableBodyProps {
  className?: string
  children: ReactNode
}

export function TableBody (props: TableBodyProps): JSX.Element {
  const { className = '', children } = props
  return (
    <div className={`table-body flex flex-col ${className}`}>
      {children}
    </div>
  )
}

TableBody.defaulProps = {
  className: ''
}
