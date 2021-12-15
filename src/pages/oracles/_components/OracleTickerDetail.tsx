import { JSX } from '@babel/types'
import { isActive } from './OracleFeed'
import { getPriceCopy, PriceCopy } from '@content/prices'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { format, formatDistanceToNow } from 'date-fns'
import NumberFormat from 'react-number-format'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { getNativeIcon } from '@components/icons/assets/tokens'

interface PriceTickerDetailProps {
  price: PriceTicker
  oracles: PriceOracle[]
}

export function OracleTickerDetail ({
  price,
  oracles
}: PriceTickerDetailProps): JSX.Element {
  const copy: PriceCopy | undefined = getPriceCopy(price.id)

  return (
    <div className='pt-4 pb-12' data-testid='OracleTickerDetail'>
      <div className='flex items-start items-center space-x-3'>
        {(() => {
          if (copy !== undefined && copy.type === 'CRYPTO') {
            const NativeIcon = getNativeIcon(price.price.token)
            return (<NativeIcon width={48} height={48} />)
          }
        })()}
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
      </div>

      <div className='border-b my-6 border-gray-100' />

      <div>
        <H6InfoCircleHoverPopover
          name='Trusted Answer'
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
        <H6InfoCircleHoverPopover
          name='Last Update'
          description={`${format(price.price.block.medianTime * 1000, 'MMM dd, hh:mm:ss aa')}`}
        />
        <div className='text-lg font-semibold'>
          {formatDistanceToNow(price.price.block.medianTime * 1000)} ago
        </div>
      </div>

      <div className='mt-6'>
        <H6InfoCircleHoverPopover
          name='Status'
          description={
            isActive(price.price.block) ? 'Pricing oracles is active with at least one oracles responding.' : 'Pricing oracles is inactive as market is currently closed.'
          }
        />
        <div className='text-lg font-semibold flex items-center'>
          {isActive(price.price.block) ? (
            <span>Active</span>
          ) : (
            <span>Closed</span>
          )}
        </div>
      </div>

      <div className='mt-6'>
        <H6InfoCircleHoverPopover
          name='Oracle Responses'
          description='Pricing oracles collect price feed from other chains and non-crypto markets.'
        />
        <div className='text-lg font-semibold'>
          {price.price.aggregated.oracles.active} of {oracles.filter(oracle => oracle.feed !== undefined).length} responded
        </div>
      </div>
    </div>
  )
}

function H6InfoCircleHoverPopover (props: { name: string, description: string }): JSX.Element {
  return (
    <div className='flex'>
      <h6 className='text-sm font-semibold text-black opacity-60 mr-1'>{props.name}</h6>
      <div className='flex items-center'>
        <InfoHoverPopover
          description='Pricing oracles collect price feed from other chains and non-crypto markets.'
        />
      </div>
    </div>
  )
}
