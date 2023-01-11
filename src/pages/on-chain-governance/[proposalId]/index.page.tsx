import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Container } from "@components/commons/Container";
import { getWhaleRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
  ProposalType,
  VoteDecision,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import * as LosslessJSON from "lossless-json";
import { Head } from "@components/commons/Head";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { NetworkConnection } from "@contexts/NetworkContext";
import { getEnvironment } from "@contexts/Environment";
import classNames from "classnames";
import BigNumber from "bignumber.js";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { getVoteCount } from "../shared/getVoteCount";
import { VotesTable, VoteCards } from "../_components/VotesTable";
import { VotingResult } from "../_components/VotingResult";
import { ProposalDetail } from "../_components/ProposalDetail";
import { ConfirmVoteDialog } from "../_components/ConfirmVoteDialog";
import { getCycleEndDate } from "../shared/getCycleEndTime";
import { getSecondsPerBlock } from "../shared/getSecondsPerBlock";
import { formatUnixTime } from "../shared/dateHelper";
import { VoteStages } from "../enum/VoteStages";
import { getAllCycleVotes } from "../shared/getAllCycleVotes";
import { TotalVotesCards } from "../_components/TotalVotesCards";

export default function ProposalDetailPage({
  proposal,
  proposalVotes,
  proposalCreationDate,
  proposalEndDate,
  totalVotes,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { yes, no, neutral } = getVoteCount(proposalVotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChangeVoteClicked, setIsChangeVoteClicked] = useState(false);
  const [userConfirmedSelectedVote, setUserConfirmedSelectedVote] =
    useState<VoteDecision>();
  const [voteCommand, setVoteCommand] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [voteStage, setVoteStage] = useState<VoteStages>(
    VoteStages.VoteProposal
  );

  const [isCurrentCycleClicked, setIsCurrentCycleClicked] = useState(true);

  useEffect(() => {
    if (isChangeVoteClicked) {
      setIsChangeVoteClicked(false);
      setVoteStage(VoteStages.VoteProposal);
    }
  }, [isChangeVoteClicked]);

  return (
    <>
      <Head title="Proposal Details" />
      <Container className="mt-[40px] md:mt-[44px]">
        <Breadcrumb
          items={[
            {
              path: "/on-chain-governance",
              name: "Proposal",
            },
            {
              path: `/on-chain-governance/${proposal.proposalId}`,
              name: "Proposal Details",
              canonical: true,
              isCurrentPath: true,
            },
          ]}
        />
        <div className="flex flex-col lg:mt-6 md:mt-4 mt-2 lg:flex-row space-y-6 lg:space-y-0 space-x-0 lg:space-x-6">
          <div className="w-full lg:w-8/12">
            <ProposalDetail
              proposal={proposal}
              proposalCreationDate={proposalCreationDate}
              proposalEndDate={proposalEndDate}
            />
            {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL && (
              <div className="hidden lg:block mt-6">
                <UserQueryButtonRow
                  isCurrentCycleClicked={isCurrentCycleClicked}
                  setIsCurrentCycleClicked={setIsCurrentCycleClicked}
                  currenCycle={proposal.currentCycle}
                />
              </div>
            )}

            {isCurrentCycleClicked ? (
              <div
                className={classNames(
                  "hidden lg:block",
                  proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL
                    ? "mt-4"
                    : "mt-6"
                )}
              >
                <VotesTable votes={proposalVotes} />
              </div>
            ) : (
              <div className="hidden lg:block mt-4">
                <TotalVotesCards totalVotes={totalVotes} proposal={proposal} />
              </div>
            )}
          </div>
          <div className="w-full lg:w-4/12">
            <VotingResult
              userSelectedVote={userConfirmedSelectedVote}
              voteCommand={voteCommand}
              isLoading={isLoading}
              setIsChangeVoteClicked={setIsChangeVoteClicked}
              yes={yes}
              no={no}
              status={proposal.status}
              neutral={neutral}
              onSubmitVote={() => {
                setIsDialogOpen(true);
              }}
            />
          </div>

          <div className="space-y-0">
            <div
              className={classNames("flex flex-row mb-2 md:mb-4 items-center", {
                "md:mb-0": proposal.type === ProposalType.VOTE_OF_CONFIDENCE,
              })}
            >
              <div className="grow md:hidden ml-4 ">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  Votes
                </span>
                <span className="text-gray-900 dark:text-gray-100 text-xs ml-1">
                  {proposalVotes.length > 0
                    ? `(${proposalVotes.length} total)`
                    : ""}
                </span>
              </div>

              {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL && (
                <div className="block lg:hidden">
                  <UserQueryButtonRow
                    isCurrentCycleClicked={isCurrentCycleClicked}
                    setIsCurrentCycleClicked={setIsCurrentCycleClicked}
                    currenCycle={proposal.currentCycle}
                  />
                </div>
              )}
            </div>
            {isCurrentCycleClicked ? (
              <>
                <div className="lg:hidden md:block hidden w-full">
                  <VotesTable votes={proposalVotes} />
                </div>

                <div className="md:hidden items-center">
                  <VoteCards votes={proposalVotes} />
                </div>
              </>
            ) : (
              <div className="lg:hidden items-center">
                <TotalVotesCards totalVotes={totalVotes} proposal={proposal} />
              </div>
            )}
          </div>
        </div>
      </Container>
      <ConfirmVoteDialog
        voteStage={voteStage}
        setVoteStage={setVoteStage}
        setUserConfirmedSelectedVote={setUserConfirmedSelectedVote}
        userConfirmedSelectedVote={userConfirmedSelectedVote}
        setVoteCommand={setVoteCommand}
        voteCommand={voteCommand}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        proposalId={proposal.proposalId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}

function UserQueryButtonRow({
  setIsCurrentCycleClicked,
  isCurrentCycleClicked,
  currenCycle,
}: {
  setIsCurrentCycleClicked: Dispatch<SetStateAction<boolean>>;
  isCurrentCycleClicked: boolean;
  currenCycle: number;
}) {
  const windowDimension = useWindowDimensions();
  return (
    <div className="flex flex-row">
      <button
        type="button"
        data-testid="OnChainGovernance.VotingFlow.NoVote"
        className={classNames(
          "md:px-5 rounded-l border px-3 py-[6px] md:text-sm text-xs font-medium border-gray-300 text-gray-500  tracking-[0.0025em]",
          { "bg-primary-500 text-white border-0": isCurrentCycleClicked }
        )}
        onClick={() => {
          setIsCurrentCycleClicked(true);
        }}
      >
        {windowDimension.width <= 767 ? "Current" : "Current cycle"}
      </button>
      <button
        type="button"
        data-testid="OnChainGovernance.VotingFlow.YesVote"
        disabled={currenCycle === 1}
        className={classNames(
          "md:px-5 border border-l-0 rounded-r px-3 py-[6px] md:text-sm text-xs font-medium border-gray-300 text-gray-500 tracking-[0.0025em] disabled:text-gray-500 disabled:border-gray-200 disabled:opacity-30",
          { "bg-primary-500 text-white border-0": !isCurrentCycleClicked }
        )}
        onClick={() => {
          setIsCurrentCycleClicked(false);
        }}
      >
        {windowDimension.width <= 767 ? "Previous" : "Previous cycle"}
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const proposalId = context.params?.proposalId?.toString().trim() as string;
  const rpc = getWhaleRpcClient(context);
  try {
    const proposal = await rpc.governance.getGovProposal(proposalId);
    if (proposal.amount) {
      proposal.amount = LosslessJSON.parse(
        LosslessJSON.stringify(proposal.amount)
      );
    }
    const proposalVotes = await rpc.governance.listGovProposalVotes(proposalId);
    const currentBlockHeight = await rpc.blockchain.getBlockCount();
    const currentBlockMedianTime = await rpc.blockchain
      .getBlockStats(currentBlockHeight)
      .then((block) => block.mediantime);
    const proposalCreationDate = await rpc.blockchain
      .getBlockStats(proposal.creationHeight)
      .then((block) => formatUnixTime(block.mediantime));

    const network =
      (context.query.network?.toString() as NetworkConnection) ??
      getEnvironment().networks[0];
    const secondsPerBlock = getSecondsPerBlock(network);

    let proposalEndDate: string;
    if (
      new BigNumber(currentBlockHeight).isGreaterThan(proposal.cycleEndHeight)
    ) {
      proposalEndDate = await rpc.blockchain
        .getBlockStats(proposal.cycleEndHeight)
        .then((block) => formatUnixTime(block.mediantime));
    } else {
      proposalEndDate = getCycleEndDate(
        proposal.cycleEndHeight,
        currentBlockHeight,
        currentBlockMedianTime,
        secondsPerBlock
      );
    }

    const allCycleProposalVotes = await rpc.governance.listGovProposalVotes(
      proposalId,
      undefined,
      -1
    );
    const totalVotes = getAllCycleVotes(allCycleProposalVotes);

    return {
      props: {
        proposal,
        proposalVotes,
        proposalCreationDate,
        proposalEndDate,
        totalVotes,
      },
    };
  } catch {
    return { notFound: true };
  }
}
