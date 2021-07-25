import { ReactNode } from 'react'

export interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div data-testid={"container"} className={'container mx-auto px-4 py-6'}>
      {children}
    </div>
  )
}

export default Container
