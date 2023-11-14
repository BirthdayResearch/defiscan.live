import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { HoverPopover } from "@components/commons/popover/HoverPopover";
import classNames from "classnames";
import { useAuctionTimeLeft } from "../../../../hooks/useAuctionTimeLeft";

interface MinNextBidProps {
  liquidationHeight: number;
  showApproximateSymbol?: boolean;
  className?: string;
  testId?: string;
}

export function AuctionTimeLeft(props: MinNextBidProps): JSX.Element {
  const {
    count: { blocks },
  } = useSelector((state: RootState) => state.stats);

  const { timeRemaining, blocksRemaining } = useAuctionTimeLeft(
    props.liquidationHeight,
    blocks ?? 0
  );

  if (timeRemaining === undefined) {
    return <>0h 0m</>;
  }

  return (
    <HoverPopover
      popover={`${blocksRemaining} blocks remaining`}
      placement="top-start"
    >
      <span className={classNames(props.className)} data-testid={props.testId}>
        {props.showApproximateSymbol! && "~"}
        {`${timeRemaining} left`}
      </span>
    </HoverPopover>
  );
}
