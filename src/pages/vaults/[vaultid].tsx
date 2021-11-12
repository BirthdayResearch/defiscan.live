import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import React, { useCallback } from 'react'
import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultLiquidationBatch,
  LoanVaultState
} from '@defichain/whale-api-client/dist/api/loan'

import { Container } from '@components/commons/Container'
import { VaultHeading } from '@components/vaults/[vaultid]/VaultHeading'
import { VaultDetailsTable } from '@components/vaults/[vaultid]/VaultDetailsTable'
import { CollateralDetails } from '@components/vaults/[vaultid]/CollateralDetailsTable'
import { VaultLoansTable } from '@components/vaults/[vaultid]/VaultLoansTable'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { isAlphanumeric } from '../../utils/commons/StringValidator'

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
    <Container className='pt-4 pb-20'>
      <VaultHeading vault={vault} />
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
  if (context.query.network !== undefined && context.query.network?.toString() === 'MainNet') {
    return {
      notFound: true
    }
  }
  // const vaultsLiquidated: LoanVaultLiquidated = {
  //   vaultId: 'c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4',
  //   loanScheme: {
  //     id: '1',
  //     interestRate: '2.5',
  //     minColRatio: '150'
  //   },
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

  try {
    const vaultid = context.params?.vaultid?.toString().trim() as string

    if (!isAlphanumeric(vaultid)) {
      return { notFound: true }
    }

    const api = getWhaleApiClient(context)

    return {
      props: {
        vault: await api.loan.getVault(vaultid)
      }
    }
  } catch
  (e) {
    return {
      notFound: true
    }
  }
}
