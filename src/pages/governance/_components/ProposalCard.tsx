import React, { useState } from "react";
import classNames from "classnames";
import { AiFillGithub, AiFillRedditCircle } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { ListProposalsStatus } from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
  GovernanceProposalType,
} from "@defichain/whale-api-client/dist/api/governance";
import { Link } from "@components/commons/link/Link";
import { useNetwork } from "@contexts/NetworkContext";
import {
  isValidOCGGithubUrl,
  isValidOCGRedditUrl,
} from "utils/commons/LinkValidator";
import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";
import { useCycleEndDate } from "../shared/useCycleEndTime";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { getSecondsPerBlock } from "../shared/getSecondsPerBlock";
import { EmergencyChip } from "./EmergencyChip";
import { VotingResultMobile } from "./VotingResult";
import { ProposalsVotes } from "../index.page";
import { VoteCount } from "../shared/getVoteCount";

export function ProposalCards({
  proposals,
  proposalsVotes,
  currentBlockHeight,
  currentBlockMedianTime,
  userQueryProposalStatus,
}: {
  proposals: GovernanceProposal[];
  proposalsVotes: ProposalsVotes;
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  userQueryProposalStatus: ListProposalsStatus;
}) {
  return (
    <>
      {proposals.map((proposal: GovernanceProposal, index) => (
        <React.Fragment key={index}>
          <ProposalCard
            proposal={proposal}
            votes={proposalsVotes[proposal.proposalId]}
            currentBlockHeight={currentBlockHeight}
            currentBlockMedianTime={currentBlockMedianTime}
            userQueryProposalStatus={userQueryProposalStatus}
          />
        </React.Fragment>
      ))}
    </>
  );
}

export enum ProposalDisplayName {
  CommunityFundProposal = "CFP",
  VoteOfConfidence = "DFIP",
}

