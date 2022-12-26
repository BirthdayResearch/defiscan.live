import { Container } from "@components/commons/Container";
import { getWhaleRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import * as LosslessJSON from "lossless-json";
import { Head } from "@components/commons/Head";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { getVoteCount } from "../shared/getVoteCount";
import { VotesTable, VoteCards } from "../_components/VotesTable";
import { VotingDetail } from "../_components/VotingDetail";
import { ProposalDetail } from "../_components/ProposalDetail";

export default function ProposalDetailPage({
  proposal,
  proposalVotes,
  currentBlockCount,
  proposalCreationMedianTime,
}) {
  const { yes, no, neutral } = getVoteCount(proposalVotes);

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
        <div className="flex flex-col mt-6 md:flex-row space-y-6 md:space-y-0 space-x-0 md:space-x-6">
          <div className="w-full md:w-8/12">
            <ProposalDetail
              proposal={proposal}
              currentBlockCount={currentBlockCount}
              proposalCreationMedianTime={proposalCreationMedianTime}
            />
            <div className="hidden md:block mt-6">
              <VotesTable votes={proposalVotes} />
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <VotingDetail
              yes={yes}
              no={no}
              status={proposal.status}
              neutral={neutral}
            />
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

    return {
      props: {
        proposal,
        proposalVotes,
        currentBlockCount,
        proposalCreationMedianTime,
      },
    };
  } catch {
    return { notFound: true };
  }
}
