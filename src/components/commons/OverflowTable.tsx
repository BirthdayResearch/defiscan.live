import classNames from "classnames";
import React, {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

const OverflowTableContext = createContext<number>(0);

export function OverflowTable(
  props: PropsWithChildren<{ className?: string }>
): JSX.Element {
  const [scroll, setScroll] = useState(0);

  return (
    <div
      data-testid="OverflowTable"
      className={classNames(
        "relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto",
        props.className
      )}
      onScroll={(ele: any) => setScroll(ele.target?.scrollLeft)}
    >
      <div className="table table-auto border-collapse w-full">
        <div className="table-row-group">
          <OverflowTableContext.Provider value={scroll}>
            {props.children}
          </OverflowTableContext.Provider>
        </div>
      </div>
    </div>
  );
}

function Header(props: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      data-testid="OverflowTable.Header"
      className={classNames(
        "table-row border-gray-100 bg-gray-50 dark:bg-gray-700",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

function Row(
  props: PropsWithChildren<{ className?: string; onClick?: MouseEventHandler }>
): JSX.Element {
  return (
    <div
      data-testid="OverflowTable.Row"
      className={classNames(
        "table-row border-t border-gray-100 dark:border-gray-700 group",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

function Head(
  props: PropsWithChildren<{
    title: string;
    className?: string;
    sticky?: boolean;
    alignRight?: boolean;
    infoDesc?: string | ReactNode;
    testId?: string;
  }>
): JSX.Element {
  return (
    <div
      data-testid="OverflowTable.Head"
      className={classNames(
        "table-cell px-4 md:px-6 py-3 align-middle text-black dark:text-gray-100 text-opacity-60 text-sm font-semibold",
        props.className,
        {
          "sticky left-0": props.sticky!,
          "text-right": props.alignRight!,
        }
      )}
    >
      <div
        className={classNames("flex items-center", {
          "justify-end": props.alignRight!,
        })}
        data-testid={props.testId}
      >
        {props.title}
        {props.infoDesc !== undefined && (
          <InfoHoverPopover className="ml-1" description={props.infoDesc} />
        )}
        {props.children}
      </div>
    </div>
  );
}

function Cell(
  props: PropsWithChildren<{
    className?: string;
    sticky?: boolean;
    alignRight?: boolean;
  }>
): JSX.Element {
  return (
    <OverflowTableContext.Consumer>
      {(left) => (
        <div
          data-testid="OverflowTable.Cell"
          className={classNames(
            "table-cell px-4 md:px-6 py-4 align-top bg-white dark:bg-gray-800 dark:group-hover:bg-gray-600 group-hover:bg-primary-50 dark:text-gray-100 ",
            props.className,
            {
              "sticky left-0": props.sticky!,
              "text-right": props.alignRight!,
            }
          )}
        >
          {props.children}
          <div
            className={classNames({
              "h-full absolute inset-y-0 right-0 border-r border-gray-100 dark:border-gray-700":
                props.sticky! && left > 0,
            })}
          />
        </div>
      )}
    </OverflowTableContext.Consumer>
  );
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: string;
  columnKey: string;
  sortKey: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  let arrow = <TiArrowUnsorted className="h-4 w-4 text-gray-300" />;

  if (sortKey === columnKey && sortOrder === "asc") {
    arrow = <TiArrowSortedUp className="h-4 w-4 text-primary-300" />;
  } else if (sortKey === columnKey && sortOrder === "desc") {
    arrow = <TiArrowSortedDown className="h-4 w-4 text-primary-300" />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="OverflowTable.SortButton"
    >
      {arrow}
    </button>
  );
}

OverflowTable.Header = Header;
OverflowTable.Head = Head;
OverflowTable.Row = Row;
OverflowTable.Cell = Cell;
OverflowTable.SortButton = SortButton;
