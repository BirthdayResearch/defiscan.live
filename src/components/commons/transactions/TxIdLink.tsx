import { Link } from '@components/commons/Link'
import classnames from 'classnames'

export function TxIdLink ({ txid, className }: {txid: string, className?: string}): JSX.Element {
  return (
    <div className={classnames('text-primary-500 hover:text-primary-500 cursor-pointer', className ?? '')}>
      <Link href={{ pathname: `/transactions/${txid}` }}>
        {txid}
      </Link>
    </div>
  )
}
