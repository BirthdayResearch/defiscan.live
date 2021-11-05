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
            <OverflowTable.Head sticky>EVENT TIME</OverflowTable.Head>
            <OverflowTable.Head>VAULT ID</OverflowTable.Head>
            <OverflowTable.Head>STATUS</OverflowTable.Head>
            <OverflowTable.Head>LOANS</OverflowTable.Head>
            <OverflowTable.Head alignRight>LOANS VALUE (USD)</OverflowTable.Head>
            <OverflowTable.Head alignRight>COLLATERAL VALUE (USD)</OverflowTable.Head>
            <OverflowTable.Head alignRight>COLLATERAL RATIO</OverflowTable.Head>
          </OverflowTable.Header>

          {vaults.items.map(vault => {
            if (vault.state === LoanVaultState.IN_LIQUIDATION) {
              return <LiquidatedVaultRow vault={vault} />
            }

            return <ActiveVaultRow vault={vault} key={vault.vaultId} />
          })}
        </OverflowTable>
      </div>
      <div className='flex justify-end mt-8'>
        <CursorPagination pages={vaults.pages} path='/blocks' />
      </div>
    </Container>
  )
}

function ActiveVaultRow ({ vault }: { vault: LoanVaultActive }): JSX.Element {
  return (
    <OverflowTable.Row key={vault.vaultId}>
      <OverflowTable.Cell>
        About 5 minutes ago
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <TextMiddleTruncate textLength={6} text={vault.vaultId} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus state={vault.state} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <LoanSymbols tokens={vault.loanAmounts} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <NumberFormat
          value={vault.loanValue}
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='flex gap-x-6 justify-end'>
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
        {`${vault.collateralRatio}%`}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function LiquidatedVaultRow ({ vault }: { vault: LoanVaultLiquidated }): JSX.Element {
  return (
    <OverflowTable.Row key={vault.vaultId}>
      <OverflowTable.Cell>
        About 5 minutes ago
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <TextMiddleTruncate textLength={6} text={vault.vaultId} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultStatus state={vault.state} />
      </OverflowTable.Cell>
      <OverflowTable.Cell>N/A</OverflowTable.Cell>
      <OverflowTable.Cell alignRight>N/A</OverflowTable.Cell>
      <OverflowTable.Cell alignRight>N/A</OverflowTable.Cell>
      <OverflowTable.Cell alignRight>N/A</OverflowTable.Cell>
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

function VaultStatus (props: { state: LoanVaultState.ACTIVE | LoanVaultState.FROZEN | LoanVaultState.MAY_LIQUIDATE | LoanVaultState.UNKNOWN | LoanVaultState.IN_LIQUIDATION }): JSX.Element {
  switch (props.state) {
    case LoanVaultState.ACTIVE:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-secondary-300'>ACTIVE</span>
    case LoanVaultState.FROZEN:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-black'>FROZEN</span>
    case LoanVaultState.MAY_LIQUIDATE:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-orange-500'>AT RISK</span>
    case LoanVaultState.IN_LIQUIDATION:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-gray-600'>LIQUIDATED</span>
    case LoanVaultState.UNKNOWN:
      return <span className='px-2 py-1 inline-block text-xs text-white text-center bg-gray-400'>UNKNOWN</span>
  }
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  const next = CursorPagination.getNext(context)
  const api = getWhaleApiClient(context)
  const vaults = await api.loan.listVault(10, next)
  console.log(vaults)

  return {
    props: {
      vaults: {
        items: vaults,
        pages: CursorPagination.getPages(context, vaults)
      }
    }
  }
}
