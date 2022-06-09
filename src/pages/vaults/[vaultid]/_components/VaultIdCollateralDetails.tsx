import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import { LoanVaultState, LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets/tokens'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import BigNumber from 'bignumber.js'
import React from 'react'
import classNames from 'classnames'
import ReactNumberFormat from 'react-number-format'
import { EmptySection } from '@components/commons/sections/EmptySection'
import { VaultNumberValues } from '../../_components/commons/VaultNumberValues'

export function VaultIdCollateralDetails (props: { collateralValue: string, vaultState: LoanVaultState, collaterals: LoanVaultTokenAmount[] }): JSX.Element {
  return (
    <>
      <div className='mt-10 hidden md:block' data-testid='CollateralDetailsDesktop'>
        <div className='flex items-center'>
          <h2 data-testid='CollateralDetailsDesktop.Heading' className='text-xl font-semibold dark:text-dark-gray-900'>Collateral Details</h2>
          <InfoHoverPopover className='ml-1' description='Proportion of collaterals deposited in the vault.' />
        </div>

        {props.collaterals.length === 0
          ? (
            <EmptySection message='There are no collaterals in the vault at this time' />
            ) : (
              <div
                className='mt-3 grid gap-2 justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch'
                data-testid='CollateralDetailsDesktop.Cards'
              >
                {props.collaterals.map((col) => (
                  <CollateralCard
                    collateralValue={props.collateralValue} vaultState={props.vaultState} col={col}
                    key={col.id}
                  />
                ))}
              </div>
            )}
      </div>

      <CollapsibleSection
        heading='Collateral Details' className='block md:hidden'
        testId='VaultCollapsibleSection.CollateralDetails'
      >
        {props.collaterals.length === 0
          ? (
            <EmptySection message='There are no collaterals in the vault at this time' />
            ) : (
              <div
                className='mt-4 mb-8 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                data-testid='CollateralDetailsMobile.Cards'
              >
                {props.collaterals.map((col) => (
                  <CollateralCard
                    collateralValue={props.collateralValue} vaultState={props.vaultState} col={col}
                    key={col.id}
                  />
                ))}
              </div>
            )}
      </CollapsibleSection>
    </>
  )
}

function CollateralCard (props: { collateralValue: string, vaultState: LoanVaultState, col: LoanVaultTokenAmount }): JSX.Element {
  const TokenSymbol = getAssetIcon(props.col.symbol)

  let usdAmount = ((props.col?.activePrice?.active) != null) ? new BigNumber(props.col.activePrice.active.amount).multipliedBy(new BigNumber(props.col.amount)) : undefined
  usdAmount = props.col.symbol === 'DUSD' ? new BigNumber(props.col.amount) : usdAmount

  let compositionPercentage = (usdAmount != null) ? usdAmount.div(new BigNumber(props.collateralValue)) : undefined
  compositionPercentage = props.col.symbol === 'DUSD' ? compositionPercentage?.multipliedBy(0.99) : compositionPercentage

  return (
    <div className='w-full p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700' data-testid='CollateralCard'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center' data-testid='CollateralCard.AssetIcon'>
          <TokenSymbol className='h-6 w-6 z-10' />
          <div
            className='flex flex-wrap items-center ml-1.5 font-medium'
            data-testid='CollateralCard.displaySymbol'
          >
            <div className='dark:text-gray-400'>{props.col.displaySymbol}</div>
            {props.col.symbol === 'DUSD'
              ? <InfoHoverPopover className='ml-1' description='99.00% collateral factor' placement='top' /> : <></>}
          </div>
        </div>
        {(compositionPercentage != null) &&
          (
            <div className='font-medium text-gray-900 dark:text-gray-400'>
              <VaultNumberValues value={compositionPercentage.multipliedBy(100)} suffix='%' />
            </div>
          )}
      </div>
      <div className='mt-4'>
        <div className='text-sm text-gray-500 dark:text-gray-400' data-testid='CollateralCard.CollateralAmountTitle'>Collateral Amount
        </div>
        <div
          className={classNames('flex items-center space-x-1', props.vaultState === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900 dark:text-gray-100')}
          data-testid='CollateralCard.CollateralAmount'
        >
          <ReactNumberFormat
            value={new BigNumber(props.col.amount).toFixed(8)}
            displayType='text'
            suffix={` ${props.col.displaySymbol}`}
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
          />
          <div className='text-sm text-gray-500'>
            {(usdAmount != null) &&
              (
                <div className='flex'>
                  <span className='ml-0.5 mr-1'>/</span>
                  <VaultNumberValues value={new BigNumber(usdAmount)} prefix='$' />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
