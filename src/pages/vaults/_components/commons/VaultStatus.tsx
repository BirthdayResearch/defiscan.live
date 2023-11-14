import classNames from "classnames";
import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
} from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";
import { SignalCellular0 } from "@components/icons/assets/signal/SignalCellular0";
import { SignalCellular1 } from "@components/icons/assets/signal/SignalCellular1";
import { SignalCellular2 } from "@components/icons/assets/signal/SignalCellular2";
import { SignalCellular3 } from "@components/icons/assets/signal/SignalCellular3";

interface VaultStatusProps {
  vault: LoanVaultActive | LoanVaultLiquidated;
  className?: string;
  testId?: string;
}

export function VaultStatus(props: VaultStatusProps): JSX.Element {
  let textClassName = "";
  let bgClassName = "";
  let text = "";
  let signalSymbol: JSX.Element = <></>;

  switch (props.vault.state) {
    case LoanVaultState.ACTIVE: {
      if (
        Number(props.vault.loanAmounts.length) === 0 &&
        Number(props.vault.collateralAmounts.length) === 0
      ) {
        textClassName = "text-gray-500 dark:text-gray-400";
        bgClassName = "bg-gray-100 dark:bg-gray-900";
        text = "EMPTY";
        break;
      }

      if (
        Number(props.vault.loanAmounts.length) === 0 &&
        Number(props.vault.collateralAmounts.length) !== 0
      ) {
        textClassName = "text-gray-500 bg-gray-100 dark:text-gray-400";
        bgClassName = "bg-gray-100 dark:bg-gray-900";
        text = "READY";
        break;
      }

      const minColRatio = new BigNumber(props.vault.loanScheme.minColRatio);
      const collateralRatio = new BigNumber(props.vault.informativeRatio);
      const currentPercentage = collateralRatio.div(minColRatio);

      if (currentPercentage.gt(1.5)) {
        textClassName = "text-green-500 dark:text-dark-green-500";
        bgClassName = "bg-green-100 dark:bg-dark-green-100";
        text = "ACTIVE";
        signalSymbol = (
          <SignalCellular3
            className={classNames("h-3.5 w-3.5 ml-1", textClassName)}
          />
        );
      } else if (currentPercentage.gte(1.25) && currentPercentage.lte(1.5)) {
        textClassName = "text-orange-500";
        bgClassName = "bg-orange-100 dark:bg-dark-orange-100";
        text = "ACTIVE";
        signalSymbol = (
          <SignalCellular2
            className={classNames("h-3.5 w-3.5 ml-1", textClassName)}
          />
        );
      } else {
        textClassName = "text-red-500 dark:text-dark-red-600";
        bgClassName = "bg-red-100 dark:bg-dark-red-100";
        text = "ACTIVE";
        signalSymbol = (
          <SignalCellular1
            className={classNames("h-3.5 w-3.5 ml-1", textClassName)}
          />
        );
      }
      break;
    }

    case LoanVaultState.FROZEN: {
      textClassName = "text-gray-400 dark:text-gray-500";
      bgClassName = "bg-gray-100 dark:bg-gray-900";
      text = "HALTED";
      signalSymbol = (
        <SignalCellular0
          className={classNames("h-3.5 w-3.5 ml-1", textClassName)}
        />
      );
      break;
    }

    case LoanVaultState.MAY_LIQUIDATE: {
      textClassName = "text-red-500 dark:bg-dark-red-600";
      bgClassName = "bg-red-100 dark:bg-dark-red-100";
      text = "ACTIVE";
      signalSymbol = (
        <SignalCellular1
          className={classNames("h-3.5 w-3.5 ml-1", textClassName)}
        />
      );
      break;
    }

    case LoanVaultState.IN_LIQUIDATION: {
      textClassName = "text-gray-500 dark:text-gray-400";
      bgClassName = "bg-gray-100 dark:bg-gray-900";
      text = "IN LIQUIDATION";
      break;
    }

    case LoanVaultState.UNKNOWN: {
      textClassName = "text-white dark:text-gray-400";
      bgClassName = "bg-gray-400 dark:bg-gray-900";
      text = "UNKNOWN";
      break;
    }
  }

  return (
    <div
      className={classNames(
        "min-w-max align-middle bg-white",
        props.className,
        textClassName
      )}
      data-testid={props.testId}
    >
      <div className={classNames("flex px-2 py-1 ", bgClassName)}>
        <div className="font-medium">{text}</div>
        {signalSymbol}
      </div>
    </div>
  );
}
