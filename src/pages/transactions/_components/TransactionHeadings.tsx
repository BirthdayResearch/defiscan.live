import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { CopyButton } from "@components/commons/CopyButton";
import { MetascanLinkButton } from "@components/commons/MetascanLinkButton";

interface TransactionHeadingProps {
  transaction: Transaction;
  metachainTxUrl?: string;
}

interface TransactionNotFoundHeadingProps {
  txid: string;
}

export function TransactionHeading(
  props: TransactionHeadingProps,
): JSX.Element {
  return (
    <div className="flex flex-col w-full">
      <span
        className="leading-6 opacity-60 dark:opacity-100 dark:text-gray-100"
        data-testid="title"
      >
        Transaction ID
      </span>

      <div className="flex flex-col lg:flex-row items-center mt-1 justify-between w-full lg:gap-x-40">
        <div className="flex items-center">
          <h1
            className="text-2xl font-medium break-all dark:text-gray-100"
            data-testid="transaction-txid"
          >
            {props.transaction.txid}
          </h1>
          <CopyButton className="ml-2" content={props.transaction.txid} />
        </div>
        {props.metachainTxUrl && (
          <MetascanLinkButton
            href={props.metachainTxUrl}
            customStyle="mt-2 lg:mt-0"
          />
        )}
      </div>
    </div>
  );
}

export function TransactionNotFoundHeading(
  props: TransactionNotFoundHeadingProps,
): JSX.Element {
  const txid = props.txid;

  return (
    <div
      className="bg-red-100 rounded p-3 text-center"
      data-testid="transaction-not-found-banner"
    >
      The requested transaction <code className="break-all">{txid}</code> could
      not be found, it is most likely still being confirmed, please try again in
      a few minutes.
    </div>
  );
}
