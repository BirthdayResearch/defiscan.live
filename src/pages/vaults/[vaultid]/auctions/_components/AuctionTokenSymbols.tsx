import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import classnames from 'classnames'

interface AuctionTokenSymbolsProps {
  tokens?: LoanVaultTokenAmount[]
  className?: string
  testId?: string
}

export function AuctionTokenSymbols (props: AuctionTokenSymbolsProps): JSX.Element {
  if (props.tokens === undefined) {
    return <span>N/A</span>
  }

  return (
    <div className={classnames('flex items-center', props.className)} data-testid={props.testId}>
      {props.tokens.map(loan => {
        const TokenIcon = getAssetIcon(loan.symbol)
        return <TokenIcon className='h-6 w-6' key={loan.id} />
      })}
    </div>
  )
}
