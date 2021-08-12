import { JSX } from '@babel/types'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { isActive } from '@components/prices/PriceFeed'
import { getPriceCopy, PriceCopy } from '@content/prices'
import { PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { format, formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { MdShowChart } from 'react-icons/md'
import NumberFormat from 'react-number-format'

interface PriceTickerDetailProps {
  price: PriceTicker
}

export function PriceTickerDetail ({ price }: PriceTickerDetailProps): JSX.Element {
  const copy: PriceCopy | undefined = getPriceCopy(price.id)

  return (
    <div className='pt-4 pb-12'>
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          {copy !== undefined ? (
            <Image src={copy.icon} width={48} height={48} alt={copy.description} />
          ) : (
            <MdShowChart className='h-12 w-12 p-1 bg-gray-300 rounded-full text-gray-900' />
          )}
        </div>

        <div className='ml-2'>
          <div className='flex items-center'>
            <h1 className='text-3xl font-bold'>
              {price.price.token} / {price.price.currency}
            </h1>

            {copy !== undefined && (
              <div className='ml-2 bg-gray-200 p-1 rounded self-auto'>
                <div className='text-xs font-medium'>{copy.type}</div>
              </div>
            )}
          </div>
          {copy !== undefined && (
            <div className='mt-1'>
              <p className='text-black opacity-60 line-clamp-3 overflow-ellipsis'>{copy.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className='border-b my-8 border-gray-100' />

      <div>
        <H6AlertCircleHoverPopover
          name='Trusted answer'
          description={`Trusted price is aggregated from ${price.price.aggregated.oracles.active}/${price.price.aggregated.oracles.total} active pricing oracles.`}
        />
        <h2 className='text-4xl font-bold'>
          <NumberFormat
            value={price.price.aggregated.amount}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            suffix={` ${price.price.currency}`}
          />
        </h2>
      </div>

      <div className='mt-6'>
        <H6AlertCircleHoverPopover
          name='Last update' description={
          `${format(price.price.block.medianTime * 1000, 'MMM dd, hh:mm:ss aa')}`
          }
        />
        <div className='text-lg font-semibold'>
          {formatDistanceToNow(price.price.block.medianTime * 1000)} ago
        </div>
      </div>

      <div className='mt-6'>
        <H6AlertCircleHoverPopover
          name='Status' description={
            isActive(price.price.block) ? 'Pricing oracles is active with at least one oracles responding.' : 'Pricing oracles is inactive as market is currently closed.'
          }
        />
        <div className='text-lg font-semibold flex items-center'>
          {isActive(price.price.block) ? (
            <>
              <span>Active</span>
            </>
          ) : (
            <>
              <span>Closed</span>
            </>
          )}
        </div>
      </div>

      <div className='mt-6'>
        <H6AlertCircleHoverPopover
          name='Oracle responses'
          description='Pricing oracles collect price feed from other chains and non-crypto markets.'
        />
        <div className='text-lg font-semibold'>
          {price.price.aggregated.oracles.active} of {price.price.aggregated.oracles.total} responded
        </div>
      </div>
    </div>
  )
}

function H6AlertCircleHoverPopover (props: { name: string, description: string }): JSX.Element {
  return (
    <div className='flex'>
      <h6 className='text-sm font-semibold text-black opacity-60 mr-1'>{props.name}</h6>
      <div className='flex items-center'>
        <HoverPopover description={props.description}>
          <div className='cursor-help group'>
            <IoAlertCircleOutline className='h-4 w-4 text-gray-500' />
          </div>
        </HoverPopover>
      </div>
    </div>
  )
}
