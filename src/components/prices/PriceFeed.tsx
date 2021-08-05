import { Link } from '@components/commons/Link'
import { prices } from '@defichain/whale-api-client'
import Image from 'next/image'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MdShowChart } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { getPriceCopy, PriceCopy } from '../../cms/prices'

interface PriceFeedProps {
  price: prices.PriceTicker
}

export function PriceFeed (props: PriceFeedProps): JSX.Element {
  const price: prices.PriceFeed = props.price.price
  const id = `${price.token}-${price.currency}`
  const copy: PriceCopy | undefined = getPriceCopy(id)

  return (
    <Link href={{ pathname: `/prices/${id}` }}>
      <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'>
        <div className='bg-gray-50 rounded p-6 cursor-pointer'>
          <div className='flex'>
            {copy !== undefined ? (
              <Image src={copy.icon} width={24} height={24} alt={copy.description} />
            ) : (
              <MdShowChart className='h-6 w-6 p-1 bg-gray-300 rounded-full text-gray-900' />
            )}
            <h4 className='ml-2'>
              {price.token} / {price.currency}
            </h4>
          </div>

          <div className='flex items-center mt-2'>
            <h3 className='text-3xl font-bold'>
              <NumberFormat
                value={price.aggregated.amount}
                displayType='text'
                thousandSeparator
                decimalScale={2}
                suffix={` ${price.currency}`}
              />
            </h3>
            <div className='ml-1'>
              {isActive(price.block) ? (
                <IoCheckmarkCircleOutline className='h-4 w-4 text-green-600' />
              ) : (
                <IoAlertCircleOutline className='h-4 w-4 text-yellow-600' />
              )}
            </div>

          </div>

          <div className='flex justify-between items-center mt-2'>
            {copy !== undefined &&
              <div className='bg-gray-200 p-1 rounded'>
                <div className='text-xs font-medium'>{copy.type}</div>
              </div>}
            <div className='flex-grow' />
            <button className='text-primary font-semibold'>
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function isActive (block: { time: number, medianTime: number }): boolean {
  return Math.abs(block.time - Date.now() / 1000) < 3600
}
