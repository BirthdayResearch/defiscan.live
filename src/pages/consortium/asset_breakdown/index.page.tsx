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

export interface TotalMintedByMemberProps {
  member: string;
  value: number;
}

export default function AssetBreakdown({
  assets,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  // const [selectedToken, setSelectedToken] = useState("All Tokens");
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

  // function handleDropdownFilter(token: string): void {
  //   setSelectedToken(token);
  // }

  return (
    <Container>
      <div className="mx-0 mt-14 flex flex-col items-center justify-center lg:mx-40 xl:flex-row">
        <div className="xl:mr-24 xl:w-7/12">
          <ConsortiumTitle />
          <ConsortiumDescription className="mt-4 w-full text-justify dark:text-dark-gray-900" />
        </div>
        <div className="mt-14 h-full w-full flex-1 xl:mt-0">
          <AssetBreakdownPieChart
            totalMintedByMember={assets.totalMintedByMember}
          />
        </div>
      </div>
      <ConsortiumLayout className="pb-20">
        <Head title="Consortium" />
        <div className="my-6">
          {/* <TokenMenu
          selectedToken={selectedToken}
          handleDropdownFilter={handleDropdownFilter}
        /> */}

          {/* <div className="relative flex flex-col border-b border-gray-200 md:flex-row"> */}
          {/* <AssetBreakdownPieChart /> */}
          {/* <AssetBreakdownPercentageChart
            selectedToken="All Tokens"
            totalBreakdown={{
              mintedColor: "bg-green-500",
              backedColor: "bg-green-100",
              percentage: 60,
              header: "Total",
              backedTokens: "12312.412342142",
              mintedTokens: "131234.12313122",
            }}
            assetBreakdown={[
              {
                mintedColor: "bg-primary-600",
                backedColor: "bg-primary-100",
                percentage: 30.12,
                header: "Cake",
                backedTokens: "12312.412342142",
                mintedTokens: "131234.12313122",
              },
              {
                mintedColor: "bg-hyperlink-focused",
                backedColor: "bg-blue-300",
                percentage: 69.88,
                header: "Birthday Research",
                backedTokens: "12312.412342142",
                mintedTokens: "131234.12313122",
              },
            ]}
          /> */}
          {/* </div> */}
          <input
            className="h-10 rounded-md border border-gray-200 px-2"
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(e.target.value);
            }}
          />
          <div className="mt-6 hidden md:block">
            <AssetBreakdownTable assets={filteredAssets} />
          </div>
        </div>

        <div className="my-6 md:hidden">
          <AssetBreakdownCards assets={filteredAssets} />
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
      totalMintedByMember: TotalMintedByMemberProps[];
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
          minted: "130",
          burned: "130",
          tokenId: "1",
          id: "1",
          name: "Cake",
          backingAddresses: ["backing1", "backing2"],
        },
        {
          minted: "20.300",
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
          minted: "79.700",
          burned: "64564",
          tokenId: "1",
          id: "1",
          name: "Cake",
          backingAddresses: ["backing1", "backing2"],
        },
        {
          minted: "79.700",
          burned: "12312",
          tokenId: "2",
          id: "2",
          name: "Birthday Research",
          backingAddresses: ["backing3", "backing4"],
        },
      ],
    },
  ];
  const totalMintedByMember = computeMintedTokens(items);

  return {
    props: {
      assets: {
        items: items,
        totalMintedByMember,
      },
    },
  };
}

// export function TokenMenu({
//   selectedToken,
//   handleDropdownFilter,
// }: {
//   selectedToken: string;
//   handleDropdownFilter: (token: string) => void;
// }): JSX.Element {
//   const tokens = ["All Tokens", "dDOGE", "dETH", "dBTC"];
//   return (
//     <div className="mb-6 flex items-center">
//       <div className="mr-2 text-lg dark:text-dark-gray-900">Show: </div>
//       <Menu as="div" className="relative flex w-full">
//         <Menu.Button className="flex items-center rounded border border-gray-300 bg-white py-3 px-4 dark:bg-dark-gray-200 dark:text-dark-gray-900">
//           <div className="ml-2 font-medium leading-none text-gray-900 dark:text-dark-gray-100">
//             {selectedToken}
//           </div>
//           <MdArrowDropDown className="ml-1 h-6 w-6 text-gray-400 dark:text-dark-gray-100" />
//         </Menu.Button>

//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="absolute left-0 top-14 z-10 w-36 rounded border border-gray-200 bg-white shadow-lg dark:bg-dark-gray-200">
//             <div className="py-1">
//               {tokens.map((item) => (
//                 <Menu.Item key={item}>
//                   {({ active }) => (
//                     <div
//                       className="flex cursor-pointer items-end justify-between px-4 py-2 text-sm dark:text-dark-gray-900"
//                       onClick={() => handleDropdownFilter(item)}
//                     >
//                       <div
//                         className={
//                           active || selectedToken === item
//                             ? "font-medium text-primary-500"
//                             : ""
//                         }
//                       >
//                         {item}
//                       </div>
//                       {selectedToken === item && (
//                         <BiCheck className="ml-1 text-xl text-primary-500" />
//                       )}
//                     </div>
//                   )}
//                 </Menu.Item>
//               ))}
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </div>
//   );
// }

function isSubstringOfText(keyword: string, text: string): boolean {
  return text.toLowerCase().trim().includes(keyword.toLowerCase().trim());
}

function computeMintedTokens(
  assets: AssetBreakdownInfo[]
): TotalMintedByMemberProps[] {
  let totalMinted = new BigNumber(0);
  const totalMintedByMember: TotalMintedByMemberProps[] = [];
  const totalMintedPerMember: {
    [key: string]: {
      total: BigNumber;
      count: number;
    };
  }[] = [];

  assets.forEach((item) => {
    item.memberInfo.forEach((member) => {
      totalMintedPerMember[member.name] = {
        total: new BigNumber(
          totalMintedPerMember[member.name]?.total ?? 0
        ).plus(member.minted),
        count: (totalMintedPerMember[member.name]?.count ?? 0) + 1,
      };
      totalMinted = totalMinted.plus(member.minted);
    });
  });

  Object.keys(totalMintedPerMember).forEach((key) => {
    totalMintedByMember.push({
      member: key,
      value: Number(
        new BigNumber(totalMintedPerMember[key].total)
          .dividedBy(totalMinted)
          .multipliedBy(100)
          .toFixed(2)
      ),
    });
  });

  return totalMintedByMember;
}
