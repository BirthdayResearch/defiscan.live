import React from "react";
import { NumericFormat } from "react-number-format";
import { TextMiddleTruncate } from "@components/commons/text/TextMiddleTruncate";
import { ProposalDisplayName } from "./ProposalCard";

interface ReviewProposalProps {
  title: string;
  proposalType: string;
  context: string;
  amount: string;
  cycle: number;
  payoutAddress: string;
  onClick: () => void;
}
export function ReviewProposal({
  title,
  proposalType,
  context,
  amount,
  cycle,
  payoutAddress,
  onClick,
}: ReviewProposalProps): JSX.Element {
  return (
    <>
      <span className="text-gray-600 dark:text-gray-100 text-sm md:text-base">
        Make sure all details are correct as on-chain proposals are
        irreversible. You can edit details by going back to the previous steps.
      </span>
      <div className="mt-6 space-y-3">
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
              Name of proposal
            </span>
          </div>
          <div>
            <span className="text-gray-900 dark:text-gray-100 text-base font-medium break-all">
              {title}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
              Type
            </span>
          </div>
          <div>
            <span className="text-gray-900 dark:text-gray-100 text-base font-medium">
              {proposalType}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
              Github discussion
            </span>
          </div>
          <div className="text-right">
            <a
              className="text-[#4A72DA] text-base font-medium break-all"
              href={context}
              target="_blank"
              rel="noreferrer"
            >
              {context}
            </a>
          </div>
        </div>
        {proposalType === ProposalDisplayName.CommunityFundProposal && (
          <>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <div className="w-full md:w-5/12">
                <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
                  Amount requested
                </span>
              </div>
              <div>
                <NumericFormat
                  className="text-gray-900 dark:text-gray-100 text-base font-medium"
                  displayType="text"
                  thousandSeparator
                  value={amount}
                  decimalScale={2}
                  suffix=" DFI"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <div className="w-full md:w-5/12">
                <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
                  Cycle
                </span>
              </div>
              <div>
                <span className="text-gray-900 dark:text-gray-100 text-base font-medium">
                  {cycle}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <div className="w-full md:w-5/12">
                <span className="text-gray-600 dark:text-dark-gray-900 text-xs md:text-base">
                  Receiving address
                </span>
              </div>
              <div>
                <TextMiddleTruncate
                  text={payoutAddress}
                  textLength={11}
                  className="md:hidden text-gray-900 dark:text-gray-100 text-base font-medium"
                />
                <span className="hidden md:block text-gray-900 dark:text-gray-100 text-base font-medium break-all text-right">
                  {payoutAddress}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-10 md:mt-12 text-center">
        <button
          type="button"
          onClick={onClick}
          className="w-full py-3 border border-primary-50 rounded-sm font-medium text-primary-500 bg-primary-50 mb-3 hover:bg-primary-100 hover:border-primary-100"
        >
          CONFIRM DETAILS
        </button>
        <span className="w-full text-xs text-gray-500">
          A command line will be generated once all details are confirmed
        </span>
      </div>
    </>
  );
}
