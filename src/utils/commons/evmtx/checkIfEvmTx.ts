import {
  Transaction,
  TransactionVin,
  TransactionVout,
} from "@defichain/whale-api-client/dist/api/transactions";
import { CEvmTx } from "@defichain/jellyfish-transaction";

export function checkIfEvmTx(props: {
  transaction: Transaction;
  vins: TransactionVin[];
  vouts: TransactionVout[];
  dftxType?: number;
}): boolean {
  // Reference: https://github.com/DeFiCh/ain/blob/7b4e2dc36a9e46bc519da5414dc10f3a761f374d/src/consensus/tx_check.cpp#L143-#L155
  return (
    props.dftxType === CEvmTx.OP_CODE &&
    props.transaction.vinCount === 2 &&
    props.transaction.voutCount === 1 &&
    props.vins.length === 0 &&
    props.vouts.length === 1 &&
    props.vouts[0].n === 0 &&
    Object.keys(props.vouts[0].script).length > 0
  );
}
