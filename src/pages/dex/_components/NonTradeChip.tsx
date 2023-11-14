import classNames from "classnames";
import React from "react";

export function NonTradeChip({
  wrapperClassName,
  className,
}: {
  wrapperClassName?: string;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={classNames(
        "flex px-2 py-1 bg-red-50 dark:bg-dark-red-50 rounded w-fit h-fit justify-between mb-2",
        wrapperClassName
      )}
    >
      <span
        className={classNames(
          "text-red-600 dark:text-dark-red-600 font-medium text-[10px] leading-3 tracking-[0.015em]",
          className
        )}
      >
        NON-TRADE PAIR
      </span>
    </div>
  );
}
