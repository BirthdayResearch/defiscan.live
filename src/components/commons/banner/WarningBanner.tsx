import { PropsWithChildren, useEffect, useState } from 'react'
import { useApiStatus } from 'hooks/useApiStatus'

interface WarningBannerProps {
  className?: string
  testId?: string
  testnet?: boolean
  mainnet?: boolean
}

export function WarningBanner (props: PropsWithChildren<WarningBannerProps>): JSX.Element {
  const blockchainIsDownContent = 'We are currently investigating a syncing issue on the blockchain. View more details on the DeFiChain Status Page.'
  const oceanIsDownContent = 'We are currently investigating connection issues on Ocean API. View more details on the DeFiChain Status Page.'

  const { isBlockchainDown, isOceanDown } = useApiStatus()
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

  // don't display banner when there is not announcement to display
  if (displayAnnouncement === undefined) {
    return <></>
  }

  // TODO: CTA button?
  return (
    <div className='bg-orange-100 rounded p-3 text-center' data-testid='warning_banner'>
      <div>
        {displayAnnouncement}
      </div>
    </div>
  )
}
