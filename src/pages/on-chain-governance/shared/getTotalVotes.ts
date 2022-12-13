export function getVotePercentage(
  percYes: number,
  percNo: number,
  percNeutral: number,
  voteDecision: string
) {
  const totalVotes = percYes + percNo + percNeutral;
  switch (voteDecision) {
    case "yes":
      return Math.round((percYes / totalVotes) * 100);
      break;
    case "no":
      return Math.round((percNo / totalVotes) * 100);
      break;

    case "neutral":
    default:
      return Math.round((percNeutral / totalVotes) * 100);
  }
}
