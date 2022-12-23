import React from "react";
import { CopyButton } from "@components/commons/CopyButton";

interface SubmitProposalProps {
  command: string;
}
export function SubmitProposal({ command }: SubmitProposalProps): JSX.Element {
  return (
    <>
      <span className="text-gray-600 dark:text-gray-100 text-sm md:text-base">
        To finalize your submission on-chain, copy the generated command line,
        and paste it in the CLI located in your full node wallet. If you have
        not downloaded a full node wallet,&nbsp;
        <a
          className="text-[#4A72DA] underline"
          href="https://defichain.com/downloads"
          target="_blank"
          rel="noreferrer"
        >
          download here
        </a>
      </span>
      <div className="flex flex-row mt-6 mb-2 md:mb-4 bg-blue-100 rounded py-3 px-4 items-center">
        <span className="text-[#4A72DA] break-all flex grow">{command}</span>
        <CopyButton
          className="ml-2"
          content={command}
          iconsClass="text-[#4A72DA] h-6 w-6"
          buttonClass="cursor-pointer outline-none bg-transparent dark:bg-transparent border-none"
        />
      </div>
      <span className="text-orange-600 text-xs md:text-sm">
        Command submitted into defi-cli will not be editable. Please check your
        details carefully before submitting.
      </span>
    </>
  );
}