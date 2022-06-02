import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import ReactNumberFormat from 'react-number-format'
import React, { PropsWithChildren } from 'react'
import { StatItem } from '@components/commons/stats/StatItem'
import { StatsBar } from '@components/commons/stats/StatsBar'
import { SearchBar } from '@components/commons/searchbar/SearchBar'
import { useTheme } from '@contexts/ThemeContext'

export function IndexHeader (): JSX.Element {
  const { theme } = useTheme()
  return (
    <>
      <Stats />
      <HeaderWrapper bgImage={theme === 'dark' ? 'url(\'/assets/hero/fortcanningDark.svg\')' : 'linear-gradient(180deg, rgba(255, 255, 255, 0) 25.4%, #FFFFFF 94.76%), url(\'/assets/hero/fortcanning.svg\')'}>
        <Container className='h-full'>
          <div className='h-full flex flex-wrap items-center justify-center mt-14 mb-16'>
            <h1 className='text-4xl lg:text-5xl w-full mb-6 font-medium dark:text-grayDark-900 text-center' data-testid='Header.title'>
              DeFiChain <span className='font-normal dark:text-gray-100'>Explorer</span>
            </h1>
            <SearchBar atHeader={false} />
          </div>
        </Container>
      </HeaderWrapper>
    </>
  )
}

function HeaderWrapper (props: PropsWithChildren<{bgImage: string}>): JSX.Element {
  return (
    <div
      className='flex flex-col items-center pb-24 -mb-24'
      style={{ backgroundImage: props.bgImage, backgroundSize: 'cover', backgroundPosition: 'right center' }}
    >
      {props.children}
    </div>
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
          value={stats.price.usd}
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
