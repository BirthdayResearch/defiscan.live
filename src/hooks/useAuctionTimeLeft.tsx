import { isPlayground } from "@waveshq/walletkit-core";
import { useNetwork } from "@contexts/NetworkContext";
import BigNumber from "bignumber.js";

interface AuctionTimeLeft {
  timeRemaining: string | undefined;
  blocksRemaining: number;
  blocksPerAuction: number;
}

export function useAuctionTimeLeft(
  liquidationHeight: number,
  blockCount: number
): AuctionTimeLeft {
  const network = useNetwork().connection;
  const blocksPerAuction = !isPlayground(network) ? 720 : 36;
  const blocksRemaining = BigNumber.max(
    liquidationHeight - blockCount,
    0
  ).toNumber();

  return {
    timeRemaining:
      blocksRemaining > 0 ? secondsToHm(blocksRemaining * 30) : undefined,
    blocksRemaining,
    blocksPerAuction,
  };
}

export function secondsToHm(d: number): string {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const hDisplay = h > 0 ? `${h}h` : "0h";
  const mDisplay = m >= 0 ? `${m.toString().padStart(2, "0")}m` : "";
  return `${hDisplay} ${mDisplay}`;
}
