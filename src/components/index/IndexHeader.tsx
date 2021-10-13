import { Container } from '@components/commons/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import ReactNumberFormat from 'react-number-format'
import { PropsWithChildren } from 'react'

export function IndexHeader (): JSX.Element {
  return (
    <div
      className='h-60 flex flex-col items-center'
      style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}
    >
      <Container className='h-full'>
        <div className='h-full flex items-center'>
          <h1 className='text-4xl font-semibold -mt-4' data-testid='Header.title'>
            DeFiChain Blockchain Explorer
          </h1>
        </div>
      </Container>
      <Stats />
    </div>
  )
}

function Stats (): JSX.Element {
  const {
    count: { blocks: blockCount },
    burned: {
      total,
      emission
    },
    blockchain: {
      difficulty
    }
  } = useSelector((state: RootState) => state.stats)
  return (
    <div className='w-full bg-orange-50 py-3'>
      <Container>
        <div className='flex flex-wrap gap-x-8 gap-y-1'>
          <StatItem label='Blocks:' testId='StatItem.blocks'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={blockCount}
              decimalScale={2}
            />
          </StatItem>
          <StatItem label='Total DFI Burned:' testId='StatItem.totalDFIBurned'>
            <UnitSuffix
              value={total}
              units={{
                0: 'K',
                3: 'M',
                6: 'B',
                9: 'T'
              }}
            />
          </StatItem>
          <StatItem label='Difficulty:' testId='StatItem.difficulty'>
            <UnitSuffix
              value={difficulty}
              units={{
                0: 'K',
                3: 'M',
                6: 'B',
                9: 'T'
              }}
            />
          </StatItem>
          <StatItem label='Block Reward:' testId='StatItem.emissionRate'>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={emission}
              decimalScale={2}
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
