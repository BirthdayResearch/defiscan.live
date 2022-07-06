import { PropsWithChildren, useEffect, useState } from 'react'
import { useApiStatus } from 'hooks/useApiStatus'

interface WarningBannerProps {
  className?: string
  testId?: string
  testnet?: boolean
  mainnet?: boolean
}

interface Announcement {
  content: string
  url?: string
}

export function WarningBanner (props: PropsWithChildren<WarningBannerProps>): JSX.Element {
  const deFiChainStatusUrl = 'https://status.defichain.com/'

  const blockchainIsDownContent: Announcement = {
    content: 'We are currently investigating a syncing issue on the blockchain.',
    url: deFiChainStatusUrl
  }
  const oceanIsDownContent: Announcement = {
    content: 'We are currently investigating connection issues on Ocean API.',
    url: deFiChainStatusUrl
  }

  const { isBlockchainDown, isOceanDown } = useApiStatus()
  const [displayAnnouncement, setDisplayAnnouncement] = useState<Announcement | undefined>()

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

  return (
    <div className='bg-orange-100 rounded p-3 flex justify-center' data-testid='warning_banner'>
      {displayAnnouncement.content}

      {displayAnnouncement.url !== undefined && (
        <div className='pl-1'>
          View more details on the
          <a
            href={`${displayAnnouncement.url}`}
            className='text-primary-500 hover:text-primary-600 font-medium'
            target='_blank' rel='noreferrer'
          >
            <span> DeFiChain Status </span> Page
          </a>
        </div>
      )}
    </div>
  )
}
