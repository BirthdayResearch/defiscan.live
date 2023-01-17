import React from "react";
import { MdInfo } from "react-icons/md";

export function GettingStartedInfo(): JSX.Element {
  const link = "https://github.com/DeFiCh/dfips/issues";
  const readHereLink = "https://github.com/DeFiCh/dfips/blob/master/README.md";
  return (
    <div className="bg-blue-50 py-6 px-6 md:px-10 rounded-lg mb-4 border border-blue-50 dark:bg-dark-blue-500/[0.15] dark:border-dark-blue-500/[.25]">
      <div className="flex flex-row">
        <MdInfo size={24} className="mr-2 text-[#4A72DA]" />
        <span className="font-semibold text-base text-[#4A72DA]">
          Getting started
        </span>
      </div>
      <div className="mt-2">
        <span className="text-sm md:text-base text-gray-600 dark:text-dark-gray-600">
          Before creating a proposal here, the proposal should have an active
          discussion&nbsp;
        </span>
        <a
          className="text-sm md:text-base text-blue-500 dark:text-blue-500 underline"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          in Github
        </a>
        <span className="text-sm md:text-base text-gray-600 dark:text-dark-gray-600">
          . Please ensure you share with the community why this proposal should
          be approved. For detailed information on submitting proposals on
          Github and On-chain,&nbsp;
        </span>
        <a
          className="text-sm md:text-base text-blue-500 dark:text-blue-500 underline"
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
