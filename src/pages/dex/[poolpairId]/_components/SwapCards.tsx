import React, { useEffect, useState } from 'react'
import { CardList } from '@components/commons/CardList'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import { PoolSwapWithAddresses } from '../index.page'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { AddressLink } from '@components/commons/link/AddressLink'
import NumberFormat from 'react-number-format'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'

export function SwapCards ({ swaps }: { swaps: PoolSwapWithAddresses[] }): JSX.Element {
  return (
    <CardList>
      {swaps.map(swap => {
        return (
          <SwapCard
            swap={swap}
            key={swap.txid}
          />
        )
      })}
    </CardList>
  )
}

export function SwapCard ({ swap }: { swap: PoolSwapWithAddresses }): JSX.Element {
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
    <CardList.Card testId='SwapCard'>
      <CardList.Header path={`/transactions/${swap.txid}`}>
        <div>
          <span className='text-sm'>Tx ID</span>
          <TxIdLink txid={swap.txid}>
            <TextTruncate text={swap.txid} className='w-44' />
          </TxIdLink>
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title='Age'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.Age'
        >
          {age}
        </CardList.ListItem>

        <CardList.ListItem
          title='From'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.From'
        >
          {
            swap.addresses.from === undefined
              ? ('N/A')
              : (
                <AddressLink address={swap.addresses.from}>
                  <TextTruncate text={swap.addresses.from} className='w-44' />
                </AddressLink>
                )
          }
        </CardList.ListItem>

        <CardList.ListItem
          title='To'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.To'
        >
          {
            swap.addresses.to === undefined
              ? ('N/A')
              : (
                <AddressLink address={swap.addresses.to}>
                  <TextTruncate text={swap.addresses.to} className='w-44' />
                </AddressLink>
                )
          }
        </CardList.ListItem>

        <CardList.ListItem
          title='Amount'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.Amount'
        >
          <div className='flex items-center justify-end'>
            <NumberFormat
              value={swap.fromAmount}
              fixedDecimalScale
              thousandSeparator=','
              displayType='text'
            />
            <TokenSymbol tokenId={swap.fromTokenId} className='ml-1' />
          </div>
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  )
}
