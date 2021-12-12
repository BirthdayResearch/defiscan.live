import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { VaultStatus } from '@components/vaults/common/VaultStatus'
import { VaultTokenSymbols } from '@components/vaults/common/VaultTokenSymbols'
import { VaultMobileCard } from '@components/vaults/VaultMobileCard'
import React from 'react'
import { VaultCollateralizationRatio } from '@components/vaults/common/VaultCollateralizationRatio'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import classNames from 'classnames'
import { Link } from '@components/commons/link/Link'
import BigNumber from 'bignumber.js'
import { VaultNumberValues } from '@components/vaults/common/VaultNumberValues'
import ReactNumberFormat from 'react-number-format'
import {
  calculateLiquidationValues,
  LiquidatedVaultDerivedValues
} from '../../utils/vaults/LiquidatedVaultDerivedValues'
import { VaultStatsBar } from '@components/vaults/VaultStatsBar'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { EmptySection } from '@components/commons/sections/EmptySection'

interface VaultsPageData {
  vaults: {
    items: Array<LoanVaultActive | LoanVaultLiquidated>
    pages: CursorPage[]
  }
}

export default function Vaults ({ vaults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title='Vaults' />

      <VaultStatsBar />
      <Container className='pt-12 pb-20'>
        <Head title='Vaults' />

        <h1 className='text-2xl font-medium'>Vaults</h1>

        <div className='my-6 hidden md:block'>
          {vaults.items.length === 0
            ? (
              <EmptySection message='There are no vaults at this time' />
              )
            : (
              <OverflowTable>
                <OverflowTable.Header>
                  <OverflowTable.Head
                    title='Vault ID'
                    testId='VaultsTable.VaultID'
                    sticky
                  />

                  <OverflowTable.Head
                    title='Status'
                    infoDesc={<VaultStatusInfo />}
                    testId='VaultsTable.Status'
                  />

                  <OverflowTable.Head
                    alignRight
                    title='Loan Taken'
                    testId='VaultsTable.Loans'
                  />

                  <OverflowTable.Head
                    alignRight
                    title='Loan Value (USD)'
                    infoDesc='Loan token(s) and value (in USD) taken by a vault.'
                    testId='VaultsTable.LoansValue'
                  />

                  <OverflowTable.Head
                    alignRight
                    title='Collaterals'
                    testId='VaultsTable.Collaterals'
                  />

                  <OverflowTable.Head
                    alignRight
                    title='Collateral Value (USD)'
                    infoDesc='Value of tokens (in USD) deposited as collateral in a vault.'
                    testId='VaultsTable.CollateralValue'
                  />

                  <OverflowTable.Head
                    alignRight
                    title='Collateralization Ratio / Min.'
                    infoDesc={<CollateralizationRatioMinInfo />}
                    testId='VaultsTable.CollateralizationRatios'
                  />
                </OverflowTable.Header>
                {vaults.items.map(vault => {
                  return (
                    <Link href={{ pathname: `/vaults/${vault.vaultId}` }} key={vault.vaultId}>
                      <a className='contents'>
                        <VaultRow vault={vault} liquidatedVaultDerivedValues={calculateLiquidationValues(vault)} />
                      </a>
                    </Link>
                  )
                })}
              </OverflowTable>
              )}
        </div>

        <div className='my-6 md:hidden'>
          <div className='flex flex-wrap space-y-2'>
            {vaults.items.map(vault => {
              return (
                <VaultMobileCard
                  vault={vault} liquidatedVaultDerivedValues={calculateLiquidationValues(vault)}
                  key={vault.vaultId}
                />
              )
            })}
          </div>
        </div>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={vaults.pages} path='/vaults' />
        </div>
      </Container>
    </>
  )
}

