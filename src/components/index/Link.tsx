import { ReactNode, PropsWithChildren } from 'react'
import { Link } from '@components/commons/Link'

export function InternalLink ({
  pathname,
  children,
  testId
}: PropsWithChildren<{ pathname: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <Link href={{ pathname }}>
      <a
        className='flex items-center font-medium cursor-pointer text-primary-500 opacity-60 hover:opacity-100'
        data-testid={testId}
      >
        {children}
      </a>
    </Link>
  )
}
