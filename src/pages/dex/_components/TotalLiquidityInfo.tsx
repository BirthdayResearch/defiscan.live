import { NumericFormat } from "react-number-format";
import React from "react";

interface TotalLiquidityInfoProps {
  tokenA: {
    id: string;
    symbol: string;
    displaySymbol: string;
    reserve: string;
    blockCommission: string;
  };
  tokenB: {
    id: string;
    symbol: string;
    displaySymbol: string;
    reserve: string;
    blockCommission: string;
  };
}

export function TotalLiquidityInfo(
  props: TotalLiquidityInfoProps
): JSX.Element {
  return (
    <div
      data-testid="TotalLiquidityInfo"
      className="font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md w-44"
    >
      <div className="p-3">
        <div className="font-medium">Total Liquidity</div>
        <div className="flex mt-1">
          <div className="w-1/2">{props.tokenA.displaySymbol}</div>
          <div className="w-1/2 font-medium text-right">
            <NumericFormat
              value={props.tokenA.reserve}
              displayType="text"
              thousandSeparator
              decimalScale={0}
              fixedDecimalScale
            />
          </div>
        </div>
        <div className="flex mt-0.5">
          <div className="w-1/2">{props.tokenB.displaySymbol}</div>
          <div className="w-1/2 font-medium text-right">
            <NumericFormat
              value={props.tokenB.reserve}
              displayType="text"
              thousandSeparator
              decimalScale={0}
              fixedDecimalScale
            />
          </div>
        </div>
      </div>
    </div>
  );
}
