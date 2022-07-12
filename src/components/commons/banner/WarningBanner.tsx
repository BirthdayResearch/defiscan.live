import { PropsWithChildren, useEffect, useState } from 'react'
import { useApiStatus } from 'hooks/useApiStatus'
import { AnnouncementData, useGetAnnouncementsQuery } from '@store/website'
import { getEnvironment } from '@contexts/Environment'

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

  const blockchainIsDownContent: AnnouncementData[] = [{
    lang: {
      en: 'We are currently investigating a syncing issue on the blockchain.'
    },
    url: {
      web: deFiChainStatusUrl
    }
  }]
  const oceanIsDownContent: AnnouncementData[] = [{
    lang: {
      en: 'We are currently investigating connection issues on Ocean API.'
    },
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
  } = useGetAnnouncementsQuery({}, {
    pollingInterval: getEnvironment().name === 'Development' ? 5000 : 1000 * 60 * 3 // every 3mins
  })

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
    <div className='bg-orange-100 rounded p-3 text-center text-sm' data-testid='warning_banner'>
      {announcementToDisplay.content}

      {announcementToDisplay.url !== undefined && (
        <a
          href={`${announcementToDisplay.url}`}
          className='text-primary-500 hover:text-primary-600 font-medium text-sm'
          target='_blank' rel='noreferrer'
        >
          <span> Learn more </span>
        </a>
      )}
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
      const lang: any = announcement.lang
      const platformUrl: any = announcement.url
      return {
        content: lang.en,
        url: platformUrl !== undefined ? platformUrl?.web : undefined,
        id: announcement.id,
        type: announcement.type
      }
    }
  }
}
