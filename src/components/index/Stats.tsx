import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { Container } from '@components/commons/Container'
import { NumberFormat } from '@components/index/NumberFormat'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { PropsWithChildren, ReactNode } from 'react'

export function Stats (props: { blocks: Block[] }): JSX.Element {
  const {
    count: { blocks: blockCount },
    burned: {
      total,
      emission
    }
  } = useSelector((state: RootState) => state.stats)
  return (
    <div className='bg-orange-50 py-3'>
      <Container>
        <div className='flex flex-wrap gap-x-8 gap-y-1'>
          {/* <StatItem label='24h Volume:'> */}
          {/*   - */}
          {/* </StatItem> */}
          <StatItem label='Blocks:' testId='stat-blocks'>
            <NumberFormat
              value={blockCount}
            />
          </StatItem>
          {/* <StatItem label='Burn Rate:'> */}
          {/*   - per block */}
          {/* </StatItem> */}
          <StatItem label='Total DFI Burned:' testId='stat-total-dfi-burned'>
            <UnitSuffix
              value={total as number}
              units={{
                0: 'K',
                3: 'M',
                6: 'B',
                9: 'T'
              }}
            />
          </StatItem>
          {/* <StatItem label='Tokens:'> */}
          {/*   -                        */}
          {/* </StatItem>                */}
          <StatItem label='Difficulty:' testId='stat-difficulty'>
            <UnitSuffix
              value={props.blocks[0].difficulty}
              units={{
                0: 'K',
                3: 'M',
                6: 'B',
                9: 'T'
              }}
            />
          </StatItem>
          <StatItem label='Emission Rate:' testId='stat-emission-rate'>
            <NumberFormat
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
}: PropsWithChildren<{ label: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <div className='flex' data-testid={testId}>
      <div className='text-gray-900'>{label}</div>
      <div className='ml-2 text-orange-600 font-medium'>{children}</div>
    </div>
  )
}
