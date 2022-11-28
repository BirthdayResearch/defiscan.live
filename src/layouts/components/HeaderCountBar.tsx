import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { NumericFormat } from "react-number-format";
import classNames from "classnames";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import React from "react";

export function HeaderCountBar(props: { className: string }): JSX.Element {
  const { count, tvl } = useSelector((state: RootState) => state.stats);

  function HeaderCount(props: {
    text: string;
    count?: number;
    className?: string;
  }): JSX.Element {
    return (
      <li className={classNames(props.className, "py-1 mx-2 lg:mx-0")}>
        <span className="text-sm text-primary-100 font-medium dark:text-dark-gray-500">
          {props.text}{" "}
        </span>
        <span className="text-sm text-white ml-0.5">
          {props.count !== undefined ? (
            <NumericFormat
              value={props.count}
              displayType="text"
              thousandSeparator
            />
          ) : (
            "..."
          )}
        </span>
      </li>
    );
  }

  function HeaderAmount(props: {
    text: string;
    count?: number;
    className?: string;
  }): JSX.Element {
    return (
      <li className={classNames(props.className, "py-1")}>
        <span className="text-sm text-primary-100 font-medium dark:text-dark-gray-500">
          {props.text}{" "}
        </span>
        <span className="text-sm text-white ml-0.5">
          {props.count !== undefined ? (
            <NumericFormat
              value={props.count}
              displayType="text"
              decimalScale={0}
              thousandSeparator
              prefix="$"
            />
          ) : (
            "..."
          )}
        </span>
      </li>
    );
  }

  function PopoverTVL(): JSX.Element {
    function PopoverTVLAmount(props: {
      text: string;
      count?: number;
    }): JSX.Element {
      return (
        <div className="text-gray-900 grid grid-cols-2 grid mt-0.5">
          <span className="text-sm mr-4">{props.text} </span>
          <span className="text-sm font-medium text-right">
            {props.count !== undefined ? (
              <NumericFormat
                value={props.count}
                displayType="text"
                decimalScale={0}
                thousandSeparator
                prefix="$"
              />
            ) : (
              "..."
            )}
          </span>
        </div>
      );
    }

    return (
      <div className="px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md ">
        <PopoverTVLAmount text="DEX" count={tvl?.dex} />
        <PopoverTVLAmount text="Masternode" count={tvl?.masternodes} />
        <PopoverTVLAmount text="Vault Collateral" count={tvl?.loan} />
        <PopoverTVLAmount text="Total" count={tvl?.total} />
      </div>
    );
  }

  return (
    <ul
      className={classNames(
        props.className,
        "flex flex-wrap lg:space-x-6 overflow-hidden"
      )}
    >
      <HeaderCount text="Blocks" count={count?.blocks} />
      <HeaderCount text="Tokens" count={count?.tokens} />
      <HeaderCount text="Masternodes" count={count?.masternodes} />
      <HeaderCount text="Price Feeds" count={count?.prices} />
      <HoverPopover popover={<PopoverTVL />} className="mx-2 lg:mx-0">
        <HeaderAmount
          className="cursor-help "
          text="Total Value Locked"
          count={tvl?.total}
        />
      </HoverPopover>
    </ul>
  );
}
