import { Link } from '@components/commons/Link'
import classnames from 'classnames'

interface AddressLinkProps {
  address: string
  className: string
}
export function AddressLink (props: AddressLinkProps): JSX.Element {
  return (
    <div data-testid='Address.Link' className={classnames('hover:text-primary-500 cursor-pointer', props.className)}>
      <Link href={{ pathname: `/address/${props.address}` }}>
        {props.address}
      </Link>
    </div>
  )
}
