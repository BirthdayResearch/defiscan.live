import { Link } from '@components/commons/Link'
import classnames from 'classnames'
import { PropsWithChildren } from 'react'

interface TxIdLinkProps {
  txid: string
  className?: string
  testId?: string
}

export function TxIdLink (props: PropsWithChildren<TxIdLinkProps>): JSX.Element {
  return (
    <div data-testid={props.testId} className={classnames('hover:underline text-primary-500 cursor-pointer', props.className)}>
      <Link href={{ pathname: `/transactions/${props.txid}` }}>
        {(() => {
          if (props.children !== undefined) {
            return props.children
          }
          return props.txid
        })()}
      </Link>
    </div>
  )
}
