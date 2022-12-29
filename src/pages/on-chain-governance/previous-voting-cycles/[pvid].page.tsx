import { Container } from "@components/commons/Container";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { OnChainGovernanceTitles } from "../enum/OnChainGovernanceTitles";
import { Button } from "../_components/Button";
import { getDuration } from "../shared/durationHelper";
import { PreviousVotingCycleProposalsTable } from "../_components/PreviousVotingCycleProposalsTable";
import { PreviousVotingCycleProposalsCards } from "../_components/PreviousVotingCycleProposalsCards";

export default function PreviousVotingCycle({
  previousVotingCycle,
  previousVotingCycleProposals,
}) {
  const router = useRouter();
  const chosenVotingCycle = router.query.pvid;
  return (
    <Container className="md:pt-11 pt-10 pb-20">
      <div
        data-testid="OnChainGovernance.Title"
        className="md:text-4xl text-2xl tracking-[0.0015em] font-semibold dark:text-dark-gray-900"
      >
        On Chain Governance
      </div>
      <div className="flex md:flex-row md:items-center flex-col md:mt-12 mt-8 gap-y-4">
        <div
          data-testid="OnChainGovernance.PreviousVotingCycleTitle"
          className="text-2xl font-medium grow dark:text-dark-gray-900"
        >
          {OnChainGovernanceTitles.votingCycleTitleWithHash + chosenVotingCycle}
        </div>
        <Button
          label={OnChainGovernanceTitles.backToCurrentCycle}
          testId="OnChainGovernance.PreviousVotingCycleBackToCurrentCycleButton"
          onClick={() => {
            router.push("/on-chain-governance/");
          }}
          customStyle="hover:bg-gray-50 md:p-2 px-0"
        />
      </div>
      <div className="mt-3">
        {`${getDuration(previousVotingCycle.timeAgo)} ago (${
          previousVotingCycle.blocksAgo
        } blocks)`}
      </div>

      <div className="flex md:flex-row flex-col gap-x-5 gap-y-2 mt-6">
        <div className="flex flex-row items-center gap-2">
          <div
            data-testid="OnChainGovernance.PreviousVotingCycleProposalsSubmittedTitle"
            className="text-gray-500 text-lg"
          >
            {OnChainGovernanceTitles.proposalsSubmittedTitle}
          </div>
          <div
            data-testid="OnChainGovernance.PreviousVotingCycleProposalsSubmitted"
            className="font-semibold text-gray-900 text-lg"
          >
            {previousVotingCycle.proposalsSubmitted}
          </div>
        </div>

        <div className="flex flex-row md:gap-x-5 gap-x-9">
          <div className="flex flex-row items-center gap-2">
            <div
              data-testid="OnChainGovernance.PreviousVotingCycleDfipsTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.dfipsTitle}
            </div>
            <div
              data-testid="OnChainGovernance.PreviousVotingCycleDfips"
              className="font-semibold text-gray-900 text-lg"
            >
              {previousVotingCycle.dfips}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              data-testid="OnChainGovernance.PreviousVotingCycleCfpsTitle"
              className="text-gray-500 text-lg"
            >
              {OnChainGovernanceTitles.cfpsTitle}
            </div>
            <div
              data-testid="OnChainGovernance.PreviousVotingCycleCfps"
              className="font-semibold text-gray-900 text-lg"
            >
              {previousVotingCycle.cfps}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            data-testid="OnChainGovernance.PreviousVotingCycleTotalVotesTitle"
            className="text-gray-500 text-lg"
          >
            {OnChainGovernanceTitles.totalVotesTitle}
          </div>
          <div
            data-testid="OnChainGovernance.PreviousVotingCycleTotalVotes"
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
        <PreviousVotingCycleProposalsTable
          data-testid="OnChainGovernance.PreviousVotingCycleProposalsTable"
          previousVotingCycleProposals={previousVotingCycleProposals.items}
        />
      </div>
      <div className="lg:hidden block md:mt-6 mt-8">
        <PreviousVotingCycleProposalsCards
          data-testid="OnChainGovernance.PreviousVotingCycleListCard"
          previousVotingCycleProposals={previousVotingCycleProposals.items}
        />
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      previousVotingCycle: {
        proposalsSubmitted: 12,
        dfips: 24,
        cfps: 24,
        totalVotes: 8392,
        timeAgo: 7848006,
        blocksAgo: 23457,
      },
      previousVotingCycleProposals: {
        items: [
          {
            proposalName: "Support Europe",
            proposalType: "DFIP",
            proposer: "Chevol Valra",
            links: {
              github: "https://github.com/",
            },
            voteDecision: {
              yes: 9,
              no: 10,
              neutral: 0,
            },
          },
          {
            proposalName: "Support Europe",
            proposalType: "DFIP",
            proposer: "Chevol Valra",
            links: {
              github: "https://github.com/",
            },
            voteDecision: {
              yes: 19,
              no: 10,
              neutral: 0,
            },
          },
          {
            proposalName: "Support Europe",
            proposalType: "DFIP",
            proposer: "Chevol Valra",
            links: {
              github: "https://github.com/",
            },
            voteDecision: {
              yes: 9,
              no: 10,
              neutral: 0,
            },
          },
          {
            proposalName: "Support Europe",
            proposalType: "DFIP",
            proposer: "Chevol Valra",
            links: {
              github: "https://github.com/",
            },
            voteDecision: {
              yes: 9,
              no: 10,
              neutral: 0,
            },
          },
        ],
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
