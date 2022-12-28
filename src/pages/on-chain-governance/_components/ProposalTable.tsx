import React, { useState } from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { AiFillGithub } from "react-icons/ai";
import classNames from "classnames";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import {
  ProposalInfo,
  ProposalStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { format, fromUnixTime } from "date-fns";
import { Link } from "@components/commons/link/Link";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { ProposalDisplayName } from "./ProposalCard";
import { VoteModal } from "./VoteModal";

export function ProposalTable({
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
          <OverflowTable.Head title={OnChainGovernanceTitles.endOfVoting} />
          <OverflowTable.Head title={OnChainGovernanceTitles.discussions} />
          {!isOpenProposalsClicked && (
            <OverflowTable.Head title={OnChainGovernanceTitles.result} />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: ProposalInfo, index) => (
          <React.Fragment key={index}>
            <ProposalRow
              proposal={proposal}
              currentBlockHeight={currentBlockHeight}
              currentBlockMedianTime={currentBlockMedianTime}
              isOpenProposalsClicked={isOpenProposalsClicked}
            />
            {displayVoteModal && (
              <VoteModal
                proposalId={proposal.proposalId}
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
  currentBlockHeight,
  currentBlockMedianTime,
  isOpenProposalsClicked,
}: {
  proposal: ProposalInfo;
  currentBlockHeight: number;
  currentBlockMedianTime: number;
  isOpenProposalsClicked: boolean;
}) {
  const router = useRouter();
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
      <OverflowTable.Cell className="align-middle font-semibold dark:text-gray-100 w-[320px]">
        {proposal.title}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {ProposalDisplayName[proposal.type]}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle break-all dark:text-gray-100">
        <TextTruncate text={proposal.proposalId} width="w-60" />
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
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
              className="flex flex-row items-center gap-x-2 text-[#4A72DA] hover:underline"
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
          <div>{`~ ${cycleEndTime}`}</div>
        </div>
      </OverflowTable.Cell>

      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        <a
          href={proposal.context}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row items-center gap-x-2 px-2 py-[6px] border hover:border-primary-200 focus:border-primary-400 rounded-[30px] w-fit">
            <AiFillGithub size={20} />
            {OnChainGovernanceTitles.github}
          </div>
        </a>
      </OverflowTable.Cell>

      {!isOpenProposalsClicked && (
        <OverflowTable.Cell className="align-middle">
          <div
            className={classNames(
              "py-1 px-3 rounded-[32px] w-fit",
              proposal.status === ProposalStatus.COMPLETED
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {proposal.status === ProposalStatus.COMPLETED
              ? "Approved"
              : proposal.status}
          </div>
        </OverflowTable.Cell>
      )}
    </OverflowTable.Row>
  );
}
