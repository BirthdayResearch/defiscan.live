import { JSX } from "@babel/types";
import { PropsWithChildren, ReactNode } from "react";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import classNames from "classnames";
import { Placement } from "@floating-ui/react-dom";

interface MoreHoverPopoverProps {
  description: string | ReactNode;
  className?: string;
  placement?: Placement;
}

export function MoreHoverPopover(
  props: PropsWithChildren<MoreHoverPopoverProps>
): JSX.Element {
  return (
    <HoverPopover
      className={classNames("cursor-help group", props.className)}
      popover={props.description}
      placement={props.placement}
    >
      <div className="flex items-center" data-testid="MoreHoverPopover">
        {props.children}
        <IoEllipsisHorizontalCircleOutline
          className={classNames("h-4 w-4 text-blue-500", {
            "ml-1": props.children,
          })}
        />
      </div>
    </HoverPopover>
  );
}
