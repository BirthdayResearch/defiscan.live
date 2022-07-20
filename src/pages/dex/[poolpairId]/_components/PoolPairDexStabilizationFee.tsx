import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'

export function PoolPairDexStabilizationFee (props: { fee: string | undefined }): JSX.Element {
  if (props.fee === undefined) {
    return <></>
  }

  return (
    <div className='flex flex-wrap flex-row w-full lg:w-fit mt-2 lg:mt-8 p-4 lg:p-6 rounded-lg border border-gray-200 justify-between items-center dark:border-gray-700 dark:bg-gray-800' data-testid='PoolPairDexStabilizationFee'>
      <div className='flex items-center mr-4 lg:mr-8'>
        <span className='mr-2 sm:whitespace-nowrap text-gray-900 dark:text-gray-100'>DEX stabilization fee</span>
        <InfoHoverPopover description='There is currently a high DEX Stabilization fee imposed on DUSD-DFI swaps due to DFIP 2206-D.' />
      </div>
      <ReactNumberFormat
        displayType='text'
        className='font-medium md:text-xl dark:text-gray-100'
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        suffix='%'
        value={new BigNumber(props.fee).multipliedBy(100).toFixed(2, BigNumber.ROUND_HALF_UP)}
      />
    </div>
  )
}
