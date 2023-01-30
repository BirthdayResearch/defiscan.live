import { useState, useEffect } from "react";
import { useWhaleRpcClient } from "@contexts/WhaleContext";
import BigNumber from "bignumber.js";
import { formatMedianTime } from "./dateHelper";

/**
 * Return an estimated end date for a proposal cycle
 */
export function useCycleEndDate(
  cycleEndHeight: number,
  currentBlockHeight: number,
  currentBlockMedianTime: number,
  secondsPerBlock: number
) {
  const rpc = useWhaleRpcClient();
  const [cycleEndDate, setCycleEndDate] = useState("");
  const timeDifferenceInBlocks = new BigNumber(cycleEndHeight).minus(
    currentBlockHeight
  );

  useEffect(() => {
    async function getPastCycleEndHeightMedianTime(): Promise<void> {
      const block = await rpc.blockchain.getBlockStats(cycleEndHeight);
      setCycleEndDate(formatMedianTime(block.mediantime));
    }

    if (timeDifferenceInBlocks.isGreaterThan(0)) {
      const cycleEndMedianTime = getFutureCycleEndMedianTime(
        timeDifferenceInBlocks,
        secondsPerBlock,
        currentBlockMedianTime
      );
      setCycleEndDate(formatMedianTime(cycleEndMedianTime, undefined, true));
    } else {
      getPastCycleEndHeightMedianTime();
    }
  }, []);

  return cycleEndDate;
}

export function getFutureCycleEndMedianTime(
  timeDifferenceInBlocks: BigNumber,
  secondsPerBlock: number,
  currentBlockMedianTime: number
): number {
  return BigNumber.max(
    timeDifferenceInBlocks
      .multipliedBy(secondsPerBlock)
      .plus(currentBlockMedianTime),
    0
  ).toNumber();
}