function ProposalCard({
  proposal,
  votes,
  currentBlockHeight,
  currentBlockMedianTime,
  userQueryProposalStatus,
}: {
  proposal: GovernanceProposal;
  votes: VoteCount;
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  userQueryProposalStatus: ListProposalsStatus;
}) {
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { connection } = useNetwork();
  const secondsPerBlock = getSecondsPerBlock(connection);
  const cycleEndDate = useCycleEndDate(
    proposal.cycleEndHeight,
    currentBlockHeight,
    currentBlockMedianTime,
    secondsPerBlock
  );
  const isEmergencyProposal = proposal.options?.includes("emergency");

  return (
    <div
      className={classNames(
        "border rounded-xl mt-2 border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800"
      )}
    >
      {/* mobile */}
      <div className="group md:hidden block">
        <div className={classNames("grid py-4 px-4 gap-y-3")}>
          <div className="flex flex-row items-center align-middle w-full gap-x-2">
            <div className="grow">
              {isEmergencyProposal && (
                <EmergencyChip
                  wrapperClassName="py-1"
                  className="text-[10px] leading-3"
                />
              )}
              <div
                className={classNames(
                  "font-semibold text-gray-900 text-sm dark:text-dark-gray-900",
                  { "line-clamp-2": !isOpen }
                )}
              >
                {proposal.title}
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              <Link
                href={{
                  pathname: `/governance/${proposal.proposalId}`,
                }}
              >
                <a className="contents">
                  <div
                    data-testid="OnChainGovernance.CardView.ViewButton"
                    onClick={() => setIsViewClicked(!isViewClicked)}
                    className={classNames(
                      "border-[0.5px] border-primary-300 rounded text-primary-500 dark:text-dark-primary-500 dark:bg-gray-900 dark:border-dark-primary-300 px-1.5 py-1 text-sm h-min",
                      {
                        "bg-primary-100 dark:bg-dark-primary-100":
                          isViewClicked,
                      }
                    )}
                  >
                    VIEW
                  </div>
                </a>
              </Link>
              <div
                className="text-primary-500 cursor-pointer dark:bg-gray-900 dark:text-dark-primary-500 border-[0.5px] border-primary-300 dark:border-dark-primary-300 rounded h-min"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="OnChainGovernance.CardView.Toggle"
              >
                {!isOpen ? (
                  <MdOutlineKeyboardArrowDown size={28} />
                ) : (
                  <MdOutlineKeyboardArrowUp size={28} />
                )}
              </div>
            </div>
          </div>

          {isOpen && (
            <>
              {proposal.status === GovernanceProposalStatus.VOTING && (
                <div className="flex flex-row align-middle">
                  <VotingResultMobile proposal={proposal} voteCounts={votes} />
                </div>
              )}

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.Discussion}
                </div>
                <a
                  href={proposal.context}
                  target="_blank"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  rel="noreferrer"
                >
                  <div className="flex flex-row font-semibold items-center gap-x-1 text-sm text-gray-900 dark:text-dark-gray-900">
                    {isValidOCGGithubUrl(proposal.context) ? (
                      <>
                        <AiFillGithub size={20} />
                        {OnChainGovernanceTitles.Github}
                      </>
                    ) : isValidOCGRedditUrl(proposal.context) ? (
                      <>
                        <AiFillRedditCircle size={20} />
                        {OnChainGovernanceTitles.Reddit}
                      </>
                    ) : (
                      OnChainGovernanceTitles.Link
                    )}
                  </div>
                </a>
              </div>
              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.TypeTitle}
                </div>
                <div className="text-gray-900 text-sm dark:text-dark-gray-900">
                  {ProposalDisplayName[proposal.type]}
                </div>
              </div>

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.RequestedAmount}
                </div>
                <div className="text-gray-900 text-sm dark:text-dark-gray-900">
                  {proposal.type ===
                  GovernanceProposalType.VOTE_OF_CONFIDENCE ? (
                    "N/A"
                  ) : (
                    <NumericFormat
                      value={new BigNumber(proposal.amount ?? 0).toFixed(2)}
                      thousandSeparator=","
                      displayType="text"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.TransactionId}
                </div>
                <Link
                  href={{ pathname: `/transactions/${proposal.proposalId}` }}
                  passHref
                >
                  <a
                    href={`/transactions/${proposal.proposalId}`}
                    className="flex flex-row items-center gap-x-2 text-right text-blue-500 hover:underline break-all text-sm w-[146px]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {proposal.proposalId}
                  </a>
                </Link>
              </div>

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.EndOfVoting}
                </div>
                <div className="flex flex-col w-6/12">
                  <Link
                    href={{
                      pathname:
                        userQueryProposalStatus === ListProposalsStatus.VOTING
                          ? `/blocks/countdown/${proposal.cycleEndHeight}`
                          : `/blocks/${proposal.cycleEndHeight}`,
                    }}
                    passHref
                  >
                    <a
                      className="flex flex-row items-center text-blue-500 hover:underline text-sm w-full justify-end"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      href={
                        userQueryProposalStatus === ListProposalsStatus.VOTING
                          ? `/blocks/countdown/${proposal.cycleEndHeight}`
                          : `/blocks/${proposal.cycleEndHeight}`
                      }
                    >
                      {`Block ${proposal.cycleEndHeight}`}
                    </a>
                  </Link>
                  <div className="text-gray-600 text-xs text-right dark:text-dark-gray-600">
                    {cycleEndDate}
                  </div>
                </div>
              </div>

              {(userQueryProposalStatus === ListProposalsStatus.COMPLETED ||
                userQueryProposalStatus === ListProposalsStatus.REJECTED) && (
                <div className="flex flex-row align-middle">
                  <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                    {OnChainGovernanceTitles.Result}
                  </div>
                  <div
                    className={classNames(
                      "text-sm",
                      proposal.status === GovernanceProposalStatus.COMPLETED
                        ? "text-green-600 dark:text-dark-green-600"
                        : "text-red-600 dark:text-dark-red-600"
                    )}
                  >
                    {proposal.status === GovernanceProposalStatus.COMPLETED
                      ? "Approved"
                      : proposal.status}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
