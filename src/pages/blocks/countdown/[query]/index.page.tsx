import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React, { useEffect, useState } from 'react'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { EventCopy, getEventCopy } from '@content/events'
import { isNumeric } from '../../../../utils/commons/StringValidator'
import { Head } from '@components/commons/Head'
import { BlocksInfoSection } from './_components/BlocksInfoSection'
import { CountdownSection } from './_components/CountdownSection'
import { InfoSection } from './_components/InfoSection'

interface BlockDetailsPageProps {
  target: {
    height: number
    name: string | null
  }
  current: {
    height: number
    time: number
  }
}

export default function BlockCountdown (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined)

  const secsToTargetHeight = (props.target.height - props.current.height) * 30
  const estimatedDateTime = new Date((props.current.time * 1000) + (secsToTargetHeight * 1000))

  useEffect(() => {
    setTimeLeft(Math.floor((estimatedDateTime.getTime() - new Date().getTime()) / 1000))
  }, [props.target.height])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(Math.floor((estimatedDateTime.getTime() - new Date().getTime()) / 1000))
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
        <CountdownSection timeLeftSecs={timeLeft} estimatedDateTime={estimatedDateTime} />
        <BlocksInfoSection current={props.current.height} remaining={props.target.height - props.current.height} />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const query = context.params?.query?.toString().trim() as string
  const event: EventCopy | undefined = getEventCopy(query, context)

  if (event === undefined && !isNumeric(query)) {
    return { notFound: true }
  }

  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(1)

  if (blocks === undefined || blocks.length !== 1) {
    return { notFound: true }
  }

  const targetHeight = event?.height ?? query

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
        name: event?.name ?? null
      },
      current: {
        height: blocks[0].height,
        time: blocks[0].time
      }
    }
  }
}
