import { JSX } from '@babel/types'
import { isActive } from '@components/prices/PriceFeed'
import { formatDistanceToNow } from 'date-fns'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MdShowChart } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { getPriceCopy, PriceCopy } from '../../cms/prices'
import { getServerSideProps } from '../../pages/prices/[symbol]'

export function PriceTickerDetail (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { price } = props
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
        <h6 className='text-black opacity-60'>Trusted answer</h6>
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
        <LabeledSection name='Last update'>
          <div className='text-lg font-semibold'>
            {formatDistanceToNow(price.price.block.time * 1000)} ago
          </div>
        </LabeledSection>
      </div>

      <div className='mt-6'>
        <LabeledSection name='Status'>
          <div className='text-lg font-semibold flex items-center'>
            {isActive(price.price.block) ? (
              <>
                <span>Active</span>
                <IoCheckmarkCircleOutline className='ml-1 h-4 w-4 text-green-600' />
              </>
            ) : (
              <>
                <span>Inactive</span>
                <IoAlertCircleOutline className='ml-1 h-4 w-4 text-yellow-600' />
              </>
            )}
          </div>
        </LabeledSection>
      </div>

      <div className='mt-6'>
        <LabeledSection name='Oracle responses'>
          <div className='text-lg font-semibold'>
            {price.price.aggregated.oracles.active} of {price.price.aggregated.oracles.total} responded
          </div>
        </LabeledSection>
      </div>
    </div>
  )
}

function LabeledSection (props: PropsWithChildren<{ name: string }>): JSX.Element {
  return (
    <>
      <h6 className='text-sm font-semibold text-black opacity-60'>{props.name}</h6>
      {props.children}
    </>
  )
}
