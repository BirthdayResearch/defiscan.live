import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'
import { LiquidatedVaultDerivedValues } from '../utils/LiquidatedVaultDerivedValues'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { VaultLink } from '@components/commons/link/VaultLink'
import { VaultStatus } from './commons/VaultStatus'
import { VaultDetailsListItem } from './commons/VaultDetailsListItem'
import { VaultTokenSymbols } from './commons/VaultTokenSymbols'
import { VaultNumberValues } from './commons/VaultNumberValues'
import { VaultCollateralizationRatio } from './commons/VaultCollateralizationRatio'

interface VaultMobileCardProps {
  vault: LoanVaultActive | LoanVaultLiquidated
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues
}

export function VaultMobileCard (props: VaultMobileCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='w-full flex flex-wrap rounded border border-gray-200 p-4 text-gray-500'
      data-testid='VaultMobileCard'
    >
      <div className='w-full flex justify-between'>
        <div className='flex items-center'>
          Vault ID
          <VaultStatus
            vault={props.vault} className='ml-2 px-2 py-1 inline-block text-xs'
            testId='VaultMobileCard.VaultStatus'
          />
        </div>
        <div
          className='text-gray-600 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
          data-testid='VaultMobileCard.Toggle'
        >
          {(!isOpen)
            ? (<MdOutlineKeyboardArrowDown size={28} />)
            : (<MdOutlineKeyboardArrowUp size={28} />)}
        </div>
      </div>

      <VaultLink vault={props.vault.vaultId}>
        <TextTruncate
          text={props.vault.vaultId} className='mt-2 text-primary-500 underline cursor-pointer'
          testId='VaultMobileCard.VaultID'
        />
      </VaultLink>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        <VaultMobileDetails vault={props.vault} liquidatedVaultDerivedValues={props.liquidatedVaultDerivedValues} />
      </Transition>
    </div>
  )
}

function VaultMobileDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated, liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues }): JSX.Element {
  return (
    <div className='w-full mt-2 space-y-2'>
      <VaultDetailsListItem
        title='Loans'
        testId='VaultMobileCard.Loans'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.loanAmounts} />)
          : (<VaultTokenSymbols tokens={props.vault.loanAmounts} />)}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Loan Value (USD)'
        infoDesc='Loan token(s) and value (in USD) taken by a vault.'
        testId='VaultMobileCard.LoansValue'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultNumberValues value={props.liquidatedVaultDerivedValues?.loanValue} prefix='$' />)
          : (<VaultNumberValues value={new BigNumber(props.vault.loanValue)} prefix='$' />)}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateral'
        testId='VaultMobileCard.Collateral'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.collateralAmounts} />)
          : (<VaultTokenSymbols tokens={props.vault.collateralAmounts} />)}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateral Value (USD)'
        infoDesc='Value of tokens (in USD) deposited as collateral in a vault.'
        testId='VaultMobileCard.CollateralValue'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultNumberValues value={props.liquidatedVaultDerivedValues?.collateralValue} prefix='$' />)
          : (<VaultNumberValues value={new BigNumber(props.vault.collateralValue)} prefix='$' />)}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateralization Ratio'
        infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
        testId='VaultMobileCard.CollateralizationRatio'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (
            <VaultCollateralizationRatio
              collateralizationRatio={props.liquidatedVaultDerivedValues?.collateralRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}
              loanScheme={props.vault.loanScheme}
              vaultState={props.vault.state}
            />
            )
          : (<VaultCollateralizationRatio
              collateralizationRatio={props.vault.collateralRatio}
              loanScheme={props.vault.loanScheme}
              vaultState={props.vault.state}
              testId={`VaultRow.${props.vault.vaultId}.CollateralizationRatio`}
             />)}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Min Collateralization Ratio'
        infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
        testId='VaultMobileCard.MinCollateralizationRatio'
      >
        <ReactNumberFormat
          value={props.vault.loanScheme.minColRatio}
          suffix='%'
          displayType='text'
          thousandSeparator
        />
      </VaultDetailsListItem>
    </div>
  )
}
