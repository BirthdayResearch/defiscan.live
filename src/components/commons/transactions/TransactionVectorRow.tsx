import { NetworkName } from "@contexts/NetworkContext";
import { AddressLink } from "@components/commons/link/AddressLink";
import { TextTruncate } from "@components/commons/text/TextTruncate";

interface TransactionVectorRowProps {
  label: "INPUT" | "OUTPUT";
  address: string;
  value: string;
  network: NetworkName;
  isAddressClickable: boolean;
}

export function TransactionVectorRow(
  props: TransactionVectorRowProps
): JSX.Element {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700  h-20 p-3 rounded flex justify-between">
      <div className="flex flex-col justify-between h-full w-full">
        <span className="bg-gray-200 dark:bg-gray-900 dark:text-dark-primary-500 rounded text-xs px-2 py-1 font-medium w-min mb-1.5">
          {props.label}
        </span>
        <div className="flex justify-between dark:text-gray-100">
          {props.isAddressClickable ? (
            <AddressLink
              testId="TransactionVectorRow.Address"
              address={props.address}
            >
              <TextTruncate text={props.address} className="w-44" />
            </AddressLink>
          ) : (
            <span className="overflow-ellipsis overflow-hidden opacity-80">
              {props.address}
            </span>
          )}
          <span className="min-w-max">{props.value}</span>
        </div>
      </div>
    </div>
  );
}
