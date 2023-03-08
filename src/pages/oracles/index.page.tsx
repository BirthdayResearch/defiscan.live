import { Head } from "@components/commons/Head";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { prices } from "@defichain/whale-api-client";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Container } from "@components/commons/Container";
import React, { useState } from "react";
import { getPriceCopy, PriceCopy } from "@content/prices";
import classNames from "classnames";
import { Switch } from "@headlessui/react";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import {
  CollateralToken,
  LoanToken,
} from "@defichain/whale-api-client/dist/api/loan";
import { PriceTicker } from "@defichain/whale-api-client/dist/api/prices";
import { OracleFeed, PriceFeedProps } from "./_components/OracleFeed";

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[];
  };
  collateralAndLoanTokens: string[];
}

export default function PricesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const types = ["All", "Crypto", "Stocks", "Forex", "Commodity", "ETF"];

  const [typeSelection, setTypeCurrentSelection] = useState<string>("All");
  const [availabilitySelection, setAvailabilitySelection] =
    useState<boolean>(true);
  let tickers: PriceFeedProps[] = [];
  const collateralAndLoanTokensSet: Set<string> = new Set<string>();

  props.collateralAndLoanTokens.forEach((collateralAndLoanToken) => {
    collateralAndLoanTokensSet.add(collateralAndLoanToken);
  });

  props.prices.items.forEach((item) => {
    const copy: PriceCopy | undefined = getPriceCopy(item.id);
    const ticker = {
      price: item,
      copy: copy,
      isToken: collateralAndLoanTokensSet.has(item.id),
    };
    tickers.push(ticker);
  });

  const dfiTicker = tickers.filter((ticker) => ticker.price.id === "DFI-USD");
  tickers = dfiTicker.concat(
    tickers
      .filter((ticker) => ticker.price.id !== "DFI-USD")
      .sort((a, b) =>
        a.price.id.replace("-", "").localeCompare(b.price.id.replace("-", ""))
      )
  );

  return (
    <Container className="pt-12 pb-20">
      <Head title="Oracles" />

      <div>
        <div className="flex flex-wrap justify-between">
          <h1 className="text-2xl font-medium dark:text-dark-gray-900">
            Prices provided by Oracles
          </h1>

          <div className="flex flex-wrap text-sm mt-8 lg:mt-0 space-x-0 lg:space-x-4 space-y-4 lg:space-y-0">
            <div
              className="flex w-full lg:max-w-max flex-wrap -mx-0.5"
              data-testid="FeedFilter.Types"
            >
              {types.map((type) => (
                <div
                  className={classNames(
                    "rounded p-2 border cursor-pointer mx-0.5 mt-1 lg:mt-0",
                    typeSelection === type
                      ? "text-white bg-primary-500 border-primary-500 dark:bg-dark-primary-500 dark:border-dark-primary-500"
                      : "border-gray-300 text-gray-900 hover:bg-primary-50 dark:text-dark-primary-500 dark:border-gray-700 dark:hover:bg-dark-primary-500 dark:hover:text-white"
                  )}
                  onClick={() => setTypeCurrentSelection(type)}
                  key={type}
                  data-testid="FeedFilter.Types"
                >
                  {type}
                </div>
              ))}
            </div>
            <Switch.Group data-testid="FeedFilter.Availability">
              <div className="flex items-center justify-end">
                <Switch
                  checked={availabilitySelection}
                  onChange={setAvailabilitySelection}
                  className={`${
                    availabilitySelection
                      ? "bg-primary-500"
                      : "bg-gray-200 dark:bg-dark-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
                >
                  <span
                    className={`${
                      availabilitySelection
                        ? "translate-x-6"
                        : "translate-x-1 dark:bg-black"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform `}
                  />
                </Switch>
                <Switch.Label className="ml-1 flex items-center text-gray-900 dark:text-gray-100">
                  dTokens/Collateral Tokens
                  <InfoHoverPopover
                    className="ml-0.5"
                    description="Price of dTokens and Collateral Tokens available on the decentralized loan service."
                  />
                </Switch.Label>
              </div>
            </Switch.Group>
          </div>
        </div>

        <div className="mt-4 -m-4 flex flex-wrap">
          {(() => {
            const sortedTickers = sortByType(
              tickers.filter(
                (item) =>
                  (typeSelection === "All" ||
                    item.copy?.type === typeSelection.toUpperCase()) &&
                  (!availabilitySelection ||
                    item.isToken === availabilitySelection)
              )
            );
            return sortedTickers.length === 0 ? (
              <div className="w-full flex justify-center my-32 text-gray-400">
                No price feed matched your filter selection
              </div>
            ) : (
              sortedTickers.map((item) => (
                <OracleFeed
                  price={item.price}
                  copy={item.copy}
                  key={item.price.id}
                  isToken={item.isToken}
                />
              ))
            );
          })()}
        </div>
      </div>
    </Container>
  );
}

function sortByType(tickers: PriceFeedProps[]): PriceFeedProps[] {
  const typeOrder = ["CRYPTO", "STOCKS", "FOREX", "COMMODITY", "ETF", "UKN"];
  let sortedArr: PriceFeedProps[] = [];

  const groups = tickers.reduce((groups, item) => {
    const key = item.copy?.type === undefined ? "UKN" : item.copy?.type;
    if (key in groups) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }
    return groups;
  }, {});

  typeOrder.forEach((type) => {
    if (type in groups) {
      sortedArr = sortedArr.concat(groups[type]);
    }
  });

  return sortedArr;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const api = getWhaleApiClient(context);

  async function getPrices(): Promise<PriceTicker[]> {
    const prices: prices.PriceTicker[] = [];

    let pricesResponse = await api.prices.list(200);
    prices.push(...pricesResponse);
    while (pricesResponse.hasNext) {
      pricesResponse = await api.prices.list(200, pricesResponse.nextToken);
      prices.push(...pricesResponse);
    }
    return prices;
  }

  async function getCollateralTokens(): Promise<CollateralToken[]> {
    const collateralTokens: CollateralToken[] = [];

    let collateralTokensResponse = await api.loan.listCollateralToken(200);
    collateralTokens.push(...collateralTokensResponse);
    while (collateralTokensResponse.hasNext) {
      collateralTokensResponse = await api.loan.listCollateralToken(
        200,
        collateralTokensResponse.nextToken
      );
      collateralTokens.push(...collateralTokensResponse);
    }
    return collateralTokens;
  }

  async function getLoanTokens(): Promise<LoanToken[]> {
    const loanTokens: LoanToken[] = [];

    let loanTokensResponse = await api.loan.listLoanToken(200);
    loanTokens.push(...loanTokensResponse);
    while (loanTokensResponse.hasNext) {
      loanTokensResponse = await api.loan.listLoanToken(
        200,
        loanTokensResponse.nextToken
      );
      loanTokens.push(...loanTokensResponse);
    }
    return loanTokens;
  }

  const [prices, collateralTokens, loanTokens] = await Promise.all([
    getPrices(),
    getCollateralTokens(),
    getLoanTokens(),
  ]);

  const collateralAndLoanTokens: string[] = [];

  collateralTokens.forEach((collateralToken) => {
    collateralAndLoanTokens.push(
      collateralToken.fixedIntervalPriceId.replace("/", "-")
    );
  });

  loanTokens.forEach((loanToken) => {
    collateralAndLoanTokens.push(
      loanToken.fixedIntervalPriceId.replace("/", "-")
    );
  });

  return {
    props: {
      prices: {
        items: prices,
      },
      collateralAndLoanTokens: collateralAndLoanTokens,
    },
  };
}
