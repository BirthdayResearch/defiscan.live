import { JSX } from '@babel/types'
import { OverflowTable } from '@components/commons/OverflowTable'
import React, { useEffect, useState } from 'react'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import NumberFormat from 'react-number-format'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { AddressLink } from '@components/commons/link/AddressLink'
import { PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'

interface SwapTableProps {
  swaps: PoolSwapData[]
}

export function SwapTable ({ swaps }: SwapTableProps): JSX.Element {
  return (
    <div data-testid='SwapTable'>
      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head title='Tx ID' />
          <OverflowTable.Head title='Age' />
          <OverflowTable.Head title='From' />
          <OverflowTable.Head title='To' />
          <OverflowTable.Head title='Amount' alignRight />
        </OverflowTable.Header>

        {swaps.map(swap => (
          <SwapRow swap={swap} key={swap.txid} />
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
      <OverflowTable.Cell className='align-middle'>
        {
          swap.from === undefined
            ? ('N/A')
            : (
              <AddressLink address={swap.from.address}>
                <TextTruncate text={swap.from.address} className='w-44' />
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
                <TextTruncate text={swap.to.address} className='w-44' />
              </AddressLink>
              )
        }
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
        <div className='flex items-center justify-end'>
          <NumberFormat
            value={swap.fromAmount}
            fixedDecimalScale
            thousandSeparator=','
            displayType='text'
          />
          <TokenSymbol tokenId={swap.fromTokenId} className='ml-1' />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
