import React, { useState } from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { AiFillGithub, AiFillRedditCircle } from "react-icons/ai";
import classNames from "classnames";
import { ListProposalsStatus } from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
  GovernanceProposalType,
} from "@defichain/whale-api-client/dist/api/governance";
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { Link } from "@components/commons/link/Link";
import {
  isValidOCGGithubUrl,
  isValidOCGRedditUrl,
} from "utils/commons/LinkValidator";
import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";
// import { HoverPopover } from "@components/commons/popover/HoverPopover";
import { ProposalDisplayName } from "./ProposalCard";
import { VoteModal } from "./VoteModal";
import { useCycleEndDate } from "../shared/useCycleEndTime";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { getSecondsPerBlock } from "../shared/getSecondsPerBlock";
import { EmergencyChip } from "./EmergencyChip";
import { Progress } from "./VotingResult";
import { getVotePercentage } from "../shared/getTotalVotes";
import { ProposalsVotes } from "../index.page";
import { VoteCount } from "../shared/getVoteCount";

export function ProposalTable({
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
          <OverflowTable.Head title={OnChainGovernanceTitles.RequestedAmount} />
          <OverflowTable.Head title={OnChainGovernanceTitles.TransactionId} />
          <OverflowTable.Head title={OnChainGovernanceTitles.EndOfVoting} />
          {userQueryProposalStatus === ListProposalsStatus.VOTING && (
            <OverflowTable.Head title={OnChainGovernanceTitles.CurrentVotes} />
          )}
          {(userQueryProposalStatus === ListProposalsStatus.COMPLETED ||
            userQueryProposalStatus === ListProposalsStatus.REJECTED) && (
            <OverflowTable.Head title={OnChainGovernanceTitles.Result} />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: GovernanceProposal) => (
          <Link
            href={{ pathname: `/governance/${proposal.proposalId}` }}
            key={proposal.proposalId}
          >
            <a className="contents">
              <ProposalRow
                proposal={proposal}
                votes={proposalsVotes[proposal.proposalId]}
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
            </a>
          </Link>
        ))}
      </OverflowTable>
    </div>
  );
}

function ProposalRow({
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
  const { percYes, percNo } = getVotePercentage(
    votes.yes,
    votes.no,
    votes.neutral
  );

  return (
    <OverflowTable.Row
      onClick={() => {
        router.push({
          pathname: `/governance/${proposal.proposalId}`,
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

        <a
          href={proposal.context}
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
          }}
          rel="noreferrer"
        >
          {isValidOCGGithubUrl(proposal.context) ? (
            <>
              <AiFillGithub
                size={24}
                className="text-gray-900 dark:text-dark-gray-900"
              />
            </>
          ) : isValidOCGRedditUrl(proposal.context) ? (
            <>
              <AiFillRedditCircle
                size={24}
                className="text-gray-900 dark:text-dark-gray-900"
              />
            </>
          ) : (
            <span className="pl-1">{OnChainGovernanceTitles.Link}</span>
          )}
        </a>
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle text-gray-900 dark:text-dark-gray-900">
        {ProposalDisplayName[proposal.type]}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle text-gray-900 dark:text-dark-gray-900">
        {proposal.type === GovernanceProposalType.VOTE_OF_CONFIDENCE ? (
          "N/A"
        ) : (
          <NumericFormat
            value={new BigNumber(proposal.amount ?? 0).toFixed(2)}
            thousandSeparator=","
            displayType="text"
          />
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle break-all">
        <Link
          href={{ pathname: `/transactions/${proposal.proposalId}` }}
          passHref
        >
          <a
            href={`/transactions/${proposal.proposalId}`}
            className="flex flex-row items-center gap-x-2 text-blue-500 hover:underline line-clamp-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {proposal.proposalId}
          </a>
        </Link>
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
          <div className="text-gray-600 dark:text-dark-gray-600 text-xs break-words">
            {cycleEndDate}
          </div>
        </div>
      </OverflowTable.Cell>
      {userQueryProposalStatus === ListProposalsStatus.VOTING && (
        <OverflowTable.Cell className="align-middle">
          {/* <HoverPopover
            className="cursor-pointer group"
            popover={<VotePopover proposal={proposal} votes={votes} />}
            placement="top"
          > */}
          <div className="flex flex-col w-48">
            <Progress
              yesValue={percYes.toNumber()}
              noValue={percNo.toNumber()}
              approvalThreshold={Number(
                proposal.approvalThreshold.replace("%", "")
              )}
              containerClass="bg-gray-100 dark:bg-dark-gray-200"
            />
            <div className="flex flex-row pt-2">
              <div className="flex flex-col grow">
                <span
                  className={classNames(
                    percYes > percNo
                      ? "text-green-600 dark:text-[#21E529] font-semibold"
                      : "text-gray-900 dark:text-dark-gray-900"
                  )}
                >
                  {percYes.toFixed(2)}%
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={classNames(
                    "grow text-right",
                    percNo > percYes
                      ? "text-red-600 dark:text-[#FF483D] font-semibold"
                      : "text-gray-900 dark:text-dark-gray-900"
                  )}
                >
                  {percNo.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          {/* </HoverPopover> */}
        </OverflowTable.Cell>
      )}

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
