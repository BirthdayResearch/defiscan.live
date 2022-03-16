import React, { useEffect, useState } from 'react'
import { CardList } from '@components/commons/CardList'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { AddressLink } from '@components/commons/link/AddressLink'
import NumberFormat from 'react-number-format'
import { PoolSwapData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { getAssetIcon } from '@components/icons/assets/tokens'
import { MdOutlineArrowRightAlt } from 'react-icons/md'

export function SwapCards ({ swaps }: { swaps: PoolSwapData[] }): JSX.Element {
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

export function SwapCard ({ swap }: { swap: PoolSwapData }): JSX.Element {
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
      <CardList.Header>
        <SwapTokens from={swap.from?.symbol} to={swap.to?.symbol} />
      </CardList.Header>
      <div className='flex items-center w-full justify-between mt-4' data-testid='CardList.Header.Amount'>
        <span className='title'>Amount</span>
        <NumberFormat
          value={swap.fromAmount}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
          suffix={` ${swap.from!.symbol}`}
        />
      </div>
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
            swap.from === undefined
              ? ('N/A')
              : (
                <AddressLink address={swap.from.address}>
                  <TextTruncate text={swap.from.address} className='w-44' />
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
            swap.to === undefined
              ? ('N/A')
              : (
                <AddressLink address={swap.to.address}>
                  <TextTruncate text={swap.to.address} className='w-44' />
                </AddressLink>
                )
          }
        </CardList.ListItem>

        <CardList.ListItem
          title='Transaction ID'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.TxId'
        >
          <TxIdLink txid={swap.txid}>
            <TextTruncate text={swap.txid} className='w-44' />
          </TxIdLink>
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  )
}

function SwapTokens ({ from, to }: {from: string | undefined, to: string | undefined}): JSX.Element {
  if (from === undefined || to === undefined) {
    return (
      <></>
    )
  }
  const ToTokenIcon = getAssetIcon(to)
  const FromTokenIcon = getAssetIcon(from)

  return (
    <div className='flex items-center' data-testid='CardList.Header.SwapTokens'>
      <FromTokenIcon className='w-6 h-6' />
      <MdOutlineArrowRightAlt className='text-gray-400 mx-1' />
      <ToTokenIcon className='w-6 h-6' />
    </div>
  )
}
