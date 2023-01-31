import React, { useEffect, useState } from "react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import BigNumber from "bignumber.js";
import { AssetBreakdownInfo } from "@defichain/whale-api-client/dist/api/consortium";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { Container } from "@components/commons/Container";
import { Head } from "@components/commons/Head";
import {
  ConsortiumDescription,
  ConsortiumLayout,
  ConsortiumTitle,
} from "../_components/ConsortiumLayout";
import { AssetBreakdownCards } from "./_components/AssetBreakdownCards";
import { AssetBreakdownPieChart } from "./_components/AssetBreakdownPieChart";
import { AssetBreakdownTable } from "./_components/AssetBreakdownTable";
import { SearchInput } from "../_components/SearchInput";
import { BurnMint } from "./_components/BurnMint";

export interface ConsortiumShareProps {
  id: string;
  member: string;
  minted: number;
}

export default function AssetBreakdown({
  assets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredAssets, setFilteredAssets] = useState(assets.items);

  useEffect(() => {
    const searchedAssets: AssetBreakdownInfo[] = [];

    assets.items.forEach((asset) => {
      const displaySymbolFound = isSubstringOfText(
        searchText,
        asset.tokenDisplaySymbol
      );
      const filteredMembers = displaySymbolFound
        ? asset.memberInfo
        : asset.memberInfo.filter((member) =>
            isSubstringOfText(searchText, member.name)
          );

      if (displaySymbolFound || filteredMembers.length > 0) {
        searchedAssets.push({
          ...asset,
          memberInfo: filteredMembers,
        });
      }
    });

    setFilteredAssets(searchedAssets);
  }, [searchText]);

  return (
    <Container>
      {/* Temporary code to test burning and minting */}
      <BurnMint />
      <div className="mx-0 mt-14 flex flex-col items-center justify-center lg:mx-40 xl:flex-row">
        <div className="xl:mr-24 xl:w-7/12">
          <ConsortiumTitle />
          <ConsortiumDescription className="mt-4 w-full text-justify dark:text-dark-gray-900" />
        </div>
        {assets.consortiumShares.length > 0 && (
          <div className="mt-14 h-full w-full flex-1 xl:mt-0">
            <AssetBreakdownPieChart
              consortiumShares={assets.consortiumShares}
            />
          </div>
        )}
      </div>
      <ConsortiumLayout className="pb-20">
        <Head title="Consortium" />
        <div className="my-6">
          <SearchInput
            searchText={searchText}
            onSearchText={(text) => setSearchText(text)}
          />
          <div className="mt-6 hidden md:block">
            <AssetBreakdownTable assets={filteredAssets} />
          </div>
        </div>
        <div className="my-6 md:hidden">
          <AssetBreakdownCards assets={filteredAssets} />
        </div>
        {Object.values(filteredAssets).length === 0 && (
          <span
            className="break-all dark:text-dark-gray-900"
            data-testid="AssetBreakdown.EmptyResults"
          >{`No Results found ${
            searchText !== "" ? `for "${searchText}"` : ""
          }`}</span>
        )}
      </ConsortiumLayout>
    </Container>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    assets: {
      items: AssetBreakdownInfo[];
      consortiumShares: ConsortiumShareProps[];
    };
  }>
> {
  const api = getWhaleApiClient(context);
  const items =
    (await api.consortium.getAssetBreakdown().catch(() => undefined)) ?? [];

  /* Hardcode data for testing */
  // items = [
  //   {
  //     tokenSymbol: "BTC",
  //     tokenDisplaySymbol: "dBTC",
  //     memberInfo: [
  //       {
  //         minted: "130",
  //         burned: "130",
  //         tokenId: "1",
  //         id: "1",
  //         name: "Cake",
  //         backingAddresses: ["38pZuWUti3vSQuvuFYs8Lwbyje8cmaGhrT", "backing2"],
  //       },
  //       {
  //         minted: "20.300",
  //         burned: "12312",
  //         tokenId: "2",
  //         id: "2",
  //         name: "Birthday Research",
  //         backingAddresses: ["backing3", "backing4"],
  //       },
  //     ],
  //   },
  //   {
  //     tokenSymbol: "ETH",
  //     tokenDisplaySymbol: "dETH",
  //     memberInfo: [
  //       {
  //         minted: "79.700",
  //         burned: "64564",
  //         tokenId: "1",
  //         id: "1",
  //         name: "Cake",
  //         backingAddresses: ["backing1", "backing2"],
  //       },
  //       {
  //         minted: "79.700",
  //         burned: "12312",
  //         tokenId: "2",
  //         id: "2",
  //         name: "Birthday Research",
  //         backingAddresses: ["backing3", "backing4"],
  //       },
  //     ],
  //   },
  // ];
  const consortiumShares = computeMintedTokens(items);

  return {
    props: {
      assets: {
        items: items,
        consortiumShares,
      },
    },
  };
}

function isSubstringOfText(keyword: string, text: string): boolean {
  return text.toLowerCase().trim().includes(keyword.toLowerCase().trim());
}

function computeMintedTokens(
  assets: AssetBreakdownInfo[]
): ConsortiumShareProps[] {
  let totalMinted = new BigNumber(0);
  const consortiumShares: ConsortiumShareProps[] = [];
  const totalMintedPerMember: {
    [key: string]: {
      name: string;
      total: BigNumber;
      count: number;
    };
  }[] = [];

  // Get total minted tokens per member
  assets.forEach((item) => {
    item.memberInfo.forEach((member) => {
      totalMintedPerMember[member.id] = {
        name: member.name,
        total: new BigNumber(totalMintedPerMember[member.id]?.total ?? 0).plus(
          member.minted
        ),
        count: (totalMintedPerMember[member.id]?.count ?? 0) + 1,
      };
      totalMinted = totalMinted.plus(member.minted);
    });
  });

  // Get share based on total minted tokens per member
  Object.keys(totalMintedPerMember).forEach((key) => {
    const sharePerMember = new BigNumber(totalMintedPerMember[key].total)
      .dividedBy(totalMinted)
      .multipliedBy(100);

    consortiumShares.push({
      id: key,
      member: totalMintedPerMember[key].name,
      minted: sharePerMember.isNaN() ? 0 : Number(sharePerMember),
    });
  });

  return consortiumShares;
}
