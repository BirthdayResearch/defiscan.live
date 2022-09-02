import {
  AppointOracle,
  CurrencyPair,
  DfTx,
} from "@defichain/jellyfish-transaction";
import { fromScript } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";

import { AdaptiveList } from "@components/commons/AdaptiveList";
import { OverflowTable } from "@components/commons/OverflowTable";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxAppointOracleProps {
  dftx: DfTx<AppointOracle>;
}

export function DfTxAppointOracle(props: DfTxAppointOracleProps): JSX.Element {
  const network = useNetwork().name;
  const script = fromScript(props.dftx.data.script, network);
  return (
    <div>
      <DfTxHeader name="Appoint Oracle" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row name="Address">
            {(() => {
              if (script?.address !== undefined) {
                return (
                  <AddressLink
                    address={script?.address}
                    className="break-all"
                    testId="DfTxAppointOracle.Address"
                  />
                );
              }
              return "N/A";
            })()}
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Weightage"
            testId="DfTxAppointOracle.Weightage"
          >
            {props.dftx.data.weightage}
          </AdaptiveList.Row>
        </AdaptiveList>
        <div className="w-full lg:w-1/2">
          <OverflowTable>
            <OverflowTable.Header>
              <OverflowTable.Head title="Token" />
              <OverflowTable.Head title="Currency" />
            </OverflowTable.Header>
            {props.dftx.data.priceFeeds.map((priceFeed) => (
              <AppointOracleTableRow
                priceFeed={priceFeed}
                key={`${priceFeed.token}-${priceFeed.currency}`}
              />
            ))}
          </OverflowTable>
        </div>
      </div>
    </div>
  );
}

function AppointOracleTableRow(props: {
  priceFeed: CurrencyPair;
}): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <span data-testid={`DfTxAppointOracle.${props.priceFeed.token}Token`}>
          {props.priceFeed.token}
        </span>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <span
          data-testid={`DfTxAppointOracle.${props.priceFeed.token}Currency`}
        >
          {props.priceFeed.currency}
        </span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
