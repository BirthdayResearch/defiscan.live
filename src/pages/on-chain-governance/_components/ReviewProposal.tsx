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
          <span className="text-gray-600 dark:text-dark-gray-900 text-base break-all">
            Name of proposal
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">
            {title}
          </span>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <span className="text-gray-600 dark:text-dark-gray-900 text-base">
            Type
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">
            {proposalType}
          </span>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
          <span className="text-gray-600 dark:text-dark-gray-900 text-base">
            Github discussion
          </span>
          <a
            className="text-[#4A72DA] text-base font-semibold break-all"
            href={context}
            target="_blank"
            rel="noreferrer"
          >
            {context}
          </a>
        </div>
        {proposalType === ProposalDisplayName.CommunityFundProposal && (
          <>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <span className="text-gray-600 dark:text-dark-gray-900 text-base">
                Funding amount (DFI)
              </span>
              <NumericFormat
                className="text-gray-900 dark:text-gray-100 text-base font-semibold"
                displayType="text"
                thousandSeparator
                value={amount}
                decimalScale={2}
                suffix=" DFI"
              />
            </div>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <span className="text-gray-600 dark:text-dark-gray-900 text-base">
                Cycle
              </span>
              <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                {cycle}
              </span>
            </div>
            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between">
              <span className="text-gray-600 dark:text-dark-gray-900 text-base">
                Payout address
              </span>
              <TextMiddleTruncate
                text={payoutAddress}
                textLength={11}
                className="md:hidden text-gray-900 dark:text-gray-100 text-base font-semibold"
              />
              <span className="hidden md:block text-gray-900 dark:text-gray-100 text-base font-semibold">
                {payoutAddress}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="mt-10 md:mt-12 text-center">
        <button
          type="button"
          onClick={onClick}
          className="w-full py-3 border border-primary-50 rounded-sm font-semibold text-primary-500 bg-primary-50 mb-3"
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
