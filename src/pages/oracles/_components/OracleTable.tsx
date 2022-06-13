import { JSX } from '@babel/types'
import { isActive } from './OracleFeed'
import { PriceOracle, PriceTicker } from '@defichain/whale-api-client/dist/api/prices'
import { format } from 'date-fns'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { MdCheck } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TxIdLink } from '@components/commons/link/TxIdLink'

interface PriceOracleTableProps {
  price: PriceTicker
  oracles: PriceOracle[]
}

export function OracleTable ({
  price,
  oracles
}: PriceOracleTableProps): JSX.Element {
  return (
    <div data-testid='OracleTable'>
      <h2 className='text-2xl font-semibold dark:text-dark-gray-900'>
        Oracles
      </h2>

      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head title='DATE LAST UPDATED' />
          <OverflowTable.Head title='ORACLE' />
          <OverflowTable.Head title='PRICE' />
          <OverflowTable.Head title='AGGREGATED PRICE' />
          <OverflowTable.Head title='TXID' />
        </OverflowTable.Header>
        {oracles
          .sort((a, b) => ((b.feed?.time ?? 0) - (a.feed?.time ?? 0)))
          .map(item => <OracleFeed oracle={item} price={price} key={item.oracleId} />)}
      </OverflowTable>
    </div>
  )
}

function OracleFeed (props: { oracle: PriceOracle, price: PriceTicker }): JSX.Element {
  const {
    oracle: {
      oracleId,
      feed
    },
    price
  } = props

  if (feed !== undefined) {
    const aggActive = isActive(price.price.block)
    const feedActive = isActive(feed.block)

    return (
      <OverflowTable.Row className='dark:text-gray-100'>
        <OverflowTable.Cell sticky className='align-middle'>
          {format(feed.time * 1000, 'MMM dd, hh:mm:ss aa')}
        </OverflowTable.Cell>
        <OverflowTable.Cell className='align-middle'>
          <h6 className='text-xl font-semibold'>
            {oracleId.substring(0, 8).toUpperCase()}
          </h6>
          <div className='flex items-center mt-1'>
            {aggActive && feedActive ? (
              <>
                <MdCheck className='h-4 w-4 mr-1 text-green-500' />
                <div className='text-sm text-gray-700 dark:text-gray-400'>
                  Responded
                </div>
              </>
            ) : (
              <>
                <IoAlertCircleOutline className='h-4 w-4 mr-1 text-gray-500' />
                <div className='text-sm font-semibold text-gray-500'>
                  {aggActive ? 'No Response' : 'Inactive'}
                </div>
              </>
            )}
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell className='align-middle'>
          <NumberFormat
            value={feed.amount}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            prefix='$'
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell className='align-middle'>
          <NumberFormat
            value={price.price.aggregated.amount}
            displayType='text'
            thousandSeparator
            decimalScale={2}
            prefix='$'
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell className='align-middle md:w-1/3 md:break-all'>
          <TxIdLink txid={feed.txid} />
        </OverflowTable.Cell>
      </OverflowTable.Row>
    )
  }
  return (
    <></>
  )
}
