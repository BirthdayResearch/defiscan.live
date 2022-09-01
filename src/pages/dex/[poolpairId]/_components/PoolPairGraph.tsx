import React, { useEffect, useState } from "react";
import {
  PoolPairData,
  PoolSwapAggregatedData,
  PoolSwapAggregatedInterval,
} from "@defichain/whale-api-client/dist/api/poolpairs";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { WhaleApiClient } from "@defichain/whale-api-client";
import BigNumber from "bignumber.js";
import { JSX } from "@babel/types";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
import { UnitSuffix } from "@components/commons/UnitSuffix";

export function PoolPairGraph(props: { poolpair: PoolPairData }): JSX.Element {
  const api = useWhaleApiClient();
  const [feed, setFeed] = useState<PoolSwapAggregatedData[] | undefined>(
    undefined
  );

  useEffect(() => {
    void fetchDailySwaps(api, props.poolpair.id).then(setFeed);
  }, []);

  if (feed === undefined) {
    return (
      <div className="animate-pulse py-64 rounded-md w-full bg-gray-100" />
    );
  }

  return (
    <div
      className="bg-gray-50 rounded-lg py-4 md:py-6 px-4 md:px-8 flex flex-col"
      data-testid="PoolPairGraph"
    >
      <span className="block w-full font-medium text-lg" data-testid="Title">
        Volume (24H)
      </span>
      <div className="w-full h-96">
        <VolumeBarChart feed={feed} />
      </div>
    </div>
  );
}

function VolumeBarChart({
  feed,
}: {
  feed: PoolSwapAggregatedData[];
}): JSX.Element {
  const data = feed.map((value) => ({
    feed: value,
    time: value.block.medianTime * 1000,
  }));

  function formatXAxis(tickItem): string {
    const units = {
      3: "k",
      6: "m",
      9: "b",
    };
    const value = new BigNumber(tickItem);
    const places = Math.floor(value.e! / 3);

    return `$${value.dividedBy(Math.pow(1000, places)).toFormat(0, {
      suffix: units[places * 3],
    })}`;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 16,
        }}
      >
        <YAxis
          allowDataOverflow
          domain={[0, "dataMax"]}
          axisLine={false}
          tickFormatter={formatXAxis}
          orientation="right"
          fontSize="13"
          tickMargin={8}
        />

        <CartesianGrid vertical={false} stroke="#EEEEEE" />

        <XAxis
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(time) => format(time, "hh")}
          tickMargin={8}
        />

        <Tooltip content={(props) => <TooltipDialog {...props} />} />

        <Line dataKey="feed.aggregated.usd" stroke="#ff00af" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function TooltipDialog({
  payload,
}: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload.feed as PoolSwapAggregatedData;
  if (feed === undefined) {
    return null;
  }
  const blockTime = format(
    fromUnixTime(feed.block.medianTime),
    "MMM dd, hh:mm aa"
  );

  return (
    <div className="table p-5 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5">
      <div className="text-2xl font-medium text-gray-900">
        $
        <UnitSuffix
          value={Number(feed.aggregated.usd)}
          units={{
            3: "k",
            6: "m",
            9: "b",
          }}
          noSuffixSpacing
        />
      </div>
      <div className="text-sm text-gray-600">{`${blockTime} (UTC)`}</div>
    </div>
  );
}

async function fetchDailySwaps(
  api: WhaleApiClient,
  poolpairId: string
): Promise<PoolSwapAggregatedData[]> {
  const aggregates: PoolSwapAggregatedData[] = [];

  const response = await api.poolpairs.listPoolSwapAggregates(
    poolpairId,
    PoolSwapAggregatedInterval.ONE_HOUR,
    24
  );
  aggregates.push(...response);

  return aggregates.reverse();
}
