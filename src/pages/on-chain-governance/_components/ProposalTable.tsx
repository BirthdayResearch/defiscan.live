import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { IoMdOpen } from "react-icons/io";
import classNames from "classnames";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { ProposalInfo } from "@defichain/jellyfish-api-core/dist/category/governance";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { votingStages } from "../enum/votingStages";
import { Button } from "./Button";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { ProposalDisplayName } from "./ProposalCard";
import { CopyToClipboardIcon } from "./CopyToClipboardIcon";
import { sleep } from "../shared/sleep";

export function ProposalTable({
  proposals,
  currentStage,
  masternodeId,
  masternodeIdConfirmation,
}: {
  proposals: ProposalInfo[];
  currentStage: votingStages;
  masternodeId: string;
  masternodeIdConfirmation: boolean;
}) {
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
              <OverflowTable.Head title="Action" />
              <OverflowTable.Head title="Vote Command" alignRight />
            </>
          ) : (
            <OverflowTable.Head title="Community discussions" alignRight />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: ProposalInfo, index) => (
          <React.Fragment key={index}>
            <ProposalRow
              masternodeId={masternodeId}
              masternodeIdConfirmation={masternodeIdConfirmation}
              currentStage={currentStage}
              proposal={proposal}
            />
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
  masternodeId,
  masternodeIdConfirmation,
}: {
  proposal: ProposalInfo;
  currentStage: votingStages;
  masternodeId: string;
  masternodeIdConfirmation: boolean;
}) {
  const router = useRouter();
  const { connection } = useNetwork();
  const [masterNodeVoteDecision, setMasterNodeVoteDecision] = useState(
    VoteDecision.notVoted
  );
  const [isVotingCommandCopied, setIsVotingCommandCopied] = useState(false);

  return (
    <OverflowTable.Row
      onClick={() => {
        router.push({
          pathname: `/on-chain-governance/${proposal.proposalId}`,
          query: getEnvironment().isDefaultConnection(connection)
            ? {}
            : { network: connection },
        });
      }}
      className={classNames(
        "hover:text-primary-500 dark:hover:text-gray-100 cursor-pointer"
      )}
    >
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {proposal.title}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {ProposalDisplayName[proposal.type]}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        <TextTruncate text={proposal.proposalId} />
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
                customStyle="whitespace-nowrap font-semibold group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="16% No"
                customStyle="whitespace-nowrap group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="6% Neutral"
                customStyle="whitespace-nowrap group-hover:text-primary-500"
              />
            </div>
          </OverflowTable.Cell>
          <OverflowTable.Cell className="align-middle">
            {masternodeIdConfirmation && (
              <div className="flex flex-row gap-x-1">
                <Button
                  label={`yes`.toUpperCase()}
                  testId="OnChainGovernance.SubmitProposalButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMasterNodeVoteDecision(VoteDecision.yes);
                  }}
                  customStyle="w-[96px] px-5 py-1 rounded-sm text-base w-full border bg-white hover:border-primary-200 active:border-primary-400"
                />
                <Button
                  label={`no`.toUpperCase()}
                  testId="OnChainGovernance.SubmitProposalButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMasterNodeVoteDecision(VoteDecision.no);
                  }}
                  customStyle="w-[96px] px-5 py-1 rounded-sm text-base w-full border bg-white hover:border-primary-200 active:border-primary-400"
                />
                <Button
                  label={`neutral`.toUpperCase()}
                  testId="OnChainGovernance.SubmitProposalButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMasterNodeVoteDecision(VoteDecision.neutral);
                  }}
                  customStyle="px-5 py-1 rounded-sm text-base w-full border bg-white hover:border-primary-200 active:border-primary-400"
                />
              </div>
            )}
          </OverflowTable.Cell>
          <OverflowTable.Cell className="align-middle">
            {masternodeIdConfirmation ? (
              <>
                {masterNodeVoteDecision === VoteDecision.notVoted ? (
                  <div className="whitespace-nowrap py-1 px-2 bg-gray-100 text-gray-500 font-medium pointer-events-none">
                    VOTE FIRST
                  </div>
                ) : (
                  <button
                    className="flex items-center bg-blue-100 lg:py-1.5 py-2.5 px-5 md:px-[17.5px] lg:px-[10.5px] rounded w-fit"
                    onClick={(e) => {
                      onClickCopy(
                        setIsVotingCommandCopied,
                        `defi-cli votegov ${proposal.proposalId} ${masternodeId} ${masterNodeVoteDecision}`
                      );
                      e.stopPropagation();
                    }}
                    type="button"
                  >
                    {isVotingCommandCopied ? (
                      <>
                        <div className="bg-blue-100 text-[#4A72DA]">
                          Copied!
                        </div>
                      </>
                    ) : (
                      <>
                        <TextTruncate
                          text={`defi-cli votegov ${proposal.proposalId} ${masternodeId} ${masterNodeVoteDecision}`}
                          className="text-[#4A72DA] mr-3 whitespace-nowrap"
                          width="w-10"
                        />
                        <CopyToClipboardIcon />
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <input
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled
                className=" bg-gray-50 h-[32px] w-[431px] py-[6px] text-center"
                placeholder="Enter masternode ID to unlock voting & command ID"
              />
            )}
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

enum VoteDecision {
  yes = "YES",
  no = "NO",
  neutral = "NEUTRAL",
  notVoted = "NOT VOTED",
}

async function onClickCopy(
  onTextClick: Dispatch<SetStateAction<boolean>>,
  command: string
) {
  onTextClick(true);
  navigator.clipboard.writeText(command);
  await sleep(2000);
  onTextClick(false);
}
