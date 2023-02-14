import BigNumber from "bignumber.js";
import classNames from "classnames";
import { AiFillGithub, AiFillRedditCircle } from "react-icons/ai";
import { MdAccessTimeFilled } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
  GovernanceProposalType,
} from "@defichain/whale-api-client/dist/api/governance";
import { Link } from "@components/commons/link/Link";
import {
  isValidOCGGithubUrl,
  isValidOCGRedditUrl,
} from "utils/commons/LinkValidator";
import { ProposalDisplayName } from "./ProposalCard";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { EmergencyChip } from "./EmergencyChip";

export function ProposalDetail({
  proposal,
  proposalCreationDate,
  proposalEndDate,
}: {
  proposal: GovernanceProposal;
  proposalCreationDate: string;
  proposalEndDate: string;
}) {
  const blockPageLink =
    proposal.status === GovernanceProposalStatus.VOTING
      ? `/blocks/countdown/${proposal.cycleEndHeight}`
      : `/blocks/${proposal.cycleEndHeight}`;
  const isEmergencyProposal = proposal.options?.includes("emergency");

  return (
    <div className="md:border md:p-6 border-gray-200 dark:border-dark-gray-200 rounded-lg md:dark:bg-dark-gray-100">
      <div className="flex mb-2">
        <div className="flex justify-between p-2 bg-gray-100 dark:bg-dark-gray-200 rounded">
          <span className="text-sm font-medium text-gray-900 dark:text-dark-gray-900">
            {ProposalDisplayName[proposal.type]}
          </span>
        </div>
        {isEmergencyProposal && (
          <EmergencyChip wrapperClassName="py-2 ml-2" className="text-sm" />
        )}
      </div>
      <div className="text-gray-900 dark:text-dark-gray-900 text-2xl font-semibold md:text-4xl break-words">
        {proposal.title}
      </div>
      <div className="mb-6 md:mb-8 mt-1 md:mt-2 flex md:flex-row flex-col">
        <span className="text-sm md:text-base text-gray-500 dark:text-dark-gray-500">
          Txn:&nbsp;
        </span>
        <Link href={{ pathname: `/transactions/${proposal.proposalId}` }}>
          <a className="text-sm md:text-base font-semibold hover:underline text-blue-500 cursor-pointer break-all">
            {proposal.proposalId}
          </a>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-y-3 md:gap-y-8 md:gap-x-8">
        <div className="flex flex-row md:flex-col items-center">
          <div className="w-1/2 md:w-full mb-0 md:mb-2">
            <DetailSectionTitle label="Date posted" />
          </div>
          <div className="w-1/2 md:w-full flex">
            <span className="text-gray-900 dark:text-dark-gray-900 text-sm md:text-lg text-right md:text-left w-full">
              {proposalCreationDate}
            </span>
          </div>
        </div>
        {proposal.status !== GovernanceProposalStatus.VOTING && (
          <div className="flex flex-row md:flex-col">
            <div className="w-1/2 md:w-full mb-0 md:mb-2">
              <DetailSectionTitle label="Ended on" />
            </div>
            <div className="w-1/2 md:w-full flex flex-col">
              <span className="md:text-lg text-sm text-gray-900 dark:text-dark-gray-900 text-right md:text-left">
                Block {proposal.cycleEndHeight}
              </span>

              <span className="text-gray-600 dark:text-dark-gray-600 text-xs text-right md:text-left w-full">
                {proposalEndDate}
              </span>
            </div>
          </div>
        )}
        {proposal.type === GovernanceProposalType.COMMUNITY_FUND_PROPOSAL && (
          <>
            <div className="flex flex-row md:flex-col items-center">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Cycles" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <span className="text-gray-900 dark:text-dark-gray-900 text-sm md:text-lg text-right md:text-left w-full">
                  {`${
                    proposal.totalCycles > 1
                      ? `${proposal.currentCycle} of ${proposal.totalCycles} cycles`
                      : `${proposal.totalCycles} cycle`
                  }`}
                </span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col md:row-start-2">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Receiving address" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <span className="text-sm md:text-lg text-right md:text-left w-full break-all text-gray-900 dark:text-dark-gray-900">
                  {proposal.payoutAddress}
                </span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col md:row-start-2 items-center">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Amount requested" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <NumericFormat
                  value={new BigNumber(proposal.amount ?? 0).toFixed(2)}
                  fixedDecimalScale
                  thousandSeparator=","
                  displayType="text"
                  suffix=" DFI"
                  className="text-gray-900 dark:text-dark-gray-900 text-sm md:text-lg text-right md:text-left w-full"
                />
              </div>
            </div>
          </>
        )}
        <div
          className={classNames(
            "flex flex-row md:flex-col items-center md:items-start",
            {
              "md:row-start-2":
                proposal.type ===
                GovernanceProposalType.COMMUNITY_FUND_PROPOSAL,
            }
          )}
        >
          <div className="w-1/2 md:w-full mb-0 md:mb-1">
            <DetailSectionTitle label="Discussions" />
          </div>
          <div className="w-1/2 md:w-fit flex">
            <a
              target="_blank"
              href={proposal.context}
              className="text-right md:text-left w-full"
              rel="noreferrer"
            >
              <div className="flex flex-row justify-end items-center gap-x-1 md:gap-x-1 md:px-2 md:py-1 md:border-[0.5px] rounded-[30px] border-gray-200 dark:border-dark-gray-200 hover:border-primary-200 hover:dark:border-dark-primary-200 focus:border-primary-400 focus:dark:border-dark-primary-400 md:w-fit">
                {isValidOCGGithubUrl(proposal.context) ? (
                  <>
                    <AiFillGithub
                      size={24}
                      className="text-gray-900 dark:text-dark-gray-900"
                    />
                    <span className="text-gray-600 dark:text-dark-gray-600 text-sm font-medium">
                      {OnChainGovernanceTitles.Github}
                    </span>
                  </>
                ) : isValidOCGRedditUrl(proposal.context) ? (
                  <>
                    <AiFillRedditCircle
                      size={24}
                      className="text-gray-900 dark:text-dark-gray-900"
                    />
                    <span className="text-gray-600 dark:text-dark-gray-600 text-sm font-medium">
                      {OnChainGovernanceTitles.Reddit}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-600 dark:text-dark-gray-600 text-sm font-medium">
                    {OnChainGovernanceTitles.Link}
                  </span>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>

      {proposal.status === GovernanceProposalStatus.VOTING && (
        <div className="mt-8 py-3 px-[18px] flex bg-blue-50 dark:bg-dark-blue-500/[0.15] rounded">
          <MdAccessTimeFilled
            size={22}
            className="self-center mr-[18px] text-blue-500"
          />
          <div>
            <span className="text-sm md:text-lg text-gray-900 dark:text-dark-gray-900">
              Voting concludes at&nbsp;
            </span>
            <Link href={{ pathname: blockPageLink }}>
              <a className="text-sm md:text-lg font-semibold hover:underline text-blue-500 cursor-pointer mr-2">
                Block {proposal.cycleEndHeight}
              </a>
            </Link>
            <span className="block md:inline text-sm text-gray-500 dark:text-dark-gray-500 align-text-top">
              ({proposalEndDate})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSectionTitle({
  label,
  customStyle,
}: {
  label: string;
  customStyle?: string;
}) {
  return (
    <span
      className={classNames(
        "text-gray-500 dark:text-dark-gray-500 text-sm lg:mb-2",
        customStyle
      )}
    >
      {label}
    </span>
  );
}
