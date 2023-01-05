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
  const timeDifferenceInBlocks = cycleEndHeight - currentBlockHeight;
  const cycleEndMedianTime =
    currentBlockMedianTime + timeDifferenceInBlocks * secondsPerBlock;
  return formatUnixTime(cycleEndMedianTime);
}
