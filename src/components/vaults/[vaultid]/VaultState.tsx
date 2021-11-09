import { LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'

export function VaultState ({ state }: {state: LoanVaultState}): JSX.Element {
  switch (state) {
    case LoanVaultState.ACTIVE:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-secondary-300'>ACTIVE</span>
    case LoanVaultState.IN_LIQUIDATION:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-gray-600'>LIQUIDATED</span>
    default:
      return <div />
  }
}
