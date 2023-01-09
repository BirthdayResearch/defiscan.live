import BigNumber from "bignumber.js";
import { formatUnixTime } from "./dateHelper";

/**
 * Return an estimated end date for a proposal cycle
 */
export function getCycleEndDate(
  cycleEndHeight: number,
  currentBlockHeight: number,
  currentBlockMedianTime: number,
  secondsPerBlock: number
) {
  const timeDifferenceInBlocks = new BigNumber(cycleEndHeight).minus(
    currentBlockHeight
  );
  const cycleEndMedianTime = timeDifferenceInBlocks
    .multipliedBy(secondsPerBlock)
    .plus(currentBlockMedianTime);
  return formatUnixTime(BigNumber.max(cycleEndMedianTime, 0).toNumber());
}
