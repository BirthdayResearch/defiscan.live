import { NetworkConnection } from "@contexts/NetworkContext";
import { format, fromUnixTime } from "date-fns";

export function getCycleEndTime(
  cycleEndHeight: number,
  currentBlockHeight: number,
  currentBlockMedianTime: number,
  connection: NetworkConnection
) {
  const timeDifferenceInBlocks = cycleEndHeight - currentBlockHeight;
  let blockSeconds = 30;
  switch (connection) {
    case NetworkConnection.RemotePlayground:
    case NetworkConnection.LocalPlayground:
      blockSeconds = 3;
      break;
    case NetworkConnection.TestNet:
    case NetworkConnection.MainNet:
    default:
      blockSeconds = 30;
  }

  const cycleEndMedianTime =
    currentBlockMedianTime + timeDifferenceInBlocks * blockSeconds;
  const cycleEndTime = format(fromUnixTime(cycleEndMedianTime), "MM/dd/yyyy");

  return cycleEndTime;
}
