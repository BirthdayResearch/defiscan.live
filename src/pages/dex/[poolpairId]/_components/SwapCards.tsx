import { useEffect, useState } from 'react'
import { CardList } from '@components/commons/CardList'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import { TxIdLink } from '@components/commons/link/TxIdLink'
import { AddressLink } from '@components/commons/link/AddressLink'
import NumberFormat from 'react-number-format'
import { PoolSwapData, SwapType } from '@defichain/whale-api-client/dist/api/poolpairs'
import classNames from 'classnames'

export function SwapCards ({ swaps }: { swaps: PoolSwapData[]}): JSX.Element {
  return (
    <CardList>
      {swaps.map(swap => (
        <SwapCard
          swap={swap}
          key={swap.txid}
        />
      ))}
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
        <TxIdLink txid={swap.txid} testId='CardList.Header.TxId'>
          <TextTruncate text={swap.txid} className='w-44' />
        </TxIdLink>
      </CardList.Header>
      <div className='mt-4' data-testid='CardList.Header.Type'>
        {swap.type === undefined
          ? ('N/A')
          : (
            <span className={classNames(swap.type === SwapType.SELL ? 'text-red-500' : 'text-green-500')}>
              {swap.type}
            </span>
            )}
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
          title='Input Amount'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.InputAmount'
        >
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
        </CardList.ListItem>
        <CardList.ListItem
          title='Output Amount'
          titleClassNames='text-sm'
          testId='SwapCard.CardList.OutputAmount'
        >
          {
            swap.to === undefined
              ? ('N/A')
              : (
                <NumberFormat
                  value={swap.fromAmount}
                  fixedDecimalScale
                  decimalScale={Number(swap.to.amount) > 1 ? 3 : 6}
                  thousandSeparator=','
                  displayType='text'
                  suffix={` ${swap.to.symbol}`}
                />
                )
          }
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
      </CardList.List>
    </CardList.Card>
  )
}
