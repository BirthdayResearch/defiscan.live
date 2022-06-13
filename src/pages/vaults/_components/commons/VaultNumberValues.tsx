import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import React from 'react'

interface VaultNumberValuesProps {
  value?: BigNumber
  prefix?: string
  suffix?: string
  testId?: string
}

export function VaultNumberValues (props: VaultNumberValuesProps): JSX.Element {
  if (props.value === undefined) {
    return <span>N/A</span>
  }

  const HoverDesc = (
    <div
      className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      <ReactNumberFormat
        value={props.value.toFixed(8)}
        prefix={props.prefix}
        suffix={props.suffix}
        displayType='text'
        thousandSeparator
      />
    </div>
  )

  return (
    <HoverPopover popover={HoverDesc} placement='top-end'>
      <ReactNumberFormat
        value={props.value.toFixed(2, BigNumber.ROUND_HALF_UP)}
        prefix={props.prefix}
        suffix={props.suffix}
        displayType='text'
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        data-testid={props.testId}
        className='dark:text-gray-100'
      />
    </HoverPopover>
  )
}
