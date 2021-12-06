interface EmptySectionProps {
  message: string
  className?: string
  testId?: string
}

export function EmptySection (props: EmptySectionProps): JSX.Element {
  return (
    <div className='text-gray-400 flex w-full justify-center p-12 rounded-lg border mt-4' data-testid={props.testId}>
      {props.message}
    </div>
  )
}
