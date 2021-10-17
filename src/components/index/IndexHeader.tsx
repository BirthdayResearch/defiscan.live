import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import ReactNumberFormat from 'react-number-format'
import { PropsWithChildren } from 'react'

export function IndexHeader (): JSX.Element {
  return (
    <div
      className='flex flex-col items-center'
      style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}
    >
      <Container className='h-full'>
        <div className='h-full flex items-center'>
          <h1 className='text-3xl lg:text-4xl font-semibold py-12 md:py-16' data-testid='Header.title'>
            DeFiChain Blockchain Explorer
          </h1>
        </div>
      </Container>
      <Stats />
    </div>
  )
}

function Stats (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <div className='w-full bg-orange-50 py-3'>
      <Container>
        <div className='flex flex-wrap gap-x-8 gap-y-1'>
          <StatItem label='Price:' testId='StatItem.priceUsdt'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.price.usdt}
              decimalScale={2}
              prefix='$'
              suffix=' USD'
            />
          </StatItem>
          <StatItem label='Total Value Locked (TVL):' testId='StatItem.tvlTotal'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.tvl.total}
              decimalScale={0}
              prefix='$'
              suffix=' USD'
            />
          </StatItem>
          <StatItem label='Blocks:' testId='StatItem.blocks'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.count.blocks}
              decimalScale={2}
            />
          </StatItem>
          <StatItem label='Difficulty:' testId='StatItem.difficulty'>
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
          <StatItem label='Block Reward:' testId='StatItem.blockReward'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.emission.total}
              decimalScale={2}
            />
          </StatItem>
          <StatItem label='Total DFI Burned:' testId='StatItem.totalDFIBurned'>
            <UnitSuffix
              value={stats.burned.total}
              units={{
                3: 'K',
                6: 'M',
                9: 'G',
                12: 'T'
              }}
            />
          </StatItem>
        </div>
      </Container>
    </div>
  )
}

function StatItem ({
  label,
  children,
  testId
}: PropsWithChildren<{ label: string, testId?: string }>): JSX.Element {
  return (
    <div className='flex' data-testid={testId}>
      <div className='text-gray-900'>{label}</div>
      <div className='ml-2 text-orange-600 font-medium'>{children}</div>
    </div>
  )
}
