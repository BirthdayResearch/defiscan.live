import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { IoMdOpen } from "react-icons/io";
import classNames from "classnames";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { votingStages } from "../enum/votingStages";
import { Button } from "./Button";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { ProposalInfo, ProposalDisplayName } from "./ProposalCard";
import { VoteModal } from "./VoteModal";

export function ProposalTable({
  proposals,
  currentStage,
}: {
  proposals: ProposalInfo[];
  currentStage: votingStages;
}) {
  const [displayVoteModal, setDisplayVoteModal] = useState(false);
  return (
    <div>
      <OverflowTable>
        <OverflowTable.Header>
          <OverflowTable.Head
            title={OnChainGovernanceTitles.nameOfProposalTitle}
          />
          <OverflowTable.Head title={OnChainGovernanceTitles.typeTitle} />
          <OverflowTable.Head title={OnChainGovernanceTitles.proposerId} />
          {currentStage === votingStages.vote ? (
            <>
              <OverflowTable.Head title="Community discussions" />
              <OverflowTable.Head title="Vote Breakdown" />
              <OverflowTable.Head title="Action" alignRight />
            </>
          ) : (
            <OverflowTable.Head title="Community discussions" alignRight />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: ProposalInfo, index) => (
          <React.Fragment key={index}>
            <ProposalRow
              currentStage={currentStage}
              proposal={proposal}
              displayVoteModal={displayVoteModal}
              setDisplayVoteModal={setDisplayVoteModal}
            />
            {displayVoteModal && (
              <VoteModal
                proposalId={proposal.proposalName}
                onClose={() => {
                  setDisplayVoteModal(false);
                }}
              />
            )}
          </React.Fragment>
        ))}
      </OverflowTable>
      {(proposals === null || proposals.length === 0) && (
        <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
    </div>
  );
}

function ProposalRow({
  proposal,
  currentStage,
  displayVoteModal,
  setDisplayVoteModal,
}: {
  proposal: ProposalInfo;
  currentStage: votingStages;
  displayVoteModal: boolean;
  setDisplayVoteModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <OverflowTable.Row
      onClick={() => {
        router.push("/on-chain-governance/proposalid");
      }}
      className={classNames(
        "hover:text-primary-500 dark:hover:text-gray-100 cursor-pointer",
        { "pointer-events-none": displayVoteModal }
      )}
    >
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {proposal.title}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {ProposalDisplayName[proposal.type]}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        <TextTruncate text={proposal.proposalId} width="w-full" />
      </OverflowTable.Cell>
      {currentStage === votingStages.vote ? (
        <>
          <OverflowTable.Cell className="align-middle">
            <a
              className="flex flex-row items-center gap-x-2 text-[#4A72DA] hover:underline"
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={proposal.context}
            >
              {OnChainGovernanceTitles.github}
              <IoMdOpen size={24} />
            </a>
          </OverflowTable.Cell>
          <OverflowTable.Cell className="align-middle">
            <div className="flex flex-row gap-x-5">
              <VotingResultPercentage
                value="78% Yes"
                customStyle="font-semibold group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="16% No"
                customStyle="group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="6% Neutral"
                customStyle="group-hover:text-primary-500"
              />
            </div>
          </OverflowTable.Cell>

          <OverflowTable.Cell>
            <Button
              label={`vote`.toUpperCase()}
              testId="OnChainGovernance.SubmitProposalButton"
              onClick={(e) => {
                e.stopPropagation();
                setDisplayVoteModal(true);
              }}
              customStyle="px-5 py-1 rounded-sm text-base w-full border bg-white hover:border-primary-200 active:border-primary-400"
            />
          </OverflowTable.Cell>
        </>
      ) : (
        <OverflowTable.Cell>
          <a
            className="justify-end flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={proposal.context}
          >
            {OnChainGovernanceTitles.github}
            <IoMdOpen size={24} />
          </a>
        </OverflowTable.Cell>
      )}
    </OverflowTable.Row>
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
