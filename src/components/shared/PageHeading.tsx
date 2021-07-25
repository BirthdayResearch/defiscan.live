import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const PageHeading = ({ children }: IProps): JSX.Element => {
  return (
    <h1 data-testid={'page_heading'} className='text-2xl font-medium pb-8'>
      {children}
    </h1>
  )
}
