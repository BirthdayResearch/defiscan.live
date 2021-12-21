import classNames from 'classnames'

interface EmptySectionProps {
  message: string
  className?: string
  testId?: string
}

export function EmptySection (props: EmptySectionProps): JSX.Element {
  return (
    <div
      className={classNames('text-gray-400 flex w-full justify-center p-12 rounded-lg border mt-4', props.className)}
      data-testid={props.testId}
    >
      {props.message}
    </div>
  )
}
