import { JSX } from "@babel/types";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  PriceFeedInterval,
  PriceTicker,
} from "@defichain/whale-api-client/dist/api/prices";
import { format } from "date-fns";
import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import classNames from "classnames";
import BigNumber from "bignumber.js";
import { CgSpinner } from "react-icons/cg";
import { NumericFormat } from "react-number-format";
import { IconTooltip } from "@components/commons/IconsTooltip";

interface PriceGraphProps {
  price: PriceTicker;
}

export enum GraphPeriod {
  ONE_DAY = "24H",
  ONE_WEEK = "7D",
  ONE_MONTH = "30D",
  THREE_MONTHS = "90D",
}

export function OracleGraph({
  price: {
    price: { token, currency },
  },
}: PriceGraphProps): JSX.Element {
  const api = useWhaleApiClient();
  const [feed, setFeed] = useState<PriceFeedInterval[] | undefined>(undefined);
  const [graphPeriod, setGraphPeriod] = useState<GraphPeriod>(
    GraphPeriod.THREE_MONTHS
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fifteenMins = 60 * 15;
  const oneHour = 60 * 60;
  const oneDay = 24 * 60 * 60;

  useEffect(() => {
    setIsLoading(true);
    switch (graphPeriod) {
      case GraphPeriod.THREE_MONTHS:
        void fetchTimeFramePriceFeedInterval(
          api,
          token,
          currency,
          90 * 24 * oneHour,
          oneDay
        )
          .then(setFeed)
          .finally(() => setIsLoading(false));
        break;
      case GraphPeriod.ONE_MONTH:
        void fetchTimeFramePriceFeedInterval(
          api,
          token,
          currency,
          30 * 24 * oneHour,
          oneHour
        )
          .then(setFeed)
          .finally(() => setIsLoading(false));
        break;
      case GraphPeriod.ONE_WEEK:
        void fetchTimeFramePriceFeedInterval(
          api,
          token,
          currency,
          7 * 24 * oneHour,
          oneHour
        )
          .then(setFeed)
          .finally(() => setIsLoading(false));
        break;
      case GraphPeriod.ONE_DAY:
      default:
        void fetchTimeFramePriceFeedInterval(
          api,
          token,
          currency,
          24 * oneHour,
          fifteenMins
        )
          .then(setFeed)
          .finally(() => setIsLoading(false));
        break;
    }
  }, [graphPeriod]);

  if (feed === undefined) {
    return (
      <div className="animate-pulse py-64 rounded-md w-full bg-gray-100" />
    );
  }

  return (
    <div
      className="rounded-lg flex flex-col bg-gray-50 dark:bg-gray-800"
      style={{
        height: "32rem",
        maxHeight: "80vh",
      }}
    >
      <div className="flex justify-end flex-wrap text-sm mt-4 mr-10 space-x-0 lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex lg:max-w-max flex-wrap">
          <GraphPeriodButton
            current={graphPeriod}
            graphPeriod={GraphPeriod.ONE_DAY}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_DAY)}
          />
          <GraphPeriodButton
            current={graphPeriod}
            graphPeriod={GraphPeriod.ONE_WEEK}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_WEEK)}
          />
          <GraphPeriodButton
            current={graphPeriod}
            graphPeriod={GraphPeriod.ONE_MONTH}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_MONTH)}
          />
          <GraphPeriodButton
            current={graphPeriod}
            graphPeriod={GraphPeriod.THREE_MONTHS}
            onClick={() => setGraphPeriod(GraphPeriod.THREE_MONTHS)}
          />
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <PriceAreaChart feed={feed} current={graphPeriod} />
      )}
    </div>
  );
}

function GraphPeriodButton({
  current,
  graphPeriod,
  onClick,
}: {
  current: GraphPeriod;
  graphPeriod: GraphPeriod;
  onClick: MouseEventHandler<HTMLDivElement>;
}): JSX.Element {
  return (
    <div
      data-testid="Oracles.GraphPeriodButton"
      className={classNames(
        "rounded p-2 border cursor-pointer mx-0.5 mt-1 lg:mt-0",
        graphPeriod === current
          ? "text-primary-500 bg-primary-100 border-primary-100 dark:bg-dark-primary-500 dark:border-dark-primary-500 dark:text-dark-gray-900"
          : "text-gray-900 dark:text-dark-primary-500 dark:border-gray-700 dark:hover:bg-dark-primary-500 dark:hover:text-white dark:bg-gray-900 bg-gray-200 border-gray-200 hover:bg-primary-50 hover:border-primary-50"
      )}
      onClick={onClick}
      key={graphPeriod}
    >
      {graphPeriod}
    </div>
  );
}

