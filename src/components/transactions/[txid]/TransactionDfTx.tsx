import { SmartBuffer } from 'smart-buffer'
import {
  CAccountToAccount, CAccountToUtxos,
  CAnyAccountToAccount, CCreateMasternode,
  CPoolAddLiquidity, CPoolCreatePair, CPoolRemoveLiquidity,
  CPoolSwap, CResignMasternode, CSetOracleData, CTokenCreate, CUtxosToAccount,
  OP_DEFI_TX,
  toOPCodes
} from '@defichain/jellyfish-transaction'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { DfTxUnmapped } from '@components/transactions/[txid]/DfTx/DfTxUnmapped'
import { DfTxPoolSwap } from '@components/transactions/[txid]/DfTx/DfTxPoolSwap'
import { DfTxPoolAddLiquidity } from '@components/transactions/[txid]/DfTx/DfTxPoolAddLiquidity'
import { DfTxResignMasternode } from '@components/transactions/[txid]/DfTx/DfTxResignMasternode'
import { DfTxPoolCreatePair } from '@components/transactions/[txid]/DfTx/DfTxPoolCreatePair'
import { DfTxUtxosToAccount } from '@components/transactions/[txid]/DfTx/DfTxUtxosToAccount'
import { DfTxAccountToUtxos } from '@components/transactions/[txid]/DfTx/DfTxAccountToUtxos'
import { DfTxCreateMasternode } from '@components/transactions/[txid]/DfTx/DfTxCreateMasternode'
import { DfTxPoolRemoveLiquidity } from '@components/transactions/[txid]/DfTx/DfTxPoolRemoveLiquidity'
import { DfTxTokenCreate } from '@components/transactions/[txid]/DfTx/DfTxTokenCreate'
import { DfTxSetOracleData } from '@components/transactions/[txid]/DfTx/DfTxSetOracleData'
import { DfTxAccountToAccount } from '@components/transactions/[txid]/DfTx/DfTxAccountToAccount'
import { DfTxAnyAccountToAccount } from '@components/transactions/[txid]/DfTx/DfTxAnyAccountToAccount'

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
    case CPoolSwap.OP_CODE:
      return <DfTxPoolSwap dftx={tx} />
    case CPoolAddLiquidity.OP_CODE:
      return <DfTxPoolAddLiquidity dftx={tx} />
    case CPoolRemoveLiquidity.OP_CODE:
      return <DfTxPoolRemoveLiquidity dftx={tx} />
    case CSetOracleData.OP_CODE:
      return <DfTxSetOracleData dftx={tx} />
    case CUtxosToAccount.OP_CODE:
      return <DfTxUtxosToAccount dftx={tx} />
    case CAccountToAccount.OP_CODE:
      return <DfTxAccountToAccount dftx={tx} />
    case CAnyAccountToAccount.OP_CODE:
      return <DfTxAnyAccountToAccount dftx={tx} />
    case CAccountToUtxos.OP_CODE:
      return <DfTxAccountToUtxos dftx={tx} />
    case CCreateMasternode.OP_CODE:
      return <DfTxCreateMasternode dftx={tx} />
    case CResignMasternode.OP_CODE:
      return <DfTxResignMasternode dftx={tx} />
    case CPoolCreatePair.OP_CODE:
      return <DfTxPoolCreatePair dftx={tx} />
    case CTokenCreate.OP_CODE:
      return <DfTxTokenCreate dftx={tx} />
    default:
      return <DfTxUnmapped dftx={tx} />
  }
}
