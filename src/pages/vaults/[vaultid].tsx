import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import React, { useCallback } from 'react'
import {
  LoanVaultActive,
  LoanVaultLiquidated, LoanVaultLiquidationBatch,
  LoanVaultState
} from '@defichain/whale-api-client/dist/api/loan'

import { Container } from '@components/commons/Container'
import { VaultHeading } from '@components/vaults/[vaultid]/VaultHeading'
import { VaultDetailsTable } from '@components/vaults/[vaultid]/VaultDetailsTable'
import { CollateralDetails } from '@components/vaults/[vaultid]/CollateralDetailsTable'
import { VaultLoansTable } from '@components/vaults/[vaultid]/VaultLoansTable'

interface VaultsPageData {
  vault: LoanVaultActive | LoanVaultLiquidated
}

export default function VaultIdPage ({ vault }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const getCollaterals = useCallback((batches: LoanVaultLiquidationBatch[]) => {
    return batches.flatMap(v => v.collaterals)
  }, [vault])

  const getLoans = useCallback((batches: LoanVaultLiquidationBatch[]) => {
    return batches.map(v => v.loan)
  }, [vault])

  return (
    <Container className='pt-12 pb-20'>
      <VaultHeading vaultId={vault.vaultId} vaultState={vault.state} />
      <VaultDetailsTable vault={vault} />
      {(() => {
        switch (vault.state) {
          case LoanVaultState.ACTIVE:
            return (
              <>
                <CollateralDetails collaterals={vault.collateralAmounts} />
                <VaultLoansTable loans={vault.loanAmounts} />
              </>
            )
          case LoanVaultState.IN_LIQUIDATION:
            return (
              <>
                <CollateralDetails collaterals={getCollaterals(vault.batches)} />
                <VaultLoansTable loans={getLoans(vault.batches)} />
              </>
            )
        }
      })()}
    </Container>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  if (context.query.network?.toString() !== 'Local') {
    return {
      notFound: true
    }
  }

  // const api = getWhaleApiClient(context)
  // const vaults = await api.loan.getVault("")
  const vaultsActive: LoanVaultActive = {
    vaultId: 'c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4',
    loanScheme: {
      id: '1',
      interestRate: '2.5',
      minColRatio: '150'
    },
    ownerAddress: '8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8',
    state: LoanVaultState.ACTIVE,
    collateralRatio: '16667',
    collateralValue: '10000',
    informativeRatio: '16666.61600015',
    loanValue: '60.0001824',
    interestValue: '0.0001824',
    collateralAmounts: [
      {
        amount: '10000.00000000',
        displaySymbol: 'dDFI',
        id: '0',
        name: 'Default Defi token',
        symbol: 'DFI',
        symbolKey: 'DFI'
      },
      {
        amount: '10000.00000000',
        displaySymbol: 'DFI',
        id: '0',
        name: 'Default Defi token',
        symbol: 'DFI',
        symbolKey: 'DFI'
      },
      {
        amount: '450.344',
        displaySymbol: 'dBTC',
        id: '1',
        name: 'BTC',
        symbol: 'BTC',
        symbolKey: 'BTC'
      },
      {
        amount: '0.345000.521',
        displaySymbol: 'dETH',
        id: '2',
        name: 'ETHEREUM',
        symbol: 'ETH',
        symbolKey: 'ETH'
      }
    ],
    loanAmounts: [
      {
        amount: '30.00009120',
        displaySymbol: 'dTSLA',
        id: '1',
        name: 'TSLA',
        symbol: 'TSLA',
        symbolKey: 'TSLA'
      }
    ],
    interestAmounts: [
      {
        amount: '0.00009120',
        displaySymbol: 'dTSLA',
        id: '1',
        name: 'dTSLA',
        symbol: 'TSLA',
        symbolKey: 'TSLA'
      }
    ]
  }

  // const vaultsLiquidated: LoanVaultLiquidated = {
  //   vaultId: 'c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4',
  //   loanScheme: {
  //             id: '1',
  //             interestRate: '2.5',
  //             minColRatio: '150'
  //           },
  //   ownerAddress: '8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8',
  //   state: LoanVaultState.IN_LIQUIDATION,
  //   batchCount: 1,
  //   liquidationHeight: 162,
  //   liquidationPenalty: 5,
  //   batches: [
  //     {
  //       index: 0,
  //       collaterals: [
  //         {
  //           amount: '10000.00000000',
  //           displaySymbol: 'DFI',
  //           id: '0',
  //           name: 'Default Defi token',
  //           symbol: 'DFI',
  //           symbolKey: 'DFI'
  //         },
  //         {
  //           amount: '10000.00000000',
  //           displaySymbol: 'DFI',
  //           id: '0',
  //           name: 'Default Defi token',
  //           symbol: 'DFI',
  //           symbolKey: 'DFI'
  //         },
  //         {
  //           amount: '450.344',
  //           displaySymbol: 'dBTC',
  //           id: '1',
  //           name: 'BTC',
  //           symbol: 'BTC',
  //           symbolKey: 'BTC'
  //         },
  //         {
  //           amount: '0.345000.521',
  //           displaySymbol: 'dETH',
  //           id: '2',
  //           name: 'ETHEREUM',
  //           symbol: 'ETH',
  //           symbolKey: 'ETH'
  //         }
  //       ],
  //       loan: {
  //         amount: '30.00005130',
  //         displaySymbol: 'dAAPL',
  //         id: '2',
  //         name: 'APPLE',
  //         symbol: 'AAPL',
  //         symbolKey: 'AAPL'
  //       }
  //     }
  //   ]
  // }

  return {
    props: {
      vault: vaultsActive
    }
  }
}
