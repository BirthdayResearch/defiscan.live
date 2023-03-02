import React from "react";
import { Container } from "@components/commons/Container";
import { ApiPagedResponse } from "@defichain/whale-api-client";
import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { getWhaleApiClient, getWhaleRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import {
  ListProposalsType,
  ListProposalsStatus,
  MasternodeType,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
} from "@defichain/whale-api-client/dist/api/governance";
import classNames from "classnames";
import { Link } from "@components/commons/link/Link";
import { EmptySection } from "@components/commons/sections/EmptySection";
import { ProposalCards } from "./_components/ProposalCard";
import { ProposalTable } from "./_components/ProposalTable";
import { OnChainGovernanceTitles } from "./enum/onChainGovernanceTitles";
import { getVoteCount, VoteCount } from "./shared/getVoteCount";

interface OCGProps {
  allProposalsDetails: {
    proposalsSubmitted: number;
    openProposals: number;
    completedProposals: number;
    rejectedProposals: number;
    currentBlockCount: number;
    currentBlockMedianTime: number;
    userQueryProposalType: ListProposalsType;
    userQueryProposalStatus: ListProposalsStatus;
  };
  proposals: {
    allProposals: GovernanceProposal[];
    queryProposals: GovernanceProposal[];
    proposalsVotes: ProposalsVotes;
    pages: CursorPage[];
  };
}
export default function OnChainGovernancePage({
  allProposalsDetails,
  proposals,
}: OCGProps) {
  const userQueryProposalStatus = allProposalsDetails.userQueryProposalStatus;
  const userQueryProposalType = allProposalsDetails.userQueryProposalType;

  // const { currentYear, currentMonth } = getCurrentYearMonth();

  return (
    <div>
      {/* TODO: uncomment to use announcement banner */
      /* <div className="py-4 bg-gray-50 dark:bg-dark-gray-100 w-screen">
        <Container>
          <span className="text-gray-900 dark:text-dark-gray-900">
            Announcement: {currentMonth} {currentYear} voting round is now
            ongoing.&nbsp;
            <a
              className="text-blue-500 underline"
              href="https://github.com/DeFiCh/dfips/issues/222"
            >
              Read here for more details
            </a>
          </span>
        </Container>
      </div> */}
      <Container className="md:pt-11 pt-10 pb-20">
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col grow md:justify-center">
            {/* main title */}
            <div
              data-testid="OnChainGovernance.Title"
              className="text-[10px] font-medium text-gray-500 dark:text-dark-gray-500"
            >
              ON-CHAIN GOVERNANCE
            </div>
            <div
              data-testid="OnChainGovernance.Proposals.Title"
              className="text-4xl leading-[48px] font-semibold dark:text-dark-gray-900"
            >
              Proposals
            </div>
          </div>

          {/* Proposal Info Table */}
          <div className="flex flex-col md:mt-0 mt-8">
            <div className="justify-self-center border border-gray-200 dark:border-dark-gray-300 rounded-[10px] flex flex-row items-center lg:pr-3 py-6 lg:h-[104px] h-[84px] md:w-fit justify-evenly">
              <div className="flex-col grow lg:px-10 md:px-6">
                <div className="lg:text-2xl text-lg font-semibold text-center text-gray-900 dark:text-dark-gray-900">
                  {allProposalsDetails.proposalsSubmitted}
                </div>
                <div className="lg:text-base text-xs text-center text-gray-900 dark:text-dark-gray-900">
                  Total
                </div>
              </div>
              <div className="flex-col grow border-r border-l border-gray-200 dark:border-dark-gray-300 lg:px-10 md:px-6">
                <div className="lg:text-2xl text-lg font-semibold text-center text-gray-900 dark:text-dark-gray-900">
                  {allProposalsDetails.openProposals}
                </div>
                <div className="lg:text-base text-xs text-center text-gray-900 dark:text-dark-gray-900">
                  Open
                </div>
              </div>
              <div className="flex-col grow border-r border-gray-200 dark:border-dark-gray-300 lg:px-5 md:px-3">
                <div className="lg:text-2xl text-lg font-semibold text-center text-gray-900 dark:text-dark-gray-900">
                  {allProposalsDetails.completedProposals}
                </div>
                <div className="lg:text-base text-xs text-center text-gray-900 dark:text-dark-gray-900">
                  Approved
                </div>
              </div>
              <div className="flex-col grow lg:border-r border-gray-200 dark:border-dark-gray-300 lg:px-7 md:px-5">
                <div className="lg:text-2xl text-lg font-semibold text-center text-gray-900 dark:text-dark-gray-900">
                  {allProposalsDetails.rejectedProposals}
                </div>
                <div className="lg:text-base text-xs text-center text-gray-900 dark:text-dark-gray-900">
                  Rejected
                </div>
              </div>
              <div className="pl-7 pr-1 lg:block hidden">
                <Link href={{ pathname: "governance/create" }}>
                  <button
                    type="button"
                    className="py-3 px-6 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 rounded"
                  >
                    <span className="text-sm font-medium text-primary-500 dark:text-dark-primary-500">
                      CREATE PROPOSAL
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Tablet and Mobile Create Proposal Button */}
            <div className="lg:hidden flex w-full md:justify-end mt-4">
              <Link href={{ pathname: "governance/create" }}>
                <button
                  type="button"
                  className="py-3 px-6 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 rounded w-full"
                >
                  <span className="text-sm font-medium text-primary-500 dark:text-dark-primary-500">
                    CREATE PROPOSAL
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <ProposalFilterTab
          userQueryProposalStatus={userQueryProposalStatus}
          userQueryProposalType={userQueryProposalType}
        />
        {proposals.queryProposals.length === 0 ? (
          <EmptySection
            message={OnChainGovernanceTitles.NoProposals}
            className="mt-4 md:mt-8"
          />
        ) : (
          <>
            <div className="hidden md:block mt-8">
              <ProposalTable
                data-testid="OnChainGovernance.ProposalListTable"
                proposals={proposals.queryProposals}
                proposalsVotes={proposals.proposalsVotes}
                currentBlockHeight={allProposalsDetails.currentBlockCount}
                currentBlockMedianTime={
                  allProposalsDetails.currentBlockMedianTime
                }
                userQueryProposalStatus={userQueryProposalStatus}
              />
            </div>
            <div className="md:hidden block mt-4">
              <ProposalCards
                data-testid="OnChainGovernance.ProposalListCard"
                currentBlockHeight={allProposalsDetails.currentBlockCount}
                currentBlockMedianTime={
                  allProposalsDetails.currentBlockMedianTime
                }
                userQueryProposalStatus={userQueryProposalStatus}
                proposals={proposals.queryProposals}
                proposalsVotes={proposals.proposalsVotes}
              />
            </div>
          </>
        )}
        <div className="flex justify-end mt-8">
          <CursorPagination
            pages={proposals.pages}
            path="/governance"
            queryParam={{
              status: userQueryProposalStatus,
              type: userQueryProposalType,
            }}
          />
        </div>
      </Container>
    </div>
  );
}

