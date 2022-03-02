import React from 'react'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'

export function PoolPairDetails (props: { poolpair: PoolPairData }): JSX.Element {
  return (
    <>
      <div className='space-y-1.5'>
        <div className='text-base text-gray-600'>Token Liquidity</div>
        <TokenLiquidityItem tokenId={props.poolpair.tokenA.id} value={props.poolpair.tokenA.reserve} />
        <TokenLiquidityItem tokenId={props.poolpair.tokenB.id} value={props.poolpair.tokenB.reserve} />
      </div>

      <PoolPairDetailsItem title='TVL' value={props.poolpair.totalLiquidity.usd} />
      <PoolPairDetailsItem title='Volume (24H)' value={props.poolpair.volume?.h24} />
      <PoolPairDetailsItem title='Volume (30D)' value={props.poolpair.volume?.d30} />
    </>
  )
}

function PoolPairDetailsItem (props: { title: string, value: string | number | undefined }): JSX.Element {
  return (
    <>
      <div className='text-base text-gray-600 mt-4'>{props.title}</div>
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
