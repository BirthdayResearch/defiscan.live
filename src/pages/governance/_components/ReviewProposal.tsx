import React from "react";
import { NumericFormat } from "react-number-format";
import { ProposalDisplayName } from "./ProposalCard";

interface ReviewProposalProps {
  title: string;
  proposalType: string;
  context: string;
  amount: string;
  cycle: number;
  payoutAddress: string;
  onClick: () => void;
  testid?: string;
}
export function ReviewProposal({
  title,
  proposalType,
  context,
  amount,
  cycle,
  payoutAddress,
  onClick,
  testid,
}: ReviewProposalProps): JSX.Element {
  return (
    <>
      <span
        data-testid={`${testid}.Description`}
        className="text-gray-600 dark:text-dark-gray-600 text-sm md:text-base"
      >
        Make sure all details are correct as on-chain proposals are
        irreversible. You can edit details by going back to the previous steps.
      </span>
      <div className="mt-6 space-y-3">
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span
              data-testid={`${testid}.InputProposalNameTitle`}
              className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
            >
              Name of proposal
            </span>
          </div>
          <div
            data-testid={`${testid}.InputProposalName`}
            className="md:text-right"
          >
            <span className="text-gray-900 dark:text-dark-gray-900 text-base font-medium break-all">
              {title}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span
              data-testid={`${testid}.InputProposalTypeTitle`}
              className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
            >
              Type
            </span>
          </div>
          <div>
            <span
              data-testid={`${testid}.InputProposalType`}
              className="text-gray-900 dark:text-dark-gray-900 text-base font-medium"
            >
              {proposalType}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <div className="w-full md:w-5/12">
            <span
              data-testid={`${testid}.InputProposalDiscussionTitle`}
              className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
            >
              Discussion
            </span>
          </div>
          <div className="md:text-right">
            <a
              data-testid={`${testid}.InputProposalDiscussion`}
              className="text-blue-500 text-base font-medium break-all hover:underline"
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
                <span
                  data-testid={`${testid}.InputAmountRequestedTitle`}
                  className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
                >
                  Amount requested
                </span>
              </div>
              <div>
                <NumericFormat
                  data-testid={`${testid}.InputAmountRequested`}
                  className="text-gray-900 dark:text-dark-gray-900 text-base font-medium"
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
                <span
                  data-testid={`${testid}.InputCycleTitle`}
                  className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
                >
                  Cycle
                </span>
              </div>
              <div>
                <span
                  data-testid={`${testid}.InputCycle`}
                  className="text-gray-900 dark:text-dark-gray-900 text-base font-medium"
                >
                  {cycle}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <div className="w-full md:w-5/12">
                <span
                  data-testid={`${testid}.InputReceivingAddressTitle`}
                  className="text-gray-600 dark:text-dark-gray-600 text-xs md:text-base"
                >
                  Receiving address
                </span>
              </div>
              <div className="md:text-right">
                <span
                  data-testid={`${testid}.InputReceivingAddress`}
                  className="text-gray-900 dark:text-dark-gray-900 text-base font-medium break-all"
                >
                  {payoutAddress}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-10 md:mt-12 text-center">
        <button
          data-testid={`${testid}.ConfirmDetails`}
          type="button"
          onClick={onClick}
          className="w-full py-3 border border-primary-50 dark:border-dark-primary-50 rounded-sm font-medium text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 mb-3 hover:bg-primary-100 hover:border-primary-100 hover:dark:bg-dark-primary-100 hover:dark:border-dark-primary-100"
        >
          CONFIRM DETAILS
        </button>
        <span
          data-testid={`${testid}.CommandLineInfo`}
          className="w-full text-xs text-gray-500 dark:text-dark-gray-500"
        >
          A command line will be generated once all details are confirmed
        </span>
      </div>
    </>
  );
}
