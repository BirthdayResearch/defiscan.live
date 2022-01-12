import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import classNames from 'classnames'

interface VaultTokenSymbolsProps {
  tokens?: LoanVaultTokenAmount[]
  className?: string
  testId?: string
}

export function VaultTokenSymbols (props: VaultTokenSymbolsProps): JSX.Element {
  if (props.tokens === undefined) {
    return <span>N/A</span>
  }

  const remainingTokens = props.tokens.length - 3
  const tokens = props.tokens.filter((token, index) => {
    if (props.tokens === undefined) {
      return false
    }

    return index === props.tokens.findIndex(t => t.symbol === token.symbol)
  })

  return (
    <div className={classNames('flex items-center', props.className)}>
      {props.tokens.length === 0 && (<span>N/A</span>)}

      <div className='flex space-x-1 items-center' data-testid={props.testId}>
        {tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 3) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6' key={loan.id} />
            }
            return <TokenIcon className='h-6 w-6' key={loan.id} />
          }
          return null
        })}
        {remainingTokens > 0 && (
          <RemainingTokensIcon tokensCount={remainingTokens} />
        )}
      </div>
    </div>
  )
}

function RemainingTokensIcon ({ tokensCount }: {tokensCount: number}): JSX.Element {
  return (
    <svg width='1em' height='1em' className='h-6 w-6' viewBox='0 0 32 32'>
      <circle cx={16} cy={16} r={16} fill='#d3d4d4' />
      <text
        fontSize='15'
        fontWeight='bold'
        fill='#2b2b2b'
      >
        <tspan x='50%' y='50%' dominantBaseline='middle' textAnchor='middle'>
          +{tokensCount}
        </tspan>
      </text>
    </svg>
  )
}
