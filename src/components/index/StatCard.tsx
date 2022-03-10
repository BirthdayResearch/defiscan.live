import { StatsState } from '@store/stats'
import { DFI as DfiIcon } from '@components/icons/assets/tokens/DFI'
import ReactNumberFormat from 'react-number-format'
import { TextLoader } from '@components/commons/loaders/TextLoader'

export function StatPriceCard (props: {stats: StatsState}): JSX.Element {
  return (
    <div
      className='rounded-xl border border-gray-200 lg:shrink-0 p-4 md:p-8 w-full md:w-[21rem] flex flex-col h-[8rem] md:h-[15.5rem]'
      data-testid='StatPriceCard'
    >
      <div className='space-y-1.5 md:space-y-2.5'>
        <div className='flex items-center'>
          <DfiIcon fontSize={32} />
          <div className='ml-2'>$DFI Price</div>
        </div>
        <div
          data-testid='StatPriceCard.Price'
          className='font-semibold text-xl md:text-3xl lg:text-5xl'
        >
          {props.stats.price.usdt === undefined ? <TextLoader text='$3.65' /> : (
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={props.stats.price.usdt}
              decimalScale={2}
              prefix='$'
            />
          )}
        </div>
      </div>
      {props.stats.price.usdt === undefined ? <TextLoader text='Updated at 13:22:00+01:00' className='mt-auto' /> : (
        <span
          data-testid='StatPriceCard.UpdatedAt'
          className='mt-auto text-gray-500 text-xs md:text-base'
        >
          {`Updated at ${props.stats.updatedAt}`}
        </span>
      )}
    </div>
  )
}
