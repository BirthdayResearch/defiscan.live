import { MdStairs } from "react-icons/md";
import React from "react";
import { NumericFormat } from "react-number-format";

export function BlocksInfoSection(props: {
  remaining: number;
  current: number;
}): JSX.Element {
  return (
    <div
      className="flex flex-wrap justify-center mt-10 -mx-2"
      data-testid="BlocksInfoSection"
    >
      <div className="w-full lg:w-4/6 flex flex-wrap">
        <div className="w-full md:w-1/2 py-1 md:py-0 md:pr-1 md:pl-2">
          <div className="rounded border dark:border-gray-700 p-2 flex items-center">
            <MdStairs className="text-gray-400 inline-block" size={22} />
            <span
              className="text-gray-500 ml-1 dark:text-gray-400"
              data-testid="BlocksInfoSection.Current.Label"
            >
              Current Height:
            </span>
            <span
              className="text-gray-900 ml-1 dark:text-gray-100"
              data-testid="BlocksInfoSection.Current.Value"
            >
              <NumericFormat
                value={props.current}
                displayType="text"
                thousandSeparator
              />
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:py-0 md:pr-2 md:pl-1">
          <div className="rounded border dark:border-gray-700 p-2 flex items-center">
            <MdStairs className="text-gray-400 inline-block" size={22} />
            <span
              className="text-gray-500 dark:text-gray-400 ml-1"
              data-testid="BlocksInfoSection.Remaining.Label"
            >
              Remaining Blocks:
            </span>
            <span
              className="text-gray-900 dark:text-gray-100 ml-1"
              data-testid="BlocksInfoSection.Remaining.Value"
            >
              <NumericFormat
                value={props.remaining}
                displayType="text"
                thousandSeparator
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
