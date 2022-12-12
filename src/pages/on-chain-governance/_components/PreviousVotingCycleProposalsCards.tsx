import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { IoCheckmarkSharp, IoBanSharp } from "react-icons/io5";
import { IoMdOpen } from "react-icons/io";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { PreviousVotingCycleProposal } from "./PreviousVotingCycleProposalsTable";

export function PreviousVotingCycleProposalsCards({
  previousVotingCycleProposals,
}: {
  previousVotingCycleProposals: PreviousVotingCycleProposal[];
}) {
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
        {previousVotingCycleProposals.map(
          (previousVotingCycleProposal: PreviousVotingCycleProposal, index) => (
            <React.Fragment key={index}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  router.push(
                    `/on-chain-governance/proposalId/${previousVotingCycleProposal.proposalName}`
                  );
                }}
              >
                <PreviousVotingCycleProposalsCard
                  previousVotingCycleProposal={previousVotingCycleProposal}
                />
              </div>
            </React.Fragment>
          )
        )}
      </div>
      {(previousVotingCycleProposals === null ||
        previousVotingCycleProposals.length === 0) && (
        <div className="relative overflow-x-auto border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
    </div>
  );
}

function PreviousVotingCycleProposalsCard({
  previousVotingCycleProposal,
}: {
  previousVotingCycleProposal: PreviousVotingCycleProposal;
}) {
  const percYes = Math.round(
    (previousVotingCycleProposal.voteDecision.yes /
      (previousVotingCycleProposal.voteDecision.yes +
        previousVotingCycleProposal.voteDecision.no +
        previousVotingCycleProposal.voteDecision.neutral)) *
      100
  );
  const percNo = Math.round(
    (previousVotingCycleProposal.voteDecision.no /
      (previousVotingCycleProposal.voteDecision.yes +
        previousVotingCycleProposal.voteDecision.no +
        previousVotingCycleProposal.voteDecision.neutral)) *
      100
  );
  const percNeutral = Math.round(
    (previousVotingCycleProposal.voteDecision.neutral /
      (previousVotingCycleProposal.voteDecision.yes +
        previousVotingCycleProposal.voteDecision.no +
        previousVotingCycleProposal.voteDecision.neutral)) *
      100
  );
  return (
    <div className={classNames("hover:bg-primary-50 dark:hover:bg-gray-600")}>
      <div className="group lg:hidden md:block hidden">
        <div className="grid grid-cols-4 grid-rows-2 border-b gap-y-4 py-[14px] px-6">
          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposalName}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposalType}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposer}
            </div>
          </div>

          <div className="w-[100px] justify-self-end">
            <VoteResult
              yesPercent={percYes}
              noPercent={percNo}
              neutralPercent={percNeutral}
            />
          </div>

          <div className="flex flex-col gap-y-1 col-span-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.voteBreakdownTitle}
            </div>
            <div className="flex flex-row gap-x-5 col-span-2">
              <VotingResultPercentage
                value={`${percYes}% Yes`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold": percYes > percNo && percYes > percNeutral,
                })}
              />
              <VotingResultPercentage
                value={`${percNo}% No`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold": percNo > percYes && percNo > percNeutral,
                })}
              />
              <VotingResultPercentage
                value={`${percNeutral}% Neutral`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold":
                    percNeutral > percYes && percNeutral > percNo,
                })}
              />
            </div>
          </div>

          <a
            className="flex flex-row items-end gap-x-2 text-[#4A72DA] hover:underline"
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={previousVotingCycleProposal.links.github}
          >
            {OnChainGovernanceTitles.github}
            <IoMdOpen size={24} />
          </a>
        </div>
      </div>
      <div className="group md:hidden block hover:bg-primary-50 dark:hover:bg-gray-600">
        <div className="grid grid-cols-3 grid-rows-3 border-b py-5 px-6 gap-y-6">
          <div className="flex flex-col gap-y-1 col-span-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposalName}
            </div>
          </div>

          <div className="w-[100px]">
            <VoteResult
              yesPercent={percYes}
              noPercent={percNo}
              neutralPercent={percNeutral}
            />
          </div>

          <div className="flex flex-col gap-y-1 row-start-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposer}
            </div>
          </div>

          <div className="flex flex-col gap-y-1 row-start-2 col-start-3">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousVotingCycleProposal.proposalType}
            </div>
          </div>

          <div className="flex flex-col gap-y-1  col-span-3">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.voteBreakdownTitle}
            </div>
            <div className="flex flex-row gap-x-5">
              <VotingResultPercentage
                value={`${percYes}% Yes`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold": percYes > percNo && percYes > percNeutral,
                })}
              />
              <VotingResultPercentage
                value={`${percNo}% No`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold": percNo > percYes && percNo > percNeutral,
                })}
              />
              <VotingResultPercentage
                value={`${percNeutral}% Neutral`}
                customStyle={classNames("group-hover:text-primary-500", {
                  "font-semibold":
                    percNeutral > percYes && percNeutral > percNo,
                })}
              />
            </div>
          </div>

          {/* <a
                        className="flex flex-row items-end gap-x-2 text-[#4A72DA] hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        href={previousVotingCycleProposal.links.github}
                    >
                        {OnChainGovernanceTitles.github}
                        <IoMdOpen size={24} />
                    </a> */}
        </div>
      </div>
    </div>
  );
}

function VoteResult({
  yesPercent,
  noPercent,
  neutralPercent,
}: {
  yesPercent: number;
  noPercent: number;
  neutralPercent: number;
}) {
  if (yesPercent > noPercent && yesPercent > neutralPercent) {
    return (
      <div className="flex flex-row rounded-[5px] justify-end items-center py-1 px-2 gap-x-[10px] bg-green-100 text-green-700">
        <div className="font-medium text-xs">ACCEPTED</div>
        <IoCheckmarkSharp size={15} className="" />
      </div>
    );
  }
  return (
    <div className="flex flex-row rounded-[5px] justify-end items-center py-1 px-2 gap-x-[10px] text-red-700 bg-red-100">
      <div className="font-medium text-xs">REJECTED</div>
      <IoBanSharp size={15} className="rotate-90" />
    </div>
  );
}

function VotingResultPercentage({
  value,
  customStyle,
}: {
  value: string;
  customStyle?: string;
}) {
  return (
    <span className={`tracking-[0.0044em] text-gray-900 ${customStyle ?? ""}`}>
      {value}
    </span>
  );
}
