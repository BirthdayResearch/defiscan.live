import {
  CAccountToAccount,
  CAccountToUtxos,
  CAnyAccountToAccount,
  CTransferDomain,
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
  CSetFutureSwap,
  CSetGovernance,
  CSetGovernanceHeight,
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
  DfTx,
} from "@defichain/jellyfish-transaction";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { DfTxTakeLoan } from "./DfTx/DfTxTakeLoan";
import { DfTxUnmapped } from "./DfTx/DfTxUnmapped";
import { DfTxPoolAddLiquidity } from "./DfTx/DfTxPoolAddLiquidity";
import { DfTxResignMasternode } from "./DfTx/DfTxResignMasternode";
import { DfTxPoolSwap } from "./DfTx/DfTxPoolSwap";
import { DfTxUtxosToAccount } from "./DfTx/DfTxUtxosToAccount";
import { DfTxAccountToUtxos } from "./DfTx/DfTxAccountToUtxos";
import { DfTxCreateMasternode } from "./DfTx/DfTxCreateMasternode";
import { DfTxPoolRemoveLiquidity } from "./DfTx/DfTxPoolRemoveLiquidity";
import { DfTxSetOracleData } from "./DfTx/DfTxSetOracleData";
import { DfTxAccountToAccount } from "./DfTx/DfTxAccountToAccount";
import { DfTxTransferDomain } from "./DfTx/DfTxTransferDomain";
import { DfTxAnyAccountToAccount } from "./DfTx/DfTxAnyAccountToAccount";
import { DfTxPoolCreatePair } from "./DfTx/DfTxPoolCreatePair";
import { DfTxTokenCreate } from "./DfTx/DfTxTokenCreate";
import { DfTxAppointOracle } from "./DfTx/DfTxAppointOracle";
import { DfTxSetGovernance } from "./DfTx/DfTxSetGovernance";
import { DfTxTokenMint } from "./DfTx/DfTxTokenMint";
import { DfTxUpdateOracle } from "./DfTx/DfTxUpdateOracle";
import { DfTxRemoveOracle } from "./DfTx/DfTxRemoveOracle";
import { DfTxICXCreateOrder } from "./DfTx/DfTxICXCreateOrder";
import { DfTxPoolUpdatePair } from "./DfTx/DfTxPoolUpdatePair";
import { DfTxICXMakeOffer } from "./DfTx/DfTxICXMakeOffer";
import { DfTxICXCloseOffer } from "./DfTx/DfTxICXCloseOffer";
import { DfTxICXCloseOrder } from "./DfTx/DfTxICXCloseOrder";
import { DfTxICXSubmitDFCHTLC } from "./DfTx/DfTxICXSubmitDFCHTLC";
import { DfTxICXSubmitEXTHTLC } from "./DfTx/DfTxICXSubmitEXTHTLC";
import { DfTxICXClaimDFCHTLC } from "./DfTx/DfTxICXClaimDFCHTLC";
import { DfTxTokenUpdateAny } from "./DfTx/DfTxTokenUpdateAny";
import { DfTxSetDefaultLoanScheme } from "./DfTx/DfTxSetDefaultLoanScheme";
import { DfTxSetLoanScheme } from "./DfTx/DfTxSetLoanScheme";
import { DfTxSetCollateralToken } from "./DfTx/DfTxSetCollateralToken";
import { DfTxSetLoanToken } from "./DfTx/DfTxSetLoanToken";
import { DfTxCreateVault } from "./DfTx/DfTxCreateVault";
import { DfTxUpdateVault } from "./DfTx/DfTxUpdateVault";
import { DfTxDepositToVault } from "./DfTx/DfTxDepositToVault";
import { DfTxCloseVault } from "./DfTx/DfTxCloseVault";
import { DfTxCompositeSwap } from "./DfTx/DfTxCompositeSwap";
import { DfTxPlaceAuctionBid } from "./DfTx/DfTxPlaceAuctionBid";
import { DfTxPayBackLoan } from "./DfTx/DfTxPayBackLoan";
import { DfTxWithdrawFromVault } from "./DfTx/DfTxWithdrawFromVault";
import { DfTxSetGovernanceHeight } from "./DfTx/DfTxSetGovernanceHeight";
import { DfTxSetFutureSwap } from "./DfTx/DfTxSetFutureSwap";

interface TransactionDfTxProps {
  dftx?: DfTx<any>;
  transaction?: Transaction;
}

