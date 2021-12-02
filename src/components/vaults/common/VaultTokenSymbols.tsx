import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import classNames from 'classnames'

interface VaultTokenSymbolsProps {
  tokens: LoanVaultTokenAmount[]
  className?: string
  spacing?: string
}

export function VaultTokenSymbols (props: VaultTokenSymbolsProps): JSX.Element {
  const remainingTokens = props.tokens.length - 3

  return (
    <div className={classNames('flex items-center space-x-5', props.className)}>
      <div className={classNames('flex', props.spacing)}>
        {props.tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 3) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6 -ml-2' key={loan.id} />
            }
            return <TokenIcon className='h-6 w-6' key={loan.id} />
          }
          return null
        })}
      </div>

      {remainingTokens > 0 && (
        <span className='text-xs text-gray-500'>{`+${remainingTokens}`}</span>
      )}
    </div>
  )
}
