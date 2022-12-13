import BigNumber from "bignumber.js";

export function getVotePercentage(
  numYes: number,
  numNo: number,
  numNeutral: number
) {
  const totalVotes = numYes + numNo + numNeutral;

  const percYes = new BigNumber((numYes / totalVotes) * 100).precision(2);
  const percNo = new BigNumber((numNo / totalVotes) * 100).precision(2);
  const percNeutral = new BigNumber((numNeutral / totalVotes) * 100).precision(
    2
  );

  return {
    percYes: percYes,
    percNo: percNo,
    percNeutral: percNeutral,
  };
}
