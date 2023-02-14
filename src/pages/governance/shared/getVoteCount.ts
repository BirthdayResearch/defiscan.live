import { ProposalVotesResult } from "@defichain/whale-api-client/dist/api/governance";

export interface VoteCount {
  yes: number;
  no: number;
  neutral: number;
}

export function getVoteCount(votes: ProposalVotesResult[]): VoteCount {
  let yesVotes = 0;
  let noVotes = 0;
  let neutralVotes = 0;
  votes.forEach((vote) => {
    if (vote.vote === "YES") {
      yesVotes += 1;
    } else if (vote.vote === "NO") {
      noVotes += 1;
    } else {
      neutralVotes += 1;
    }
  });

  return {
    yes: yesVotes,
    no: noVotes,
    neutral: neutralVotes,
  };
}
