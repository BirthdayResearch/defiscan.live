import { DFI as DfiIcon } from '@components/icons/assets/tokens/DFI'
import ReactNumberFormat from 'react-number-format'

export function StatPriceCard (props: { usd: number| undefined, updatedAt: string | undefined }): JSX.Element {
  return (
    <div
      className='rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5 lg:p-8 flex flex-col flex-1 mb-2 lg:mb-0'
      data-testid='StatPriceCard'
    >
      <div className='space-y-1.5 md:space-y-2.5'>
        <div className='flex items-center'>
          <DfiIcon className='text-2xl md:text-3xl' />
          <div className='ml-2 dark:text-gray-400'>$DFI Price</div>
        </div>
        <div
          data-testid='StatPriceCard.Price'
          className='font-semibold text-2xl md:text-4xl lg:text-5xl dark:text-dark-gray-900'
        >
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={props.usd}
            decimalScale={2}
            prefix='$'
          />
        </div>
      </div>
      <div
        data-testid='StatPriceCard.UpdatedAt'
        className='dark:text-gray-400 text-gray-500 text-sm md:text-base mt-4 md:mt-8 lg:mt-auto'
      >
        {props.updatedAt !== undefined && `Updated at ${props.updatedAt}`}
      </div>
    </div>
  )
}
