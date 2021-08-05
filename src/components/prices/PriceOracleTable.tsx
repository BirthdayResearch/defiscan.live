import { JSX } from '@babel/types'
import { isActive } from '@components/prices/PriceFeed'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { format } from 'date-fns'
import { InferGetServerSidePropsType } from 'next'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { MdCheck } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { getServerSideProps } from '../../pages/prices/[symbol]'

export function PriceOracleTable (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { price, oracles } = props

  return (
    <div className=''>
      <h2 className='text-2xl font-semibold'>
        Oracles
      </h2>

      <div className='rounded-lg border mt-6 overflow-x-auto'>
        <table className='table-fixed w-full' style={{ minWidth: '1024px' }}>
          <thead>
            <tr className='border-gray-100 bg-gray-50'>
              <th className='py-3 px-6 text-left text-black text-opacity-60 text-sm font-semibold w-1/5'>DATE LAST UPDATED
              </th>
              <th className='py-3 px-6 text-left text-black text-opacity-60 text-sm font-semibold w-1/5'>ORACLE</th>
              <th className='py-3 px-6 text-left text-black text-opacity-60 text-sm font-semibold w-1/5'>PRICE</th>
              <th className='py-3 px-6 text-left text-black text-opacity-60 text-sm font-semibold w-1/5'>AGGREGATED PRICE
              </th>
              <th className='py-3 px-6 text-left text-black text-opacity-60 text-sm font-semibold w-2/5'>TXID</th>
            </tr>
          </thead>

          <tbody>
            {oracles
              .sort((a, b) => ((b.feed?.time ?? 0) - (a.feed?.time ?? 0)))
              .map(item => <OracleFeed oracle={item} price={price} key={item.oracleId} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OracleFeed (props: { oracle: PriceOracle, price: PriceTicker }): JSX.Element {
  const { oracle: { oracleId, feed }, price } = props

  if (feed !== undefined) {
    const aggActive = isActive(price.price.block)
    const feedActive = isActive(feed.block)

    return (
      <tr className='border-t'>
        <td className='py-4 px-6 font-medium text-gray-700'>
          {format(feed.time * 1000, 'MMM dd, hh:mm:ss aa')}
        </td>
        <td className='py-4 px-6'>
          <h6 className='text-xl font-semibold'>
            {oracleId.substring(0, 8).toUpperCase()}
          </h6>
          <div className='flex items-center mt-1'>
            {aggActive && feedActive ? (
              <>
                <MdCheck className='h-4 w-4 mr-1 text-green-500' />
                <div className='text-sm text-gray-700'>
                  Responded
                </div>
              </>
            ) : (
              <>
                <IoAlertCircleOutline className='h-4 w-4 mr-1 text-yellow-600' />
                <div className='text-sm font-semibold text-black opacity-60'>
                  {aggActive ? 'No Response' : 'Inactive'}
                </div>
              </>
            )}
          </div>
        </td>
        <td className='py-4 px-6 font-medium text-gray-700'>
          <NumberFormat
            value={feed.amount}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            prefix='$'
          />
        </td>
        <td className='py-4 px-6 font-medium text-gray-700'>
          <NumberFormat
            value={price.price.aggregated.amount}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            prefix='$'
          />
        </td>
        <td className='py-4 px-6 font-medium text-gray-700 break-all'>
          {feed.txid}
        </td>
      </tr>
    )
  }

  return (
    <tr className='border-t'>
      <td className='py-4 px-6 font-medium text-gray-700'>
        No response yet
      </td>
      <td className='py-4 px-6'>
        <h6 className='text-xl font-semibold'>
          {oracleId.substring(0, 8).toUpperCase()}
        </h6>
        <div className='flex items-center mt-1'>
          <IoAlertCircleOutline className='h-4 w-4 mr-1 text-yellow-600' />
          <div className='text-sm font-semibold text-black opacity-60'>
            No Response
          </div>
        </div>
      </td>
    </tr>
  )
}
