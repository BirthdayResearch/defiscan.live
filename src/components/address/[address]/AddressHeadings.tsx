import { CopyButton } from '@components/commons/CopyButton'
import { QRCodeButton } from '@components/commons/QRCodeButton'

interface AddressHeadingProps {
  address: string
}

export function AddressHeading (props: AddressHeadingProps): JSX.Element {
  return (
    <>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-orange-100 rounded p-3 text-center'>
          🚧 Work in progress, this is an early iteration of defiscan.live/address/*. Some features are not
          available and may not work as expected.
        </div>
      </div>

      <span className='leading-6 opacity-60' data-testid='title'>
        Address
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='AddressHeading.address'>{props.address}</h1>
        <CopyButton className='ml-2' content={props.address} />
        <QRCodeButton className='ml-2' content={props.address} />
      </div>
    </>
  )
}

export function AddressNotFoundHeading (props: AddressHeadingProps): JSX.Element {
  const address = props.address

  return (
    <div className='bg-red-100 rounded p-3 text-center' data-testid='AddressHeading.AddressNotFoundHeading'>
      The requested address <code className='break-all'>{address}</code> could not be found.
    </div>
  )
}
