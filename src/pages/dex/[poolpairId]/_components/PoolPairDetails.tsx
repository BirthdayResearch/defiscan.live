import React from 'react'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import { getAssetIcon } from '@components/icons/assets/tokens'

export function PoolPairDetails (props: { poolpair: PoolPairData }): JSX.Element {
  return (
    <div className='rounded-lg flex h-full mt-4 flex-col p-6 bg-gray-50 w-full border border-gray-200'>
      <h1 className='text-sm font-medium'>Tokens</h1>
      <div className='mt-5 space-y-7'>
        <div className='space-y-2.5'>
          <h3 className='mb-1.5 text-sm text-gray-600'>Price</h3>
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenA.symbol}
            value={props.poolpair.priceRatio.ba}
            displaySymbol={`1 ${props.poolpair.tokenA.displaySymbol}`}
            suffix={props.poolpair.tokenB.displaySymbol}
            prefix='≈'
          />
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenB.symbol}
            value={props.poolpair.priceRatio.ab}
            displaySymbol={`1 ${props.poolpair.tokenB.displaySymbol}`}
            suffix={props.poolpair.tokenA.displaySymbol}
            prefix='≈'
          />
          <Divider />
        </div>
        <div className='space-y-2.5'>
          <TokenLiquidityItem title='Volume 24H' value={props.poolpair.volume?.h24} testId='24hVolume' />
          <TokenLiquidityItem title='Total Liquidity' value={props.poolpair.totalLiquidity.usd} testId='TVL' />
          <Divider />
        </div>
        <div className='space-y-2.5'>
          <div className='mb-1.5 text-sm text-gray-600 flex justify-between'>
            <h3>Pooled Tokens</h3>
            <h3>Amount</h3>
          </div>
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenA.symbol}
            value={props.poolpair.tokenA.reserve}
            displaySymbol={props.poolpair.tokenA.displaySymbol}
          />
          <TokenDetailsItem
            tokenSymbol={props.poolpair.tokenB.symbol}
            value={props.poolpair.tokenB.reserve}
            displaySymbol={props.poolpair.tokenB.displaySymbol}
          />
          <Divider />
        </div>
        <AprDetails apr={props.poolpair.apr} />
      </div>
    </div>
  )
}

function TokenDetailsItem (props: {
  tokenSymbol: string
  value: string
  displaySymbol: string
  prefix?: string
  suffix?: string
}): JSX.Element {
  const TokenIcon = getAssetIcon(props.tokenSymbol)
  return (
    <div className='flex items-center justify-between text-gray-900'>
      <span className='flex items-center'><TokenIcon className='mr-2 w-4 h-4' /> {props.displaySymbol}</span>
      <NumberFormat
        value={props.value}
        displayType='text'
        thousandSeparator
        suffix={props.suffix !== undefined ? ` ${props.suffix}` : undefined}
        prefix={props.prefix ?? undefined}
        className='font-medium'
        decimalScale={Number(props.value) > 1 ? 2 : 8}
        fixedDecimalScale
      />
    </div>
  )
}

function TokenLiquidityItem (props: { title: string, value: string | number | undefined, testId: string }): JSX.Element {
  return (
    <div className='flex items-center justify-between' data-testid={props.testId}>
      <span className='text-sm text-gray-500'>{props.title}</span>
      <NumberFormat
        value={props.value}
        prefix='$'
        thousandSeparator
        displayType='text'
        decimalScale={2}
        fixedDecimalScale
        className='font-medium text-gray-900'
      />
    </div>
  )
}

function AprDetails (props: {
  apr?: {
    total: number
    reward: number
    commission: number
  }}): JSX.Element {
  if (props.apr === undefined) {
    return <></>
  }
  return (
    <div className='space-y-2.5'>
      <div className='mb-1.5 flex items-center'>
        <h3 className='text-sm text-gray-600'>APR</h3>
        <NumberFormat
          value={props.apr.total * 100}
          displayType='text'
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
          className='text-gray-900 font-medium ml-auto'
        />
      </div>
      <div className='flex items-center justify-between text-sm text-gray-500' data-testid='Rewards'>
        <span>Rewards</span>
        <NumberFormat
          value={props.apr.reward}
          prefix='$'
          thousandSeparator
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
        />
      </div>
      <div className='flex items-center justify-between text-sm text-gray-500' data-testid='Rewards'>
        <span>Commissions</span>
        <NumberFormat
          value={props.apr.commission}
          prefix='$'
          thousandSeparator
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
        />
      </div>
    </div>
  )
}

function Divider (): JSX.Element {
  return (
    <div className='border-b  border-gray-200 mt-8' />
  )
}
