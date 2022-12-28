import React, { useState } from "react";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/router";
import { IoChevronUpSharp } from "react-icons/io5";
import {
  ProposalInfo,
  ProposalStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { Link } from "@components/commons/link/Link";
import { format, fromUnixTime } from "date-fns";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { Button } from "./Button";

export function ProposalCards({
  proposals,
  currentBlockHeight,
  currentBlockMedianTime,
  isOpenProposalsClicked,
}: {
  proposals: ProposalInfo[];
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  isOpenProposalsClicked: boolean;
}) {
  const router = useRouter();
  const { connection } = useNetwork();

  return (
    <>
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
              proposal={proposal}
              currentBlockHeight={currentBlockHeight}
              currentBlockMedianTime={currentBlockMedianTime}
              isOpenProposalsClicked={isOpenProposalsClicked}
            />
          </div>
        </React.Fragment>
      ))}
      {(proposals === null || proposals.length === 0) && (
        <div className="relative overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
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
  isOpenProposalsClicked,
}: {
  proposal: ProposalInfo;
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  isOpenProposalsClicked: boolean;
}) {
  const [isViewClicked, setIsViewClicked] = useState(false);
  const { connection } = useNetwork();
  const timeDifferenceInBlocks = proposal.cycleEndHeight - currentBlockHeight;
  let blockSeconds = 30;
  switch (connection) {
    case "Playground":
      blockSeconds = 3;
      break;
    case "TestNet":
      blockSeconds = 3;
      break;
    case "MainNet":
    default:
      blockSeconds = 30;
  }

  let cycleEndMedianTime = 0;
  if (timeDifferenceInBlocks < 0) {
    cycleEndMedianTime =
      currentBlockMedianTime - Math.abs(timeDifferenceInBlocks) * blockSeconds;
  } else {
    cycleEndMedianTime =
      currentBlockMedianTime + timeDifferenceInBlocks * blockSeconds;
  }

  const cycleEndTime = format(fromUnixTime(cycleEndMedianTime), "MM/dd/yyyy");

  return (
    <div
      className={classNames(
        "border rounded-lg mt-2 border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800",
        isViewClicked ? "h-full" : "h-[70px] overflow-hidden"
      )}
    >
      {/* mobile */}
      <div className="group md:hidden block hover:bg-primary-50 dark:hover:bg-gray-600">
        <div className={classNames("grid py-4 px-4 gap-y-3")}>
          <div className="flex flex-row align-middle w-full">
            <div className="grow">
              <div
                className={classNames(
                  "w-[125px] font-semibold text-gray-900 text-sm dark:text-dark-gray-900",
                  { "line-clamp-2": !isViewClicked }
                )}
              >
                {proposal.title}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsViewClicked(!isViewClicked);
              }}
              className="group flex flex-row gap-x-2"
            >
              <Button
                customStyle="border border-primary-300 p-2 rounded-sm text-primary-500"
                label="VIEW"
                testId="OnChainGovernance.Mobile.ViewProposal"
              />
              <button
                type="button"
                className={classNames(
                  "border border-primary-300 rounded-sm h-fit w-fit px-[10px] py-3 text-primary-500",
                  { "rotate-180": isViewClicked }
                )}
              >
                <IoChevronUpSharp size={12} />
              </button>
            </div>
          </div>

          <div className="flex flex-row align-middle">
            <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
              Proposal Type
            </div>
            <div className="text-gray-900 text-sm dark:text-dark-gray-900">
              {ProposalDisplayName[proposal.type]}
            </div>
          </div>

          <div className="flex flex-row align-middle">
            <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
              Proposal ID
            </div>
            <div className="text-gray-900 text-sm w-[146px] text-right break-all dark:text-dark-gray-900">
              {proposal.proposalId}
            </div>
          </div>

          <div className="flex flex-row align-middle">
            <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
              End of voting
            </div>
            <div className="flex flex-col">
              <Link
                href={{
                  pathname: isOpenProposalsClicked
                    ? "/blocks"
                    : `/blocks/${proposal.cycleEndHeight}`,
                }}
                passHref
              >
                <a
                  className="flex flex-row items-center text-[#4A72DA] hover:underline text-sm w-full justify-end"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={
                    isOpenProposalsClicked
                      ? "/blocks"
                      : `/blocks/${proposal.cycleEndHeight}`
                  }
                >
                  {`Block ${proposal.cycleEndHeight}`}
                </a>
              </Link>
              <div>
                <div className="text-gray-900 font-semibold text-sm text-right dark:text-dark-gray-900">
                  {`~ ${cycleEndTime}`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row align-middle">
            <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
              Discussion
            </div>
            <a
              href={proposal.context}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex flex-row font-semibold items-center gap-x-1 text-sm text-gray-900 dark:text-dark-gray-900">
                <AiFillGithub size={20} />
                {OnChainGovernanceTitles.github}
              </div>
            </a>
          </div>

          {!isOpenProposalsClicked && (
            <div className="flex flex-row align-middle">
              <div className="text-sm text-gray-500 grow dark:text-dark-gray-500">
                Result
              </div>
              <div
                className={classNames(
                  "text-sm",
                  proposal.status === ProposalStatus.COMPLETED
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {proposal.status === ProposalStatus.COMPLETED
                  ? "Approved"
                  : proposal.status}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
