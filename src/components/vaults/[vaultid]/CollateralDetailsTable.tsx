import { VaultDetailsCollapsibleSection } from '@components/vaults/[vaultid]/VaultDetailsCollapsibleSection'
import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import BigNumber from 'bignumber.js'

export function CollateralDetails ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <>
      <CollateralDetailsMobile collaterals={collaterals} />
      <CollateralDetailsDesktop collaterals={collaterals} />
    </>
  )
}

function CollateralDetailsMobile ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <VaultDetailsCollapsibleSection heading='Collateral Details' className='block md:hidden'>
      <div className='mt-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {collaterals.map((col) => (
          <CollateralCard col={col} key={col.id} />
        ))}
      </div>
    </VaultDetailsCollapsibleSection>
  )
}

function CollateralDetailsDesktop ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <div className='mt-8 hidden md:block' data-testid='CollateralDetailsDesktop'>
      <div className='flex items-center'>
        <h2 data-testid='CollateralDetailsDesktop.Heading' className='text-xl font-semibold'>Collateral Details</h2>
        <InfoHoverPopover className='ml-1' description='Proportion of collaterals deposited in the vault.' />
      </div>
      <div className='mt-4 grid gap-2 justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch'>
        {collaterals.map((col) => (
          <CollateralCard col={col} key={col.id} />
        ))}
      </div>
    </div>
  )
}

function CollateralCard ({ col }: {col: LoanVaultTokenAmount}): JSX.Element {
  const TokenSymbol = getAssetIcon(col.displaySymbol)
  return (
    <div className='w-full p-4 border border-gray-200 rounded' data-testid='CollateralCard'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center'>
          <TokenSymbol className='h-6 w-6 z-10' />
          <span className='ml-2 font-medium'>{col.name}</span>
        </div>
        {/* <span>10%</span> */}
      </div>
      <div className='mt-4'>
        <div className='text-sm text-gray-500'>Collateral Amount</div>
        <div className='text-gray-900'>
          {`${new BigNumber(col.amount).toFixed(8)} ${col.displaySymbol}`}
        </div>
      </div>
    </div>
  )
}
