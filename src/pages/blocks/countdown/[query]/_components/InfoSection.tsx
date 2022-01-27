import React from 'react'

export function InfoSection (props: { target: { height: number, name: string | null } }): JSX.Element {
  return (
    <div className='flex flex-wrap text-center mt-6'>
      <div className='w-full text-gray-500'>
        Countdown for
      </div>
      <div className='mt-1.5 w-full text-gray-900'>
        {(() => {
          if (props.target.name !== null) {
            return (
              <>
                <div className='text-2xl md:text-3xl font-medium' data-testid='InfoSection.EventTitle'>
                  {props.target.name}
                </div>
                <div className='mt-1 text-sm text-gray-500 font-light' data-testid='InfoSection.EventHeight'>
                  Target Height - {props.target.height}
                </div>
              </>
            )
          }

          return (
            <div className='text-2xl md:text-3xl font-medium' data-testid='InfoSection.BlockHeight'>
              Block #{props.target.height}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
