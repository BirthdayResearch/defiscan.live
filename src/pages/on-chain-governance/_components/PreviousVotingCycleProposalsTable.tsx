import React from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import classNames from "classnames";
import { IoMdOpen } from "react-icons/io";
import { IoCheckmarkSharp, IoBanSharp } from "react-icons/io5";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";

export function PreviousVotingCycleProposalsTable({
  previousVotingCycleProposals,
}: {
  previousVotingCycleProposals: PreviousVotingCycleProposal[];
}) {
  return (
    <div>
      <OverflowTable>
        <OverflowTable.Header>
          <OverflowTable.Head
            title={OnChainGovernanceTitles.nameOfProposalTitle}
          />
          <OverflowTable.Head title={OnChainGovernanceTitles.typeTitle} />
          <OverflowTable.Head title={OnChainGovernanceTitles.proposerTitle} />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.communityDiscussionTitle}
          />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.voteBreakdownTitle}
          />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.voteResultTitle}
            alignRight
          />
        </OverflowTable.Header>

        {previousVotingCycleProposals.map(
          (previousVotingCycleProposal: PreviousVotingCycleProposal, index) => (
            <React.Fragment key={index}>
              <PreviousVotingCycleProposalRow
                previousVotingCycleProposal={previousVotingCycleProposal}
              />
            </React.Fragment>
          )
        )}
      </OverflowTable>
    </div>
  );
}

function PreviousVotingCycleProposalRow({
  previousVotingCycleProposal,
}: {
  previousVotingCycleProposal: PreviousVotingCycleProposal;
}) {
  const router = useRouter();
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
    <OverflowTable.Row
      onClick={() => {
        router.push(
          `/on-chain-governance/proposalid/${previousVotingCycleProposal.proposalName}`
        );
      }}
      className={classNames(
        "hover:text-primary-500 dark:hover:text-gray-100 cursor-pointer"
      )}
    >
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {previousVotingCycleProposal.proposalName}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {previousVotingCycleProposal.proposalType}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {previousVotingCycleProposal.proposer}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        <a
          className="flex flex-row items-center gap-x-2 text-[#4A72DA] hover:underline"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={previousVotingCycleProposal.links.github}
        >
          {OnChainGovernanceTitles.github}
          <IoMdOpen size={24} />
        </a>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle text-right dark:text-gray-100">
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
              "font-semibold": percNeutral > percYes && percNeutral > percNo,
            })}
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="dark:text-gray-100">
        <VoteResult
          yesPercent={percYes}
          noPercent={percNo}
          neutralPercent={percNeutral}
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}

export interface PreviousVotingCycleProposal {
  proposalName: string;
  proposalType: string;
  proposer: string;
  links: {
    github: string;
  };
  voteDecision: {
    yes: number;
    no: number;
    neutral: number;
  };
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
      <div className="flex flex-row justify-center items-center px-1 rounded-[5px] py-1 text-green-700 bg-green-100">
        <div className="text-xs pr-[10px] font-medium">ACCEPTED</div>
        <IoCheckmarkSharp size={18} className="" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-row justify-center items-center px-1 rounded-[5px] py-1 text-red-700 bg-red-100">
        <div className="text-xs pr-[10px] font-medium">REJECTED</div>
        <IoBanSharp size={18} className="rotate-90" />
      </div>
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
