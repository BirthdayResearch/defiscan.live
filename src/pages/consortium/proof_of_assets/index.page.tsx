import { Container } from "@components/commons/Container";
import { Head } from "@components/commons/Head";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import {
  AssetBreakdownInfo,
  MemberWithTokenInfo,
} from "@defichain/whale-api-client/dist/api/consortium";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import React, { useEffect, useState } from "react";
import {
  ConsortiumDescription,
  ConsortiumLayout,
  ConsortiumTitle,
} from "../_components/ConsortiumLayout";
import { ProofOfAssetCards } from "./_components/ProofOfAssetsCards";
import { ProofOfAssetsTable } from "./_components/ProofOfAssetsTable";

export default function ProofOfAssets({
  assets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredAssets, setFilteredAssets] = useState(assets.items);

  useEffect(() => {
    const searchedAssets: AssetBreakdownInfo[] = [];

    assets.items.forEach((asset) => {
      const filteredMembers: MemberWithTokenInfo[] = [];
      const symbolFound = isSubstringOfText(searchText, asset.tokenSymbol);

      asset.memberInfo.forEach((memberInfo) => {
        const nameFound = isSubstringOfText(searchText, memberInfo.name);
        const filteredBackingAddress = memberInfo.backingAddresses.filter(
          (address) => address.includes(searchText)
        );

        /* If keyword in member name, show all backing address */
        if (nameFound) {
          filteredMembers.push(memberInfo);
        } else if (!nameFound && filteredBackingAddress.length !== 0) {
          /* If keyword not in member name, show filtered backing address */
          filteredMembers.push({
            ...memberInfo,
            backingAddresses: filteredBackingAddress,
          });
        }
      });

      if (symbolFound) {
        searchedAssets.push(asset);
      } else if (symbolFound || filteredMembers.length > 0) {
        searchedAssets.push({
          ...asset,
          memberInfo: filteredMembers,
        });
      }
    });

    setFilteredAssets(searchedAssets);
  }, [searchText]);

  return (
    <Container className="mt-16">
      <ConsortiumTitle />
      <ConsortiumDescription className="mt-4 w-6/12 text-justify dark:text-dark-gray-900" />
      <ConsortiumLayout className="pt-7 pb-20">
        <Head title="Consortium" />
        <input
          className="h-10 rounded-md border border-gray-200 px-2"
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="my-6 hidden md:block">
          <ProofOfAssetsTable assets={filteredAssets} />
          {Object.values(filteredAssets).length === 0 && (
            <div>{`No Results found ${
              searchText !== "" ? `for ${searchText}` : ""
            }`}</div>
          )}
        </div>
        <div className="my-6 md:hidden">
          <ProofOfAssetCards assets={filteredAssets} />
          {Object.values(assets.items).length === 0 && (
            <div>No Results found</div>
          )}
        </div>
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
    };
  }>
> {
  const api = getWhaleApiClient(context);
  let items =
    (await api.consortium.getAssetBreakdown().catch(() => undefined)) ?? [];

  /* Hardcode data for testing */
  items = [
    {
      tokenSymbol: "BTC",
      tokenDisplaySymbol: "dBTC",
      memberInfo: [
        {
          minted: "12312",
          burned: "12312",
          tokenId: "1",
          id: "1",
          name: "Cake",
          backingAddresses: ["backing1", "backing2"],
        },
        {
          minted: "12312",
          burned: "12312",
          tokenId: "2",
          id: "2",
          name: "Birthday Research",
          backingAddresses: ["backing3", "backing4"],
        },
      ],
    },
    {
      tokenSymbol: "ETH",
      tokenDisplaySymbol: "dETH",
      memberInfo: [
        {
          minted: "12645641222",
          burned: "64564",
          tokenId: "1",
          id: "1",
          name: "Cake",
          backingAddresses: ["backing1", "backing2"],
        },
        {
          minted: "12312",
          burned: "12312",
          tokenId: "2",
          id: "2",
          name: "Birthday Research",
          backingAddresses: ["backing3", "backing4"],
        },
      ],
    },
  ];

  return {
    props: {
      assets: {
        items: items,
      },
    },
  };
}

function isSubstringOfText(keyword: string, text: string): boolean {
  return text.toLowerCase().trim().includes(keyword.toLowerCase().trim());
}
