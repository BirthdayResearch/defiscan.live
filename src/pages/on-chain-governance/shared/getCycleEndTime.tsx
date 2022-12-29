import { format, fromUnixTime } from "date-fns";

export function getCycleEndTime(
  cycleEndHeight: number,
  currentBlockHeight: number,
  currentBlockMedianTime: number,
  connection: string
) {
  const timeDifferenceInBlocks = cycleEndHeight - currentBlockHeight;
  let blockSeconds = 30;
  switch (connection) {
    case "Playground":
      blockSeconds = 3;
      break;
    case "TestNet":
      blockSeconds = 3;
      break;
    case "MainNet":
    default:
      blockSeconds = 30;
  }

  let cycleEndMedianTime = 0;
  if (timeDifferenceInBlocks < 0) {
    cycleEndMedianTime =
      currentBlockMedianTime - Math.abs(timeDifferenceInBlocks) * blockSeconds;
  } else {
    cycleEndMedianTime =
      currentBlockMedianTime + timeDifferenceInBlocks * blockSeconds;
  }

  const cycleEndTime = format(fromUnixTime(cycleEndMedianTime), "MM/dd/yyyy");

  return cycleEndTime;
}
