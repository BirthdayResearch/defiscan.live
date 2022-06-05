import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import React, { useEffect, useState } from 'react'
import { getWhaleApiClient, getWhaleRpcClient } from '@contexts/WhaleContext'
import { isNumeric } from '../../../../utils/commons/StringValidator'
import { Head } from '@components/commons/Head'
import { BlocksInfoSection } from './_components/BlocksInfoSection'
import { CountdownSection } from './_components/CountdownSection'
import { InfoSection } from './_components/InfoSection'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import * as prismic from '@prismicio/client'
import _ from 'lodash'
import { getEnvironment } from '@contexts/Environment'
import { PrismicDocument } from '@prismicio/types'

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

      if (currentHeight >= props.target.height || timeLeft % 30 === 0) {
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
  const network = context.query.network?.toString() ?? getEnvironment().networks[0]
  const query = context.params?.query?.toString().trim() as string

  const event = await getEventFromPrismic()

  if (event === undefined && !isNumeric(query) && query.toLowerCase() !== 'nextfutureswap') {
    return { notFound: true }
  }

  let targetHeight = event?.data.height ?? query
  let eventName = event?.data.name ?? null

  if (query.toLowerCase() === 'nextfutureswap') {
    targetHeight = (await getWhaleRpcClient(context).oracle.getFutureSwapBlock()).toString()
    eventName = 'Next Future Settlement Block'
  }

  const blocks = await getWhaleApiClient(context).blocks.list(1)
  if (blocks === undefined || blocks.length !== 1) {
    return { notFound: true }
  }

  if (blocks[0].height >= Number(targetHeight)) {
    return {
      redirect: {
        statusCode: 302,
        destination: `/blocks/${String(targetHeight)}`
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

  async function getEventFromPrismic (): Promise<PrismicDocument | undefined> {
    const endpoint = prismic.createClient('scan')
    const events = await endpoint.getByType('events')

    return _.find(events.results, event => {
      return (event.data.slug.toLowerCase() === query.toLowerCase() && event.data.network.toLowerCase() === network.toLowerCase()) ||
        (event.data.height === Number(query) && event.data.network.toLowerCase() === network.toLowerCase())
    })
  }
}
