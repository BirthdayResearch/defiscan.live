import classNames from "classnames";
import React from "react";

export function EmergencyChip({
  wrapperClassName,
  className,
}: {
  wrapperClassName?: string;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={classNames(
        "flex px-2 bg-orange-100 dark:bg-dark-orange-100 rounded w-fit h-fit justify-between",
        wrapperClassName
      )}
    >
      <span
        className={classNames(
          "text-orange-600 dark:text-dark-orange-600 font-medium",
          className
        )}
      >
        SPECIAL
      </span>
    </div>
  );
}
