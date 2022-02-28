import { PropsWithChildren } from 'react'
import { useNetwork } from '@contexts/NetworkContext'

interface WarningBannerProps {
  className?: string
  testId?: string
  testnet?: boolean
  mainnet?: boolean
}

export function WarningBanner (props: PropsWithChildren<WarningBannerProps>): JSX.Element {
  const network = useNetwork().name

  if (props.mainnet === undefined && props.testnet === undefined) {
    return <></>
  }

  if (network !== 'mainnet' && props.mainnet!) {
    return <></>
  }

  if (network !== 'testnet' && props.testnet!) {
    return <></>
  }

  return (
    <div className='bg-orange-100 rounded p-3 text-center' data-testid={props.testId}>
      {props.children}
    </div>
  )
}
