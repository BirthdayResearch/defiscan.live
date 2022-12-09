import classNames from "classnames";
import { useRouter } from "next/router";
import { IoMdOpen } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { votingStages } from "../enum/votingStages";
import { Button } from "./Button";
import { VoteModal } from "./VoteModal";

export function ProposalCards({
  proposals,
  currentStage,
}: {
  proposals: Proposal[];
  currentStage: votingStages;
}) {
  const router = useRouter();
  const [displayVoteModal, setDisplayVoteModal] = useState(false);
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
        {proposals.map((proposal: Proposal, index) => (
          <>
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => {
                router.push("/on-chain-governance/proposalid");
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
                proposalId={proposal.proposalName}
                onClose={() => setDisplayVoteModal(false)}
              />
            )}
          </>
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

export interface Proposal {
  proposalName: string;
  proposalType: string;
  proposer: string;
  links: {
    github: string;
  };
}

function ProposalCard({
  proposal,
  currentStage,
  displayVoteModal,
  setDisplayVoteModal,
}: {
  proposal: Proposal;
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
          <div className="flex flex-col gap-x-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposalName}
            </div>
          </div>
          <div className="flex flex-col gap-x-1 ml-5">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposalType}
            </div>
          </div>
          <div className="flex flex-col gap-x-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposer}
            </div>
          </div>

          <div
            className={classNames(
              "flex flex-row gap-x-[27px] items-end",
              currentStage === votingStages.vote
                ? "row-start-2 col-start-3 "
                : "col-span-2"
            )}
          >
            <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline cursor-pointer">
              <a href={proposal.links.github}>
                {OnChainGovernanceTitles.github}
              </a>
              <IoMdOpen size={18} />
            </div>
          </div>
          {currentStage === votingStages.vote && (
            <>
              <div className="row-start-2 col-span-2 flex flex-col gap-x-1">
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
            "grid pt-5 pb-6 px-6 gap-y-6 border-b grid-rows-[44px_minmax(0px,_1fr)_44px]",
            currentStage === votingStages.vote
              ? "grid-cols-2 grid-rows-5"
              : "grid-cols-2 grid-rows-3"
          )}
        >
          <div className="flex flex-col gap-x-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.nameOfProposalTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposalName}
            </div>
          </div>
          <div className="flex flex-col gap-x-1 text-right">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.typeTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposalType}
            </div>
          </div>
          <div className="row-start-2 flex flex-col gap-x-1">
            <div className=" text-xs text-gray-500">
              {OnChainGovernanceTitles.proposerTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {proposal.proposer}
            </div>
          </div>

          <div
            className={classNames(
              "flex flex-row gap-x-[27px]",
              currentStage === votingStages.vote ? "row-start-4" : "row-start-3"
            )}
          >
            <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline cursor-pointer">
              <a href={proposal.links.github}>
                {OnChainGovernanceTitles.github}
              </a>
              <IoMdOpen />
            </div>
          </div>
          {currentStage === votingStages.vote && (
            <>
              <div className="row-start-3 col-span-2 flex flex-col gap-x-1">
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
