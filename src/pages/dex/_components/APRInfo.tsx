import { NumericFormat } from "react-number-format";
import React from "react";

export function APRInfo(props: {
  total: number;
  reward: number;
  commission: number;
}): JSX.Element {
  return (
    <div className="font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md w-44">
      <div className="p-3">
        <div className="font-medium">Total APR</div>
        <div className="flex mt-1">
          <div className="w-1/2">Reward</div>
          <div className="w-1/2 font-medium text-right">
            <NumericFormat
              value={props.reward * 100}
              displayType="text"
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix="%"
            />
          </div>
        </div>
        <div className="flex mt-0.5">
          <div className="w-1/2">Commission</div>
          <div className="w-1/2 font-medium text-right">
            <NumericFormat
              value={props.commission * 100}
              displayType="text"
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              suffix="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
