import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { AddressLink } from '@components/commons/AddressLink'
import ReactNumberFormat from 'react-number-format'
import React, { PropsWithChildren } from 'react'
import { VaultDetailsCollapsibleSection } from '@components/vaults/[vaultid]/VaultDetailsCollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'

export function VaultDetailsTable ({ vault }: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <>
      <VaultDetailsMobile vault={vault} />
      <VaultDetailsDesktop vault={vault} />
    </>
  )
}

function VaultTableRow ({ vault }: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <AddressLink address={vault.ownerAddress} testId='VaultTableRow.OwnerId'>
          <TextMiddleTruncate text={vault.ownerAddress} textLength={6} />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('loanValue' in vault) {
            return <ReactNumberFormat value={vault.loanValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('collateralValue' in vault) {
            return <ReactNumberFormat value={vault.collateralValue} prefix='$' displayType='text' thousandSeparator />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {(() => {
          if ('collateralRatio' in vault) {
            const ratio = (Number(vault.collateralRatio) / Number(vault.loanValue)).toFixed(2)
            return <ReactNumberFormat value={ratio} displayType='text' suffix='%' />
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        N/A
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        N/A
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function VaultDetailsMobile ({ vault }: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <VaultDetailsCollapsibleSection heading='Vault Details' className='block md:hidden'>
      <div className='mb-8'>
        <VaultDetailList
          title='Owner ID'
        >
          <AddressLink address={vault.ownerAddress} testId='VaultTableRow.OwnerId'>
            <TextMiddleTruncate text={vault.ownerAddress} textLength={6} />
          </AddressLink>
        </VaultDetailList>
        <VaultDetailList
          title='Total Loan Value (USD)'
          infoDesc='Total loan value (in USD) taken by the vault.'
          testId='VaultDetailList.tlv'
        >
          {(() => {
            if ('loanValue' in vault) {
              return (
                <ReactNumberFormat
                  value={vault.loanValue}
                  prefix='$'
                  displayType='text'
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                />
              )
            }
            return 'N/A'
          })()}
        </VaultDetailList>
        <VaultDetailList
          title='Total Collateral Value (USD)'
          infoDesc='Total value of tokens (in USD) deposited as collaterals in the vault.'
        >
          {(() => {
            if ('collateralValue' in vault) {
              return (
                <ReactNumberFormat
                  value={vault.collateralValue}
                  prefix='$'
                  displayType='text'
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                />
              )
            }
            return 'N/A'
          })()}
        </VaultDetailList>
        <VaultDetailList
          title='Total Collateral Ratio'
          infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
        >
          {(() => {
            if ('collateralRatio' in vault) {
              return `${vault.collateralRatio}%`
            }
            return 'N/A'
          })()}
        </VaultDetailList>
        <VaultDetailList
          title='Min Collateral Ratio'
          infoDesc='Minimum required collateral ratio based on vault scheme selected by vault owner.'
        >
          {(() => {
            if ('loanScheme' in vault) {
              return `${vault.loanScheme.minColRatio}%`
            }
            return 'N/A'
          })()}
        </VaultDetailList>
        <VaultDetailList
          title='Base Interest Ratio (APR)'
          infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
        >
          {(() => {
            if ('interestValue' in vault) {
              return `${vault.interestValue}%`
            }
            return 'N/A'
          })()}
        </VaultDetailList>
      </div>
    </VaultDetailsCollapsibleSection>
  )
}

function VaultDetailsDesktop ({ vault }: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <div className='mt-8 hidden md:block'>
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
        <VaultTableRow vault={vault} />
      </OverflowTable>
    </div>
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
