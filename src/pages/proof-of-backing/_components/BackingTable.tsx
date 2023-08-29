import { Link } from "@components/commons/link/Link";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import { getAssetIcon } from "@components/icons/assets/tokens";
import classNames from "classnames";
import { TOKEN_BACKED_ADDRESS } from "constants/TokenBackedAddress";
import { NumericFormat } from "react-number-format";
import { TokenWithBacking } from "../index.page";

export function BackingTable({
  tokens,
}: {
  tokens: TokenWithBacking[];
}): JSX.Element {
  return (
    <div className="mt-10 mb-[78px] grid grid-cols-4">
      <TableHeader />
      <>
        {tokens.map((token, index) => (
          <TableRow
            key={token.symbol}
            token={token}
            isLast={index === tokens.length - 1}
          />
        ))}
      </>
    </div>
  );
}

function TableHeader(): JSX.Element {
  return (
    <>
      <div className="row-span-2 px-6 py-9 bg-gray-50 dark:bg-dark-gray-200 border-gray-300 dark:border-dark-gray-300 border-y-[0.5px] border-l-[0.5px] rounded-tl-[10px] text-gray-500 dark:text-dark-gray-900 text-sm font-medium">
        Token
      </div>
      <div className="row-span-2 px-6 py-9 bg-gray-50 flex items-center dark:bg-dark-gray-200 border-gray-300 dark:border-dark-gray-300 border-y-[0.5px] border-l-[0.5px] text-gray-500 dark:text-dark-gray-900 text-sm font-medium">
        Net Supply
        <InfoHoverPopover
          className="ml-1"
          description="Net supply is calculated using total amount of tokens minted minus burned amount."
        />
      </div>
      <div className="col-span-2 px-6 py-3.5 flex items-center justify-center bg-gray-50 dark:bg-dark-gray-200 border-gray-300 dark:border-dark-gray-300 border-[0.5px] rounded-tr-[10px] text-gray-500 dark:text-dark-gray-900 text-sm font-medium text-center">
        Backing Address
        <InfoHoverPopover
          className="ml-1"
          description="Addresses that hold the backing collaterals for the circulating supply of dTokens"
        />
      </div>
      <div className="text-gray-500 px-6 py-3 bg-gray-50 dark:bg-dark-gray-200 border-gray-300 dark:border-dark-gray-300 border-x-[0.5px] border-b-[0.5px] dark:text-dark-gray-900 text-sm font-medium text-center">
        Cake
      </div>
      <div className="text-gray-500 px-6 py-3 flex items-center justify-center bg-gray-50 dark:bg-dark-gray-200 border-gray-300 dark:border-dark-gray-300 border-b-[0.5px] border-r-[0.5px] dark:text-dark-gray-900 text-sm font-medium text-center">
        Quantum
        <InfoHoverPopover
          className="ml-1"
          description="This excludes initial liquidity supplied and will only display collaterals for minting."
        />
      </div>
    </>
  );
}

function TableRow({
  token,
  isLast,
}: {
  token: TokenWithBacking;
  isLast?: boolean;
}): JSX.Element {
  const backedAddress = TOKEN_BACKED_ADDRESS[token.symbol];
  const Icon = getAssetIcon(token.symbol);
  return (
    <Link href={{ pathname: `/tokens/${token.displaySymbol}` }}>
      <div
        className={classNames(
          "group dark:bg-dark-gray-100 border-gray-300 dark:border-dark-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border-x-[0.5px] border-b-[0.5px] col-span-4 grid grid-cols-4",
          {
            "rounded-b-[10px]": isLast === true,
          },
        )}
      >
        <div
          className="col-span-1 h-full px-6 self-center flex items-center py-[18px] pl-6 border-gray-300 dark:border-dark-gray-300 border-r-[0.5px]"
          data-testid={`symbol-${token.displaySymbol}`}
        >
          <div className="flex items-center">
            <Icon width={28} height={28} />
            <span className="pl-2 font-semibold text-gray-900 dark:text-dark-gray-900 group-hover:text-primary-500">
              {token.displaySymbol}
            </span>
          </div>
        </div>
        <div
          className={classNames(
            "h-full px-6 py-5 flex items-center text-gray-900 group-hover:text-primary-500",
            {
              "dark:text-dark-gray-900": token.netSupply !== undefined,
              "dark:text-dark-gray-500": token.netSupply === undefined,
            },
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
              className="break-all"
              data-testid={`netSupply-value-${token.displaySymbol}`}
            />
          )}
        </div>
        {backedAddress.cake !== undefined ? (
          <a
            className="px-6 self-center break-words py-5 text-blue-500 hover:underline border-gray-300 dark:border-dark-gray-300 border-x-[0.5px]"
            href={backedAddress.cake.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            data-testid={`backedAddress-cake-${token.displaySymbol}`}
          >
            {backedAddress.cake.address}
          </a>
        ) : (
          <div className="h-full px-6 flex items-center text-gray-500 dark:text-dark-gray-500 border-gray-300 dark:border-dark-gray-300 border-r-[0.5px]">
            N/A
          </div>
        )}
        {backedAddress.quantum !== undefined ? (
          <a
            className="px-6 self-center break-words py-5 text-blue-500 hover:underline"
            href={backedAddress.quantum.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            data-testid={`backedAddress-quantum-filled-${token.displaySymbol}`}
          >
            {backedAddress.quantum.address}
          </a>
        ) : (
          <div
            className="h-full px-6 flex items-center text-gray-500 dark:text-dark-gray-500"
            data-testid={`backedAddress-quantum-na-${token.displaySymbol}`}
          >
            N/A
          </div>
        )}
      </div>
    </Link>
  );
}
