import { PropsWithChildren, useEffect, useState } from 'react'
import { useApiStatus } from 'hooks/useApiStatus'

interface WarningBannerProps {
  className?: string
  testId?: string
  testnet?: boolean
  mainnet?: boolean
}

export function WarningBanner (props: PropsWithChildren<WarningBannerProps>): JSX.Element {
  const { isBlockchainDown, isOceanDown } = useApiStatus()

  const blockchainIsDownContent = 'We are currently investigating a syncing issue on the blockchain.'
  const oceanIsDownContent = 'We are currently investigating connection issues on Ocean API.'
  const [displayAnnouncement, setDisplayAnnouncement] = useState<string | undefined>('')

  useEffect(() => {
    if (isBlockchainDown) {
      setDisplayAnnouncement(blockchainIsDownContent)
    } else if (isOceanDown) {
      setDisplayAnnouncement(oceanIsDownContent)
    } else {
      setDisplayAnnouncement(undefined)
    }
  }, [isBlockchainDown, isOceanDown])

  // don't display banner when not in Prod and blockchain is not down
  if (displayAnnouncement === undefined) {
    return <></>
  }

  return (
    <div className='bg-orange-100 rounded p-3 text-center' data-testid={props.testId}>
      <div>
        {displayAnnouncement}
      </div>
    </div>
  )
}
