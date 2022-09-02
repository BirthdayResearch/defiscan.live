import { DfTx, SetOracleData } from "@defichain/jellyfish-transaction";
import BigNumber from "bignumber.js";
import { format, fromUnixTime } from "date-fns";

import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AdaptiveTable } from "@components/commons/AdaptiveTable";
import { TokenAmount } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_price";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetOracleDataProps {
  dftx: DfTx<SetOracleData>;
}

export function DfTxSetOracleData(props: DfTxSetOracleDataProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Oracle Data" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <SetOracleDataDetails
          oracleId={props.dftx.data.oracleId}
          timestamp={props.dftx.data.timestamp}
        />
        {props.dftx.data.tokens.length > 0 && (
          <AdaptiveTable className="w-full lg:w-1/2">
            <AdaptiveTable.Header>
              <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
              <AdaptiveTable.Head>AMOUNT</AdaptiveTable.Head>
              <AdaptiveTable.Head>CURRENCY</AdaptiveTable.Head>
            </AdaptiveTable.Header>
            {props.dftx.data.tokens.map((tokenPrice) => {
              return tokenPrice.prices.map((price) => {
                return (
                  <SetOracleDataTokenRow
                    token={tokenPrice.token}
                    price={price}
                    key={`${tokenPrice.token}-${price.currency}`}
                  />
                );
              });
            })}
          </AdaptiveTable>
        )}
      </div>
    </div>
  );
}

function SetOracleDataDetails(props: {
  oracleId: string;
  timestamp: BigNumber;
}): JSX.Element {
  return (
    <AdaptiveList className="w-full lg:w-1/2">
      <AdaptiveList.Row
        name="Oracle ID"
        className="break-all"
        testId="DfTxSetOracleData.OracleId"
      >
        {props.oracleId}
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Received Time"
        testId="DfTxSetOracleData.Timestamp"
      >
        {format(fromUnixTime(props.timestamp.toNumber()), "PPpp")}
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}

function SetOracleDataTokenRow(props: {
  token: string;
  price: TokenAmount;
}): JSX.Element {
  return (
    <AdaptiveTable.Row className="dark:text-gray-100">
      <AdaptiveTable.Cell title="TOKEN" className="align-middle">
        <div
          className="flex items-center"
          data-testid="DfTxSetOracleData.Token"
        >
          {props.token}
        </div>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title="AMOUNT" className="align-middle">
        <span data-testid="DfTxSetOracleData.Amount">
          {props.price.amount.toFixed(8)}
        </span>
      </AdaptiveTable.Cell>
      <AdaptiveTable.Cell title="CURRENCY" className="align-middle">
        <span data-testid="DfTxSetOracleData.Currency">
          {props.price.currency}
        </span>
      </AdaptiveTable.Cell>
    </AdaptiveTable.Row>
  );
}
