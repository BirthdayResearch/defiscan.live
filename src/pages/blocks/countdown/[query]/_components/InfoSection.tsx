import React from 'react'
import NumberFormat from 'react-number-format'

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
                  <NumberFormat
                    value={props.target.height}
                    displayType='text'
                    thousandSeparator
                    prefix='Target Height - '
                  />
                </div>
              </>
            )
          }

          return (
            <div className='text-2xl md:text-3xl font-medium' data-testid='InfoSection.BlockHeight'>
              <NumberFormat
                value={props.target.height}
                displayType='text'
                thousandSeparator
                prefix='Block #'
              />
            </div>
          )
        })()}
      </div>
    </div>
  )
}
