import { NetworkConnection } from "@contexts/NetworkContext";
import { WhaleRpcClient } from "@defichain/whale-api-client";
import BigNumber from "bignumber.js";
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

export async function getProposalEndMedianTime(
  currentBlockCount: number,
  cycleEndHeight: number,
  rpc: WhaleRpcClient,
  secondsPerBlock: number
) {
  let proposalEndMedianTime: number;
  if (new BigNumber(currentBlockCount).gt(cycleEndHeight)) {
    const endBlockInfo = await rpc.blockchain.getBlockStats(cycleEndHeight);
    proposalEndMedianTime = endBlockInfo.mediantime;
  } else {
    const currentBlockInfo = await rpc.blockchain.getBlockStats(
      currentBlockCount
    );
    const votingTimeLeftInSec = new BigNumber(cycleEndHeight)
      .minus(currentBlockCount)
      .multipliedBy(secondsPerBlock)
      .toNumber();
    proposalEndMedianTime = currentBlockInfo.mediantime + votingTimeLeftInSec;
  }

  return proposalEndMedianTime;
}
