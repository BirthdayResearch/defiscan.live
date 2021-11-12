import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import NumberFormat from 'react-number-format'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { VaultStatus } from '@components/vaults/VaultStatus'
import { VaultTokenSymbols } from '@components/vaults/VaultTokenSymbols'
import { VaultMobileCard } from '@components/vaults/VaultMobileCard'
import React from 'react'
import { Link } from '@components/commons/Link'
import { VaultCollateralRatio } from '@components/vaults/VaultCollateralRatio'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import classNames from 'classnames'

interface VaultsPageData {
  vaults: {
    items: Array<LoanVaultActive | LoanVaultLiquidated>
    pages: CursorPage[]
  }
}

export default function Vaults ({ vaults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Vaults' />

      <h1 className='text-2xl font-medium'>Vaults</h1>

      <div className='my-6 hidden md:block'>
        {vaults.items.length === 0
          ? (
            <div className='text-gray-400 flex w-full justify-center p-12'>
              There are no vaults at this time
            </div>
            )
          : (
            <OverflowTable>
              <OverflowTable.Header>
                <OverflowTable.Head
                  title='Vault ID'
                  infoDesc='Annual Vault Interest Rate based on the scheme selected by the vault owner.'
                />

                <OverflowTable.Head
                  title='Status'
                  infoDesc={<VaultStatusInfo />}
                />

                <OverflowTable.Head
                  alignRight
                  title='Loans Value (USD)'
                  infoDesc='Loan token(s) and value (in USD) taken by a vault.'
                />

                <OverflowTable.Head
                  alignRight
                  title='Collateral Value (USD)'
                  infoDesc='Type and value of tokens deposited as collaterals in a vault.'
                />

                <OverflowTable.Head
                  alignRight
                  title='Collateralization Ratio'
                  infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
                />
              </OverflowTable.Header>

              {vaults.items.map(vault => {
                return <VaultRow vault={vault} key={vault.vaultId} />
              })}
            </OverflowTable>
            )}
      </div>

      <div className='my-6 md:hidden'>
        <div className='flex flex-wrap gap-y-2'>
          {vaults.items.map(vault => {
            return (<VaultMobileCard vault={vault} key={vault.vaultId} />)
          })}
        </div>
      </div>

      <div className='flex justify-end mt-8'>
        <CursorPagination pages={vaults.pages} path='/vaults' />
      </div>
    </Container>
  )
}

function VaultRow (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <Link href={{ pathname: `/vaults/${props.vault.vaultId}` }}>
      <OverflowTable.Row className={classNames('cursor-pointer', props.vault.state === LoanVaultState.FROZEN ? 'text-gray-200' : 'text-gray-900')}>
        <OverflowTable.Cell sticky>
          <TextMiddleTruncate
            textLength={6} text={props.vault.vaultId} className='text-primary-500 group-hover:underline'
            testId={`VaultRow.VaultID.${props.vault.vaultId}`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <VaultStatus
            vault={props.vault}
            className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${props.vault.vaultId}.VaultStatus`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${props.vault.vaultId}.LoansValue`}>
            {props.vault.state === LoanVaultState.IN_LIQUIDATION
              ? ('N/A')
              : (
                <>
                  <VaultTokenSymbols tokens={props.vault.loanAmounts} />
                  <NumberFormat
                    value={props.vault.loanValue}
                    displayType='text'
                    decimalScale={2}
                    fixedDecimalScale
                    thousandSeparator
                    prefix='$'
                  />
                </>
                )}
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${props.vault.vaultId}.CollateralValue`}>
            {props.vault.state === LoanVaultState.IN_LIQUIDATION
              ? ('N/A')
              : (
                <>
                  <VaultTokenSymbols tokens={props.vault.collateralAmounts} />
                  <NumberFormat
                    value={props.vault.collateralValue}
                    displayType='text'
                    decimalScale={2}
                    fixedDecimalScale
                    thousandSeparator
                    prefix='$'
                  />
                </>
                )}
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          {props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? ('N/A')
            : (<VaultCollateralRatio
                collateralRatio={props.vault.collateralRatio} loanScheme={props.vault.loanScheme}
                testId={`VaultRow.${props.vault.vaultId}.CollateralRatio`}
               />)}
        </OverflowTable.Cell>
      </OverflowTable.Row>
    </Link>
  )
}

function VaultStatusInfo (): JSX.Element {
  return (
    <div
      className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      A vault's status is determined by its collateral ratio:
      <br /><br />
      <span className='font-medium'>Active</span>: A vault that has been created but there are no loans
      taken yet.
      <br /><br />
      <span className='font-medium'>Healthy</span>: The vault's collateral ratio is sufficiently high.
      <br /><br />
      <span className='font-medium'>At Risk</span>: The vault is at risk of liquidation within the next
      hour.
      <br /><br />
      <span className='font-medium'>Liquidated</span>: The vault's collateral ratio has fallen below its
      minimum and is now in
      auction.
      <br /><br />
      <span className='font-medium'>Halted</span>: The price of one or more token in the vault has
      fluctuated more than 30% in the
      past hour.
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  if (context.query.network?.toString() !== 'Local' && context.query.network?.toString() !== 'Playground' && context.query.network?.toString() !== 'TestNet') {
    return {
      notFound: true
    }
  }

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
