import { OverflowTable } from "@components/commons/OverflowTable";
import { Link } from "@components/commons/link/Link";
import { format, formatDistanceToNow, fromUnixTime } from "date-fns";
import { AddressActivity } from "@defichain/whale-api-client/dist/api/address";
import { useState } from "react";
import { MdExpand } from "react-icons/md";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { AddressVinVout } from "./AddressVinVout";

interface TransactionTableRowProps {
  address: string;
  addressActivity: AddressActivity;
}

export function AddressTransactionTableRow(
  props: TransactionTableRowProps
): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);

  function expandRow(event): void {
    const target = event.target as HTMLElement;
    if (!target.hasAttribute("href")) {
      setExpanded(!expanded);
    }
  }

  return (
    <>
      <OverflowTable.Row
        key={props.addressActivity.txid}
        className="cursor-pointer"
        onClick={(event) => expandRow(event)}
      >
        <OverflowTable.Cell sticky className="align-top lg:align-middle">
          <div className="flex">
            <div className="mr-4 my-auto cursor-pointer hidden md:inline-block">
              <MdExpand size={22} className="dark:text-gray-100" />
            </div>
            <div className="w-24 md:w-40 lg:w-60 my-auto">
              <TxIdLink
                txid={props.addressActivity.txid}
                className="overflow-ellipsis overflow-hidden"
              />
            </div>
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <Link
            href={{ pathname: `/blocks/${props.addressActivity.block.height}` }}
          >
            <a className="text-blue-500 hover:underline">
              {props.addressActivity.block.height}
            </a>
          </Link>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <HoverPopover
            popover={format(
              fromUnixTime(props.addressActivity.block.medianTime),
              "PPpp"
            )}
          >
            <div className="cursor-help dark:text-gray-100">
              {formatDistanceToNow(
                props.addressActivity.block.medianTime * 1000
              )}{" "}
              ago
            </div>
          </HoverPopover>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className="flex flex-row space-x-2 justify-end">
            {props.addressActivity.type === "vout" ? (
              <span className="bg-green-100 dark:bg-dark-green-100 rounded text-xs py-1 font-medium text-center h-6 w-10">
                IN
              </span>
            ) : (
              <span className="bg-red-100 dark:bg-dark-red-100 rounded text-xs py-1 font-medium text-center h-6 w-10">
                OUT
              </span>
            )}
            <div className="flex flex-row text-right dark:text-gray-100">
              {props.addressActivity.value} DFI
            </div>
          </div>
        </OverflowTable.Cell>
      </OverflowTable.Row>
      <AddressVinVout
        address={props.address}
        txid={props.addressActivity.txid}
        expanded={expanded}
      />
    </>
  );
}
