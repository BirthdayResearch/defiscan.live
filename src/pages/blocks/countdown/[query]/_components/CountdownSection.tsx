import React from 'react'

export function CountdownSection (props: { timeLeftSecs: number | undefined, estimatedDateTime: Date }): JSX.Element {
  if (props.timeLeftSecs === undefined) {
    return <></>
  }

  const days = Math.floor(props.timeLeftSecs / (3600 * 24))
  const hours = Math.floor((props.timeLeftSecs - days * (3600 * 24)) / 3600)
  const mins = Math.floor((props.timeLeftSecs - days * (3600 * 24) - hours * 3600) / 60)
  const secs = props.timeLeftSecs - (days * (3600 * 24)) - (hours * 3600) - (mins * 60)

  return (
    <div className='flex flex-wrap justify-center -m-2 mt-8'>
      <CountdownTime value={days} label='Days' testId='Days' />
      <CountdownTime value={hours} label='Hours' testId='Hours' />
      <CountdownTime value={mins} label='Mins' testId='Mins' />
      <CountdownTime value={secs} label='Secs' testId='Secs' />

      <div className='w-full lg:w-4/6 mt-2 md:mt-0 px-0.5 md:px-2 text-sm'>
        <span className='text-gray-500'>Estimated Target Date:</span>
        <span
          className='ml-1 text-gray-900 font-medium'
        >
          {props.estimatedDateTime.toString()}
        </span>
      </div>
    </div>
  )
}

function CountdownTime (props: { value: number, label: string, testId: string }): JSX.Element {
  return (
    <div className='p-0.5 md:p-2 w-1/4 lg:w-1/6'>
      <div
        className='flex flex-wrap rounded border py-4 md:py-8 text-center'
        data-testid={`CountdownSection.${props.testId}`}
      >
        <div
          className='w-full text-2xl md:text-4xl xl:text-5xl font-medium'
          data-testid={`CountdownSection.${props.testId}.value`}
        >
          {props.value}
        </div>
        <div className='w-full mt-1 text-sm md:text-normal' data-testid={`CountdownSection.${props.testId}.label`}>
          {props.label}
        </div>
      </div>
    </div>
  )
}