function PriceAreaChart({
  feed,
  current,
}: {
  feed: PriceFeedInterval[];
  current: GraphPeriod;
}): JSX.Element {
  const data = feed.map((value) => ({
    feed: value,
    data: Number(value.aggregated.amount),
    time: value.aggregated.time.start * 1000,
  }));

  function formatXAxis(tickItem): string {
    switch (current) {
      case GraphPeriod.THREE_MONTHS:
        return format(tickItem, "dd MMM");
      case GraphPeriod.ONE_MONTH:
        return format(tickItem, "dd MMM");
      case GraphPeriod.ONE_WEEK:
        return format(tickItem, "dd MMM");
      case GraphPeriod.ONE_DAY:
      default:
        return format(tickItem, "hh aa");
    }
  }

  function formatYAxis(tickItem): string {
    const units = {
      3: "k",
      6: "m",
      9: "b",
    };
    let value = new BigNumber(tickItem);
    const places = Math.floor(value.e! / 3);
    if (value.isGreaterThanOrEqualTo(new BigNumber(1))) {
      value = value.dividedBy(Math.pow(1000, places));
    }
    return `$${value.toFormat(2, {
      decimalSeparator: ".",
      suffix: units[places * 3],
    })}`;
  }

  if (feed.length === 0) {
    return (
      <div className="flex w-full justify-center grid h-full content-center">
        No data found in past {current}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" className="rounded-md">
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 48,
          right: 64,
          bottom: 48,
          left: 32,
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff00af" stopOpacity={0.2} />
            <stop offset="50%" stopColor="#ff00af" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#ff00af" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="#EEEEEE" />

        <XAxis
          dataKey="time"
          type="number"
          minTickGap={64}
          tickMargin={12}
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={formatXAxis}
        />
        <YAxis
          dataKey="data"
          type="number"
          allowDataOverflow
          tickMargin={12}
          scale="linear"
          domain={[
            (dataMin) => (dataMin * 0.99).toPrecision(3),
            (dataMax) => (dataMax * 1.01).toPrecision(3),
          ]}
          tickFormatter={formatYAxis}
        />

        <Tooltip content={(props) => <TooltipDialog {...props} />} />

        <Area
          type="monotone"
          dataKey="data"
          stroke="#ff00af"
          strokeWidth={2}
          fill="url(#gradient)"
          id="oraclesGraphArea"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function TooltipDialog({
  payload,
}: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload.feed as PriceFeedInterval;
  if (feed === undefined) {
    return null;
  }

  function Row(props: { title: string; content: any }): JSX.Element {
    return (
      <div className="flex flex-wrap mt-1.5 text-gray-900 ">
        <div className="w-full text-gray-500 text-sm dark:text-gray-400 dark:opacity-100">
          {props.title}
        </div>
        <div className="font-medium dark:text-gray-100">{props.content}</div>
      </div>
    );
  }

  return (
    <div className="table px-4 py-3 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5 dark:bg-gray-900">
      <div className="font-medium text-gray-900 dark:text-gray-100">
        {format(feed.aggregated.time.start * 1000, "MMM dd, hh:mm:ss aa")}
      </div>
      <Row
        title="Price"
        content={
          <div className="flex items-center">
            <NumericFormat
              displayType="text"
              className="dark:text-gray-100"
              thousandSeparator
              value={feed.aggregated.amount}
              decimalScale={2}
              prefix="$"
              data-testid="LiquidityCardStat.Liquidity.Value"
            />
            <IconTooltip />
          </div>
        }
      />
      <Row
        title="Oracles"
        content={`${Math.round(feed.aggregated.oracles.active * 100) / 100}/${
          feed.aggregated.oracles.total
        } responded`}
      />
    </div>
  );
}

function Spinner(): JSX.Element {
  return (
    <div
      className="flex w-full justify-center grid h-full content-center"
      data-testid="Oracles.Spinner"
    >
      <CgSpinner size={54} className="animate-spin text-primary-500" />
    </div>
  );
}

async function fetchTimeFramePriceFeedInterval(
  api: WhaleApiClient,
  token: string,
  currency: string,
  timeRange: number,
  interval: number
): Promise<PriceFeedInterval[]> {
  const prices: PriceFeedInterval[] = [];
  const after = Date.now() / 1000 - timeRange;
  const dataPoints = timeRange / interval;

  let response = await api.prices.getFeedWithInterval(
    token,
    currency,
    interval,
    dataPoints < 200 ? dataPoints : 200
  );
  prices.push(...response);
  while (response.hasNext && prices.length < dataPoints) {
    response = await api.prices.getFeedWithInterval(
      token,
      currency,
      interval,
      200,
      response.nextToken
    );
    prices.push(...response);
  }

  return prices.filter((p) => p.block.medianTime > after).reverse();
}
