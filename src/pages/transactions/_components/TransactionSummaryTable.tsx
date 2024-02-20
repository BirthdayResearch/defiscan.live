import {
  Transaction,
  TransactionVin,
  TransactionVout,
} from "@defichain/whale-api-client/dist/api/transactions";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { Link } from "@components/commons/link/Link";
import { format, fromUnixTime } from "date-fns";
import BigNumber from "bignumber.js";
import { JSX } from "@babel/types";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import { isSkippedTxId } from "@defichain/jellyfish-network";
import { useNetwork } from "@contexts/NetworkContext";

interface TransactionSummaryTableProps {
  transaction: Transaction;
  vins: TransactionVin[];
  vouts: TransactionVout[];
  fee: BigNumber;
  feeRate: BigNumber;
  isDeFiTransaction: boolean;
  isEvmTx: boolean;
}

export function TransactionSummaryTable(
  props: TransactionSummaryTableProps,
): JSX.Element {
  return (
    <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
      <SummaryTableListLeft
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        fee={props.fee}
        isEvmTx={props.isEvmTx}
      />
      <SummaryTableListRight
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        feeRate={props.feeRate}
        isDeFiTransaction={props.isDeFiTransaction}
        isEvmTx={props.isEvmTx}
      />
    </div>
  );
}

function SummaryTableListLeft(props: {
  transaction: Transaction;
  vins: TransactionVin[];
  vouts: TransactionVout[];
  fee: BigNumber;
  isEvmTx: boolean;
}): JSX.Element {
  const {
    count: { blocks },
  } = useSelector((state: RootState) => state.stats);
  const confirmations =
    blocks !== undefined ? blocks - props.transaction.block.height : blocks;
  let fee = `${props.fee.toFixed(8)} DFI`;
  if (props.isEvmTx) {
    fee = "EvmTx";
  } else if (props.vins[0].vout === undefined) {
    fee = "Coinbase";
  }

  return (
    <AdaptiveList className="w-full lg:w-1/2">
      <AdaptiveList.Row
        name="Total Amount"
        testId="transaction-detail-total-amount"
      >
        {props.transaction.totalVoutValue} DFI
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Fee" testId="transaction-detail-fee">
        {fee}
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Confirmations"
        testId="transaction-detail-confirmations"
      >
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Block Height">
        <Link href={{ pathname: `/blocks/${props.transaction.block.height}` }}>
          <a
            className="cursor-pointer hover:text-blue-500"
            data-testid="transaction-detail-block-height"
          >
            {props.transaction.block.height}
          </a>
        </Link>
      </AdaptiveList.Row>
      {isSkippedTxId(props.transaction.txid, useNetwork().name) && (
        <AdaptiveList.Row
          name="Skipped Transaction"
          testId="transaction-skipped"
        >
          Yes
        </AdaptiveList.Row>
      )}
    </AdaptiveList>
  );
}

function SummaryTableListRight(props: {
  transaction: Transaction;
  vins: TransactionVin[];
  vouts: TransactionVout[];
  feeRate: BigNumber;
  isDeFiTransaction: boolean;
  isEvmTx: boolean;
}): JSX.Element {
  const blockTime = format(
    fromUnixTime(props.transaction.block.medianTime),
    "PPpp",
  );
  let feeRate = `${props.feeRate.toFixed(8)} fi/byte`;
  if (props.isEvmTx) {
    feeRate = "EvmTx";
  } else if (props.vins[0].vout === undefined) {
    feeRate = "Coinbase";
  }

  return (
    <AdaptiveList className="w-full lg:w-1/2">
      <AdaptiveList.Row name="Fee Rate" testId="transaction-detail-fee-rate">
        <div className="flex items-center">
          {feeRate}
          <InfoHoverPopover
            description="1 DFI = 100,000,000 fi"
            className="ml-1"
          />
        </div>
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Size" testId="transaction-detail-size">
        {props.transaction.size} bytes
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Received Time"
        testId="transaction-detail-received-time"
      >
        {blockTime}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="DeFi Transaction" testId="transaction-custom">
        {props.isDeFiTransaction ? "Yes" : "No"}
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}
