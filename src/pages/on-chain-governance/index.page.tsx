import React, { useEffect, useState } from "react";
import { isPlayground } from "@contexts/Environment";
import { useRouter } from "next/router";
import { Container } from "@components/commons/Container";
import BigNumber from "bignumber.js";
import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { NumericFormat } from "react-number-format";
import {
  getWhaleRpcClient,
  newPlaygroundClient,
  useWhaleRpcClient,
} from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import {
  ListProposalsType,
  ListProposalsStatus,
  ProposalType,
  ProposalInfo,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { useNetwork } from "@contexts/NetworkContext";
import { PlaygroundRpcClient } from "@defichain/playground-api-client";
import { Button } from "./_components/Button";
import { getDuration } from "./shared/durationHelper";
import { ProgressBar } from "./_components/ProgressBar";
import { votingStages } from "./enum/votingStages";
import { OnChainGovernanceTitles } from "./enum/onChainGovernanceTitles";
import { ProposalTable } from "./_components/ProposalTable";
import { ProposalCards } from "./_components/ProposalCard";

interface OCGProps {
  votingCycle: {
    votingCycleNumber: number;
    proposalsSubmitted: number;
    dfips: number;
    cfps: number;
    currentStage: votingStages;
    timeLeft: number;
    totalTime: number;
    totalVotes: number;
  };
  proposals: {
    items: ProposalInfo[];
    pages: CursorPage[];
  };
}
export default function OnChainGovernancePage(props) {
  const rpc = useWhaleRpcClient();
  const router = useRouter();
  const connection = useNetwork().connection;

  const [data, setData] = useState<OCGProps>({
    votingCycle: props.votingCycle,
    proposals: props.proposals,
  });
  const { votingCycle, proposals } = data;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    const response = await rpc.governance.listGovProposals({
      type: ListProposalsType.ALL,
      status: ListProposalsStatus.VOTING,
    });
    setData(getOCGData(JSON.parse(JSON.stringify(response))));
  }

  // TODO remove this before release to prod
  async function createDummyProposals(): Promise<void> {
    const playgroundRPC = new PlaygroundRpcClient(
      newPlaygroundClient(connection)
    );
    for (let i = 0; i < 5; i += 1) {
      const governanceType = ["creategovvoc", "creategovcfp"];
      const proposalType =
        governanceType[Math.floor(Math.random() * governanceType.length)]; // get random governance type
      const data = {
        title: `Testing proposal ${new Date().getTime()}`,
        amount: "100000000",
        context: "https://github.com/WavesHQ/scan",
        payoutAddress: "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy",
        cycles: 1,
      };
      const proposal = await playgroundRPC.call(
        proposalType,
        [data, []],
        "number"
      );
      console.log(
        `proposal created with id:${proposal} is created with ${proposalType}`
      );
    }
  }

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
          {OnChainGovernanceTitles.votingCycleTitleWithHash +
            votingCycle.votingCycleNumber}
        </div>
        <div className="hidden md:block">
          <div className="flex flex-row items-center gap-x-3">
            <Button
              label={`Previous voting cycles`.toUpperCase()}
              testId="OnChainGovernance.PreviousVotingCycleButton"
              onClick={() => {
                router.push("on-chain-governance/previous-voting-cycles");
              }}
              customStyle="hover:bg-gray-50"
            />
            {votingCycle.currentStage === votingStages.open && (
              <Button
                label={`Submit a proposal`.toUpperCase()}
                testId="OnChainGovernance.SubmitProposalButton"
                onClick={() => router.push("on-chain-governance/create")}
                customStyle="bg-primary-50 hover:bg-primary-100"
              />
            )}
            {/* TODO remove this before release to prod */}
            {isPlayground(connection) && (
              <Button
                testId="dummy-proposal"
                label="Create dummy proposal"
                onClick={createDummyProposals}
                customStyle="hover:bg-gray-50"
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
            onClick={() => {
              router.push("on-chain-governance/previous-voting-cycles");
            }}
            customStyle="w-full hover:bg-gray-50 "
          />
          {votingCycle.currentStage === votingStages.open && (
            <Button
              label={`Submit a proposal`.toUpperCase()}
              testId="OnChainGovernance.SubmitProposalButton"
              onClick={() => router.push("on-chain-governance/create")}
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
        <CursorPagination pages={proposals.pages} path="/on-chain-governance" />
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const rpc = getWhaleRpcClient(context);
  const response = await rpc.governance.listGovProposals({
    type: ListProposalsType.ALL,
    status: ListProposalsStatus.VOTING,
  });
  return {
    props: getOCGData(JSON.parse(JSON.stringify(response))),
  };
}

function getOCGData(items: ProposalInfo[]): OCGProps {
  return {
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
  };
}
