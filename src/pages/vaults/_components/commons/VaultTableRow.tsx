import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import classNames from 'classnames'
import { OverflowTable } from '@components/commons/OverflowTable'
import { LiquidatedVaultDerivedValues } from '../../utils/LiquidatedVaultDerivedValues'
import React from 'react'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { VaultStatus } from './VaultStatus'
import { VaultNumberValues } from './VaultNumberValues'
import BigNumber from 'bignumber.js'
import { VaultCollateralizationRatio } from './VaultCollateralizationRatio'
import ReactNumberFormat from 'react-number-format'
import { VaultTokenSymbols } from './VaultTokenSymbols'

interface VaultTableRowProps {
  vault: LoanVaultActive | LoanVaultLiquidated
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues
}

export function VaultTableRow (props: VaultTableRowProps): JSX.Element {
  return (
    <OverflowTable.Row
      className={classNames('cursor-pointer', props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900 dark:text-gray-100')}
    >
      <OverflowTable.Cell sticky>
        <TextTruncate
          text={props.vault.vaultId} className='text-grey-500'
          testId='VaultRow.VaultID'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus
          vault={props.vault}
          className='inline-block text-xs'
          testId='VaultRow.VaultStatus'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.LoansValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.loanAmounts} />)
            : (<VaultTokenSymbols tokens={props.vault.loanAmounts} />)}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.LoansValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (
              <VaultNumberValues
                value={props.liquidatedVaultDerivedValues?.loanValue}
                prefix='$'
              />
              )
            : (
              <VaultNumberValues value={new BigNumber(props.vault.loanValue)} prefix='$' />
              )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.Collaterals'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (<VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues?.collateralAmounts} />)
            : (<VaultTokenSymbols tokens={props.vault.collateralAmounts} />)}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.CollateralValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (<VaultNumberValues value={props.liquidatedVaultDerivedValues?.collateralValue} prefix='$' />)
            : (<VaultNumberValues value={new BigNumber(props.vault.collateralValue)} prefix='$' />)}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        <span className='flex flex-row justify-end' data-testid='VaultRow.CollateralizationRatio'>
          {(() => {
            if (props.vault.state === LoanVaultState.IN_LIQUIDATION) {
              return (
                <VaultCollateralizationRatio
                  collateralizationRatio={props.liquidatedVaultDerivedValues?.collateralRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}
                  loanScheme={props.vault.loanScheme}
                  vaultState={props.vault.state}
                />
              )
            } else {
              return (
                <VaultCollateralizationRatio
                  collateralizationRatio={props.vault.collateralRatio}
                  loanScheme={props.vault.loanScheme}
                  vaultState={props.vault.state}
                />
              )
            }
          })()}
          <ReactNumberFormat
            value={props.vault.loanScheme.minColRatio}
            suffix='%'
            displayType='text'
            thousandSeparator
            className='ml-1'
            prefix=' / '
          />
        </span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
