import classNames from "classnames";
import React from "react";

interface TooltipProps {
  text: string;
  children?: JSX.Element;
  active?: boolean;
  customStyle?: string;
}

export function Tooltip({ text, children, active, customStyle }: TooltipProps) {
  return (
    <div className="group relative">
      <div
        className={classNames(
          "pointer-events-none absolute bottom-full text-justify left-1/2 -translate-x-1/2 rounded text-xs px-4 py-2 opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-white dark:before:border-t-gray-800 before:content-[''] group-hover:opacity-100 shadow-md ring-1 ring-gray-100 bg-white dark:ring-gray-700 dark:bg-gray-800 dark:text-dark-gray-900 p-2",
          { hidden: !active },
          customStyle
        )}
      >
        {text}
      </div>
      {children}
    </div>
  );
}
