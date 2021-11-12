import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { AddressLink } from '@components/commons/AddressLink'
import ReactNumberFormat from 'react-number-format'
import { VaultCollapsibleSection } from '@components/vaults/common/VaultCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { VaultCollateralRatio } from '@components/vaults/common/VaultCollateralRatio'
import classNames from 'classnames'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'

export function VaultDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <>
      <div className='mt-8 hidden md:block'>
        <h2 className='text-xl font-semibold' data-testid='VaultDetailsDesktop.Heading'>
          Vault Details
        </h2>
        <OverflowTable className='mt-3'>
          <OverflowTable.Header>
            <OverflowTable.Head
              title='Owner ID'
              testId='VaultDetailsDesktop.OwnersId'
            />

            <OverflowTable.Head
              alignRight
              title='Total Loan Value (USD)'
              infoDesc='Total loan value (in USD) taken by the vault.'
              testId='VaultDetailsDesktop.TotalLoanValue'
            />

            <OverflowTable.Head
              alignRight
              title='Total Collateral Value (USD)'
              infoDesc='Total value of tokens (in USD) deposited as collaterals in the vault.'
              testId='VaultDetailsDesktop.TotalCollateralValue'
            />

            <OverflowTable.Head
              alignRight
              title='Total Collateral Ratio'
              infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
              testId='VaultDetailsDesktop.TotalCollateralRatio'
            />

            <OverflowTable.Head
              alignRight
              title='Min Collateral Ratio'
              infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
              testId='VaultDetailsDesktop.MinCollateralRatio'
            />

            <OverflowTable.Head
              alignRight
              title='Base Interest Ratio (APR)'
              infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
              testId='VaultDetailsDesktop.BaseInterestRatio '
            />
          </OverflowTable.Header>
          <DesktopVaultDetailsRow vault={props.vault} />
        </OverflowTable>
      </div>

      <VaultCollapsibleSection heading='Vault Details' className='block md:hidden' testId='VaultCollapsibleSection.VaultDetails'>
        <div className='mb-8'>
          <MobileVaultDetails vault={props.vault} />
        </div>
      </VaultCollapsibleSection>
    </>
  )
}

function MobileVaultDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <div className={classNames(props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')}>
      <VaultDetailsListItem
        title='Owner ID'
        testId='VaultDetailList.OwnerID'
      >
        <AddressLink address={props.vault.ownerAddress} testId='VaultTableRow.OwnerId'>
          <TextMiddleTruncate text={props.vault.ownerAddress} textLength={6} />
        </AddressLink>
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Total Loan Value (USD)'
        infoDesc='Total loan value (in USD) taken by the vault.'
        testId='VaultDetailList.TotalLoanValue'
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
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Total Collateral Value (USD)'
        infoDesc='Total value of tokens (in USD) deposited as collaterals in the vault.'
        testId='VaultDetailList.TotalCollateralValue'
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
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Total Collateral Ratio'
        infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
        testId='VaultDetailList.TotalCollateralRatio'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : <VaultCollateralRatio collateralRatio={props.vault.collateralRatio} loanScheme={props.vault.loanScheme} />}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Min Collateral Ratio'
        infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
        testId='VaultDetailList.MinCollateralRatio'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.loanScheme.minColRatio}%`}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Base Interest Ratio (APR)'
        infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
        testId='VaultDetailList.BaseInterestRatio'
      >
        {props.vault.state === LoanVaultState.IN_LIQUIDATION
          ? 'N/A'
          : `${props.vault.interestValue}%`}
      </VaultDetailsListItem>
    </div>
  )
}

function DesktopVaultDetailsRow (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <OverflowTable.Row
      className={classNames(props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')}
    >
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
          : <VaultCollateralRatio collateralRatio={props.vault.collateralRatio} loanScheme={props.vault.loanScheme} />}
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
