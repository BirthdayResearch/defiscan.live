import { ListVotesResult } from "@defichain/jellyfish-api-core/dist/category/governance";

export function getAllCycleVotes(allCycleProposalVotes: ListVotesResult[]): {} {
  const totalVotes = {};
  for (let i = 0; i < allCycleProposalVotes.length; i += 1) {
    const vote = allCycleProposalVotes[i];
    const voteCycle = vote.cycle;
    if (voteCycle in totalVotes) {
      totalVotes[voteCycle] += 1;
    } else {
      totalVotes[voteCycle] = 1;
    }
  }
  return totalVotes;
}
