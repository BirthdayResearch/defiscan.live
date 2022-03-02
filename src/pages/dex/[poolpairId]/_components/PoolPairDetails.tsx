import React from 'react'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import { APRInfo } from '../../_components/APRInfo'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'

export function PoolPairDetails (props: { poolpair: PoolPairData }): JSX.Element {
  return (
    <>
      <APRDetails apr={props.poolpair.apr} />

      <div className='space-y-1.5 pb-1 mt-5'>
        <div className='text-sm font-semibold text-black opacity-60'>Tokens Locked</div>
        <TokenLiquidityItem tokenId={props.poolpair.tokenA.id} value={props.poolpair.tokenA.reserve} />
        <TokenLiquidityItem tokenId={props.poolpair.tokenB.id} value={props.poolpair.tokenB.reserve} />
      </div>

      <div className='border-b my-6 border-gray-100' />

      <PoolPairDetailsItem title='TVL' value={props.poolpair.totalLiquidity.usd} />
      <PoolPairDetailsItem title='Volume (24H)' value={props.poolpair.volume?.h24} />
      <PoolPairDetailsItem title='Volume (30D)' value={props.poolpair.volume?.d30} />
    </>
  )
}

function APRDetails (props: {
  apr?: {
    total: number
    reward: number
    commission: number
  }
}): JSX.Element {
  if (props.apr === undefined) {
    return <></>
  }

  return (
    <>
      <div className='text-sm font-semibold text-black opacity-60'>APR</div>
      <div className='text-2xl font-medium text-gray-900 flex items-center'>
        <NumberFormat
          value={props.apr.total * 100}
          displayType='text'
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
        />
        <MoreHoverPopover className='ml-1' description={<APRInfo {...props.apr} />} />
      </div>
    </>
  )
}

function PoolPairDetailsItem (props: { title: string, value: string | number | undefined }): JSX.Element {
  return (
    <>
      <div className='text-sm font-semibold text-black opacity-60 mt-5'>{props.title}</div>
      {
        props.value === undefined ? ('...')
          : (
            <div className='text-2xl font-medium text-gray-900'>$
              <UnitSuffix
                value={Number(props.value)}
                units={{
                  3: 'k',
                  6: 'm',
                  9: 'b'
                }}
                noSuffixSpacing
              />
            </div>
            )
      }
    </>
  )
}

function TokenLiquidityItem (props: { tokenId: string, value: string | number | undefined }): JSX.Element {
  return (
    <>
      <div className='w-full flex items-center'>
        <div className='w-1/2'>
          <TokenSymbol tokenId={Number(props.tokenId)} symbolLeft />
        </div>
        <div className='w-1/2 font-medium'>
          <UnitSuffix
            value={Number(props.value)}
            units={{
              3: 'k',
              6: 'm',
              9: 'b'
            }}
            noSuffixSpacing
          />
        </div>
      </div>
    </>
  )
}
