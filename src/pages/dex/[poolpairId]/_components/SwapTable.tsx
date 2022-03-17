import { JSX } from '@babel/types'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useEffect, useState } from 'react'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import NumberFormat from 'react-number-format'
import { AddressLink } from '@components/commons/link/AddressLink'
import { PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'

interface SwapTableProps {
  swaps: PoolSwapData[]
  selectedType: string
}

export function SwapTable ({ swaps, selectedType }: SwapTableProps): JSX.Element {
  return (
    <div data-testid='SwapTable'>
      <OverflowTable className='mt-4'>
        <OverflowTable.Header>
          <OverflowTable.Head title='Tx ID' />
          <OverflowTable.Head title='Age' />
          <OverflowTable.Head title='Amount' alignRight />
          <OverflowTable.Head title='From' alignRight />
          <OverflowTable.Head title='To' alignRight />
        </OverflowTable.Header>
        {(() => {
          const filtered = swaps.filter(swap => selectedType === 'All' || (selectedType.split('to')[0].includes(swap.from!.symbol)))
          return filtered.length === 0 ? <div className='flex w-full my-10 justify-center text-gray-400'>No Swaps matched {`${selectedType}`} found </div>
            : (
                filtered.map(swap => <SwapRow swap={swap} key={swap.txid} />)
              )
        })()}
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
        <NumberFormat
          value={swap.fromAmount}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
          suffix={` ${swap.from!.symbol}`}
        />
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
