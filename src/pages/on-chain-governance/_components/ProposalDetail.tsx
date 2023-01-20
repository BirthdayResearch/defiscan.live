import BigNumber from "bignumber.js";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import {
  ProposalInfo,
  ProposalType,
  ProposalStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { Link } from "@components/commons/link/Link";
import { ProposalDisplayName } from "./ProposalCard";

export function ProposalDetail({
  proposal,
  proposalCreationDate,
  proposalEndDate,
}: {
  proposal: ProposalInfo;
  proposalCreationDate: string;
  proposalEndDate: string;
}) {
  const blockPage =
    proposal.status === ProposalStatus.VOTING
      ? "/blocks"
      : `/blocks/${proposal.cycleEndHeight}`;

  return (
    <div className="md:border md:p-6 border-gray-200 dark:border-dark-gray-200 rounded-lg md:dark:bg-dark-gray-100">
      <div className="flex mb-2">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="text-sm font-medium text-gray-900 dark:text-dark-gray-900 leading-4">
            {ProposalDisplayName[proposal.type]}
          </div>
        </div>
      </div>
      <div className="text-gray-900 dark:text-dark-gray-900 text-2xl font-semibold md:text-4xl break-words">
        {proposal.title}
      </div>
      <div className="mb-6 md:mb-10">
        {proposal.status === ProposalStatus.VOTING && (
          <div className="mt-2">
            <span className="text-sm md:text-lg text-gray-900 dark:text-dark-gray-900">
              Voting stops at&nbsp;
            </span>
            <span className="text-sm md:text-lg text-gray-900 dark:text-dark-gray-900 font-semibold">
              {proposalEndDate}&nbsp;
            </span>
            <Link href={{ pathname: blockPage }}>
              <a className="text-sm md:text-lg hover:underline text-blue-500 cursor-pointer">
                ({proposal.cycleEndHeight})
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-y-3 md:gap-y-8 md:gap-x-8">
        <div className="flex flex-row md:flex-col">
          <div className="w-1/2 md:w-full mb-0 md:mb-2">
            <DetailSectionTitle label="Date posted" />
          </div>
          <div className="w-1/2 md:w-full flex">
            <span className="text-gray-900 dark:text-dark-gray-900 text-sm md:text-lg text-right md:text-left w-full">
              {proposalCreationDate}
            </span>
          </div>
        </div>
        {proposal.status !== ProposalStatus.VOTING && (
          <div className="flex flex-row md:flex-col">
            <div className="w-1/2 md:w-full mb-0 md:mb-2">
              <DetailSectionTitle label="Ended on" />
            </div>
            <div className="w-1/2 md:w-full flex flex-col">
              <span className="md:text-lg text-sm text-gray-900 dark:text-dark-gray-900 text-right md:text-left">
                Block {proposal.cycleEndHeight}
              </span>

              <span className="text-gray-600 dark:text-dark-gray-600 text-sm text-right md:text-left w-full">
                {proposalEndDate}
              </span>
            </div>
          </div>
        )}
        {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL && (
          <>
            <div className="flex flex-row md:flex-col">
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
            <div className="flex flex-row md:flex-col md:row-start-2">
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
          className={classNames("flex flex-row md:flex-col", {
            "md:row-start-2":
              proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL,
          })}
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
                <AiFillGithub
                  size={24}
                  className="text-gray-900 dark:text-dark-gray-900"
                />
                <span className="text-gray-600 dark:text-dark-gray-600 text-sm font-medium">
                  Github
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
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
