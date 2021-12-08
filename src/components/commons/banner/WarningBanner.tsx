interface EmptySectionProps {
  message: string
  className?: string
  testId?: string
}

export function WarningBanner (props: EmptySectionProps): JSX.Element {
  return (
    <div className='bg-orange-100 rounded p-3 text-center' data-testid={props.testId}>
      {props.message}
    </div>
  )
}
