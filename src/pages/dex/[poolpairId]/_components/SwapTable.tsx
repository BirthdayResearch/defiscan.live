import { JSX } from '@babel/types'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useEffect, useState } from 'react'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import NumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/link/AddressLink'
import { PoolSwapData, SwapType } from '@defichain/whale-api-client/dist/api/poolpairs'
import classNames from 'classnames'

export function SwapTable ({ swaps }: {swaps: PoolSwapData[]}): JSX.Element {
  return (
    <div data-testid='SwapTable'>
      <OverflowTable className='mt-4'>
        <OverflowTable.Header>
          <OverflowTable.Head title='Tx ID' />
          <OverflowTable.Head title='Age' />
          <OverflowTable.Head title='Type' />
          <OverflowTable.Head title='Input Amount' />
          <OverflowTable.Head title='Output Amount' />
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
  const [age, setAge] = useState(`${formatDistanceToNow(swap.block.medianTime * 1000)} ago`)
  useEffect(() => {
    setAge(`${formatDistanceToNow(swap.block.medianTime * 1000)} ago`)

    const interval = setInterval(() => {
      setAge(`${formatDistanceToNow(swap.block.medianTime * 1000)} ago`)
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [swap.block.medianTime])

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell className='align-middle'>
        <TxIdLink txid={swap.txid}>
          <TextTruncate text={swap.txid} className='w-44' />
        </TxIdLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        {age}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {swap.type === undefined
          ? ('N/A')
          : (
            <span className={classNames(swap.type === SwapType.SELL ? 'text-red-500' : 'text-green-500')}>
              {swap.type}
            </span>
            )}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
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
      <OverflowTable.Cell>
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
