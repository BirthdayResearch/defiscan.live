import BigNumber from "bignumber.js";

export function getVotePercentage(numYes: number, numNo: number) {
  const totalVotes = numYes + numNo;
  const percYes = BigNumber(numYes).div(totalVotes).multipliedBy(100);
  const percNo = BigNumber(numNo).div(totalVotes).multipliedBy(100);

  return {
    percYes: percYes.isNaN() ? BigNumber(0) : percYes,
    percNo: percNo.isNaN() ? BigNumber(0) : percNo,
  };
}
