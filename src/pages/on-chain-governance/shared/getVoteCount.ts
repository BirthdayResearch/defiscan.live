export function getVoteCount(votes) {
  const voteCount = { yes: 0, no: 0, neutral: 0 };
  votes.forEach((vote) => {
    if (vote.vote === "YES") {
      voteCount.yes += 1;
    } else if (vote.vote === "NO") {
      voteCount.no += 1;
    } else {
      voteCount.neutral += 1;
    }
  });

  return voteCount;
}
