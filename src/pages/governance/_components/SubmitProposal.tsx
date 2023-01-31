import React from "react";
import { CopyButton } from "@components/commons/CopyButton";

interface SubmitProposalProps {
  command: string;
  testid?: string;
}
export function SubmitProposal({
  command,
  testid,
}: SubmitProposalProps): JSX.Element {
  return (
    <>
      <span
        data-testid={`${testid}.Description`}
        className="text-gray-600 dark:text-dark-gray-600 text-sm md:text-base"
      >
        To finalize your submission on-chain, copy the generated command line,
        and paste it in the CLI located in your full node wallet. If you have
        not downloaded a full node wallet,&nbsp;
        <a
          className="text-blue-500 underline"
          href="https://defichain.com/downloads"
          target="_blank"
          rel="noreferrer"
        >
          download here
        </a>
      </span>
      <div className="flex flex-row mt-6 mb-2 md:mb-4 bg-blue-100 dark:bg-dark-blue-500/[0.15] rounded py-3 px-4 items-center">
        <span
          data-testid={`${testid}.Command`}
          className="text-[#4A72DA] dark:text-dark-blue-600 break-all flex grow"
        >
          {command}
        </span>
        <CopyButton
          testid={`${testid}.Copy`}
          className="ml-2"
          content={command}
          iconsClass="text-[#4A72DA] dark:text-dark-blue-600 h-6 w-6"
          buttonClass="cursor-pointer outline-none bg-transparent dark:bg-transparent border-none"
        />
      </div>
      <span
        data-testid={`${testid}.InfoNote`}
        className="text-orange-600 dark:text-dark-orange-600 text-xs md:text-sm"
      >
        Command submitted into defi-cli will not be editable. Please check your
        details carefully before submitting.
      </span>
    </>
  );
}
