import { Container } from "@components/commons/Container";
import BigNumber from "bignumber.js";
import { CursorPagination } from "@components/commons/CursorPagination";
import { NumericFormat } from "react-number-format";
import { newPlaygroundRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import { getEnvironment } from "@contexts/Environment";
import { NetworkConnection } from "@contexts/NetworkContext";
import { Button } from "./_components/Button";
import { getDuration } from "./shared/durationHelper";
import { ProgressBar } from "./_components/ProgressBar";
import { votingStages } from "./enum/votingStages";
import { OnChainGovernanceTitles } from "./enum/onChainGovernanceTitles";
import { ProposalTable } from "./_components/ProposalTable";
import { ProposalCards, ProposalType } from "./_components/ProposalCard";

export default function OnChainGovernancePage({
  votingCycle,
  proposals,
  pages,
}) {
  return (
    <Container className="md:pt-11 pt-10 pb-20">
      <div
        data-testid="OnChainGovernance.Title"
        className="md:text-4xl text-2xl tracking-[0.0015em] font-semibold dark:text-dark-gray-900"
      >
        On Chain Governance
      </div>
      <div className="flex flex-row items-center md:mt-12 mt-6">
        <div
          data-testid="OnChainGovernance.VotingCycleTitle"
          className="text-2xl font-medium grow dark:text-dark-gray-900"
        >
          {OnChainGovernanceTitles.votingCycleTitle +
            votingCycle.votingCycleNumber}
        </div>
        <div className="hidden md:block">
          <div className="flex flex-row items-center gap-x-3">
            <Button
              label={`Previous voting cycles`.toUpperCase()}
              testId="OnChainGovernance.PreviousVotingCycleButton"
              onClick={() => {}}
              customStyle="hover:bg-gray-50"
            />
            {votingCycle.currentStage === votingStages.open && (
              <Button
                label={`Submit a proposal`.toUpperCase()}
                testId="OnChainGovernance.SubmitProposalButton"
                onClick={() => {}}
                customStyle="bg-primary-50 hover:bg-primary-100"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col lg:mt-10 md:mt-6 mt-8 lg:mb-[38px] mb-[54px] gap-5 md:gap-y-4">
        <div className="flex md:flex-row flex-col gap-5">
          <div className="flex md:flex-row flex-col md:items-center gap-2">
            <div
              data-testid="OnChainGovernance.ProposalsSubmittedTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.proposalsSubmittedTitle}
            </div>
            <div
              data-testid="OnChainGovernance.ProposalsSubmitted"
              className="font-semibold text-gray-900 text-lg"
            >
              {votingCycle.proposalsSubmitted}
            </div>
          </div>

          <div className="flex flex-row md:gap-x-5 gap-x-9">
            <div className="flex md:flex-row flex-col md:items-center gap-2">
              <div
                data-testid="OnChainGovernance.DfipsTitle"
                className="text-gray-500 text-lg"
              >
                {OnChainGovernanceTitles.dfipsTitle}
              </div>
              <div
                data-testid="OnChainGovernance.Dfips"
                className="font-semibold text-gray-900 text-lg"
              >
                {votingCycle.dfips}
              </div>
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2">
              <div
                data-testid="OnChainGovernance.CfpsTitle"
                className="text-gray-500 text-lg"
              >
                {OnChainGovernanceTitles.cfpsTitle}
              </div>
              <div
                data-testid="OnChainGovernance.Cfps"
                className="font-semibold text-gray-900 text-lg"
              >
                {votingCycle.cfps}
              </div>
            </div>
          </div>
          {votingCycle.currentStage === votingStages.vote && (
            <div className="flex md:flex-row flex-col md:items-center gap-2">
              <div
                data-testid="OnChainGovernance.TotalVotesTitle"
                className="text-gray-500 text-lg"
              >
                {OnChainGovernanceTitles.totalVotesTitle}
              </div>
              <div
                data-testid="OnChainGovernance.TotalVotes"
                className="font-semibold text-gray-900 text-lg"
              >
                <NumericFormat
                  displayType="text"
                  thousandSeparator
                  value={votingCycle.totalVotes}
                  decimalScale={0}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <div className="flex md:flex-row flex-col md:items-center gap-2">
            <div
              data-testid="OnChainGovernance.CurrentStageTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.currentStageTitle}
            </div>
            <div
              data-testid="OnChainGovernance.CurrentStage"
              className="font-semibold text-gray-900 text-lg"
            >
              {votingCycle.currentStage}
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-2">
            <div
              data-testid="OnChainGovernance.TimeLeftTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.timeLeftTitle}
            </div>
            <div
              data-testid="OnChainGovernance.TimeLeft"
              className="font-semibold text-gray-900 text-lg"
            >
              {getDuration(votingCycle.timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <ProgressBar
        data-testid="OnChainGovernance.ProgressBar"
        votingProgress={{
          totalTime: new BigNumber(100),
          timeLeft: new BigNumber(100),
        }}
        submissionProgress={{
          totalTime: new BigNumber(votingCycle.totalTime),
          timeLeft: new BigNumber(votingCycle.timeLeft),
        }}
        segment={2}
      />
      <div className="block md:hidden">
        <div className="mt-[46px] items-center">
          <Button
            label={`Previous voting cycles`.toUpperCase()}
            testId="OnChainGovernance.PreviousVotingCycleButton"
            onClick={() => {}}
            customStyle="w-full hover:bg-gray-50 "
          />
          {votingCycle.currentStage === votingStages.open && (
            <Button
              label={`Submit a proposal`.toUpperCase()}
              testId="OnChainGovernance.SubmitProposalButton"
              onClick={() => {}}
              customStyle="mt-4 w-full bg-primary-50 hover:bg-primary-100"
            />
          )}
        </div>
      </div>

      <div className="hidden lg:block mt-[62px]">
        <ProposalTable
          data-testid="OnChainGovernance.CurrentProposalListTable"
          currentStage={votingCycle.currentStage}
          proposals={proposals.items}
        />
      </div>
      <div className="lg:hidden block mt-[62px]">
        <ProposalCards
          data-testid="OnChainGovernance.CurrentProposalListCard"
          currentStage={votingCycle.currentStage}
          proposals={proposals.items}
        />
      </div>
      <div className="flex justify-end mt-8">
        <CursorPagination pages={pages} path="/on-chain-governance" />
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const network =
    context.query.network?.toString() ?? getEnvironment().networks[0];
  let items = [
    {
      proposalId:
        "9de29e3744b6a20181e676b069ec6465162b5d7b43c261e711f54b4321d76ade",
      creationHeight: 6936,
      title: "Testing proposal 1",
      context: "<Git issue url>",
      contextHash: "",
      status: "Rejected",
      type: "VoteOfConfidence",
      currentCycle: 1,
      totalCycles: 1,
      cycleEndHeight: 7070,
      proposalEndHeight: 7070,
      votingPeriod: 70,
      quorum: "1.00%",
      approvalThreshold: "66.67%",
      fee: 5,
    },
    {
      proposalId:
        "39d4ad07b599ca220f6841b673f0b5a2543734c5a88de64e2139e1594d97cbf4",
      creationHeight: 6455,
      title: "Testing proposal 2",
      context: "<Git issue url>",
      contextHash: "",
      status: "Rejected",
      type: "VoteOfConfidence",
      currentCycle: 1,
      totalCycles: 1,
      cycleEndHeight: 6580,
      proposalEndHeight: 6580,
      votingPeriod: 70,
      quorum: "1.00%",
      approvalThreshold: "66.67%",
      fee: 5,
    },
    {
      proposalId:
        "c91a6237f4519bb7155d6eff30b3041cb616747e604bc96ae0a8bf2464d379fd",
      creationHeight: 7324,
      title: "Testing proposal 3",
      context: "<Git issue url>",
      contextHash: "",
      status: "Rejected",
      type: "VoteOfConfidence",
      currentCycle: 1,
      totalCycles: 1,
      cycleEndHeight: 7420,
      proposalEndHeight: 7420,
      votingPeriod: 70,
      quorum: "1.00%",
      approvalThreshold: "66.67%",
      fee: 5,
    },
  ];
  if (NetworkConnection.RemotePlayground === network) {
    const rpc = newPlaygroundRpcClient(context);
    // TODO implement api call when listgovproposals gets whitelisted
    // Note uncomment to create test data
    // const data = {
    //   title: 'Testing proposal',
    //   amount: '100000000',
    //   context: '<Git issue url>',
    //   payoutAddress: 'mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy',
    //   cycles: 1
    // }
    // for( let i=1; i < 20; i += 1 ) {
    //   const governanceType = ["creategovvoc", "creategovcfp"]
    //   const a = await rpc.call(
    //     // get random governance type
    //     governanceType[Math.floor(Math.random() * governanceType.length)],
    //     [{...data, title: `${data.title} ${i+1}`}, [] ],
    //     'number'
    //   )
    //   console.log(a)
    // }
    items = await rpc.call("listgovproposals", ["all", "voting"], {
      amount: "bignumber",
    });
  }
  return {
    props: {
      votingCycle: {
        votingCycleNumber: 3434,
        proposalsSubmitted: items.length,
        dfips: items.filter(
          (item) => item.type === ProposalType.VOTE_OF_CONFIDENCE
        ).length,
        cfps: items.filter(
          (item) => item.type === ProposalType.COMMUNITY_FUND_PROPOSAL
        ).length,
        currentStage: votingStages.open,
        timeLeft: 9000,
        totalTime: 10000,
        totalVotes: 8392,
      },
      proposals: {
        items,
        pages: [
          {
            n: 1,
            active: true,
            cursors: [],
          },
          {
            n: 2,
            active: false,
            cursors: ["1"],
          },
          {
            n: 3,
            active: false,
            cursors: ["1", "2"],
          },
        ],
      },
    },
  };
}
