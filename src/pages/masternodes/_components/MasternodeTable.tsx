import { NumericFormat } from "react-number-format";
import React from "react";
import { OverflowTable } from "@components/commons/OverflowTable";
import {
  MasternodeData,
  MasternodeState,
} from "@defichain/whale-api-client/dist/api/masternodes";
import { AddressLink } from "@components/commons/link/AddressLink";
import { TextTruncate } from "@components/commons/text/TextTruncate";

export function MasternodeTable({
  masternodes,
}: {
  masternodes: MasternodeData[];
}): JSX.Element {
  return (
    <OverflowTable className="mt-6">
      <OverflowTable.Header>
        <OverflowTable.Head title="Owner" sticky />
        <OverflowTable.Head title="Operator" />
        <OverflowTable.Head title="Creation Height" />
        <OverflowTable.Head title="Resign Height" />
        <OverflowTable.Head title="Minted Blocks" />
        <OverflowTable.Head title="State" />
        <OverflowTable.Head title="Time Lock" />
      </OverflowTable.Header>
      {masternodes.map((mn) => (
        <MasternodeRow data={mn} key={mn.id} />
      ))}
    </OverflowTable>
  );
}

function MasternodeRow({ data }: { data: MasternodeData }): JSX.Element {
  return (
    <OverflowTable.Row className="dark:text-gray-100">
      <OverflowTable.Cell sticky>
        <AddressLink address={data.owner.address}>
          <TextTruncate text={data.owner.address} className="w-44" />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <AddressLink address={data.operator.address}>
          <TextTruncate text={data.operator.address} />
        </AddressLink>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumericFormat
          value={data.creation.height}
          fixedDecimalScale
          displayType="text"
          thousandSeparator=","
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {data.resign?.height !== undefined ? (
          <NumericFormat
            value={data.resign?.height}
            fixedDecimalScale
            displayType="text"
            thousandSeparator=","
          />
        ) : (
          <>-</>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <NumericFormat
          value={data.mintedBlocks}
          fixedDecimalScale
          thousandSeparator=","
          displayType="text"
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {(() => {
          switch (data.state) {
            case MasternodeState.PRE_ENABLED:
              return "Pre-Enabled";
            case MasternodeState.ENABLED:
              return "Enabled";
            case MasternodeState.PRE_RESIGNED:
              return "Pre-Resigned";
            case MasternodeState.RESIGNED:
              return "Resigned";
            case MasternodeState.PRE_BANNED:
              return "Pre-Banned";
            case MasternodeState.BANNED:
              return "Banned";
            default:
              return data.state;
          }
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {(() => {
          switch (data.timelock) {
            case 0:
              return <div>0 Yrs</div>;
            case 260:
              return <div>5 Yrs</div>;
            case 520:
              return <div>10 Yrs</div>;
            default:
              return <div>{data.timelock} Weeks</div>;
          }
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}
