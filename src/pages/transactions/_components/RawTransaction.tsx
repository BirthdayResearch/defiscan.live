import {
  CTransaction,
  CTransactionSegWit,
  DfTx,
  OP_DEFI_TX,
  Transaction,
  TransactionSegWit,
  Vout,
} from "@defichain/jellyfish-transaction";
import { SmartBuffer } from "smart-buffer";
import { Container } from "@components/commons/Container";
import { useEffect } from "react";
import { RawTransactionHeading } from "./RawTransactionHeadings";
import { RawTransactionVinVout } from "./RawTransactionVinVout";
import { TransactionDfTx } from "./TransactionDfTx";

export function RawTransaction({ rawTx }: { rawTx: string }): JSX.Element {
  let transaction: TransactionSegWit | Transaction | undefined;

  useEffect(() => {
    const interval = setInterval(() => {
      location.reload();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (rawTx !== undefined) {
    const buffer = SmartBuffer.fromBuffer(Buffer.from(rawTx, "hex"));
    try {
      if (rawTx.startsWith("040000000001")) {
        transaction = new CTransactionSegWit(buffer);
      } else {
        transaction = new CTransaction(buffer);
      }
    } catch (e) {
      transaction = undefined;
    }
  }

  if (transaction === undefined) {
    return (
      <Container className="pt-12 pb-20">
        <div
          className="bg-red-100 rounded p-3 text-center"
          data-testid="RawTransaction.not-found-banner"
        >
          The requested transaction is either invalid or has yet to be
          confirmed. Please try again in a few minutes.
        </div>
      </Container>
    );
  }

  const vouts = transaction.vout;
  const vins = transaction.vin;
  const dftx: DfTx<any> | undefined = getDfTx(vouts);
  return (
    <>
      <RawTransactionHeading transaction={transaction} />
      <RawTransactionVinVout
        transaction={transaction}
        vins={vins}
        vouts={vouts}
        dftxName={dftx?.name}
      />
      <TransactionDfTx dftx={dftx} />
    </>
  );
}

function getDfTx(vouts: Vout[]): DfTx<any> | undefined {
  const stack = vouts[0].script.stack;
  if (stack.length !== 2 || stack[1].type !== "OP_DEFI_TX") {
    return undefined;
  }
  return (stack[1] as OP_DEFI_TX).tx;
}
