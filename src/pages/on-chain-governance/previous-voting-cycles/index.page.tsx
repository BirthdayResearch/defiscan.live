import { Container } from "@components/commons/Container";
import { useRouter } from "next/router";
import { CursorPagination } from "@components/commons/CursorPagination";
import { NumericFormat } from "react-number-format";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { Button } from "../_components/Button";
import { votingStages } from "../enum/votingStages";
import { PreviousVotingCycleTable } from "../_components/PreviousVotingCyclesTable";
import { PreviousVotingCyclesCards } from "../_components/PreviousVotingCyclesCard";

export default function OnChainGovernancePage({
  previousVotingCycle,
  previousCycles,
}) {
  const router = useRouter();
  return (
    <Container className="md:pt-11 pt-10 pb-20">
      <div
        data-testid="OnChainGovernance.PreviousCyclesTitle"
        className="md:text-4xl text-2xl tracking-[0.0015em] font-semibold dark:text-dark-gray-900"
      >
        On Chain Governance
      </div>
      <div className="flex md:flex-row md:items-center flex-col md:mt-12 mt-8 gap-4">
        <div
          data-testid="OnChainGovernance.PreviousCyclesTitle"
          className="text-2xl font-medium grow dark:text-dark-gray-900"
        >
          {OnChainGovernanceTitles.previousVotingCyclesTitle}
        </div>

        <Button
          label={OnChainGovernanceTitles.backToCurrentCycle}
          testId="OnChainGovernance.PreviousCyclesBackToCurrentButton"
          onClick={() => {
            router.push("/on-chain-governance/");
          }}
          customStyle="hover:bg-gray-50 md:p-2 px-0"
        />
      </div>

      <div className="flex md:flex-row flex-col gap-x-5 gap-y-2 mt-4">
        <div className="flex flex-row items-center gap-2">
          <div
            data-testid="OnChainGovernance.PreviousCyclesProposalsSubmittedTitle"
            className="text-gray-500 text-lg"
          >
            {OnChainGovernanceTitles.proposalsSubmittedTitle}
          </div>
          <div
            data-testid="OnChainGovernance.PreviousCyclesProposalsSubmitted"
            className="font-semibold text-gray-900 text-lg"
          >
            {previousVotingCycle.proposalsSubmitted}
          </div>
        </div>

        <div className="flex flex-row md:gap-x-5 gap-x-9">
          <div className="flex flex-row items-center gap-2">
            <div
              data-testid="OnChainGovernance.PreviousCyclesDfipsTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.dfipsTitle}
            </div>
            <div
              data-testid="OnChainGovernance.PreviousCyclesDfips"
              className="font-semibold text-gray-900 text-lg"
            >
              {previousVotingCycle.dfips}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              data-testid="OnChainGovernance.PreviousCyclesCfpsTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.cfpsTitle}
            </div>
            <div
              data-testid="OnChainGovernance.PreviousCyclesCfps"
              className="font-semibold text-gray-900 text-lg"
            >
              {previousVotingCycle.cfps}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            data-testid="OnChainGovernance.PreviousCyclesTotalVotesTitle"
            className="text-gray-500 text-lg"
          >
            {OnChainGovernanceTitles.totalVotesTitle}
          </div>
          <div
            data-testid="OnChainGovernance.PreviousCyclesTotalVotes"
            className="font-semibold text-gray-900 text-lg"
          >
            <NumericFormat
              displayType="text"
              thousandSeparator
              value={previousVotingCycle.totalVotes}
              decimalScale={0}
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:block mt-6">
        <PreviousVotingCycleTable
          data-testid="OnChainGovernance.PreviousCyclesTable"
          previousCycles={previousCycles.items}
        />
      </div>
      <div className="lg:hidden block md:mt-6 mt-8">
        <PreviousVotingCyclesCards
          data-testid="OnChainGovernance.PreviousCyclesListCard"
          previousVotingCycles={previousCycles.items}
        />
      </div>
      <div className="flex justify-end mt-8">
        <CursorPagination
          pages={previousCycles.pages}
          path="/on-chain-governance"
        />
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      previousVotingCycle: {
        votingCycleNumber: 3434,
        proposalsSubmitted: 12,
        dfips: 24,
        cfps: 24,
        currentStage: votingStages.open,
        timeLeft: 9000,
        totalTime: 10000,
        totalVotes: 8392,
      },
      previousCycles: {
        items: [
          {
            votingCycles: 1234,
            started: "12/12/23",
            ended: "24/12/23",
            submittedProposals: 29896,
            cfp: 220,
            dfip: 2812,
          },
          {
            votingCycles: 1233,
            started: "12/12/23",
            ended: "24/12/23",
            submittedProposals: 29896,
            cfp: 220,
            dfip: 28127,
          },
          {
            votingCycles: 1232,
            started: "12/12/23",
            ended: "24/12/23",
            submittedProposals: 29896,
            cfp: 220,
            dfip: 28127,
          },
          {
            votingCycles: 1231,
            started: "12/12/23",
            ended: "24/12/23",
            submittedProposals: 29896,
            cfp: 220,
            dfip: 28127,
          },
          {
            votingCycles: 1230,
            started: "12/12/23",
            ended: "24/12/23",
            submittedProposals: 29896,
            cfp: 220,
            dfip: 28127,
          },
        ],
        pages: [
          {
            n: 1,
            active: true,
            cursors: [],
          },
        ],
      },
    },
  };
}