function ProposalFilterTab({
  userQueryProposalStatus,
  userQueryProposalType,
}: {
  userQueryProposalStatus: ListProposalsStatus;
  userQueryProposalType: ListProposalsType;
}) {
  return (
    <div className="md:mt-10 mt-[49px] flex flex-row">
      <div className="flex flex-row w-fit grow">
        <Link
          href={{
            pathname: "governance/",
            query: {
              status: userQueryProposalStatus,
              type: ListProposalsType.ALL,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.AllProposalsButton"
            className={classNames(
              "md:font-normal font-medium border border-r-[0.5px] py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 rounded-l cursor-pointer",
              userQueryProposalType === ListProposalsType.ALL
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            ALL
          </a>
        </Link>

        <Link
          href={{
            pathname: "governance/",
            query: {
              status: userQueryProposalStatus,
              type: ListProposalsType.CFP,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.CfpProposalsButton"
            className={classNames(
              "md:font-normal font-medium border border-x-[0.5px] py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 cursor-pointer",
              userQueryProposalType === ListProposalsType.CFP
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            CFP
          </a>
        </Link>

        <Link
          href={{
            pathname: "governance/",
            query: {
              status: userQueryProposalStatus,
              type: ListProposalsType.VOC,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.DfipProposalsButton"
            className={classNames(
              "md:font-normal font-medium border border-l-[0.5px] rounded-r py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 cursor-pointer",
              userQueryProposalType === ListProposalsType.VOC
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            DFIP
          </a>
        </Link>
      </div>

      <div className="flex flex-row w-fit">
        <Link
          href={{
            pathname: "governance/",
            query: {
              status: ListProposalsStatus.VOTING,
              type: userQueryProposalType,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.OpenProposalsButton"
            className={classNames(
              "md:font-normal font-medium rounded-l border border-r-[0.5px] py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 border-gray-200 cursor-pointer",
              userQueryProposalStatus === ListProposalsStatus.VOTING
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            Open
          </a>
        </Link>

        <Link
          href={{
            pathname: "governance/",
            query: {
              status: "approved",
              type: userQueryProposalType,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.ClosedProposalsButton"
            className={classNames(
              "md:font-normal font-medium border border-x-[0.5px] py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 cursor-pointer",
              userQueryProposalStatus === ListProposalsStatus.COMPLETED
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            Approved
          </a>
        </Link>

        <Link
          href={{
            pathname: "governance/",
            query: {
              status: ListProposalsStatus.REJECTED,
              type: userQueryProposalType,
            },
          }}
        >
          <a
            data-testid="OnChainGovernance.ClosedProposalsButton"
            className={classNames(
              "md:font-normal font-medium border border-l-[0.5px] rounded-r py-[6px] md:px-[25px] px-2 md:text-base text-xs text-gray-600 cursor-pointer",
              userQueryProposalStatus === ListProposalsStatus.REJECTED
                ? "border-transparent bg-primary-500 dark:bg-dark-primary-500 text-white dark:text-dark-gray-0"
                : "dark:border-dark-gray-300 dark:text-dark-gray-900 dark:bg-dark-gray-200"
            )}
          >
            Rejected
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const rpc = getWhaleRpcClient(context);
  const api = getWhaleApiClient(context);
  const next = CursorPagination.getNext(context);

  const userQueryProposalType = mapQueryType(context.query.type);
  const userQueryProposalStatus = mapQueryStatus(context.query.status);
  const currentBlockCount = await rpc.blockchain.getBlockCount();
  const currentBlockInfo = await rpc.blockchain.getBlockStats(
    currentBlockCount
  );
  const currentBlockMedianTime = currentBlockInfo.mediantime;
  // All proposal to get statistics breakdown
  const allProposals = await api.governance
    .listGovProposals({
      type: ListProposalsType.ALL,
      status: ListProposalsStatus.ALL,
      all: true,
    })
    .catch(() => {
      return [];
    });

  const queryProposals = await api.governance
    .listGovProposals({
      type: userQueryProposalType,
      status: userQueryProposalStatus,
      size: 10,
      next: next,
    })
    .catch(() => {
      return [];
    });

  async function getProposalsVotes(queryProposals) {
    const promises = queryProposals.map(async (p) => {
      const votes = await api.governance.listGovProposalVotes({
        id: p.proposalId,
        masternode: MasternodeType.ALL,
        cycle: -1,
        all: true,
      });
      const voteCounts = getVoteCount(
        votes.filter((each) => each.cycle === p.currentCycle)
      );
      return { [p.proposalId]: voteCounts };
    });

    const results = await Promise.all(promises);
    const proposalsVotes = Object.assign({}, ...results);
    return proposalsVotes;
  }

  const proposalsVotes = await getProposalsVotes(queryProposals);

  const pages = CursorPagination.getPages(
    context,
    queryProposals as ApiPagedResponse<any>
  );

  return {
    props: getOCGData(
      allProposals,
      queryProposals,
      proposalsVotes,
      currentBlockCount,
      currentBlockMedianTime,
      userQueryProposalType,
      userQueryProposalStatus,
      pages
    ),
  };
}

export type ProposalsVotes = {
  [id: string]: VoteCount;
};

function getOCGData(
  allProposals: GovernanceProposal[],
  queryProposals: GovernanceProposal[],
  proposalsVotes: ProposalsVotes,
  currentBlockCount: number,
  currentBlockMedianTime: number,
  userQueryProposalType: ListProposalsType,
  userQueryProposalStatus: ListProposalsStatus,
  pages: CursorPage[]
): OCGProps {
  return {
    allProposalsDetails: {
      proposalsSubmitted: allProposals.length,
      openProposals: allProposals.filter(
        (item) => item.status === GovernanceProposalStatus.VOTING
      ).length,
      completedProposals: allProposals.filter(
        (item) => item.status === GovernanceProposalStatus.COMPLETED
      ).length,
      rejectedProposals: allProposals.filter(
        (item) => item.status === GovernanceProposalStatus.REJECTED
      ).length,
      currentBlockCount: currentBlockCount,
      currentBlockMedianTime: currentBlockMedianTime,
      userQueryProposalType: userQueryProposalType,
      userQueryProposalStatus: userQueryProposalStatus,
    },
    proposals: {
      allProposals,
      queryProposals,
      proposalsVotes,
      pages: pages,
    },
  };
}

function mapQueryType(type?: string | string[]): ListProposalsType {
  if (typeof type !== "string") {
    return ListProposalsType.ALL;
  }

  switch (type.toLowerCase()) {
    case "voc":
    case "dfip":
      return ListProposalsType.VOC;

    case "cfp":
      return ListProposalsType.CFP;

    case "all":
    default:
      return ListProposalsType.ALL;
  }
}

function mapQueryStatus(status?: string | string[]): ListProposalsStatus {
  if (typeof status !== "string") {
    return ListProposalsStatus.VOTING;
  }

  switch (status.toLowerCase()) {
    case "approved":
    case "completed":
      return ListProposalsStatus.COMPLETED;

    case "rejected":
      return ListProposalsStatus.REJECTED;

    case "voting":
    default:
      return ListProposalsStatus.VOTING;
  }
}
