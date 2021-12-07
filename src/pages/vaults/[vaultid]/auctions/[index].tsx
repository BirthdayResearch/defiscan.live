import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import React from 'react'
import {
  LoanVaultLiquidated,
  LoanVaultLiquidationBatch,
  LoanVaultState
} from '@defichain/whale-api-client/dist/api/loan'
import { useAuctionTimeLeft } from '../../../../hooks/useAuctionTimeLeft'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { DesktopAuctionDetails, MobileAuctionDetails } from '@components/vaults/[vaultid]/auctions/AuctionDetails'
import { AuctionDetailsHeading } from '@components/vaults/[vaultid]/auctions/AuctionDetailsHeading'
import { EmptySection } from '@components/commons/sections/EmptySection'

interface ActionsPageProps {
  vault: LoanVaultLiquidated
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
}

export default function VaultIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, blocks ?? 0)

  return (
    <>
      <Container className='pt-4 pb-20'>

        <AuctionDetailsHeading vault={props.vault} batchIndex={props.batchIndex} />

        <DesktopAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          timeRemaining={timeRemaining}
        />

        <MobileAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          timeRemaining={timeRemaining}
        />

        <BiddingHistory />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const vaultid = context.params?.vaultid?.toString().trim() as string
  const batchIndex = context.params?.index?.toString().trim() as string

  try {
    const vault = await getWhaleApiClient(context).loan.getVault(vaultid)
    if (vault.state !== LoanVaultState.IN_LIQUIDATION) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        vault: vault,
        batchIndex: batchIndex,
        liquidationBatch: vault.batches[batchIndex]
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}

function BiddingHistory (): JSX.Element {
  return (
    <>
      <h2 className='text-xl font-semibold mt-8' data-testid='BiddingHistory.Heading'>
        Bidding Details
      </h2>
      <EmptySection message='Bidding history is not supported at this time' />
    </>
  )
}