function VaultRow (props: {
  vault: LoanVaultActive | LoanVaultLiquidated
  liquidatedVaultDerivedValues?: LiquidatedVaultDerivedValues
}): JSX.Element {
  return (
    <OverflowTable.Row
      className={classNames('cursor-pointer', props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')}
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
          className='px-2 py-1 inline-block text-xs'
          testId='VaultRow.VaultStatus'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.LoansValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (
                ((props.liquidatedVaultDerivedValues?.loanTokens) != null) &&
                  <VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues.loanTokens} />
              )
            : (
              <VaultTokenSymbols tokens={props.vault.loanAmounts} />
              )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.LoansValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (
                props.liquidatedVaultDerivedValues?.totalLoanValue === undefined
                  ? ('N/A')
                  : (
                    <VaultNumberValues
                      value={props.liquidatedVaultDerivedValues.totalLoanValue}
                      prefix='$'
                    />
                    )
              )
            : (
              <VaultNumberValues value={new BigNumber(props.vault.loanValue)} prefix='$' />
              )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.Collaterals'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (
                ((props.liquidatedVaultDerivedValues?.collateralTokens) != null) &&
                  <VaultTokenSymbols tokens={props.liquidatedVaultDerivedValues.collateralTokens} />
              )
            : (
              <VaultTokenSymbols tokens={props.vault.collateralAmounts} />
              )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex justify-end' data-testid='VaultRow.CollateralValue'>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? (
                props.liquidatedVaultDerivedValues?.totalCollateralValue === undefined
                  ? ('N/A')
                  : (
                    <VaultNumberValues
                      value={props.liquidatedVaultDerivedValues.totalCollateralValue}
                      prefix='$'
                    />
                    )
              )
            : (
              <VaultNumberValues value={new BigNumber(props.vault.collateralValue)} prefix='$' />
              )}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        <span className='flex flex-row justify-end' data-testid='VaultRow.CollateralizationRatio'>
          {(() => {
            if (props.vault.state === LoanVaultState.IN_LIQUIDATION) {
              if (props.liquidatedVaultDerivedValues?.totalCollateralRatio === undefined) {
                return 'N/A'
              } else {
                return (
                  <VaultCollateralizationRatio
                    collateralizationRatio={props.liquidatedVaultDerivedValues.totalCollateralRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}
                    loanScheme={props.vault.loanScheme}
                    vaultState={props.vault.state}
                  />
                )
              }
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

function VaultStatusInfo (): JSX.Element {
  return (
    <div
      className='px-3 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      A vault's status is determined by its collateralization ratio.
      <br /><br />
      <span className='font-medium'>Active</span>: When a vault is created but no loan has been taken yet
      <br /><br />
      <span className='font-medium'>At Risk</span>: When the collateralization ratio of a vault is between 1x – 1.5x the
      minimum collateralization ratio
      <br /><br />
      <span className='font-medium'>Healthy</span>: When the collateralization ratio of a vault is more than 1.5x the
      minimum collateralization ratio
      <br /><br />
      <span className='font-medium'>In Liquidation</span>: When a vault’s collateralization ratio falls below the
      minimum requirement
      <br /><br />
      <span className='font-medium'>Halted</span>: When any token in the vault (collateral or loan tokens) has
      fluctuated more than 30% in the past hour
    </div>
  )
}

function CollateralizationRatioMinInfo (): JSX.Element {
  return (
    <div
      className='px-3 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      <span className='font-medium'>Collateralization Ratio</span>: Percentage of collaterals deposited in a vault in
      relation to the amount of loan taken.
      <br /><br />
      <span className='font-medium'>Min. Collateralization Ratio</span>: Minimum required collateral ratio based on
      vault scheme selected by vault owner.
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  try {
    const next = CursorPagination.getNext(context)
    const api = getWhaleApiClient(context)
    const vaults = await api.loan.listVault(30, next)

    return {
      props: {
        vaults: {
          items: vaults,
          pages: CursorPagination.getPages(context, vaults)
        }
      }
    }
  } catch
  (e) {
    return {
      notFound: true
    }
  }
}
