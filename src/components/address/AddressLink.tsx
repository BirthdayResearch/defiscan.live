import { Link } from '@components/commons/Link'
import classnames from 'classnames'

export function AddressLink ({ address, className }: {address: string, className?: string}): JSX.Element {
  return (
    <div data-testid='Address.Link' className={classnames('hover:text-primary-500 cursor-pointer', className ?? '')}>
      <Link href={{ pathname: `/address/${address}` }}>
        <a>{address}</a>
      </Link>
    </div>
  )
}
