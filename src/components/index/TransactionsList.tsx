import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { formatDistanceToNow } from "date-fns";
import BigNumber from "bignumber.js";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import React, { PropsWithChildren } from "react";
import { Link } from "@components/commons/link/Link";
import { IoChevronForwardSharp } from "react-icons/io5";

export function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}): JSX.Element {
  return (
    <>
      <div className="hidden md:block" data-testid="Desktop.TransactionList">
        <div className="flex justify-between">
          <h1
            className="text-xl font-semibold dark:text-dark-gray-900"
            data-testid="Desktop.TransactionList.Title"
          >
            Latest Transactions
          </h1>
        </div>

        <div className="mt-6">
          {transactions.map((transaction) => {
            return (
              <TransactionCard
                id={transaction.id}
                key={`Desktop.${transaction.txid}`}
              >
                <DesktopTransactionCardDetails
                  txid={transaction.txid}
                  age={formatDistanceToNow(
                    transaction.block.medianTime * 1000,
                    { addSuffix: true }
                  )}
                  totalVoutValue={transaction.totalVoutValue}
                />
              </TransactionCard>
            );
          })}
        </div>
      </div>

      <CollapsibleSection
        heading="Latest Transactions"
        className="block md:hidden"
        testId="Mobile.TransactionList"
      >
        <div className="mt-6 w-full">
          {transactions.map((transaction) => {
            return (
              <TransactionCard
                id={transaction.id}
                key={`Mobile.${transaction.txid}`}
              >
                <MobileTransactionCardDetails
                  txid={transaction.txid}
                  age={formatDistanceToNow(
                    transaction.block.medianTime * 1000,
                    { addSuffix: true }
                  )}
                  totalVoutValue={transaction.totalVoutValue}
                />
              </TransactionCard>
            );
          })}
        </div>
      </CollapsibleSection>
    </>
  );
}

function TransactionCard(
  props: PropsWithChildren<{ id: string }>
): JSX.Element {
  return (
    <Link href={{ pathname: `/transactions/${props.id}` }}>
      <a className="content">
        <div className="w-full flex flex-wrap p-4 rounded border dark:bg-gray-800 dark:border-gray-700 border-gray-200 cursor-pointer my-1.5 hover:shadow-md">
          {props.children}
        </div>
      </a>
    </Link>
  );
}

function DesktopTransactionCardDetails(props: {
  txid: string;
  age: string;
  totalVoutValue: string;
}): JSX.Element {
  return (
    <div
      className="flex flex-wrap w-full"
      data-testid="Desktop.TransactionCard"
    >
      <div className="md:w-1/2 lg:w-2/5 xl:w-3/5 flex space-x-2">
        <span className="text-lg leading-6">
          <MdSwapHorizontalCircle
            className="text-gray-400 inline-block"
            size={22}
          />
        </span>
        <div className="overflow-hidden">
          <div
            className="overflow-ellipsis overflow-hidden font-medium dark:text-gray-100 text-gray-900"
            data-testid="Desktop.TransactionCard.txid"
          >
            {props.txid}
          </div>
          <div
            className="text-xs text-gray-400 dark:text-gray-400 leading-5"
            data-testid="Desktop.TransactionCard.age"
          >
            {props.age}
          </div>
        </div>
      </div>
      <div className="w-1/2 lg:w-3/5 xl:w-2/5 flex justify-between">
        <div className="w-10/12 text-right text-sm flex">
          <div
            className="w-1/2 text-gray-500 dark:text-gray-400 lg:mr-2 xl:mr-0"
            data-testid="Desktop.TransactionCard.AmountLabel"
          >
            Amount
          </div>
          <div
            className="w-1/2 text-gray-900 dark:text-gray-100"
            data-testid="Desktop.TransactionCard.AmountValue"
          >
            {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
          </div>
        </div>
        <div className="flex items-center">
          <IoChevronForwardSharp size={24} className="dark:text-gray-100" />
        </div>
      </div>
    </div>
  );
}

function MobileTransactionCardDetails(props: {
  txid: string;
  age: string;
  totalVoutValue: string;
}): JSX.Element {
  return (
    <>
      <div
        className="w-11/12 flex space-x-2"
        data-testid="Mobile.TransactionCard"
      >
        <span className="text-lg leading-6">
          <MdSwapHorizontalCircle
            className="text-gray-400 inline-block"
            size={22}
          />
        </span>
        <div className="overflow-hidden">
          <div className="flex">
            <div
              className="w-1/2 overflow-ellipsis overflow-hidden font-medium text-gray-900 dark:text-gray-100"
              data-testid="Mobile.TransactionCard.txid"
            >
              {props.txid}
            </div>
            <div
              className="w-1/2 text-right text-xs text-gray-400 leading-5 mr-3"
              data-testid="Mobile.TransactionCard.age"
            >
              <span>{props.age}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div
              className="text-gray-500 dark:text-gray-400 text-sm"
              data-testid="Mobile.TransactionCard.AmountLabel"
            >
              Amount
            </div>
            <div
              className="text-right text-gray-900 dark:text-gray-100 text-sm ml-2"
              data-testid="Mobile.TransactionCard.AmountValue"
            >
              {`${new BigNumber(props.totalVoutValue).toFixed(8)} DFI`}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/12 flex items-center justify-end dark:text-gray-100">
        <IoChevronForwardSharp size={24} />
      </div>
    </>
  );
}
