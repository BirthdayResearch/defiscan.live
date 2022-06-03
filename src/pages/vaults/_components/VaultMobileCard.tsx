import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import React from 'react'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'
import { LiquidatedVaultDerivedValues } from '../utils/LiquidatedVaultDerivedValues'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { VaultStatus } from './commons/VaultStatus'
import { VaultTokenSymbols } from './commons/VaultTokenSymbols'
import { VaultNumberValues } from './commons/VaultNumberValues'
import { VaultCollateralizationRatio } from './commons/VaultCollateralizationRatio'
import { CardList } from '@components/commons/CardList'

interface VaultMobileCardProps {
  vault: LoanVaultActive | LoanVaultLiquidated
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues
}

export function VaultMobileCard (props: VaultMobileCardProps): JSX.Element {
  return (
    <CardList.Card>
      <CardList.Header path={`/vaults/${props.vault.vaultId}`} className='text-white'>
        Vault ID
        <VaultStatus
          vault={props.vault} className='ml-2 inline-block text-xs'
          testId='VaultMobileCard.VaultStatus'
        />
      </CardList.Header>

      <TextTruncate
        text={props.vault.vaultId} className='mt-0.5 font-medium text-gray-900 dark:text-gray-400'
        testId='VaultMobileCard.VaultID'
        width='w-36'
      />

      <CardList.List>
        <VaultMobileDetails vault={props.vault} liquidatedVaultDerivedValues={props.liquidatedVaultDerivedValues} />
      </CardList.List>
    </CardList.Card>
  )
}

function VaultMobileDetails (props: { vault: LoanVaultActive | LoanVaultLiquidated, liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues }): JSX.Element {
  return (
    <CardList.List>
      <CardList.ListItem
        title='Loans'
        testId='VaultMobileCard.Loans'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.loanAmounts} />)
          : (<VaultTokenSymbols tokens={props.vault.loanAmounts} />)}
      </CardList.ListItem>

      <CardList.ListItem
        title='Loan Value (USD)'
        infoDesc='Loan token(s) and value (in USD) taken by a vault.'
        testId='VaultMobileCard.LoansValue'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultNumberValues value={props.liquidatedVaultDerivedValues?.loanValue} prefix='$' />)
          : (<VaultNumberValues value={new BigNumber(props.vault.loanValue)} prefix='$' />)}
      </CardList.ListItem>

      <CardList.ListItem
        title='Collateral'
        testId='VaultMobileCard.Collateral'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.collateralAmounts} />)
          : (<VaultTokenSymbols tokens={props.vault.collateralAmounts} />)}
      </CardList.ListItem>

      <CardList.ListItem
        title='Collateral Value (USD)'
        infoDesc='Value of tokens (in USD) deposited as collateral in a vault.'
        testId='VaultMobileCard.CollateralValue'
      >
        {(props.vault.state === LoanVaultState.IN_LIQUIDATION)
          ? (<VaultNumberValues value={props.liquidatedVaultDerivedValues?.collateralValue} prefix='$' />)
          : (<VaultNumberValues value={new BigNumber(props.vault.collateralValue)} prefix='$' />)}
      </CardList.ListItem>

      <CardList.ListItem
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
      </CardList.ListItem>

      <CardList.ListItem
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
      </CardList.ListItem>
    </CardList.List>

  )
}