export function TransactionDfTx(
  props: TransactionDfTxProps
): JSX.Element | null {
  if (props.dftx === undefined) {
    return null;
  }

  switch (props.dftx.type) {
    case CPoolSwap.OP_CODE:
      return <DfTxPoolSwap dftx={props.dftx} transaction={props.transaction} />;
    case CPoolAddLiquidity.OP_CODE:
      return <DfTxPoolAddLiquidity dftx={props.dftx} />;
    case CPoolRemoveLiquidity.OP_CODE:
      return <DfTxPoolRemoveLiquidity dftx={props.dftx} />;
    case CSetOracleData.OP_CODE:
      return <DfTxSetOracleData dftx={props.dftx} />;
    case CUtxosToAccount.OP_CODE:
      return <DfTxUtxosToAccount dftx={props.dftx} />;
    case CAccountToAccount.OP_CODE:
      return <DfTxAccountToAccount dftx={props.dftx} />;
    case CTransferDomain.OP_CODE:
      return <DfTxTransferDomain dftx={props.dftx} />;
    case CAnyAccountToAccount.OP_CODE:
      return <DfTxAnyAccountToAccount dftx={props.dftx} />;
    case CAccountToUtxos.OP_CODE:
      return <DfTxAccountToUtxos dftx={props.dftx} />;
    case CCreateMasternode.OP_CODE:
      return <DfTxCreateMasternode dftx={props.dftx} />;
    case CResignMasternode.OP_CODE:
      return <DfTxResignMasternode dftx={props.dftx} />;
    case CPoolCreatePair.OP_CODE:
      return <DfTxPoolCreatePair dftx={props.dftx} />;
    case CTokenCreate.OP_CODE:
      return <DfTxTokenCreate dftx={props.dftx} />;
    case CAppointOracle.OP_CODE:
      return <DfTxAppointOracle dftx={props.dftx} />;
    case CSetGovernance.OP_CODE:
      return <DfTxSetGovernance dftx={props.dftx} />;
    case CTokenMint.OP_CODE:
      return <DfTxTokenMint dftx={props.dftx} />;
    case CUpdateOracle.OP_CODE:
      return <DfTxUpdateOracle dftx={props.dftx} />;
    case CRemoveOracle.OP_CODE:
      return <DfTxRemoveOracle dftx={props.dftx} />;
    case CICXCreateOrder.OP_CODE:
      return <DfTxICXCreateOrder dftx={props.dftx} />;
    case CPoolUpdatePair.OP_CODE:
      return <DfTxPoolUpdatePair dftx={props.dftx} />;
    case CICXMakeOffer.OP_CODE:
      return <DfTxICXMakeOffer dftx={props.dftx} />;
    case CICXCloseOffer.OP_CODE:
      return <DfTxICXCloseOffer dftx={props.dftx} />;
    case CICXCloseOrder.OP_CODE:
      return <DfTxICXCloseOrder dftx={props.dftx} />;
    case CAutoAuthPrep.OP_CODE:
      return null;
    case CICXSubmitDFCHTLC.OP_CODE:
      return <DfTxICXSubmitDFCHTLC dftx={props.dftx} />;
    case CICXSubmitEXTHTLC.OP_CODE:
      return <DfTxICXSubmitEXTHTLC dftx={props.dftx} />;
    case CICXClaimDFCHTLC.OP_CODE:
      return <DfTxICXClaimDFCHTLC dftx={props.dftx} />;
    case CTokenUpdateAny.OP_CODE:
      return <DfTxTokenUpdateAny dftx={props.dftx} />;
    case CSetLoanScheme.OP_CODE:
      return <DfTxSetLoanScheme dftx={props.dftx} />;
    case CSetDefaultLoanScheme.OP_CODE:
      return <DfTxSetDefaultLoanScheme dftx={props.dftx} />;
    case CSetCollateralToken.OP_CODE:
      return <DfTxSetCollateralToken dftx={props.dftx} />;
    case CSetLoanToken.OP_CODE:
      return <DfTxSetLoanToken dftx={props.dftx} />;
    case CCreateVault.OP_CODE:
      return <DfTxCreateVault dftx={props.dftx} />;
    case CUpdateVault.OP_CODE:
      return <DfTxUpdateVault dftx={props.dftx} />;
    case CCompositeSwap.OP_CODE:
      return (
        <DfTxCompositeSwap dftx={props.dftx} transaction={props.transaction} />
      );
    case CDepositToVault.OP_CODE:
      return <DfTxDepositToVault dftx={props.dftx} />;
    case CCloseVault.OP_CODE:
      return <DfTxCloseVault dftx={props.dftx} />;
    case CPaybackLoan.OP_CODE:
      return <DfTxPayBackLoan dftx={props.dftx} />;
    case CTakeLoan.OP_CODE:
      return <DfTxTakeLoan dftx={props.dftx} />;
    case CPlaceAuctionBid.OP_CODE:
      return <DfTxPlaceAuctionBid dftx={props.dftx} />;
    case CWithdrawFromVault.OP_CODE:
      return <DfTxWithdrawFromVault dftx={props.dftx} />;
    case CSetGovernanceHeight.OP_CODE:
      return <DfTxSetGovernanceHeight dftx={props.dftx} />;
    case CSetFutureSwap.OP_CODE:
      return <DfTxSetFutureSwap dftx={props.dftx} />;
    default:
      return <DfTxUnmapped dftx={props.dftx} />;
  }
}
