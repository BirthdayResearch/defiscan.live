import { PropsWithChildren } from "react";
import { MdLanguage } from "react-icons/md";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import classNames from "classnames";
import { Placement } from "@floating-ui/react-dom";

interface IconPopoverProps {
  className?: string;
  placement?: Placement;
}

export function IconTooltip(
  props: PropsWithChildren<IconPopoverProps>
): JSX.Element {
  return (
    <HoverPopover
      className={classNames("cursor-help group", props.className)}
      popover="This icon indicates that the price is provided by Oracles instead of the DEX"
      placement={props.placement}
    >
      <div data-testid="IconTooltipPopover">
        <MdLanguage className="h-4 w-4 text-gray-700 dark:text-gray-200 ml-1" />
      </div>
    </HoverPopover>
  );
}
