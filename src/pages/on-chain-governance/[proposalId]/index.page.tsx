import { useState, useEffect } from "react";
import { Container } from "@components/commons/Container";
import { getWhaleRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import * as LosslessJSON from "lossless-json";
import { Head } from "@components/commons/Head";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { NetworkConnection } from "@contexts/NetworkContext";
import { getEnvironment } from "@contexts/Environment";
import BigNumber from "bignumber.js";
import { VoteDecision } from "@defichain/jellyfish-api-core/dist/category/governance";
import { getVoteCount } from "../shared/getVoteCount";
import { VotesTable, VoteCards } from "../_components/VotesTable";
import { VotingDetail } from "../_components/VotingDetail";
import { ProposalDetail } from "../_components/ProposalDetail";
import { ConfirmVoteDialog } from "../_components/ConfirmVoteDialog";

export default function ProposalDetailPage({
  proposal,
  proposalVotes,
  proposalCreationMedianTime,
  proposalEndMedianTime,
}) {
  const { yes, no, neutral } = getVoteCount(proposalVotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChangeVoteClicked, setIsChangeVoteClicked] = useState(false);
  const [isMasterNodeConfirmClicked, setIsMasterNodeConfirmClicked] =
    useState(false);
  const [hasUserSelectedVote, setHasUserSelectedVote] = useState(false);
  const [userConfirmedSelectedVote, setUserConfirmedSelectedVote] =
    useState<VoteDecision>();
  const [isConfirmDetailsClicked, setIsConfirmDetailsClicked] = useState(false);
  const [voteCommand, setVoteCommand] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isChangeVoteClicked) {
      setIsMasterNodeConfirmClicked(false);
      setIsConfirmDetailsClicked(false);
      setIsChangeVoteClicked(false);
      setHasUserSelectedVote(false);
    }
    setIsLoading(true);
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
              path: `/on-chain-governance/create`,
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
              proposalCreationMedianTime={proposalCreationMedianTime}
              proposalEndMedianTime={proposalEndMedianTime}
            />
            <div className="hidden lg:block mt-6">
              <VotesTable votes={proposalVotes} />
            </div>
          </div>
          <div className="w-full lg:w-4/12">
            <VotingDetail
              userSelectedVote={userConfirmedSelectedVote}
              voteCommand={voteCommand}
              isLoading={isLoading}
              setIsChangeVoteClicked={setIsChangeVoteClicked}
              yes={yes}
              no={no}
              status={proposal.status}
              neutral={neutral}
              onSubmitVote={() => setIsDialogOpen(true)}
            />
          </div>
          <div className="lg:hidden md:block hidden w-full mt-6">
            <VotesTable votes={proposalVotes} />
          </div>
          {proposalVotes.length > 0 && (
            <div className="md:hidden mt-7 items-center">
              <div className="mb-2 ml-4">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  Votes
                </span>
                <span className="text-gray-900 dark:text-gray-100 text-xs ml-1">
                  ({proposalVotes.length} total)
                </span>
              </div>
              <VoteCards votes={proposalVotes} />
            </div>
          )}
        </div>
      </Container>
      <ConfirmVoteDialog
        setIsMasterNodeConfirmClicked={setIsMasterNodeConfirmClicked}
        isMasterNodeConfirmClicked={isMasterNodeConfirmClicked}
        hasUserSelectedVote={hasUserSelectedVote}
        setHasUserSelectedVote={setHasUserSelectedVote}
        setUserConfirmedSelectedVote={setUserConfirmedSelectedVote}
        isConfirmDetailsClicked={isConfirmDetailsClicked}
        setIsConfirmDetailsClicked={setIsConfirmDetailsClicked}
        setVoteCommand={setVoteCommand}
        voteCommand={voteCommand}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isChangeVoteClicked={isChangeVoteClicked}
        proposalId={proposal.proposalId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const proposalId = context.params?.proposalId?.toString().trim() as string;
  const rpc = getWhaleRpcClient(context);
  // const prpc = newPlaygroundRpcClient(context)
  // await prpc.call('votegov',
  //   [proposalId, "e86c027861cc0af423313f4152a44a83296a388eb51bf1a6dde9bd75bed55fb4", 'neutral', []],
  //   'number'
  // )
  try {
    const proposal = await rpc.governance.getGovProposal(proposalId);
    if (proposal.amount) {
      proposal.amount = LosslessJSON.parse(
        LosslessJSON.stringify(proposal.amount)
      );
    }
    const proposalVotes = await rpc.governance.listGovProposalVotes(proposalId);
    const currentBlockCount = await rpc.blockchain.getBlockCount();
    const proposalCreationBlockInfo = await rpc.blockchain.getBlockStats(
      proposal.creationHeight
    );
    const proposalCreationMedianTime = proposalCreationBlockInfo.mediantime;

    const network =
      context.query.network?.toString() ?? getEnvironment().networks[0];
    const secondsPerBlock =
      network === NetworkConnection.MainNet ||
      network === NetworkConnection.TestNet
        ? 30
        : 3;

    let proposalEndMedianTime;
    if (new BigNumber(currentBlockCount).gt(proposal.cycleEndHeight)) {
      const endBlockInfo = await rpc.blockchain.getBlockStats(
        proposal.cycleEndHeight
      );
      proposalEndMedianTime = endBlockInfo.mediantime;
    } else {
      const currentBlockInfo = await rpc.blockchain.getBlockStats(
        currentBlockCount
      );
      const votingTimeLeftInSec = new BigNumber(proposal.cycleEndHeight)
        .minus(currentBlockCount)
        .multipliedBy(secondsPerBlock)
        .toNumber();
      proposalEndMedianTime = currentBlockInfo.mediantime + votingTimeLeftInSec;
    }

    return {
      props: {
        proposal,
        proposalVotes,
        proposalCreationMedianTime,
        proposalEndMedianTime,
      },
    };
  } catch {
    return { notFound: true };
  }
}
