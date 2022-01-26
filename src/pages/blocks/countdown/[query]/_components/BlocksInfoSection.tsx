import { MdStairs } from 'react-icons/md'
import React from 'react'

export function BlocksInfoSection (props: { remaining: number, current: number }): JSX.Element {
  return (
    <div className='flex flex-wrap justify-center mt-10 -mx-2' data-testid='BlocksInfoSection'>
      <div className='w-full lg:w-4/6 flex flex-wrap'>
        <div className='w-full md:w-1/2 py-1 md:py-0 md:pr-1 md:pl-2'>
          <div className='rounded border p-2 flex items-center'>
            <MdStairs className='text-gray-400 inline-block' size={22} />
            <span className='text-gray-500 ml-1' data-testid='BlocksInfoSection.Current.Label'>Current Height:</span>
            <span className='text-gray-900 ml-1' data-testid='BlocksInfoSection.Current.Value'>{props.current}</span>
          </div>
        </div>
        <div className='w-full md:w-1/2 md:py-0 md:pr-2 md:pl-1'>
          <div className='rounded border p-2 flex items-center'>
            <MdStairs className='text-gray-400 inline-block' size={22} />
            <span className='text-gray-500 ml-1' data-testid='BlocksInfoSection.Remaining.Label'>Remaining Blocks:</span>
            <span className='text-gray-900 ml-1' data-testid='BlocksInfoSection.Remaining.Value'>{props.remaining}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
