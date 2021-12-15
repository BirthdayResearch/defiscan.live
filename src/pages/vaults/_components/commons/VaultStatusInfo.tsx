export function VaultStatusInfo (): JSX.Element {
  return (
    <div
      className='p-3 space-y-2 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      <div>
        <span className='font-medium'>Empty</span>: When a vault has been created but no collateral has been deposited
        yet.
      </div>
      <div>
        <span className='font-medium'>Ready</span>: When collateral has been deposited into the vault, but no loan has
        been taken yet.
      </div>
      <div>
        <span className='font-medium'>Active</span>: When a vault's collateralization ratio is above its minimum
        requirement.
      </div>
      <div>
        <span className='font-medium'>In Liquidation</span>: When a vault’s collateralization ratio falls below the
        minimum requirement
      </div>
      <div>
        <span className='font-medium'>Halted</span>: When any token in the vault (collateral or loan tokens) has
        fluctuated more than 30% in the past hour
      </div>
    </div>
  )
}
