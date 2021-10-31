import { Link } from '@components/commons/Link'

export function AddressLink ({ address }: {address: string}): JSX.Element {
  return (
    <div className='text-lg hover:text-primary-500 cursor-pointer'>
      <Link href={{ pathname: `/address/${address}` }}>
        {address}
      </Link>
    </div>
  )
}
