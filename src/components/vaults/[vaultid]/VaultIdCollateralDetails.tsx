import { VaultCollapsibleSection } from '@components/vaults/common/VaultCollapsibleSection'
import { LoanVaultState, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import BigNumber from 'bignumber.js'
import React from 'react'
import classNames from 'classnames'

export function VaultIdCollateralDetails (props: { vaultState: LoanVaultState, collaterals: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <>
      <div className='mt-10 hidden md:block' data-testid='CollateralDetailsDesktop'>
        <div className='flex items-center'>
          <h2 data-testid='CollateralDetailsDesktop.Heading' className='text-xl font-semibold'>Collateral Details</h2>
          <InfoHoverPopover className='ml-1' description='Proportion of collaterals deposited in the vault.' />
        </div>

        {props.collaterals.length === 0
          ? (
            <div className='text-gray-400 flex w-full justify-center p-12'>
              There are no collaterals in the vault at this time
            </div>
            ) : (
              <div
                className='mt-3 grid gap-2 justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch'
                data-testid='CollateralDetailsDesktop.Cards'
              >
                {props.collaterals.map((col) => (
                  <CollateralCard vaultState={props.vaultState} col={col} key={col.id} />
                ))}
              </div>
            )}
      </div>

      <VaultCollapsibleSection heading='Collateral Details' className='block md:hidden' testId='VaultCollapsibleSection.CollateralDetails'>
        {props.collaterals.length === 0
          ? (
            <div className='text-gray-400 flex w-full justify-center p-8'>
              There are no collaterals in the vault at this time
            </div>
            ) : (
              <div
                className='mt-4 mb-8 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                data-testid='CollateralDetailsMobile.Cards'
              >
                {props.collaterals.map((col) => (
                  <CollateralCard vaultState={props.vaultState} col={col} key={col.id} />
                ))}
              </div>
            )}
      </VaultCollapsibleSection>
    </>
  )
}

function CollateralCard (props: { vaultState: LoanVaultState, col: LoanVaultTokenAmount }): JSX.Element {
  const TokenSymbol = getAssetIcon(props.col.displaySymbol)
  return (
    <div className='w-full p-4 border border-gray-200 rounded' data-testid='CollateralCard'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center' data-testid='CollateralCard.AssetIcon'>
          <TokenSymbol className='h-6 w-6 z-10' />
          <span
            className='ml-1.5 font-medium'
            data-testid='CollateralCard.displaySymbol'
          >{props.col.displaySymbol}
          </span>
        </div>
        {/* <span>10%</span> */}
      </div>
      <div className='mt-4'>
        <div className='text-sm text-gray-500' data-testid='CollateralCard.CollateralAmountTitle'>Collateral Amount</div>
        <div className={classNames(props.vaultState === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')} data-testid='CollateralCard.CollateralAmount'>
          {`${new BigNumber(props.col.amount).toFixed(8)} ${props.col.displaySymbol}`}
        </div>
      </div>
    </div>
  )
}
