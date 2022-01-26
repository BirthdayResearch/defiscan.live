import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { isNumeric } from '../../../../utils/commons/StringValidator'
import React, { useEffect, useState } from 'react'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { MdStairs } from 'react-icons/md'

interface BlockDetailsPageProps {
  target: {
    height: number
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
    <Container className='pt-10 pb-56'>
      <InfoHeaderSection target={props.target.height} />
      <CountdownSection timeLeftSecs={timeLeft} estimatedDateTime={estimatedDateTime} />
      <BlocksInfoSection current={props.current.height} remaining={props.target.height - props.current.height} />
    </Container>
  )
}

function InfoHeaderSection (props: { target: number }): JSX.Element {
  return (
    <div className='flex flex-wrap text-center mt-6'>
      <div className='w-full text-gray-500'>
        Countdown for
      </div>
      <div className='mt-1.5 w-full text-2xl md:text-3xl font-medium text-gray-900'>
        {`Block #${props.target}`}
      </div>
    </div>
  )
}

function CountdownSection (props: { timeLeftSecs: number | undefined, estimatedDateTime: Date }): JSX.Element {
  if (props.timeLeftSecs === undefined) {
    return <></>
  }

  const days = Math.floor(props.timeLeftSecs / (3600 * 24))
  const hours = Math.floor((props.timeLeftSecs - days * (3600 * 24)) / 3600)
  const mins = Math.floor((props.timeLeftSecs - days * (3600 * 24) - hours * 3600) / 60)
  const secs = props.timeLeftSecs - (days * (3600 * 24)) - (hours * 3600) - (mins * 60)

  return (
    <div className='flex flex-wrap justify-center -m-2 mt-8'>
      <CountdownTime value={days} text='Days' />
      <CountdownTime value={hours} text='Hours' />
      <CountdownTime value={mins} text='Mins' />
      <CountdownTime value={secs} text='Secs' />

      <div className='w-full md:w-4/6 px-2 mt-1 text-sm'>
        <span className='text-gray-500'>Estimated Target Date:</span>
        <span
          className='ml-1 text-gray-900 font-medium'
        >{props.estimatedDateTime.toString()}
        </span>
      </div>
    </div>
  )
}

function CountdownTime (props: { value: number, text: string }): JSX.Element {
  return (
    <div className='p-0.5 md:p-2 w-1/4 md:w-1/6'>
      <div className='flex flex-wrap rounded border py-4 md:py-8 text-center'>
        <div className='w-full text-2xl md:text-4xl font-medium'>
          {props.value}
        </div>
        <div className='w-full mt-1 text-sm md:text-normal'>
          {props.text}
        </div>
      </div>
    </div>
  )
}

function BlocksInfoSection (props: { remaining: number, current: number }): JSX.Element {
  return (
    <div className='flex flex-wrap justify-center mt-10 -mx-1'>
      <div className='w-full md:w-4/6 flex flex-wrap'>
        <div className='w-full md:w-1/2 p-1'>
          <div className='rounded border p-2 flex items-center'>
            <MdStairs className='text-gray-400 inline-block' size={22} />
            <span className='text-gray-500 ml-1'>Current Block: </span>
            <span className='text-gray-900 font-medium ml-1'>{props.current}</span>
          </div>
        </div>
        <div className='w-full md:w-1/2 p-1'>
          <div className='rounded border p-2 flex items-center'>
            <MdStairs className='text-gray-400 inline-block' size={22} />
            <span className='text-gray-500 ml-1'>Remaining Blocks: </span>
            <span className='text-gray-900 font-medium ml-1'>{props.remaining}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const height = context.params?.height?.toString().trim() as string

  if (!isNumeric(height)) {
    return { notFound: true }
  }

  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(1)

  if (blocks === undefined || blocks.length !== 1) {
    return { notFound: true }
  }

  return {
    props: {
      target: {
        height: Number(height)
      },
      current: {
        height: blocks[0].height,
        time: blocks[0].time
      }
    }
  }
}
