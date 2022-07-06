import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import Image, { StaticImageData } from 'next/image'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import ReactNumberFormat from 'react-number-format'
import React, { PropsWithChildren } from 'react'
import { StatItem } from '@components/commons/stats/StatItem'
import { StatsBar } from '@components/commons/stats/StatsBar'
import { SearchBar } from '@components/commons/searchbar/SearchBar'
import { useTheme } from '@contexts/ThemeContext'
import FortCanningDark from '@public/assets/hero/fortcanningDark.svg'
import FortCanning from '@public/assets/hero/fortcanning.svg'

export function IndexHeader (): JSX.Element {
  const { theme } = useTheme()
  return (
    <>
      <Stats />
      <HeaderWrapper
        title='header-image'
        gradient={theme === 'dark' ? 'linear-gradient(rgba(23, 23, 23, 0) 25.4%, rgb(23, 23, 23) 94.76%)' : 'linear-gradient(rgba(255, 255, 255, 0) 25.4%, rgb(255, 255, 255) 94.76%)'}
        bgImage={theme === 'dark' ? FortCanningDark : FortCanning}
      >
        <Container className='h-full'>
          <div className='h-full flex flex-wrap items-center justify-center pt-14 pb-16'>
            <h1
              className='text-4xl lg:text-5xl w-full mb-6 font-medium dark:text-dark-gray-900 text-center'
              data-testid='Header.title'
            >
              DeFiChain <span className='font-normal dark:text-gray-100'>Explorer</span>
            </h1>
            <SearchBar atHeader={false} />
          </div>
        </Container>
      </HeaderWrapper>
    </>
  )
}

function HeaderWrapper (props: PropsWithChildren<{ bgImage: StaticImageData, title: string, gradient: string }>): JSX.Element {
  return (
    <div className='relative pb-24 -mb-24'>
      <Image
        layout='fill'
        alt={props.title}
        src={props.bgImage}
        objectFit='cover'
        objectPosition='center'
        className='pointer-events-none'
      />
      <div
        className='absolute h-full w-full'
        style={{
          background: props.gradient
        }}
      />
      <div className='relative z-1'>
        {props.children}
      </div>
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
          value={stats?.price?.usd}
          decimalScale={2}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
      <StatItem label='Total DFI Burned' testId='StatItem.totalDFIBurned'>
        <UnitSuffix
          value={stats?.burned?.total}
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
          value={stats?.emission?.total}
          decimalScale={2}
        />
        <span className='ml-1'>DFI</span>
      </StatItem>
      <StatItem label='Difficulty' testId='StatItem.difficulty'>
        <UnitSuffix
          value={stats?.blockchain?.difficulty}
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
