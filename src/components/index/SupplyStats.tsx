import { PropsWithChildren, useEffect, useState } from "react";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import { NumericFormat } from "react-number-format";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import {
  StatsData,
  SupplyData,
} from "@defichain/whale-api-client/dist/api/stats";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { DFI as DfiIcon } from "@components/icons/assets/tokens/DFI";
import { CalculatePercentage } from "../../utils/index/CalculatePercentage";

interface SupplyStatsStateI {
  stats: StatsData | null;
  supply: SupplyData | null;
}

export function SupplyStats(): JSX.Element {
  const apiClient = useWhaleApiClient();

  const [data, setData] = useState<SupplyStatsStateI>({
    stats: null,
    supply: null,
  });

  useEffect(() => {
    apiClient.stats.get().then((stats) => {
      setData((prev) => ({
        ...prev,
        stats,
      }));
    });

    apiClient.stats.getSupply().then((supply) => {
      setData((prev) => ({
        ...prev,
        supply,
      }));
    });
  }, []);

  return (
    <section className="mb-12">
      <CollapsibleSection heading="Overview" mdNotCollapsible>
        <div className="flex flex-wrap" data-testid="SupplyStats.Desktop">
          <div className="w-full lg:w-3/12 mr-2 flex">
            <StatPriceCard usd={data.stats?.price.usd} />
          </div>
          <div
            className="w-full lg:w-9/12 flex flex-wrap -m-1"
            data-testid="IndexStats.Desktop"
          >
            <StatCard
              infodesc="Total DFI Minted  is the total number of DFI emitted to date."
              heading="Total DFI Minted"
              stat={data.supply?.total}
              suffix="/ 1.2B"
              testId="StatCard.TotalMinted"
            >
              <div className="mt-auto text-gray-500 text-sm dark:text-gray-400">
                <span className="text-black font-medium mr-1 dark:text-gray-100">
                  {CalculatePercentage(data.supply?.total, data.supply?.max)}
                </span>
                of max supply
              </div>
            </StatCard>
            <StatCard
              infodesc="Circulating DFI is the total number of DFI coins that are publicly available and is circulating in the market."
              heading="Circulating DFI"
              stat={data.supply?.circulating}
              suffix="DFI"
              testId="StatCard.Circulating"
            >
              <div className="mt-auto text-gray-500 text-sm dark:text-gray-400">
                <span className="text-black font-medium mr-1 dark:text-gray-100">
                  {CalculatePercentage(
                    data.supply?.circulating,
                    data.supply?.total,
                  )}
                </span>
                of total minted
              </div>
            </StatCard>
            <StatCard
              infodesc="Total Value Locked is the overall value of assets deposited in DeFiChain. This includes assets locked in DEXs, Masternodes, and collaterals in vaults"
              heading="Total Value Locked"
              stat={data.stats?.tvl.total}
              prefix="$"
              testId="StatCard.Tvl"
            >
              <div className="mt-auto text-gray-500 dark:text-gray-400 flex divide-x text-sm -mx-1">
                <div className="px-1">
                  DEX:
                  <span className="text-black font-medium ml-1 dark:text-gray-100">
                    {CalculatePercentage(
                      data.stats?.tvl.dex,
                      data.stats?.tvl.total,
                    )}
                  </span>
                </div>
                <div className="px-1">
                  <span className="hidden xl:inline-block">Masternodes:</span>
                  <span className="xl:hidden">MN:</span>
                  <span className="text-black font-medium ml-1 dark:text-gray-100">
                    {CalculatePercentage(
                      data.stats?.tvl.masternodes,
                      data.stats?.tvl.total,
                    )}
                  </span>
                </div>
                <div className="px-1">
                  Vaults:
                  <span className="text-black font-medium ml-1 dark:text-gray-100">
                    {CalculatePercentage(
                      data.stats?.tvl.loan,
                      data.stats?.tvl.total,
                    )}
                  </span>
                </div>
              </div>
            </StatCard>
            <StatCard
              infodesc="Total DFI Burned is the total amount of DFI coins removed from circulation."
              heading="Total DFI Burned"
              stat={data.supply?.burned}
              testId="StatCard.TotalBurned"
            >
              <div className="mt-auto text-gray-500 text-sm dark:text-gray-400">
                <span className="text-black mr-1 dark:text-gray-100">
                  {CalculatePercentage(data.supply?.burned, data.supply?.total)}
                </span>
                of total minted
              </div>
            </StatCard>
          </div>
        </div>
      </CollapsibleSection>
    </section>
  );
}

function StatCard(
  props: PropsWithChildren<{
    infodesc: string;
    heading: string;
    stat: number | undefined;
    prefix?: string;
    suffix?: string;
    testId: string;
  }>,
): JSX.Element {
  return (
    <div className="w-full md:w-1/2 p-1" data-testid={props.testId}>
      <div className="flex flex-col border dark:bg-gray-800 dark:border-gray-700 border-gray-200 p-4 md:p-5 rounded-lg">
        <div className="flex items-center">
          <span className="font-normal text-sm md:text-base mr-1 dark:text-gray-400">
            {props.heading}
          </span>
          <InfoHoverPopover description={props.infodesc} />
        </div>
        <div className="flex flex-wrap items-center">
          {props.stat !== undefined ? (
            <NumericFormat
              value={props.stat}
              displayType="text"
              thousandSeparator
              className="text-lg lg:text-2xl font-semibold dark:text-dark-gray-900"
              decimalScale={0}
              prefix={props.prefix !== undefined ? props.prefix : ""}
            />
          ) : (
            "..."
          )}
          {props.suffix !== undefined && (
            <span className="ml-1 dark:text-gray-400">{props.suffix}</span>
          )}
        </div>
        <div className="mt-2">{props.children}</div>
      </div>
    </div>
  );
}

function StatPriceCard(props: { usd: number | undefined }): JSX.Element {
  return (
    <div
      className="rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5 lg:p-8 flex flex-col flex-1 mb-2 lg:mb-0"
      data-testid="StatPriceCard"
    >
      <div className="space-y-1.5 md:space-y-2.5">
        <div className="flex items-center">
          <DfiIcon className="text-2xl md:text-3xl" />
          <div className="ml-2 dark:text-gray-400">$DFI Price</div>
        </div>
        <div
          data-testid="StatPriceCard.Price"
          className="font-semibold text-2xl md:text-4xl lg:text-5xl dark:text-dark-gray-900"
        >
          <NumericFormat
            displayType="text"
            thousandSeparator
            value={props.usd}
            decimalScale={2}
            prefix="$"
          />
        </div>
      </div>
    </div>
  );
}
