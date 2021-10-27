import { CopyButton } from '@components/commons/CopyButton'
import { QRCodeButton } from '@components/commons/QRCodeButton'

interface AddressHeadingProps {
  addressId: string
}

export function AddressHeading (props: AddressHeadingProps): JSX.Element {
  return (
    <>
      <span className='leading-6 opacity-60' data-testid='title'>
        Address
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='AddressHeading.address'>{props.addressId}</h1>
        <CopyButton className='ml-2' content={props.addressId} />
        <QRCodeButton className='ml-2' content={props.addressId} />
      </div>
    </>
  )
}

export function AddressNotFoundHeading (props: AddressHeadingProps): JSX.Element {
  const addressId = props.addressId

  return (
    <div className='bg-red-100 rounded p-3 text-center' data-testid='AddressHeading.AddressNotFoundHeading'>
      The requested address <code className='break-all'>{addressId}</code> could not be found.
    </div>
  )
}
