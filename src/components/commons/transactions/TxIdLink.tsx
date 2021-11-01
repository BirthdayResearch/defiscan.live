import { Link } from '@components/commons/Link'
import classnames from 'classnames'

interface TxIdLinkProps {
  txid: string
  className: string
}

export function TxIdLink (props: TxIdLinkProps): JSX.Element {
  return (
    <div className={classnames('text-primary-400 hover:text-primary-500 cursor-pointer', props.className)}>
      <Link href={{ pathname: `/transactions/${props.txid}` }}>
        {props.txid}
      </Link>
    </div>
  )
}
