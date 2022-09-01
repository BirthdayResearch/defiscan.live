import { CopyButton } from "@components/commons/CopyButton";
import {
  Transaction,
  TransactionSegWit,
} from "@defichain/jellyfish-transaction";

interface RawTransactionHeadingProps {
  transaction: TransactionSegWit | Transaction | undefined;
}

export function RawTransactionHeading(
  props: RawTransactionHeadingProps
): JSX.Element {
  const txid = props.transaction?.vin[0].txid ?? "";
  return (
    <>
      <RawTransactionPendingHeading txid={txid} />
      <span
        className="leading-6 opacity-60 dark:opacity-100 dark:text-gray-100"
        data-testid="RawTransaction.title"
      >
        Transaction ID
      </span>
      <div className="flex items-center mt-1">
        <h1
          className="text-2xl font-medium break-all dark:text-gray-100"
          data-testid="RawTransaction.txid"
        >
          {txid}
        </h1>
        <CopyButton className="ml-2" content={txid} />
      </div>
    </>
  );
}

function RawTransactionPendingHeading(props: { txid: string }): JSX.Element {
  return (
    <div
      className="bg-red-100 rounded p-3 text-center mb-5"
      data-testid="RawTransaction.pending-banner"
    >
      The requested transaction <code className="break-all">{props.txid}</code>{" "}
      is still pending, not all transaction information are currently available.
      Please wait for a few minutes for it to be confirmed.
    </div>
  );
}
