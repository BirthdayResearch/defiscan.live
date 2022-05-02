import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React, { useEffect, useState } from 'react'
import { getWhaleApiClient, getWhaleRpcClient } from '@contexts/WhaleContext'
import { EventCopy, getEventCopy } from '@content/events'
import { isNumeric } from '../../../../utils/commons/StringValidator'
import { Head } from '@components/commons/Head'
import { BlocksInfoSection } from './_components/BlocksInfoSection'
import { CountdownSection } from './_components/CountdownSection'
import { InfoSection } from './_components/InfoSection'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

interface BlockDetailsPageProps {
  target: {
    height: number
    name: string | null
  }
  current: {
    height: number
    medianTime: number
  }
}

export default function BlockCountdown (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const currentHeight = useSelector((state: RootState) => state.stats.count.blocks) ?? props.current.height

  const estimatedTargetTime = (props.current.medianTime * 1000) + ((props.target.height - currentHeight) * 30 * 1000)
  const secsToTargetHeight = (estimatedTargetTime - new Date().getTime())
  const [timeLeft, setTimeLeft] = useState<number>(Math.ceil(secsToTargetHeight / 1000))

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)

      if (currentHeight >= props.target.height || timeLeft % 10 === 0) {
        location.reload()
      }
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <>
      {(() => {
        if (props.target.name !== null) {
          return (
            <Head title={`${props.target.name} Countdown`} />
          )
        }

        return (
          <Head title={`Block #${props.target.height} Countdown`} />
        )
      })()}

      <Container className='pt-8 pb-56'>
        <InfoSection target={props.target} />
        <CountdownSection timeLeftSecs={timeLeft} estimatedTargetTime={estimatedTargetTime} />
        <BlocksInfoSection current={currentHeight} remaining={props.target.height - currentHeight} />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const query = context.params?.query?.toString().trim() as string
  const event: EventCopy | undefined = getEventCopy(query, context)

  if (event === undefined && !isNumeric(query) && query.toLowerCase() !== 'nextfutureswap') {
    return { notFound: true }
  }

  const api = getWhaleApiClient(context)
  const rpc = getWhaleRpcClient(context)

  const blocks = await api.blocks.list(1)

  if (blocks === undefined || blocks.length !== 1) {
    return { notFound: true }
  }

  let targetHeight = event?.height ?? query
  let eventName = event?.name ?? null

  if (query.toLowerCase() === 'nextfutureswap') {
    targetHeight = (await rpc.oracle.getFutureSwapBlock()).toString()
    eventName = 'Next Future Settlement Block'
  }

  if (blocks[0].height >= Number(targetHeight)) {
    return {
      redirect: {
        statusCode: 302,
        destination: `/blocks/${targetHeight}`
      }
    }
  }

  return {
    props: {
      target: {
        height: Number(targetHeight),
        name: eventName
      },
      current: {
        height: blocks[0].height,
        medianTime: blocks[0].medianTime
      }
    }
  }
}
