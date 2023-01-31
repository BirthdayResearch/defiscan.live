import React from "react";
import { MdInfo } from "react-icons/md";

export function GettingStartedInfo(): JSX.Element {
  const githublink = "https://github.com/DeFiCh/dfips/issues";
  const redditLink = "https://www.reddit.com/r/defiblockchain/";
  const readHereLink = "https://github.com/DeFiCh/dfips/blob/master/README.md";
  return (
    <div
      data-testid="Governance.Create.GettingStarted"
      className="bg-blue-50 py-6 px-6 md:px-10 rounded-lg mb-4 border border-blue-50 dark:bg-dark-blue-500/[0.15] dark:border-dark-blue-500/[.25]"
    >
      <div
        data-testid="Governance.Create.GettingStarted.Title"
        className="flex flex-row"
      >
        <MdInfo size={24} className="mr-2 text-[#4A72DA]" />
        <span className="font-semibold text-base text-[#4A72DA]">
          Getting started
        </span>
      </div>
      <div
        data-testid="Governance.Create.GettingStarted.Content"
        className="mt-2"
      >
        <span className="text-sm md:text-base text-gray-600 dark:text-dark-gray-600">
          Before creating a proposal here, it is encouraged to have an active
          discussion on&nbsp;
        </span>
        <a
          data-testid="Governance.Create.GettingStarted.Content.GitHub"
          className="text-sm md:text-base text-blue-500 underline"
          href={githublink}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <span className="text-sm md:text-base text-gray-600 dark:text-dark-gray-600">
          &nbsp;or&nbsp;
        </span>
        <a
          data-testid="Governance.Create.GettingStarted.Content.Reddit"
          className="text-sm md:text-base text-blue-500 underline"
          href={redditLink}
          target="_blank"
          rel="noreferrer"
        >
          Reddit
        </a>
        <span className="text-sm md:text-base text-gray-600 dark:text-dark-gray-600">
          &nbsp;to ensure that you share with the community why this proposal
          should be approved. For detailed information on submitting proposals
          on-chain,&nbsp;
        </span>
        <a
          data-testid="Governance.Create.GettingStarted.Content.ReadHere"
          className="text-sm md:text-base text-blue-500 underline"
          href={readHereLink}
          target="_blank"
          rel="noreferrer"
        >
          read here.
        </a>
      </div>
    </div>
  );
}
