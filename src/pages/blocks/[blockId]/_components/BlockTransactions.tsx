import { InferGetServerSidePropsType } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { format, fromUnixTime } from "date-fns";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { OverflowTable } from "@components/commons/OverflowTable";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "@components/commons/link/Link";
import { CursorPagination } from "@components/commons/CursorPagination";
import { getServerSideProps } from "../index.page";

export function BlockTransactions(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const { block, transactions } = props;
  const {
    count: { blocks },
  } = useSelector((state: RootState) => state.stats);
  const confirmations = blocks !== undefined ? blocks - block.height : blocks;
  const blockTime = format(fromUnixTime(block.medianTime), "PPpp");

  function TransactionRow({
    transaction,
  }: {
    transaction: Transaction;
  }): JSX.Element {
    return (
      <OverflowTable.Row
        key={transaction.txid}
        className="hover:text-primary-500 dark:hover:text-white-100 dark:text-gray-100"
      >
        <OverflowTable.Cell>
          <div className="break-all w-80 md:w-full">{transaction.txid}</div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className="flex items-center space-x-1">
            <div>{transaction.vinCount}</div>
            <div>
              <BsArrowRight />
            </div>
            <div>{transaction.voutCount}</div>
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className="w-24 md:w-full">{blockTime}</div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>{confirmations}</OverflowTable.Cell>
      </OverflowTable.Row>
    );
  }

  return (
    <div>
      <h1 className="font-medium text-2xl mt-6 dark:text-dark-gray-900">
        Transactions
      </h1>

      <OverflowTable className="mt-3">
        <OverflowTable.Header>
          <OverflowTable.Head title="TX ID" />
          <OverflowTable.Head title="VIN/VOUT" />
          <OverflowTable.Head title="TIMESTAMP" />
          <OverflowTable.Head title="CONFIRMATIONS" />
        </OverflowTable.Header>

        {transactions.items.map((transaction) => {
          return (
            <Link
              href={{ pathname: `/transactions/${transaction.txid}` }}
              key={transaction.txid}
            >
              <a className="contents">
                <TransactionRow transaction={transaction} />
              </a>
            </Link>
          );
        })}
      </OverflowTable>

      <div className="flex justify-end mt-4">
        <CursorPagination
          pages={transactions.pages}
          path={`/blocks/${block.hash}`}
        />
      </div>
    </div>
  );
}
