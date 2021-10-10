import { ReactNode, PropsWithChildren } from 'react'
import { Link } from '@components/commons/Link'

export function ExternalLink ({
  url,
  children,
  testId
}: PropsWithChildren<{ url: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <a
      className='font-medium cursor-pointer text-primary-500 opacity-60 hover:opacity-100'
      href={url}
      data-testid={testId}
    >
      {children}
    </a>
  )
}

export function InternalLink ({
  pathname,
  children,
  testId
}: PropsWithChildren<{ pathname: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <Link href={{ pathname }}>
      <a
        className='font-medium cursor-pointer text-primary-500 opacity-60 hover:opacity-100'
        data-testid={testId}
      >
        {children}
      </a>
    </Link>
  )
}
