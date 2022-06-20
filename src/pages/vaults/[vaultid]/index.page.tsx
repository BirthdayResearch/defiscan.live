import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CollateralToken, LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'

import { Container } from '@components/commons/Container'
import { VaultIdHeading } from './_components/VaultIdHeading'
import { VaultIdDetails } from './_components/VaultIdDetails'
import { VaultIdCollateralDetails } from './_components/VaultIdCollateralDetails'
import { VaultIdLoansDetails } from './_components/VaultIdLoansDetails'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { isAlphanumeric } from '../../../utils/commons/StringValidator'
import { VaultAuctions } from './_components/VaultIdAuctionsDetails'
import { calculateLiquidationValues } from '../utils/LiquidatedVaultDerivedValues'
import { Head } from '@components/commons/Head'
import React from 'react'

interface VaultsPageData {
  vault: LoanVaultActive | LoanVaultLiquidated
  collateralTokens: CollateralToken[]
}

export default function VaultIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title={`Vault #${props.vault.vaultId}`} />

      <Container className='pt-4 pb-20'>
        <VaultIdHeading vault={props.vault} />
        <VaultIdDetails vault={props.vault} collateralTokens={props.collateralTokens} liquidatedVaultDerivedValues={calculateLiquidationValues(props.vault)} />
        {
          (props.vault.state === LoanVaultState.IN_LIQUIDATION) ? (
            <VaultAuctions vault={props.vault} />
          ) : (
            <>
              <VaultIdCollateralDetails
                collateralValue={props.vault.collateralValue}
                vaultState={props.vault.state}
                collaterals={props.vault.collateralAmounts}
              />
              <VaultIdLoansDetails
                loans={props.vault.loanAmounts}
                interests={props.vault.interestAmounts}
                vault={{
                  interest: props.vault.loanScheme.interestRate,
                  state: props.vault.state
                }}
              />
            </>
          )
        }
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  try {
    const vaultid = context.params?.vaultid?.toString().trim() as string

    if (!isAlphanumeric(vaultid)) {
      return { notFound: true }
    }

    const api = getWhaleApiClient(context)

    return {
      props: {
        vault: await api.loan.getVault(vaultid),
        collateralTokens: await api.loan.listCollateralToken(50)
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
