import { Link } from "@components/commons/link/Link";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
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
          className="flex gap-x-2"
          data-testid={`mobile-selectBlock-${token.displaySymbol}`}
        >
          <Link href={{ pathname: `/tokens/${token.displaySymbol}` }}>
            <a
              className="contents"
              data-testid={`mobile-viewLink-${token.displaySymbol}`}
            >
              <div
                className={classNames(
                  "border-[0.5px] border-primary-300 rounded text-primary-500 dark:bg-gray-900 dark:border-dark-primary-300 dark:text-dark-primary-500 px-1.5 py-1 text-sm h-min"
                )}
              >
                VIEW
              </div>
            </a>
          </Link>
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
      </div>
      {isExpanded && (
        <div className="mt-[18px]">
          <div className="py-1.5 flex items-start justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Net Supply
              <InfoHoverPopover
                className="ml-1"
                description="Net supply is calculated using total amount of tokens minted minus burned amount."
              />
            </div>
            <div
              className={classNames(
                "text-sm text-gray-900 w-2/4 text-end break-words",
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
                  data-testid={`mobile-netSupply-${token.displaySymbol}`}
                />
              )}
            </div>
          </div>
          <div className="pt-[8px] pb-1 flex items-center text-xs font-medium text-gray-500 dark:text-dark-gray-500 w-2/4">
            Backing Address
            <InfoHoverPopover
              className="ml-1"
              description="Addresses that hold the backing collaterals for the circulating supply of dTokens"
            />
          </div>
          <div className="py-1.5 flex justify-between">
            <div className="text-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Cake
            </div>
            {backedAddress.cake !== undefined ? (
              <a
                href={backedAddress.cake.link}
                className="text-sm text-blue-500 w-2/4 break-words text-end"
                data-testid={`mobile-backedAddress-cake-${token.displaySymbol}`}
              >
                {backedAddress.cake.address}
              </a>
            ) : (
              <div className="text-sm text-gray-900 dark:text-dark-gray-500 w-2/4 break-words text-end">
                N/A
              </div>
            )}
          </div>
          <div className="py-1.5 flex items-start justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-dark-gray-500 w-2/4">
              Quantum
              <InfoHoverPopover
                className="ml-1"
                description="This excludes initial liquidity supplied and will only display collaterals for minting."
              />
            </div>
            {backedAddress.quantum !== undefined ? (
              <a
                href={backedAddress.quantum.link}
                className="text-sm text-blue-500 w-2/4 break-words text-end"
                data-testid={`mobile-backedAddress-quantum-${token.displaySymbol}`}
              >
                {backedAddress.quantum.address}
              </a>
            ) : (
              <div className="text-sm text-gray-900 dark:text-dark-gray-500 w-2/4 break-words text-end">
                N/A
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
