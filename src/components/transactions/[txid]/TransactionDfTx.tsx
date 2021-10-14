import { SmartBuffer } from 'smart-buffer'
import { OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { DfTxUnmapped } from '@components/transactions/[txid]/DfTx/DfTxUnmapped'

interface TransactionDfTxProps {
  transaction: Transaction
  vins: TransactionVin[]
  vouts: TransactionVout[]
}

export function TransactionDfTx (props: TransactionDfTxProps): JSX.Element | null {
  const hex = props.vouts[0].script.hex
  const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
  const stack = toOPCodes(buffer)

  if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
    return null
  }

  const tx = (stack[1] as OP_DEFI_TX).tx
  switch (tx.type) {
    // case CPoolSwap.OP_CODE:
    //   return <DfTxPoolSwap dftx={tx} />
    // case CPoolAddLiquidity.OP_CODE:
    //   return <DfTxPoolAddLiquidity dftx={tx} />
    // case CPoolRemoveLiquidity.OP_CODE:
    //   return <DfTxPoolRemoveLiquidity dftx={tx} />
    // case CSetOracleData.OP_CODE:
    //   return <DfTxSetOracleData dftx={tx} />
    // case CUtxosToAccount.OP_CODE:
    //   return <DfTxUtxosToAccount dftx={tx} />
    // case CAccountToAccount.OP_CODE:
    //   return <DfTxAccountToAccount dftx={tx} />
    // case CAnyAccountToAccount.OP_CODE:
    //   return <DfTxAnyAccountToAccount dftx={tx} />
    // case CAccountToUtxos.OP_CODE:
    //   return <DfTxAccountToUtxos dftx={tx} />
    // case CCreateMasternode.OP_CODE:
    //   return <DfTxCreateMasternode dftx={tx} />
    // case CResignMasternode.OP_CODE:
    //   return <DfTxResignMasternode dftx={tx} />
    // case CPoolCreatePair.OP_CODE:
    //   return <DfTxPoolCreatePair dftx={tx} />
    // case CTokenCreate.OP_CODE:
    //   return <DfTxTokenCreate dftx={tx} />
    default:
      return <DfTxUnmapped dftx={tx} />
  }
}
