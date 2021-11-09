import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { getAssetIcon } from '@components/icons/assets'
import NumberFormat from 'react-number-format'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
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

      <div className='my-6'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head sticky>VAULT ID</OverflowTable.Head>
            <OverflowTable.Head>STATUS</OverflowTable.Head>
            <OverflowTable.Head alignRight>LOANS VALUE (USD)</OverflowTable.Head>
            <OverflowTable.Head alignRight>COLLATERAL VALUE (USD)</OverflowTable.Head>
            <OverflowTable.Head alignRight>COLLATERAL RATIO</OverflowTable.Head>
          </OverflowTable.Header>

          {vaults.items.map(vault => {
            if (vault.state === LoanVaultState.IN_LIQUIDATION) {
              return <LiquidatedVaultRow vault={vault} key={vault.vaultId} />
            }

            return <ActiveVaultRow vault={vault} key={vault.vaultId} />
          })}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={vaults.pages} path='/vaults' />
      </div>
    </Container>
  )
}

function ActiveVaultRow ({ vault }: { vault: LoanVaultActive }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <TextMiddleTruncate textLength={6} text={vault.vaultId} testId={`VaultRow.VaultID.${vault.vaultId}`} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus
          state={vault.state} className='px-2 py-1 inline-block text-xs'
          testId={`VaultRow.${vault.vaultId}.VaultStatus`}
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${vault.vaultId}.LoansValue`}>
          <LoanSymbols tokens={vault.loanAmounts} />
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
          <LoanSymbols tokens={vault.collateralAmounts} />
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
        <span data-testid={`VaultRow.${vault.vaultId}.CollateralRatio`}>{`${vault.collateralRatio}%`}</span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function LiquidatedVaultRow ({ vault }: { vault: LoanVaultLiquidated }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <TextMiddleTruncate textLength={6} text={vault.vaultId} testId={`VaultRow.VaultID.${vault.vaultId}`} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus
          state={vault.state} className='px-2 py-1 inline-block text-xs'
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
  )
}

function LoanSymbols (props: { tokens: LoanVaultTokenAmount[] }): JSX.Element {
  const remainingTokens = props.tokens.length - 3
  return (
    <div className='flex items-center gap-x-1'>
      <div className='flex'>
        {props.tokens.map((loan, index) => {
          const TokenIcon = getAssetIcon(loan.symbol)
          if (index < 3) {
            if (index >= 1) {
              return <TokenIcon className='h-6 w-6 -ml-2' />
            }
            return <TokenIcon className='h-6 w-6' />
          }
          return null
        })}
      </div>

      {remainingTokens > 0 && (
        <span className='text-xs text-gray-500'>{`+${remainingTokens}`}</span>
      )}
    </div>
  )
}

function VaultStatus (props: {
  state: LoanVaultState.ACTIVE | LoanVaultState.FROZEN | LoanVaultState.MAY_LIQUIDATE | LoanVaultState.UNKNOWN | LoanVaultState.IN_LIQUIDATION
  className?: string
  testId?: string
}): JSX.Element {
  switch (props.state) {
    case LoanVaultState.ACTIVE:
      return (
        <span
          className={classNames(props.className, 'text-blue-500 bg-blue-100')}
          data-testid={props.testId}
        >ACTIVE
        </span>
      )
    case LoanVaultState.FROZEN:
      return (
        <span
          className={classNames(props.className, 'text-red-300 bg-red-100')}
          data-testid={props.testId}
        >HALTED
        </span>
      )
    case LoanVaultState.MAY_LIQUIDATE:
      return <span className={classNames(props.className, 'text-orange-500 bg-orange-100')} data-testid={props.testId}>AT RISK</span>
    case LoanVaultState.IN_LIQUIDATION:
      return (
        <span
          className={classNames(props.className, 'text-gray-500 bg-gray-100')}
          data-testid={props.testId}
        >LIQUIDATED
        </span>
      )
    case LoanVaultState.UNKNOWN:
      return (
        <span
          className={classNames(props.className, 'text-white bg-gray-400')}
          data-testid={props.testId}
        >UNKNOWN
        </span>
      )
  }
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
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
}
