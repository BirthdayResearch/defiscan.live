import { Link } from '@components/commons/link/Link'
import classnames from 'classnames'
import { PropsWithChildren } from 'react'

interface TxIdLinkProps {
  txid: string
  className?: string
  textClassName?: string
  testId?: string
}

export function TxIdLink (props: PropsWithChildren<TxIdLinkProps>): JSX.Element {
  if (props.txid === undefined || props.txid.length === 0) {
    return <></>
  }

  return (
    <div
      data-testid={props.testId}
      className={classnames('hover:underline cursor-pointer', props.className, props.textClassName === undefined ? 'text-blue-400' : props.textClassName)}
    >
      <Link href={{ pathname: `/transactions/${props.txid}` }}>
        {(() => {
          if (props.children !== undefined) {
            return (<a>{props.children}</a>)
          }
          return props.txid
        })()}
      </Link>
    </div>
  )
}
