import React, { useState } from "react";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { ListProposalsStatus } from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
} from "@defichain/whale-api-client/dist/api/governance";
import { Link } from "@components/commons/link/Link";
import { useNetwork } from "@contexts/NetworkContext";
import { getCycleEndDate } from "../shared/getCycleEndTime";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { getSecondsPerBlock } from "../shared/getSecondsPerBlock";

export function ProposalCards({
  proposals,
  currentBlockHeight,
  currentBlockMedianTime,
  userQueryProposalStatus,
}: {
  proposals: GovernanceProposal[];
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
  currentBlockHeight,
  currentBlockMedianTime,
  userQueryProposalStatus,
}: {
  proposal: GovernanceProposal;
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  userQueryProposalStatus: ListProposalsStatus;
}) {
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { connection } = useNetwork();
  const secondsPerBlock = getSecondsPerBlock(connection);
  const cycleEndDate = getCycleEndDate(
    proposal.cycleEndHeight,
    currentBlockHeight,
    currentBlockMedianTime,
    secondsPerBlock
  );

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
                  pathname: `/ocg/${proposal.proposalId}`,
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
                  {OnChainGovernanceTitles.ProposerId}
                </div>
                <div className="text-gray-900 text-sm w-[146px] text-right break-all dark:text-dark-gray-900">
                  {proposal.proposalId}
                </div>
              </div>

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.EndOfVoting}
                </div>
                <div className="flex flex-col">
                  <Link
                    href={{
                      pathname:
                        userQueryProposalStatus === ListProposalsStatus.VOTING
                          ? "/blocks"
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
                          ? "/blocks"
                          : `/blocks/${proposal.cycleEndHeight}`
                      }
                    >
                      {`Block ${proposal.cycleEndHeight}`}
                    </a>
                  </Link>
                  <div>
                    <div className="text-gray-900 font-semibold text-sm text-right dark:text-dark-gray-900">
                      {`~ ${cycleEndDate}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row align-middle">
                <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                  {OnChainGovernanceTitles.Discussion}
                </div>
                <a
                  href={proposal.context}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex flex-row font-semibold items-center gap-x-1 text-sm text-gray-900 dark:text-dark-gray-900">
                    <AiFillGithub size={20} />
                    {OnChainGovernanceTitles.Github}
                  </div>
                </a>
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
