import React, { useState } from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { AiFillGithub, AiFillRedditCircle } from "react-icons/ai";
import classNames from "classnames";
import { ListProposalsStatus } from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
} from "@defichain/whale-api-client/dist/api/governance";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { Link } from "@components/commons/link/Link";
import {
  isValidOCGGithubUrl,
  isValidOCGRedditUrl,
} from "utils/commons/LinkValidator";
import { ProposalDisplayName } from "./ProposalCard";
import { VoteModal } from "./VoteModal";
import { useCycleEndDate } from "../shared/getCycleEndTime";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { getSecondsPerBlock } from "../shared/getSecondsPerBlock";
import { EmergencyChip } from "./EmergencyChip";

export function ProposalTable({
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
  const [displayVoteModal, setDisplayVoteModal] = useState(false);

  return (
    <div>
      <OverflowTable
        className={classNames({
          "rounded-b-none": proposals === null || proposals.length === 0,
        })}
      >
        <OverflowTable.Header>
          <OverflowTable.Head
            title={OnChainGovernanceTitles.NameOfProposalTitle}
          />
          <OverflowTable.Head title={OnChainGovernanceTitles.TypeTitle} />
          <OverflowTable.Head title={OnChainGovernanceTitles.ProposerId} />
          <OverflowTable.Head title={OnChainGovernanceTitles.EndOfVoting} />
          <OverflowTable.Head title={OnChainGovernanceTitles.Discussions} />
          {(userQueryProposalStatus === ListProposalsStatus.COMPLETED ||
            userQueryProposalStatus === ListProposalsStatus.REJECTED) && (
            <OverflowTable.Head title={OnChainGovernanceTitles.Result} />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: GovernanceProposal, index) => (
          <React.Fragment key={index}>
            <ProposalRow
              proposal={proposal}
              currentBlockHeight={currentBlockHeight}
              currentBlockMedianTime={currentBlockMedianTime}
              userQueryProposalStatus={userQueryProposalStatus}
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
    </div>
  );
}

function ProposalRow({
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
  const router = useRouter();
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
      <OverflowTable.Cell className="align-middle font-semibold text-gray-900 dark:text-gray-100 w-[320px]">
        {isEmergencyProposal && (
          <EmergencyChip
            wrapperClassName="py-1"
            className="text-[10px] leading-3"
          />
        )}
        <div className="line-clamp-2 text-gray-900 dark:text-dark-gray-900">
          {proposal.title}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle text-gray-900 dark:text-dark-gray-900">
        {ProposalDisplayName[proposal.type]}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle break-all">
        <div className="line-clamp-2 dark:text-dark-gray-900 text-gray-900">
          {proposal.proposalId}
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle">
        <div className="flex flex-col w-max">
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
              className="flex flex-row items-center gap-x-2 text-blue-500 hover:underline"
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
          <div className="text-gray-600 dark:text-dark-gray-600 text-xs w-[120px] break-words">
            {cycleEndDate}
          </div>
        </div>
      </OverflowTable.Cell>

      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        <a
          href={proposal.context}
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
          }}
          rel="noreferrer"
        >
          <div className="text-gray-600 dark:text-dark-gray-600 text-sm font-medium flex flex-row items-center gap-x-1 px-1 pr-2 py-[2px] border-[0.5px] border-gray-200 dark:border-dark-gray-200 hover:border-primary-200 hover:dark:border-dark-primary-200 focus:border-primary-400 focus:dark:border-dark-primary-400 rounded-[30px] w-fit">
            {isValidOCGGithubUrl(proposal.context) ? (
              <>
                <AiFillGithub
                  size={24}
                  className="text-gray-900 dark:text-dark-gray-900"
                />
                {OnChainGovernanceTitles.Github}
              </>
            ) : isValidOCGRedditUrl(proposal.context) ? (
              <>
                <AiFillRedditCircle
                  size={24}
                  className="text-gray-900 dark:text-dark-gray-900"
                />
                {OnChainGovernanceTitles.Reddit}
              </>
            ) : (
              <span className="pl-1">{OnChainGovernanceTitles.Link}</span>
            )}
          </div>
        </a>
      </OverflowTable.Cell>

      {(userQueryProposalStatus === ListProposalsStatus.COMPLETED ||
        userQueryProposalStatus === ListProposalsStatus.REJECTED) && (
        <OverflowTable.Cell className="align-middle">
          <div
            className={classNames(
              "py-1 px-3 rounded-[32px] w-fit",
              proposal.status === GovernanceProposalStatus.COMPLETED
                ? "bg-green-100 text-green-600 dark:bg-[#21E529] dark:text-dark-green-600 dark:bg-opacity-25"
                : "bg-red-100 text-red-600 dark:bg-[#FF483D] dark:text-dark-red-600 dark:bg-opacity-20"
            )}
          >
            {proposal.status === GovernanceProposalStatus.COMPLETED
              ? "Approved"
              : proposal.status}
          </div>
        </OverflowTable.Cell>
      )}
    </OverflowTable.Row>
  );
}
