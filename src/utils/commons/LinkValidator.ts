export function isValidOCGGithubUrl(input: string) {
  const regex =
    /https?:\/\/(?:[^.]+\.)?github\.com\/defich\/dfips\/issues\/\d+$/gim;
  return regex.test(input);
}

export function isValidOCGRedditUrl(input: string) {
  const regex =
    /https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/defiblockchain\/(.*)/gim;
  return regex.test(input);
}
