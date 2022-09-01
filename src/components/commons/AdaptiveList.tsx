import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";

export function AdaptiveList(
  props: PropsWithChildren<{ className?: string }>
): JSX.Element {
  return (
    <div
      data-testid="AdaptiveList"
      className={classNames(
        "rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden",
        props.className
      )}
    >
      <div className="table w-full border-collapse">
        <div className="table-row-group">{props.children}</div>
      </div>
    </div>
  );
}

function Row(
  props: PropsWithChildren<{
    name: string;
    className?: string;
    testId?: string;
    infoDesc?: string | ReactNode;
  }>
): JSX.Element {
  return (
    <div className="table-row border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      <div className="table-cell px-4 md:px-6 py-3">
        <div className="flex items-center dark:text-gray-400">
          {props.name}
          {props.infoDesc !== undefined && (
            <InfoHoverPopover className="ml-1" description={props.infoDesc} />
          )}
        </div>
      </div>
      <div
        className={classNames(
          "table-cell px-4 md:px-6 py-3 text-gray-600 dark:text-gray-100 align-middle break-all",
          props.className
        )}
        data-testid={props.testId}
      >
        {props.children}
      </div>
    </div>
  );
}

AdaptiveList.Row = Row;
