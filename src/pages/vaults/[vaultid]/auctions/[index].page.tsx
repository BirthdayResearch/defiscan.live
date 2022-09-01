import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Container } from "@components/commons/Container";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import React from "react";
import {
  LoanVaultLiquidated,
  LoanVaultLiquidationBatch,
  LoanVaultState,
  VaultAuctionBatchHistory,
} from "@defichain/whale-api-client/dist/api/loan";
import { AuctionDetailsHeading } from "./_components/AuctionDetailsHeading";
import { BiddingHistory } from "./_components/AuctionBiddingHistory";
import { DesktopAuctionDetails } from "./_components/DesktopAuctionDetails";
import { MobileAuctionDetails } from "./_components/MobileAuctionDetails";

interface ActionsPageProps {
  vault: LoanVaultLiquidated;
  batchIndex: string;
  liquidationBatch: LoanVaultLiquidationBatch;
  auctionHistory: VaultAuctionBatchHistory[];
}

export default function VaultIdPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  return (
    <>
      <Container className="pt-4 pb-20">
        <AuctionDetailsHeading
          vault={props.vault}
          batchIndex={props.batchIndex}
        />

        <DesktopAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          liquidationHeight={props.vault.liquidationHeight}
        />

        <MobileAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          liquidationHeight={props.vault.liquidationHeight}
        />

        <BiddingHistory history={props.auctionHistory} />
      </Container>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const api = getWhaleApiClient(context);

  const vaultid = context.params?.vaultid?.toString().trim() as string;
  const batchIndex = context.params?.index?.toString().trim() as string;
  let auctionHistory: VaultAuctionBatchHistory[] = [];

  try {
    const vault = await api.loan.getVault(vaultid);
    if (vault.state === LoanVaultState.IN_LIQUIDATION) {
      auctionHistory = await api.loan.listVaultAuctionHistory(
        vaultid,
        vault.liquidationHeight,
        Number(batchIndex)
      );
    } else {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        vault: vault,
        batchIndex: batchIndex,
        liquidationBatch: vault.batches[batchIndex],
        auctionHistory: auctionHistory,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
