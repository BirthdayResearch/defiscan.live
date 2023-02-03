import BigNumber from "bignumber.js";

export function getVotePercentage(
  numYes: number,
  numNo: number,
  numNeutral: number
) {
  // TODO: to remove neutral votes from total votes tabulation count after bc released fix for neutral vote tabulation
  const totalVotes = numYes + numNo + numNeutral;
  const percYes = BigNumber(numYes).div(totalVotes).multipliedBy(100);
  const percNo = BigNumber(numNo).div(totalVotes).multipliedBy(100);
  const percNeutral = BigNumber(numNeutral).div(totalVotes).multipliedBy(100);

  return {
    percYes: percYes.isNaN() ? BigNumber(0) : percYes,
    percNo: percNo.isNaN() ? BigNumber(0) : percNo,
    percNeutral: percNeutral.isNaN() ? BigNumber(0) : percNeutral,
  };
}
