import { JSX } from "@babel/types";
import { PropsWithChildren, ReactNode } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import classNames from "classnames";
import { Placement } from "@floating-ui/react-dom";

interface WarningHoverPopoverProps {
  description: string | ReactNode;
  className?: string;
  placement?: Placement;
}

export function WarningHoverPopover(
  props: PropsWithChildren<WarningHoverPopoverProps>
): JSX.Element {
  return (
    <HoverPopover popover={props.description} placement={props.placement}>
      <div
        className={classNames("cursor-help group", props.className)}
        data-testid="WarningHoverPopover"
      >
        <IoWarningOutline className="h-4 w-4 text-orange-600" />
      </div>
    </HoverPopover>
  );
}
