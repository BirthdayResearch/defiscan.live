import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import classNames from 'classnames'

interface VaultTokenSymbolsProps {
  tokens?: LoanVaultTokenAmount[]
  className?: string
}

export function VaultTokenSymbols (props: VaultTokenSymbolsProps): JSX.Element {
  if (props.tokens === undefined) {
    return <span>N/A</span>
  }

  const remainingTokens = props.tokens.length - 4
  const tokens = props.tokens.filter((token, index) => {
    return index === props.tokens.findIndex(t => t.symbol === token.symbol)
  })

  return (
    <div className={classNames('flex items-center', props.className)}>
      {
        props.tokens.length === 0 && (<span>N/A</span>)
      }

      <div className='flex space-x-1 items-center'>
        {tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 4) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6' key={loan.id} />
            }
            return <TokenIcon className='h-6 w-6' key={loan.id} />
          }
          return null
        })}
        {remainingTokens > 0 && (
          <span className='text-xs text-gray-500 font-medium inline-block align-middle'>{`+${remainingTokens}`}</span>
        )}
      </div>
    </div>
  )
}
