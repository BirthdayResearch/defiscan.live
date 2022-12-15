import BigNumber from "bignumber.js";

export function getVotePercentage(
  numYes: number,
  numNo: number,
  numNeutral: number
) {
  const totalVotes = numYes + numNo + numNeutral;
  const percYes =
    BigNumber(numYes).div(totalVotes).multipliedBy(100).precision(2) || 0;
  const percNo =
    BigNumber(numNo).div(totalVotes).multipliedBy(100).precision(2) || 0;
  const percNeutral = BigNumber(numNeutral)
    .div(totalVotes)
    .multipliedBy(100)
    .precision(2);

  return {
    percYes: percYes.isNaN() ? BigNumber(0) : percYes,
    percNo: percNo.isNaN() ? BigNumber(0) : percNo,
    percNeutral: percNeutral.isNaN() ? BigNumber(0) : percNeutral,
  };
}
