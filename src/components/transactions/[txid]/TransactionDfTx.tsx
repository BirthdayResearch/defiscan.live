import {
  CAccountToAccount,
  CAccountToUtxos,
  CAnyAccountToAccount,
  CAppointOracle,
  CAutoAuthPrep,
  CCloseVault,
  CCompositeSwap,
  CCreateMasternode,
  CCreateVault,
  CDepositToVault,
  CICXClaimDFCHTLC,
  CICXCloseOffer,
  CICXCloseOrder,
  CICXCreateOrder,
  CICXMakeOffer,
  CICXSubmitDFCHTLC,
  CICXSubmitEXTHTLC,
  CPaybackLoan,
  CPlaceAuctionBid,
  CPoolAddLiquidity,
  CPoolCreatePair,
  CPoolRemoveLiquidity,
  CPoolSwap,
  CPoolUpdatePair,
  CRemoveOracle,
  CResignMasternode,
  CSetCollateralToken,
  CSetDefaultLoanScheme,
  CSetGovernance,
  CSetLoanScheme,
  CSetLoanToken,
  CSetOracleData,
  CTakeLoan,
  CTokenCreate,
  CTokenMint,
  CTokenUpdateAny,
  CUpdateOracle,
  CUpdateVault,
  CUtxosToAccount,
  CWithdrawFromVault,
  DfTx
} from '@defichain/jellyfish-transaction'
import { DfTxTakeLoan } from '@components/transactions/[txid]/DfTx/DfTxTakeLoan'
import { DfTxUnmapped } from '@components/transactions/[txid]/DfTx/DfTxUnmapped'
import { DfTxPoolAddLiquidity } from '@components/transactions/[txid]/DfTx/DfTxPoolAddLiquidity'
import { DfTxResignMasternode } from '@components/transactions/[txid]/DfTx/DfTxResignMasternode'
import { DfTxPoolSwap } from '@components/transactions/[txid]/DfTx/DfTxPoolSwap'
import { DfTxUtxosToAccount } from '@components/transactions/[txid]/DfTx/DfTxUtxosToAccount'
import { DfTxAccountToUtxos } from '@components/transactions/[txid]/DfTx/DfTxAccountToUtxos'
import { DfTxCreateMasternode } from '@components/transactions/[txid]/DfTx/DfTxCreateMasternode'
import { DfTxPoolRemoveLiquidity } from '@components/transactions/[txid]/DfTx/DfTxPoolRemoveLiquidity'
import { DfTxSetOracleData } from '@components/transactions/[txid]/DfTx/DfTxSetOracleData'
import { DfTxAccountToAccount } from '@components/transactions/[txid]/DfTx/DfTxAccountToAccount'
import { DfTxAnyAccountToAccount } from '@components/transactions/[txid]/DfTx/DfTxAnyAccountToAccount'
import { DfTxPoolCreatePair } from '@components/transactions/[txid]/DfTx/DfTxPoolCreatePair'
import { DfTxTokenCreate } from '@components/transactions/[txid]/DfTx/DfTxTokenCreate'
import { DfTxAppointOracle } from '@components/transactions/[txid]/DfTx/DfTxAppointOracle'
import { DfTxSetGovernance } from '@components/transactions/[txid]/DfTx/DfTxSetGovernance'
import { DfTxTokenMint } from '@components/transactions/[txid]/DfTx/DfTxTokenMint'
import { DfTxUpdateOracle } from '@components/transactions/[txid]/DfTx/DfTxUpdateOracle'
import { DfTxRemoveOracle } from '@components/transactions/[txid]/DfTx/DfTxRemoveOracle'
import { DfTxICXCreateOrder } from '@components/transactions/[txid]/DfTx/DfTxICXCreateOrder'
import { DfTxPoolUpdatePair } from '@components/transactions/[txid]/DfTx/DfTxPoolUpdatePair'
import { DfTxICXMakeOffer } from '@components/transactions/[txid]/DfTx/DfTxICXMakeOffer'
import { DfTxICXCloseOffer } from '@components/transactions/[txid]/DfTx/DfTxICXCloseOffer'
import { DfTxICXCloseOrder } from '@components/transactions/[txid]/DfTx/DfTxICXCloseOrder'
import { DfTxICXSubmitDFCHTLC } from '@components/transactions/[txid]/DfTx/DfTxICXSubmitDFCHTLC'
import { DfTxICXSubmitEXTHTLC } from '@components/transactions/[txid]/DfTx/DfTxICXSubmitEXTHTLC'
import { DfTxICXClaimDFCHTLC } from '@components/transactions/[txid]/DfTx/DfTxICXClaimDFCHTLC'
import { DfTxTokenUpdateAny } from '@components/transactions/[txid]/DfTx/DfTxTokenUpdateAny'
import { DfTxSetDefaultLoanScheme } from '@components/transactions/[txid]/DfTx/DfTxSetDefaultLoanScheme'
import { DfTxSetLoanScheme } from '@components/transactions/[txid]/DfTx/DfTxSetLoanScheme'
import { DfTxSetCollateralToken } from '@components/transactions/[txid]/DfTx/DfTxSetCollateralToken'
import { DfTxSetLoanToken } from '@components/transactions/[txid]/DfTx/DfTxSetLoanToken'
import { DfTxCreateVault } from '@components/transactions/[txid]/DfTx/DfTxCreateVault'
import { DfTxUpdateVault } from '@components/transactions/[txid]/DfTx/DfTxUpdateVault'
import { DfTxDepositToVault } from '@components/transactions/[txid]/DfTx/DfTxDepositToVault'
import { DfTxCloseVault } from '@components/transactions/[txid]/DfTx/DfTxCloseVault'
import { DfTxCompositeSwap } from '@components/transactions/[txid]/DfTx/DfTxCompositeSwap'
import { DfTxPlaceAuctionBid } from '@components/transactions/[txid]/DfTx/DfTxPlaceAuctionBid'
import { DfTxPayBackLoan } from '@components/transactions/[txid]/DfTx/DfTxPayBackLoan'
import { DfTxWithdrawFromVault } from '@components/transactions/[txid]/DfTx/DfTxWithdrawFromVault'

