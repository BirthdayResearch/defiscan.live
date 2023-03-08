import { isValidOCGGithubUrl, isValidOCGRedditUrl } from "./LinkValidator";

const redditLinkWithSubdomain =
  "https://www.reddit.com/r/defiblockchain/comments/11fj7i5/cfp_appreciation_of_the_work_done_by_k%C3%BCgi_in_the/";
const redditLinkWithoutSubdomain =
  "https://reddit.com/r/defiblockchain/comments/11gwg5h/euroc_on_defichain/";
const gitHubLinkWithSubdomain =
  "https://www.github.com/DeFiCh/dfips/issues/258";
const gitHubLinkWithoutSubdomain = "https://github.com/DeFiCh/dfips/issues/256";
const randomLink = "https://www.google.com";

describe("Reddit validator", () => {
  it("detects Reddit link with subdomain", () => {
    expect.hasAssertions();

    expect(isValidOCGRedditUrl(redditLinkWithSubdomain)).toEqual(true);
  });

  it("detects Reddit link without subdomain", () => {
    expect.hasAssertions();

    expect(isValidOCGRedditUrl(redditLinkWithoutSubdomain)).toEqual(true);
  });

  it("does not detect non-Reddit links", () => {
    expect.hasAssertions();

    expect(isValidOCGRedditUrl(gitHubLinkWithSubdomain)).toEqual(false);
    expect(isValidOCGRedditUrl(gitHubLinkWithoutSubdomain)).toEqual(false);
    expect(isValidOCGRedditUrl(randomLink)).toEqual(false);
  });
});

describe("GitHub validator", () => {
  it("detects GitHub link with subdomain", () => {
    expect.hasAssertions();

    expect(isValidOCGGithubUrl(gitHubLinkWithSubdomain)).toEqual(true);
  });

  it("detects GitHub link without subdomain", () => {
    expect.hasAssertions();

    expect(isValidOCGGithubUrl(gitHubLinkWithoutSubdomain)).toEqual(true);
  });

  it("does not detect non-GitHub links", () => {
    expect.hasAssertions();

    expect(isValidOCGGithubUrl(redditLinkWithSubdomain)).toEqual(false);
    expect(isValidOCGGithubUrl(redditLinkWithoutSubdomain)).toEqual(false);
    expect(isValidOCGGithubUrl(randomLink)).toEqual(false);
  });
});
