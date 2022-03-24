import { JSX } from '@babel/types'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import NumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/link/AddressLink'
import { PoolSwapData, SwapType } from '@defichain/whale-api-client/dist/api/poolpairs'
import classNames from 'classnames'
import { useAge } from '../../../../hooks/useAge'

export function SwapTable ({ swaps }: { swaps: PoolSwapData[] }): JSX.Element {
  return (
    <div data-testid='SwapTable'>
      <OverflowTable className='mt-4'>
        <OverflowTable.Header>
          <OverflowTable.Head title='Transaction ID' />
          <OverflowTable.Head title='Age' />
          <OverflowTable.Head title='Type' />
          <OverflowTable.Head title='Input Amount' alignRight />
          <OverflowTable.Head title='Output Amount' alignRight />
          <OverflowTable.Head title='From' />
          <OverflowTable.Head title='To' />
        </OverflowTable.Header>
        {swaps.map(swap => (
          <SwapRow
            swap={swap}
            key={swap.txid}
          />
        ))}
      </OverflowTable>
    </div>
  )
}

function SwapRow ({ swap }: { swap: PoolSwapData }): JSX.Element {
  const age = useAge(swap.block.medianTime)
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell className='align-middle'>
        <TxIdLink txid={swap.txid}>
          <TextTruncate text={swap.txid} />
        </TxIdLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {age}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {swap.type === undefined
          ? ('N/A')
          : (
            <span className={classNames('capitalize', swap.type === SwapType.SELL ? 'text-red-500' : 'text-green-500')}>
              {swap.type.toLowerCase()}
            </span>
            )}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle text-right'>
        {
          swap.from === undefined
            ? ('N/A')
            : (
              <NumberFormat
                value={swap.fromAmount}
                fixedDecimalScale
                decimalScale={Number(swap.fromAmount) > 1 ? 3 : 6}
                thousandSeparator=','
                displayType='text'
                suffix={` ${swap.from.symbol}`}
              />
              )
        }
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle text-right'>
        {
          swap.to === undefined
            ? ('N/A')
            : (
              <NumberFormat
                value={swap.to.amount}
                decimalScale={Number(swap.to.amount) > 1 ? 3 : 6}
                fixedDecimalScale
                thousandSeparator=','
                displayType='text'
                suffix={` ${swap.to.symbol}`}
              />
              )
        }
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {
          swap.from === undefined
            ? ('N/A')
            : (
              <AddressLink address={swap.from.address}>
                <TextTruncate text={swap.from.address} />
              </AddressLink>
              )
        }
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {
          swap.to === undefined
            ? ('N/A')
            : (
              <AddressLink address={swap.to.address}>
                <TextTruncate text={swap.to.address} />
              </AddressLink>
              )
        }
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
