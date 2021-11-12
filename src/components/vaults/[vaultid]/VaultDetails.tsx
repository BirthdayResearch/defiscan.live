import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { AddressLink } from '@components/commons/AddressLink'
import ReactNumberFormat from 'react-number-format'
import React, { PropsWithChildren } from 'react'
import { VaultCollapsibleSection } from '@components/vaults/[vaultid]/VaultCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'

export function VaultDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <>
      <div className='mt-6 hidden md:block'>
        <h2 className='text-xl font-semibold' data-testid='VaultDetailsDesktop.Heading'>
          Vault Details
        </h2>
        <OverflowTable className='mt-4'>
          <OverflowTable.Header>
            <OverflowTable.Head
              title='Owner ID'
              testId='VaultDetailsDesktop.OwnersId'
            />

            <OverflowTable.Head
              alignRight
              title='Total Loan Value (USD)'
              infoDesc='Total loan value (in USD) taken by the vault.'
              testId='VaultDetailsDesktop.tlv'
            />

            <OverflowTable.Head
              alignRight
              title='Total Collateral Value (USD)'
              infoDesc='Total value of tokens (in USD) deposited as collaterals in the vault.'
              testId='VaultDetailsDesktop.tcv'
            />

            <OverflowTable.Head
              alignRight
              title='Total Collateral Ratio'
              infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
              testId='VaultDetailsDesktop.tcr'
            />

            <OverflowTable.Head
              alignRight
              title='Min Collateral Ratio'
              infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
              testId='VaultDetailsDesktop.mcr'
            />

            <OverflowTable.Head
              alignRight
              title='Base Interest Ratio (APR)'
              infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
            />
          </OverflowTable.Header>
          <DesktopVaultDetailsRow vault={props.vault} />
        </OverflowTable>
      </div>

      <VaultCollapsibleSection heading='Vault Details' className='block md:hidden'>
        <div className='mb-8'>
          <MobileVaultDetails vault={props.vault} />
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function MobileVaultDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <>
      <VaultDetailList title='Owner ID'>
        <AddressLink address={props.vault.ownerAddress} testId='VaultTableRow.OwnerId'>
          <TextMiddleTruncate text={props.vault.ownerAddress} textLength={6} />
        </AddressLink>
      </VaultDetailList>
      <VaultDetailList
        title='Total Loan Value (USD)'
        infoDesc='Total loan value (in USD) taken by the vault.'
        testId='VaultDetailList.tlv'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <ReactNumberFormat
              value={props.vault.loanValue}
              prefix='$'
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />}
      </VaultDetailList>
      <VaultDetailList
        title='Total Collateral Value (USD)'
        infoDesc='Total value of tokens (in USD) deposited as collaterals in the vault.'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <ReactNumberFormat
              value={props.vault.collateralValue}
              prefix='$'
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />}
      </VaultDetailList>
      <VaultDetailList
        title='Total Collateral Ratio'
        infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.collateralRatio}%`}
      </VaultDetailList>
      <VaultDetailList
        title='Min Collateral Ratio'
        infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.loanScheme.minColRatio}%`}
      </VaultDetailList>
      <VaultDetailList
        title='Base Interest Ratio (APR)'
        infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.interestValue}%`}
      </VaultDetailList>
    </>
  )
}

function DesktopVaultDetailsRow (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <AddressLink address={props.vault.ownerAddress} testId='VaultTableRow.OwnerId'>
          <TextMiddleTruncate text={props.vault.ownerAddress} textLength={6} />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <ReactNumberFormat
              value={props.vault.loanValue}
              prefix='$'
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <ReactNumberFormat
              value={props.vault.collateralValue}
              prefix='$'
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.collateralRatio}%`}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.loanScheme.minColRatio}%`}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.interestValue}%`}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultDetailList (props: PropsWithChildren<{ title: string, infoDesc?: string, testId?: string }>): JSX.Element {
  return (
    <div className='flex justify-between items-center mb-2.5' data-testid='VaultDetailList'>
      <div className='flex items-center' data-testid={props.testId}>
        <span className='text-gray-500'>{props.title}</span>
        {props.infoDesc !== undefined && (<InfoHoverPopover className='ml-1' description={props.infoDesc} />)}
      </div>
      {props.children}
    </div>
  )
}