interface TransactionDfTxProps {
  dftx?: DfTx<any>
}

export function TransactionDfTx (props: TransactionDfTxProps): JSX.Element | null {
  if (props.dftx === undefined) {
    return null
  }

  switch (props.dftx.type) {
    case CPoolSwap.OP_CODE:
      return <DfTxPoolSwap dftx={props.dftx} />
    case CPoolAddLiquidity.OP_CODE:
      return <DfTxPoolAddLiquidity dftx={props.dftx} />
    case CPoolRemoveLiquidity.OP_CODE:
      return <DfTxPoolRemoveLiquidity dftx={props.dftx} />
    case CSetOracleData.OP_CODE:
      return <DfTxSetOracleData dftx={props.dftx} />
    case CUtxosToAccount.OP_CODE:
      return <DfTxUtxosToAccount dftx={props.dftx} />
    case CAccountToAccount.OP_CODE:
      return <DfTxAccountToAccount dftx={props.dftx} />
    case CAnyAccountToAccount.OP_CODE:
      return <DfTxAnyAccountToAccount dftx={props.dftx} />
    case CAccountToUtxos.OP_CODE:
      return <DfTxAccountToUtxos dftx={props.dftx} />
    case CCreateMasternode.OP_CODE:
      return <DfTxCreateMasternode dftx={props.dftx} />
    case CResignMasternode.OP_CODE:
      return <DfTxResignMasternode dftx={props.dftx} />
    case CPoolCreatePair.OP_CODE:
      return <DfTxPoolCreatePair dftx={props.dftx} />
    case CTokenCreate.OP_CODE:
      return <DfTxTokenCreate dftx={props.dftx} />
    case CAppointOracle.OP_CODE:
      return <DfTxAppointOracle dftx={props.dftx} />
    case CSetGovernance.OP_CODE:
      return <DfTxSetGovernance dftx={props.dftx} />
    case CTokenMint.OP_CODE:
      return <DfTxTokenMint dftx={props.dftx} />
    case CUpdateOracle.OP_CODE:
      return <DfTxUpdateOracle dftx={props.dftx} />
    case CRemoveOracle.OP_CODE:
      return <DfTxRemoveOracle dftx={props.dftx} />
    case CICXCreateOrder.OP_CODE:
      return <DfTxICXCreateOrder dftx={props.dftx} />
    case CPoolUpdatePair.OP_CODE:
      return <DfTxPoolUpdatePair dftx={props.dftx} />
    case CICXMakeOffer.OP_CODE:
      return <DfTxICXMakeOffer dftx={props.dftx} />
    case CICXCloseOffer.OP_CODE:
      return <DfTxICXCloseOffer dftx={props.dftx} />
    case CICXCloseOrder.OP_CODE:
      return <DfTxICXCloseOrder dftx={props.dftx} />
    case CAutoAuthPrep.OP_CODE:
      return null
    case CICXSubmitDFCHTLC.OP_CODE:
      return <DfTxICXSubmitDFCHTLC dftx={props.dftx} />
    case CICXSubmitEXTHTLC.OP_CODE:
      return <DfTxICXSubmitEXTHTLC dftx={props.dftx} />
    case CICXClaimDFCHTLC.OP_CODE:
      return <DfTxICXClaimDFCHTLC dftx={props.dftx} />
    case CTokenUpdateAny.OP_CODE:
      return <DfTxTokenUpdateAny dftx={props.dftx} />
    case CSetLoanScheme.OP_CODE:
      return <DfTxSetLoanScheme dftx={props.dftx} />
    case CSetDefaultLoanScheme.OP_CODE:
      return <DfTxSetDefaultLoanScheme dftx={props.dftx} />
    case CSetCollateralToken.OP_CODE:
      return <DfTxSetCollateralToken dftx={props.dftx} />
    case CSetLoanToken.OP_CODE:
      return <DfTxSetLoanToken dftx={props.dftx} />
    case CCreateVault.OP_CODE:
      return <DfTxCreateVault dftx={props.dftx} />
    case CUpdateVault.OP_CODE:
      return <DfTxUpdateVault dftx={props.dftx} />
    case CCompositeSwap.OP_CODE:
      return <DfTxCompositeSwap dftx={props.dftx} />
    case CDepositToVault.OP_CODE:
      return <DfTxDepositToVault dftx={props.dftx} />
    case CCloseVault.OP_CODE:
      return <DfTxCloseVault dftx={props.dftx} />
    case CPaybackLoan.OP_CODE:
      return <DfTxPayBackLoan dftx={props.dftx} />
    case CTakeLoan.OP_CODE:
      return <DfTxTakeLoan dftx={props.dftx} />
    case CPlaceAuctionBid.OP_CODE:
      return <DfTxPlaceAuctionBid dftx={props.dftx} />
    case CWithdrawFromVault.OP_CODE:
      return <DfTxWithdrawFromVault dftx={props.dftx} />
    default:
      return <DfTxUnmapped dftx={props.dftx} />
  }
}
