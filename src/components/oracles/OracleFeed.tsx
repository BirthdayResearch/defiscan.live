import { Link } from '@components/commons/link/Link'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { getPriceCopy, PriceCopy } from '@content/prices'
import { prices } from '@defichain/whale-api-client'
import { format } from 'date-fns'
import { IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import NumberFormat from 'react-number-format'
import { PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { getNativeIcon } from '@components/icons/assets/tokens'

export interface PriceFeedProps {
  price: PriceTicker
  copy: PriceCopy | undefined
  isToken: boolean
}

export function OracleFeed (props: PriceFeedProps): JSX.Element {
  const price: prices.PriceFeed = props.price.price
  const id = `${price.token}-${price.currency}`
  const copy: PriceCopy | undefined = getPriceCopy(id)

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4' data-testid='OracleFeed'>
      <Link href={{ pathname: `/oracles/${id}` }}>
        <a>
          <div className='bg-gray-50 rounded p-6 cursor-pointer'>
            <div className='flex space-x-2'>
              {(() => {
                if (copy !== undefined && copy.type === 'CRYPTO') {
                  const NativeIcon = getNativeIcon(price.token)
                  return (<NativeIcon width={24} height={24} />)
                }
              })()}
              <h4>
                {price.token} / {price.currency}
              </h4>
            </div>

            <div className='flex items-center mt-2'>
              <h3 className='text-2xl font-medium'>
                <NumberFormat
                  value={price.aggregated.amount}
                  displayType='text'
                  thousandSeparator
                  decimalScale={2}
                  suffix={` ${price.currency}`}
                />
              </h3>
              <div>
                {isActive(price.block) ? (
                  <HoverPopover popover='Verified by oracles'>
                    <div className='p-1 cursor-help'>
                      <IoCheckmarkCircle className='h-4 w-4 text-green-500' />
                    </div>
                  </HoverPopover>
                ) : (
                  <HoverPopover
                    popover={`Inactive since ${format(price.block.medianTime * 1000, 'MMM dd, hh:mm:ss aa')}`}
                  >
                    <div className='p-1 cursor-help'>
                      <IoAlertCircleOutline className='h-4 w-4 text-gray-500' />
                    </div>
                  </HoverPopover>
                )}
              </div>
            </div>

            <div className='flex justify-between items-center mt-5'>
              {copy !== undefined && (
                <div className='bg-gray-200 p-1 rounded'>
                  <div className='text-xs font-medium text-gray-600'>{copy.type}</div>
                </div>
              )}
              <div className='flex-grow' />
              <button className='text-primary-500'>
                View
              </button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export function isActive (block: { time: number, medianTime: number }): boolean {
  return Math.abs(block.time - Date.now() / 1000) < 3600
}
