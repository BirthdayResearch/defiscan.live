import { PropsWithChildren } from 'react'

interface EmptySectionProps {
  className?: string
  testId?: string
}

export function WarningBanner (props: PropsWithChildren<EmptySectionProps>): JSX.Element {
  return (
    <div className='bg-orange-100 rounded p-3 text-center' data-testid={props.testId}>
      {props.children}
    </div>
  )
}
