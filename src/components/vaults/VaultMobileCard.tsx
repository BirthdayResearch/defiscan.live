import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import NumberFormat from 'react-number-format'
import { VaultStatus } from '@components/vaults/common/VaultStatus'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { VaultTokenSymbols } from '@components/vaults/common/VaultTokenSymbols'
import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from '@components/commons/Link'
import { VaultCollateralRatio } from '@components/vaults/common/VaultCollateralRatio'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'

interface VaultMobileCardProps {
  vault: LoanVaultActive | LoanVaultLiquidated
}

export function VaultMobileCard (props: VaultMobileCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='w-full flex flex-wrap rounded border border-gray-200 p-4 text-gray-500' data-testid='VaultMobileCard'>
      <div className='w-full flex justify-between'>
        <div className='flex items-center gap-x-1.5'>
          Vault ID
          <VaultStatus
            vault={props.vault} className='px-2 py-1 inline-block text-xs'
            testId='VaultMobileCard.VaultStatus'
          />
        </div>
        <div
          className='flex items-center px-2 gap-x-0.5 text-primary-500 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
          data-testid='VaultMobileCard.Toggle'
        >
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>

      <Link href={{ pathname: `/vaults/${props.vault.vaultId}` }}>
        <div className=' mt-2 text-primary-500 underline cursor-pointer'>
          <TextMiddleTruncate
            textLength={6} text={props.vault.vaultId}
            testId='VaultMobileCard.VaultID'
          />
        </div>
      </Link>

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
        <VaultMobileDetails vault={props.vault} />
      </Transition>
    </div>
  )
}

function VaultMobileDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <div className='w-full mt-2'>
      <VaultDetailsListItem
        title='Loans'
        testId='VaultIdDetails.Loans'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : props.vault.collateralAmounts.length === 0 ? 'N/A' : <VaultTokenSymbols tokens={props.vault.loanAmounts} />}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Loans Value (USD)'
        infoDesc='Loan token(s) and value (in USD) taken by a vault.'
        testId='VaultIdDetails.LoansValue'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <NumberFormat
              value={props.vault.loanValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
              prefix='$'
            />}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateral'
        testId='VaultIdDetails.Collateral'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : props.vault.collateralAmounts.length === 0 ? 'N/A' : <VaultTokenSymbols tokens={props.vault.collateralAmounts} />}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateral Value (USD)'
        infoDesc='Value of tokens (in USD) deposited as collateral in a vault.'
        testId='VaultIdDetails.CollateralValue'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <NumberFormat
              value={props.vault.collateralValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
              prefix='$'
            />}
      </VaultDetailsListItem>

      <VaultDetailsListItem
        title='Collateralization Ratio'
        infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
        testId='VaultIdDetails.CollateralizationRatio'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <VaultCollateralRatio
              collateralRatio={props.vault.collateralRatio} loanScheme={props.vault.loanScheme}
              testId={`VaultRow.${props.vault.vaultId}.CollateralRatio`}
            />}
      </VaultDetailsListItem>
    </div>
  )
}
