import { AdaptiveList } from "@components/commons/AdaptiveList";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { getAssetIcon, getTokenIcon } from "@components/icons/assets/tokens";
import { getWhaleApiClient, useWhaleApiClient } from "@contexts/WhaleContext";
import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { IoAlertCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { Container } from "@components/commons/Container";
import { AddressLinkExternal } from "@components/commons/link/AddressLink";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { NumericFormat } from "react-number-format";
import { Head } from "@components/commons/Head";
import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  TOKEN_BACKED,
  TOKEN_BACKED_ADDRESS,
} from "constants/TokenBackedAddress";
import { getTokenName } from "../../utils/commons/token/getTokenName";
import { isAlphanumeric, isNumeric } from "../../utils/commons/StringValidator";
import { getAllTokens } from "./shared/getAllTokens";

interface TokenAssetPageProps {
  token: TokenData;
}

export default function TokenIdPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const api = useWhaleApiClient();
  const [burnedAmount, setBurnedAmount] = useState<BigNumber | undefined>();
  const [netSupply, setNetSupply] = useState<BigNumber | undefined>();

  useEffect(() => {
    api.address
      .listToken("8defichainBurnAddressXXXXXXXdRQkSm", 200)
      .then((data) => {
        const burntToken = data.find(
          (token) => token.symbol === props.token.symbol,
        );

        if (
          props.token.isDAT &&
          !props.token.isLPS &&
          props.token.symbol !== "DFI"
        ) {
          if (burntToken !== undefined) {
            setBurnedAmount(new BigNumber(burntToken.amount));
            setNetSupply(
              new BigNumber(props.token.minted).minus(burntToken.amount),
            );
          } else {
            setBurnedAmount(new BigNumber(0));
            setNetSupply(new BigNumber(props.token.minted));
          }
        }
      })
      .catch(() => {
        if (
          props.token.isDAT &&
          !props.token.isLPS &&
          props.token.symbol !== "DFI"
        ) {
          setBurnedAmount(undefined);
          setNetSupply(new BigNumber(props.token.minted));
        }
      });
  }, []);

  return (
    <>
      <Head title={`${props.token.displaySymbol}`} />
      <Container className="pt-4 pb-20">
        <TokenPageHeading token={props.token} />
        <div className="flex flex-col space-y-6 mt-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
          <ListLeft
            token={props.token}
            burnedAmount={burnedAmount}
            netSupply={netSupply}
          />
          <ListRight token={props.token} />
        </div>
      </Container>
    </>
  );
}

function TokenPageHeading({ token }: { token: TokenData }): JSX.Element {
  const name = getTokenName(token);

  return (
    <div>
      <Breadcrumb
        items={[
          {
            path: "/tokens",
            name: "Tokens",
          },
          {
            path: `/tokens/${
              token.isDAT || token.isLPS
                ? token.displaySymbol
                : token.displaySymbol.concat("-", token.id)
            }`,
            name: `${name}`,
            canonical: true,
            isCurrentPath: true,
          },
        ]}
      />

      {(() => {
        const Icon = token.isDAT
          ? getAssetIcon(token.symbol)
          : getTokenIcon(token.symbol);

        return (
          <div className="flex flex-row flex-wrap items-center mt-8">
            <Icon className="h-10 w-10 mr-4" />
            <h1
              data-testid="PageHeading"
              className="text-2xl font-semibold dark:text-dark-gray-900"
            >
              {name}
            </h1>
          </div>
        );
      })()}
    </div>
  );
}

