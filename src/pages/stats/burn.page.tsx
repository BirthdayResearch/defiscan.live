import { Head } from "@components/commons/Head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import React from "react";
import { Container } from "@components/commons/Container";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";

interface BurnInfoData {
  burnInfo: {
    address: string;
    amount: string;
    tokens: string[];
    feeburn: string;
    emissionburn: string;
    auctionburn: string;
    paybackburn: string;
    dfipaybackfee: string;
    dfipaybacktokens: string[];
    dexfeetokens: string[];
  };
  burnRates: Array<{
    symbol: string;
    rate: string;
  }>;
}

export default function BurnPage({
  burnInfo,
  burnRates,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title="Payback Burn Stats" />
      <Container>
        <div className="text-2xl font-medium mt-10 mb-2 dark:text-dark-gray-900">
          Payback Burn Stats
        </div>
        <div className="text-xl font-medium mt-6 mb-2 dark:text-dark-gray-900">
          DFI
        </div>
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="DFI Burned">
            <NumericFormat
              displayType="text"
              thousandSeparator
              value={burnInfo.dfipaybackfee}
              decimalScale={0}
              data-testid="LiquidityCardStat.APR.Value"
            />
          </AdaptiveList.Row>
        </AdaptiveList>
        {burnRates.map((tokenRates) => {
          return (
            <div key={tokenRates.symbol}>
              <div className="text-xl font-medium mt-6 mb-2 dark:text-dark-gray-900">
                {tokenRates.symbol}
              </div>
              <AdaptiveList className="w-full lg:w-1/2">
                <AdaptiveList.Row name={`${tokenRates.symbol} Burned`}>
                  <NumericFormat
                    displayType="text"
                    thousandSeparator
                    value={
                      burnInfo.dexfeetokens.filter((token) =>
                        token.endsWith("@DUSD")
                      )[0]
                    }
                    decimalScale={0}
                  />
                </AdaptiveList.Row>
                <AdaptiveList.Row
                  name="Burn %"
                  infoDesc={
                    <div className="px-3 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md">
                      <pre> dexfeetokens / dfipaybacktokens * 100 = burn %</pre>
                    </div>
                  }
                >
                  <NumericFormat
                    displayType="text"
                    thousandSeparator
                    value={burnRates[0].rate}
                    decimalScale={3}
                    suffix="%"
                  />
                </AdaptiveList.Row>
              </AdaptiveList>
            </div>
          );
        })}
        <div className="mt-5 bg-gray-100 p-6 border-gray-500 text-gray-600 dark:bg-gray-800 ark:border-gray-700 dark:text-dark-gray-900 rounded">
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(burnInfo, null, 2)}
          </pre>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<BurnInfoData>> {
  const api = getWhaleApiClient(context);
  const burnInfo = await api.stats.getBurn();

  const burnRates = burnInfo.dfipaybacktokens.map((token) => {
    const amount = token.split("@")[0];
    const symbol = token.split("@")[1];

    const rate = new BigNumber(
      burnInfo.dexfeetokens
        .filter((token) => token.endsWith(`@${symbol}`))[0]
        .replace(`@${symbol}`, "")
    )
      .div(amount)
      .multipliedBy(100);

    return {
      symbol: symbol,
      rate: rate.toFixed(8),
    };
  });

  return {
    props: {
      burnInfo: {
        address: burnInfo.address,
        amount: burnInfo.amount.toFixed(8),
        tokens: burnInfo.tokens,
        feeburn: burnInfo.feeburn.toFixed(8),
        auctionburn: burnInfo.auctionburn.toFixed(8),
        paybackburn: burnInfo.paybackburn.toFixed(8),
        dexfeetokens: burnInfo.dexfeetokens,
        dfipaybackfee: new BigNumber(burnInfo.dfipaybackfee)
          .multipliedBy(100)
          .toFixed(8),
        dfipaybacktokens: burnInfo.dfipaybacktokens,
        emissionburn: burnInfo.emissionburn.toFixed(8),
      },
      burnRates,
    },
  };
}
