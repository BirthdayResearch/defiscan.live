import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { IoMdOpen } from "react-icons/io";
import { ProposalInfo } from "@defichain/jellyfish-api-core/dist/category/governance";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { votingStages } from "../enum/votingStages";
import { Button } from "./Button";
import { VoteModal } from "./VoteModal";

export function ProposalCards({
  proposals,
  currentStage,
}: {
  proposals: ProposalInfo[];
  currentStage: votingStages;
}) {
  const router = useRouter();
  const { connection } = useNetwork();
  const [displayVoteModal, setDisplayVoteModal] = useState(false);
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
        {proposals.map((proposal: ProposalInfo, index) => (
          <React.Fragment key={index}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                router.push({
                  pathname: `/on-chain-governance/${proposal.proposalId}`,
                  query: getEnvironment().isDefaultConnection(connection)
                    ? {}
                    : { network: connection },
                });
              }}
            >
              <ProposalCard
                displayVoteModal={displayVoteModal}
                setDisplayVoteModal={setDisplayVoteModal}
                currentStage={currentStage}
                proposal={proposal}
              />
            </div>
            {displayVoteModal && (
              <VoteModal
                proposalId={proposal.title}
                onClose={() => setDisplayVoteModal(false)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {(proposals === null || proposals.length === 0) && (
        <div className="relative overflow-x-auto border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
    </div>
  );
}

export enum ProposalDisplayName {
  CommunityFundProposal = "CFP",
  VoteOfConfidence = "DFIP",
}

function ProposalCard({
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
  return (
    <div
      className={classNames("hover:bg-primary-50 dark:hover:bg-gray-600", {
        "pointer-events-none": displayVoteModal,
      })}
    >
      <div className="group lg:hidden md:block hidden">
        <div
          className={classNames(
            "grid gap-y-5 py-6 px-6 border-b",
            currentStage === votingStages.vote
              ? "grid-cols-4 grid-rows-2"
              : "grid-cols-5"
          )}
        >
          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.title}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 ml-5">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {ProposalDisplayName[proposal.type]}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerId}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <TextTruncate text={proposal.proposalId} width="w-full" />
            </div>
          </div>

          <div
            className={classNames(
              "flex flex-row gap-x-[27px] items-end ",
              currentStage === votingStages.vote
                ? "row-start-2 col-start-3 "
                : "col-span-2 justify-end"
            )}
          >
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex flex-row items-center gap-x-2 text-[#4A72DA] hover:underline cursor-pointer"
              href={proposal.context}
            >
              {OnChainGovernanceTitles.github}
              <IoMdOpen size={24} />
            </a>
          </div>
          {currentStage === votingStages.vote && (
            <>
              <div className="row-start-2 col-span-2 flex flex-col gap-y-1">
                <div className=" text-xs text-gray-500">
                  {OnChainGovernanceTitles.voteBreakdownTitle}
                </div>
                <div className="text-gray-900 group-hover:text-primary-500">
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
                </div>
              </div>
              <div className="col-start-4 flex  justify-end">
                <Button
                  label={`vote`.toUpperCase()}
                  testId="OnChainGovernance.SubmitProposalButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDisplayVoteModal(true);
                  }}
                  customStyle="px-7 py-1 rounded-sm text-base tracking-[0.0086em] w-full border bg-white hover:border-primary-200"
                />
              </div>
            </>
          )}
        </div>
        <div />
      </div>
      <div className="group md:hidden block hover:bg-primary-50 dark:hover:bg-gray-600">
        <div
          className={classNames(
            "grid pt-5 pb-6 px-6 gap-y-6 border-b",
            currentStage === votingStages.vote
              ? "grid-cols-2 grid-rows-[44px_minmax(0px,_1fr)_44px]"
              : "grid-cols-2 grid-rows-[44px_minmax(0px,_1fr)_24px]"
          )}
        >
          <div className="flex flex-col gap-y-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.title}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 text-right">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {ProposalDisplayName[proposal.type]}
            </div>
          </div>
          <div className="row-start-2 flex flex-col gap-y-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerId}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <TextTruncate text={proposal.proposalId} width="w-full" />
            </div>
          </div>

          <div
            className={classNames(
              "flex flex-row gap-x-[27px]",
              currentStage === votingStages.vote ? "row-start-4" : "row-start-3"
            )}
          >
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex flex-row items-center gap-x-2 text-[#4A72DA] hover:underline cursor-pointer"
              href={proposal.context}
            >
              {OnChainGovernanceTitles.github}
              <IoMdOpen size={24} />
            </a>
          </div>
          {currentStage === votingStages.vote && (
            <>
              <div className="row-start-3 col-span-2 flex flex-col gap-y-1">
                <div className=" text-xs text-gray-500">
                  {OnChainGovernanceTitles.voteBreakdownTitle}
                </div>
                <div className="text-gray-900 group-hover:text-primary-500">
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
                </div>
              </div>

              <div className="row-start-5 col-span-2">
                <Button
                  label={`vote`.toUpperCase()}
                  testId="OnChainGovernance.SubmitProposalButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDisplayVoteModal(true);
                  }}
                  customStyle="px-5 py-1 rounded-sm text-base tracking-[0.0086em] w-full border bg-white hover:border-primary-200"
                />
              </div>
            </>
          )}
        </div>
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