function ListRight({ token }: { token: TokenData }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="Decimal">{token.decimal} Places</AdaptiveList.Row>
      <AdaptiveList.Row name="Limit">{token.limit}</AdaptiveList.Row>
      <AdaptiveList.Row name="LPS">
        {token.isLPS ? "Yes" : "No"}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Tradable">
        {(() => {
          if (token.tradeable) {
            return (
              <div className="flex flex-wrap items-center">
                <div>Yes</div>
                <IoCheckmarkCircle className="h-4 w-4 text-green-500 ml-1" />
              </div>
            );
          }
          return (
            <div className="flex flex-wrap items-center">
              <div>No</div>
              <IoAlertCircleOutline className="h-4 w-4 text-gray-500 ml-1" />
            </div>
          );
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Finalized">
        {token.finalized ? "Yes" : "No"}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Destruction Height">
        {token.destruction.height}
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Destruction TX"
        className="flex space-x-10 items-center"
      >
        <div className="break-all">{token.destruction.tx}</div>
      </AdaptiveList.Row>
      <BackingAddress tokenSymbol={token.symbol} />
    </AdaptiveList>
  );
}

function ListLeft({
  token,
  burnedAmount,
  netSupply,
}: {
  token: TokenData;
  burnedAmount?: BigNumber;
  netSupply?: BigNumber;
}): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="Category">
        {(() => {
          if (token.isLPS) {
            return "LPS";
          }

          if (token.isDAT) {
            return "DAT";
          }

          return "DCT";
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Symbol">{token.displaySymbol}</AdaptiveList.Row>
      <AdaptiveList.Row name="Mintable">
        {(() => {
          if (token.mintable) {
            return (
              <div className="flex flex-wrap items-center">
                <div>Yes</div>
                <IoCheckmarkCircle className="h-4 w-4 text-green-500 ml-1" />
              </div>
            );
          }
          return (
            <div className="flex flex-wrap items-center">
              <div>No</div>
              <IoAlertCircleOutline className="h-4 w-4 text-gray-500 ml-1" />
            </div>
          );
        })()}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Minted">
        <NumericFormat
          displayType="text"
          thousandSeparator
          value={new BigNumber(token.minted).toFixed(8)}
          decimalScale={8}
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Burned">
        {burnedAmount === undefined ? (
          "N/A"
        ) : (
          <NumericFormat
            displayType="text"
            thousandSeparator
            value={burnedAmount.toFixed(8)}
            decimalScale={8}
          />
        )}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Net Supply">
        {netSupply === undefined ? (
          "N/A"
        ) : (
          <NumericFormat
            displayType="text"
            thousandSeparator
            value={netSupply.toFixed(8)}
            decimalScale={8}
          />
        )}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Creation Height">
        <NumericFormat
          displayType="text"
          thousandSeparator
          value={token.creation.height}
          decimalScale={8}
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Creation Tx"
        className="flex space-x-10 items-center"
      >
        <TxIdLink txid={token.creation.tx} className="break-all" />
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}

function BackingAddress({ tokenSymbol }: { tokenSymbol: string }): JSX.Element {
  if (!TOKEN_BACKED.map((token) => token.symbol).includes(tokenSymbol)) {
    return <></>;
  }

  return (
    <AdaptiveList.Row name="Backing Address" className="break-all">
      {(() => {
        switch (tokenSymbol) {
          case "BCH":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.BCH.cake.link}
                text={TOKEN_BACKED_ADDRESS.BCH.cake.address}
                testId="BackingAddress.BCH"
              />
            );
          case "LTC":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.LTC.cake.link}
                text={TOKEN_BACKED_ADDRESS.LTC.cake.address}
                testId="BackingAddress.LTC"
              />
            );
          case "DOGE":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.DOGE.cake.link}
                text={TOKEN_BACKED_ADDRESS.DOGE.cake.address}
                testId="BackingAddress.DOGE"
              />
            );
          case "BTC":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.BTC.cake.link}
                text={TOKEN_BACKED_ADDRESS.BTC.cake.address}
                testId="BackingAddress.BTC"
              />
            );
          case "MATIC":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.MATIC.cake.link}
                text={TOKEN_BACKED_ADDRESS.MATIC.cake.address}
                testId="BackingAddress.MATIC"
              />
            );
          case "SOL":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.SOL.cake.link}
                text={TOKEN_BACKED_ADDRESS.SOL.cake.address}
                testId="BackingAddress.SOL"
              />
            );
          case "DOT":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.DOT.cake.link}
                text={TOKEN_BACKED_ADDRESS.DOT.cake.address}
                testId="BackingAddress.DOT"
              />
            );
          case "SUI":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.SUI.cake.link}
                text={TOKEN_BACKED_ADDRESS.SUI.cake.address}
                testId="BackingAddress.SUI"
              />
            );
          case "ETH":
          case "USDC":
          case "USDT":
          case "EUROC":
            return (
              <AddressLinkExternal
                url={TOKEN_BACKED_ADDRESS.ETH.cake.link}
                text={TOKEN_BACKED_ADDRESS.ETH.cake.address}
                testId="BackingAddress.ETH"
              />
            );
        }
      })()}
    </AdaptiveList.Row>
  );
}

async function getTokenByParam(
  param: string,
  api: WhaleApiClient,
): Promise<TokenData | undefined> {
  const tokenList: TokenData[] = await getAllTokens(api);

  return tokenList.find((t) => {
    if (t.isDAT || t.isLPS) {
      return t.displaySymbol.toLowerCase() === param.toLowerCase();
    }
    const i = param.lastIndexOf("-");
    const displaySymbol = param.substring(0, i);
    const id = param.substring(i + 1);
    return (
      t.displaySymbol.toLowerCase() === displaySymbol.toLowerCase() &&
      id === t.id
    );
  });
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<TokenAssetPageProps>> {
  const api = getWhaleApiClient(context);
  const param = context.params?.id?.toString().trim() as string;

  if (!isAlphanumeric(param, "-")) {
    return { notFound: true };
  }

  let token: TokenData | undefined;
  if (isNumeric(param)) {
    try {
      token = await api.tokens.get(param);
    } catch (e) {
      return { notFound: true };
    }
  } else {
    token = await getTokenByParam(param, api);
  }

  if (token === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      token,
    },
  };
}
