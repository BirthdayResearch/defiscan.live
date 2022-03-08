import React from 'react'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import NumberFormat from 'react-number-format'
import { APRInfo } from '../../_components/APRInfo'
import { MoreHoverPopover } from '@components/commons/popover/MoreHoverPopover'

export function PoolPairDetails (props: { poolpair: PoolPairData }): JSX.Element {
  return (
    <div className='flex flex-wrap'>
      <div className='w-1/2 md:w-1/3 space-y-5'>
        <APRDetails apr={props.poolpair.apr} />
        <PoolPairDetailsItem title='TVL' value={props.poolpair.totalLiquidity.usd} testId='TVL' />
        <PoolPairDetailsItem title='Volume (24H)' value={props.poolpair.volume?.h24} testId='24hVol' />
      </div>
      <div className='w-1/2 md:w-1/3'>
        <div className='space-y-1.5 pb-1' data-testid='TokensLocked'>
          <div className='text-sm font-semibold text-black opacity-60' data-testid='TokensLocked.Title'>Tokens Locked
          </div>
          <TokenLiquidityItem tokenId={props.poolpair.tokenA.id} value={props.poolpair.tokenA.reserve} testId='TokenA' />
          <TokenLiquidityItem tokenId={props.poolpair.tokenB.id} value={props.poolpair.tokenB.reserve} testId='TokenB' />
        </div>
      </div>
    </div>
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
    <div data-testid='APRDetails'>
      <div className='text-sm font-semibold text-black opacity-60' data-testid='APRDetails.Title'>APR</div>
      <div className='text-2xl font-medium text-gray-900 flex items-center'>
        <NumberFormat
          value={props.apr.total * 100}
          displayType='text'
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          suffix='%'
          data-testid='APRDetails.Value'
        />
        <MoreHoverPopover className='ml-1' description={<APRInfo {...props.apr} />} />
      </div>
    </div>
  )
}

function PoolPairDetailsItem (props: { title: string, value: string | number | undefined, testId: string }): JSX.Element {
  return (
    <div data-testid={props.testId}>
      <div className='text-sm font-semibold text-black opacity-60' data-testid='Title'>{props.title}</div>
      {
        props.value === undefined ? ('...')
          : (
            <div className='text-2xl font-medium text-gray-900' data-testid='Value'>$
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
    </div>
  )
}

function TokenLiquidityItem (props: { tokenId: string, value: string | number | undefined, testId: string }): JSX.Element {
  return (
    <>
      <div className='flex items-center' data-testid={props.testId}>
        <div className='w-3/5'>
          <TokenSymbol tokenId={Number(props.tokenId)} symbolLeft testId='Token.Symbol' />
        </div>
        <div className='w-2/5 font-medium' data-testid='Token.Value'>
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
