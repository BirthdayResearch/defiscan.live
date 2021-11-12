import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import NumberFormat from 'react-number-format'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
// import { getWhaleApiClient } from '@contexts/WhaleContext'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { VaultStatus } from '@components/vaults/VaultStatus'
import { VaultTokenSymbols } from '@components/vaults/VaultTokenSymbols'
import { VaultMobileCard } from '@components/vaults/VaultMobileCard'
import React from 'react'
import { Link } from '@components/commons/Link'
import { VaultCollateralRatio } from '@components/vaults/VaultCollateralRatio'
import { getWhaleApiClient } from '@contexts/WhaleContext'

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
              title='Collateral Ratio'
              infoDesc='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
            />
          </OverflowTable.Header>

          {vaults.items.map(vault => {
            if (vault.state === LoanVaultState.IN_LIQUIDATION) {
              return <LiquidatedVaultRow vault={vault} key={vault.vaultId} />
            }
            return <ActiveVaultRow vault={vault} key={vault.vaultId} />
          })}
        </OverflowTable>
      </div>

      <div className='my-6 md:hidden'>
        <div className='flex flex-wrap gap-y-2'>
          {vaults.items.map(vault => {
            return (
              <VaultMobileCard vault={vault} key={vault.vaultId} />
            )
          })}
        </div>
      </div>

      <div className='flex justify-end mt-8'>
        <CursorPagination pages={vaults.pages} path='/vaults' />
      </div>
    </Container>
  )
}

function ActiveVaultRow ({ vault }: { vault: LoanVaultActive }): JSX.Element {
  return (
    <Link href={{ pathname: `/vaults/${vault.vaultId}` }}>
      <OverflowTable.Row className='cursor-pointer'>
        <OverflowTable.Cell sticky>
          <TextMiddleTruncate
            textLength={6} text={vault.vaultId} className='text-primary-500 group-hover:underline'
            testId={`VaultRow.VaultID.${vault.vaultId}`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <VaultStatus
            vault={vault}
            className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${vault.vaultId}.VaultStatus`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${vault.vaultId}.LoansValue`}>
            <VaultTokenSymbols tokens={vault.loanAmounts} />
            <NumberFormat
              value={vault.loanValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${vault.vaultId}.CollateralValue`}>
            <VaultTokenSymbols tokens={vault.collateralAmounts} />
            <NumberFormat
              value={vault.collateralValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <VaultCollateralRatio
            collateralRatio={vault.collateralRatio} loanScheme={vault.loanScheme}
            testId={`VaultRow.${vault.vaultId}.CollateralRatio`}
          />
        </OverflowTable.Cell>
      </OverflowTable.Row>
    </Link>
  )
}

function LiquidatedVaultRow ({ vault }: { vault: LoanVaultLiquidated }): JSX.Element {
  return (
    <Link href={{ pathname: `/vaults/${vault.vaultId}` }}>
      <OverflowTable.Row className='cursor-pointer'>
        <OverflowTable.Cell sticky>
          <TextMiddleTruncate
            textLength={6} text={vault.vaultId} className='text-primary-500 group-hover:underline'
            testId={`VaultRow.VaultID.${vault.vaultId}`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <VaultStatus
            vault={vault}
            className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${vault.vaultId}.VaultStatus`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.LoansValue`}>N/A</span>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.CollateralValue`}>N/A</span>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.CollateralRatio`}>N/A</span>
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
  if (context.query.network !== undefined && context.query.network?.toString() === 'MainNet') {
    return {
      notFound: true
    }
  }

  try {
    const next = CursorPagination.getNext(context)
    const api = getWhaleApiClient(context)
    const vaults = await api.loan.listVault(10, next)

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
