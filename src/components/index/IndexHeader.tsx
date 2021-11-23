import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import ReactNumberFormat from 'react-number-format'
import React from 'react'
import { StatItem } from '@components/commons/stats/StatItem'
import { StatsBar } from '@components/commons/stats/StatsBar'
import { SearchBar } from '@components/commons/SearchBar'

export function IndexHeader (): JSX.Element {
  return (
    <>
      <Stats />
      <div
        className='flex flex-col items-center'
        style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}
      >
        <Container className='h-full'>
          <div className='h-full flex flex-wrap items-center justify-center mt-14 mb-16'>
            <h1 className='text-3xl lg:text-4xl w-full mb-6 font-semibold text-center' data-testid='Header.title'>
              DeFiChain Blockchain Explorer
            </h1>
            <SearchBar atHeader={false} />
          </div>
        </Container>
      </div>
    </>
  )
}

function Stats (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <StatsBar>
      <StatItem label='Price' testId='StatItem.priceUsdt'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.price.usdt}
          decimalScale={2}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
      <StatItem label='Total Value Locked (TVL)' testId='StatItem.tvlTotal'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.tvl.total}
          decimalScale={0}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
      <StatItem label='Total DFI Burned' testId='StatItem.totalDFIBurned'>
        <UnitSuffix
          value={stats.burned.total}
          units={{
            3: 'K',
            6: 'M',
            9: 'G',
            12: 'T'
          }}
        />
        <span className='ml-1'>DFI</span>
      </StatItem>
      <StatItem label='Block Reward' testId='StatItem.blockReward'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.emission.total}
          decimalScale={2}
        />
        <span className='ml-1'>DFI</span>
      </StatItem>
      <StatItem label='Difficulty' testId='StatItem.difficulty'>
        <UnitSuffix
          value={stats.blockchain.difficulty}
          units={{
            3: 'K',
            6: 'M',
            9: 'G',
            12: 'T'
          }}
        />
      </StatItem>
    </StatsBar>
  )
}
