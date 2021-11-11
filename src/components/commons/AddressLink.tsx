import { Link } from '@components/commons/Link'
import classnames from 'classnames'
import { PropsWithChildren } from 'react'

interface AddressLinkProps {
  address: string
  className?: string
  testId?: string
}

export function AddressLink (props: PropsWithChildren<AddressLinkProps>): JSX.Element {
  return (
    <div
      data-testid={props.testId}
      className={classnames('hover:underline text-primary-500 cursor-pointer', props.className)}
    >
      <Link href={{ pathname: `/address/${props.address}` }}>
        {(() => {
          if (props.children !== undefined) {
            return props.children
          }
          return props.address
        })()}
      </Link>
    </div>
  )
}
