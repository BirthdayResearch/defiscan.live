import { PropsWithChildren, useEffect, useState } from 'react'
import { useApiStatus } from 'hooks/useApiStatus'
import { AnnouncementData, useGetAnnouncementsQuery } from '@store/website'

interface WarningBannerProps {
  className?: string
  testId?: string
  testnet?: boolean
  mainnet?: boolean
}

export function WarningBanner (props: PropsWithChildren<WarningBannerProps>): JSX.Element {
  const deFiChainStatusUrl = 'https://status.defichain.com/'

  const blockchainIsDownContent: AnnouncementData[] = [{
    content: 'We are currently investigating a syncing issue on the blockchain. ',
    url: {
      web: deFiChainStatusUrl
    }
  }]
  const oceanIsDownContent: AnnouncementData[] = [{
    content: 'We are currently investigating connection issues on Ocean API. ',
    url: {
      web: deFiChainStatusUrl
    }
  }]

  const {
    isBlockchainDown,
    isOceanDown
  } = useApiStatus()

  const {
    data: announcements,
    isSuccess
  } = useGetAnnouncementsQuery({})

  const [emergencyMsgContent, setEmergencyMsgContent] = useState<AnnouncementData[] | undefined>()
  const emergencyAnnouncement = findDisplayedAnnouncement(emergencyMsgContent)
  const announcement = findDisplayedAnnouncement(announcements)
  const announcementToDisplay = emergencyAnnouncement ?? announcement

  useEffect(() => {
    if (isBlockchainDown) {
      setEmergencyMsgContent(blockchainIsDownContent)
    } else if (isOceanDown) {
      setEmergencyMsgContent(oceanIsDownContent)
    } else {
      setEmergencyMsgContent(undefined)
    }
  }, [isBlockchainDown, isOceanDown])

  if (!isSuccess || announcementToDisplay === undefined) {
    return <></>
  }

  return (
    <div className='bg-orange-100 rounded p-3 text-center flex-row text-center' data-testid='warning_banner'>
      <div>
        {announcementToDisplay.content}

        {announcementToDisplay.url !== undefined && (
          <>
            View more details on the
            <a
              href={`${announcementToDisplay.url}`}
              className='text-primary-500 hover:text-primary-600 font-medium'
              target='_blank' rel='noreferrer'
            >
              <span> DeFiChain Status </span> Page
            </a>
          </>
        )}
      </div>
    </div>
  )
}

interface Announcement {
  content: string
  url?: string
  id?: string
  type: AnnouncementData['type']
}

function findDisplayedAnnouncement (announcements?: AnnouncementData[]): Announcement | undefined {
  if (announcements === undefined || announcements.length === 0) {
    return
  }

  for (const announcement of announcements) {
    if (announcement.type === 'SCAN' || announcement.type === undefined) {
      const platformUrl: any = announcement.url
      return {
        content: announcement.content,
        url: platformUrl !== undefined ? platformUrl : undefined,
        id: announcement.id,
        type: announcement.type
      }
    }
  }
}
