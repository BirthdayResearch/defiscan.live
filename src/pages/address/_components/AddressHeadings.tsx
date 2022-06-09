import { CopyButton } from '@components/commons/CopyButton'
import { QRCodeButton } from '@components/commons/QRCodeButton'

interface AddressHeadingProps {
  address: string
}

export function AddressHeading (props: AddressHeadingProps): JSX.Element {
  return (
    <>
      <span className='leading-6 opacity-60 dark:text-dark-gray-900 dark:opacity-100' data-testid='title'>
        Address
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all dark:text-gray-100' data-testid='AddressHeading.address'>{props.address}</h1>
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
