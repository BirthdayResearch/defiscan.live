import React from "react";
import BigNumber from "bignumber.js";
import {
  CollateralToken,
  LoanVaultActive,
} from "@defichain/whale-api-client/dist/api/loan";
import { WarningHoverPopover } from "@components/commons/popover/WarningHoverPopover";
import { NumericFormat } from "react-number-format";
import { useNextCollateralizationRatio } from "../../utils/NextCollateralizationRatio";
import { VaultCollateralizationRatio } from "./VaultCollateralizationRatio";

interface VaultHealthBarProps {
  vault: LoanVaultActive;
  collateralTokens: CollateralToken[];
}

export function VaultHealthBar(props: VaultHealthBarProps): JSX.Element {
  const atRiskThresholdMultiplier = 1.5;
  const minColRatio = new BigNumber(props.vault.loanScheme.minColRatio);
  const maxRatio = getMaxRatio(
    minColRatio.multipliedBy(atRiskThresholdMultiplier)
  );
  const normalizedColRatio = new BigNumber(
    props.vault.informativeRatio
  ).dividedBy(maxRatio);
  const normalizedLiquidatedThreshold = minColRatio
    .multipliedBy(1.25)
    .dividedBy(maxRatio)
    .multipliedBy(100);
  const normalizedAtRiskThreshold = minColRatio
    .multipliedBy(atRiskThresholdMultiplier)
    .dividedBy(maxRatio)
    .multipliedBy(100);

  const nextColRatio = useNextCollateralizationRatio(
    props.vault.collateralAmounts,
    props.vault.loanAmounts,
    props.collateralTokens
  );

  let normalizedNextRatio: BigNumber | undefined;
  if (nextColRatio !== undefined) {
    normalizedNextRatio = new BigNumber(nextColRatio)
      .dividedBy(maxRatio)
      .multipliedBy(100);
  }

  return (
    <div
      className="md:w-full lg:w-1/3 mt-4 md:mt-4 lg:px-4 lg:mt-0"
      data-testid="VaultHealthBar"
    >
      <div className="w-full flex">
        <div className="w-1/2 dark:text-white">Collateralization Ratio</div>
        <div className="w-1/2 text-right">
          <VaultCollateralizationRatio
            collateralizationRatio={new BigNumber(
              props.vault.informativeRatio
            ).toFixed(2)}
            loanScheme={props.vault.loanScheme}
            vaultState={props.vault.state}
            testId="VaultHealthBar.CollateralizationRatio"
          />
        </div>
      </div>
      <div className="mt-0.5 w-full flex flex-wrap text-sm text-gray-500 dark:text-gray-100">
        <div
          className="w-1/2 text-gray-500"
          data-testid="VaultHealthBar.MinCollateralizationRatio"
        >
          {`Min: ${minColRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}%`}
        </div>
        <div
          className="w-1/2 text-right flex items-center justify-end text-gray-500"
          data-testid="VaultHealthBar.NextCollateralizationRatio"
        >
          {(() => {
            if (nextColRatio === undefined) {
              return "N/A";
            }

            return (
              <>
                <NumericFormat
                  value={nextColRatio.toFixed(8)}
                  displayType="text"
                  thousandSeparator
                  suffix="%"
                  prefix="Next ~"
                  decimalScale={2}
                />
                {nextColRatio.lt(minColRatio.multipliedBy(1.1)) && (
                  <>
                    <span className="hidden">
                      Vault may go into liquidation.
                    </span>
                    <WarningHoverPopover
                      className="ml-1"
                      description={<LiquidationWarningMessage />}
                    />
                  </>
                )}
              </>
            );
          })()}
        </div>
      </div>
      <div className="relative flex mt-2.5 items-center">
        <div className="w-full flex rounded-lg h-4 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-800 border overflow-hidden ">
          <div
            className="bg-white h-4 overflow-hidden dark:bg-gray-200"
            style={{ width: `${normalizedColRatio.toNumber() * 100}%` }}
            data-testid="VaultHealthBar.BarProgress"
          />
        </div>
        <span
          className="absolute h-5 border-l border-black dark:border-white"
          style={{
            left: `${BigNumber.min(
              normalizedColRatio.multipliedBy(100),
              99.7
            ).toFixed(2)}%`,
          }}
          data-testid="VaultHealthBar.CurrentLine"
        />
        {normalizedNextRatio !== undefined && (
          <span
            className="absolute h-5 border-l border-black border-dashed dark:border-white"
            style={{
              left: `${BigNumber.min(normalizedNextRatio, 99.7).toFixed(2)}%`,
            }}
            data-testid="VaultHealthBar.NextLine"
          />
        )}
      </div>
      <ColorScale
        normalizedAtRiskThreshold={normalizedAtRiskThreshold}
        normalizedLiquidatedThreshold={normalizedLiquidatedThreshold}
      />
    </div>
  );
}

function ColorScale(props: {
  normalizedLiquidatedThreshold: BigNumber;
  normalizedAtRiskThreshold: BigNumber;
}): JSX.Element {
  return (
    <div
      className="w-full flex flex-row mt-1.5"
      data-testid="VaultHealthBar.ColorScale"
    >
      <div
        className="h-1 bg-red-300 dark:bg-dark-red-500"
        style={{ width: `${props.normalizedLiquidatedThreshold.toFixed(2)}%` }}
      />
      <div
        className="h-1 bg-orange-300 dark:bg-dark-orange-500"
        style={{
          width: `${props.normalizedAtRiskThreshold
            .minus(props.normalizedLiquidatedThreshold)
            .toFixed(2)}%`,
        }}
      />
      <div className="h-1 flex-1 bg-green-300 dark:bg-dark-green-500" />
    </div>
  );
}

function getMaxRatio(atRiskThreshold: BigNumber): number {
  const healthyScaleRatio = 0.75;
  return atRiskThreshold
    .dividedBy(new BigNumber(1).minus(healthyScaleRatio))
    .toNumber();
}

function LiquidationWarningMessage(): JSX.Element {
  return (
    <div className="p-3 space-y-2 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs">
      Vault may go into liquidation.
      <br />
      <p className="italic">
        This warning is shown when the vault's Next Collateralization Ratio is
        lesser than 1.1x of it's Min. Collateralization Ratio.
      </p>
    </div>
  );
}
