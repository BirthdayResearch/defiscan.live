import { getAssetIcon } from "@components/icons/assets/tokens";
import classNames from "classnames";
import { TOKEN_BACKED_ADDRESS } from "constants/TokenBackedAddress";
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { TokenWithBacking } from "../index.page";

export function BackingCard({
  token,
}: {
  token: TokenWithBacking;
}): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = getAssetIcon(token.symbol);
  const backedAddress = TOKEN_BACKED_ADDRESS[token.symbol];

  return (
    <div className="border-gray-300 dark:border-dark-gray-300 border-[0.5px] rounded-xl px-4 py-[18px] mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon width={28} height={28} />
          <span className="pl-2 font-semibold text-gray-900 dark:text-dark-gray-900">
            {token.displaySymbol}
          </span>
        </div>
        <div
          className="text-primary-500 cursor-pointer dark:bg-gray-900 dark:text-dark-primary-500 border-[0.5px] border-primary-300 dark:border-dark-primary-300 rounded h-min"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="OnChainGovernance.CardView.Toggle"
        >
          {!isExpanded ? (
            <MdOutlineKeyboardArrowDown size={28} />
          ) : (
            <MdOutlineKeyboardArrowUp size={28} />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-3">
          <div className="py-1.5 flex justify-between">
            <div className="font-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Net Supply
            </div>
            <div
              className={classNames(
                "font-sm text-gray-900 w-2/4 text-end break-words",
                {
                  "dark:text-dark-gray-900": token.netSupply !== undefined,
                  "dark:text-dark-gray-500": token.netSupply === undefined,
                }
              )}
            >
              {token.netSupply === undefined ? (
                "N/A"
              ) : (
                <NumericFormat
                  displayType="text"
                  thousandSeparator
                  value={token.netSupply}
                  suffix={` ${token.displaySymbol}`}
                />
              )}
            </div>
          </div>
          <div className="py-1.5 flex justify-between">
            <div className="font-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Backing Address (Cake)
            </div>
            {backedAddress.cake !== undefined ? (
              <a
                href={backedAddress.cake.link}
                className="font-sm text-blue-500 w-2/4 break-words text-end"
              >
                {backedAddress.cake.address}
              </a>
            ) : (
              <div className="font-sm text-gray-900 dark:text-dark-gray-500 w-2/4 break-words text-end">
                N/A
              </div>
            )}
          </div>
          <div className="py-1.5 flex justify-between">
            <div className="font-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Backing Address (Quantum)
            </div>
            {backedAddress.quantum !== undefined ? (
              <a
                href={backedAddress.quantum.link}
                className="font-sm text-blue-500 w-2/4 break-words text-end"
              >
                {backedAddress.quantum.address}
              </a>
            ) : (
              <div className="font-sm text-gray-900 dark:text-dark-gray-500 w-2/4 break-words text-end">
                N/A
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
