import classnames from 'classnames'

export function TextLoader ({ text, className }: {text: string, className?: string}): JSX.Element {
  return (
    <div className={classnames('animate-pulse bg-gray-200 rounded w-min cursor-default whitespace-nowrap', className)}>
      <p className='opacity-0'>{text}</p>
    </div>
  )
}
