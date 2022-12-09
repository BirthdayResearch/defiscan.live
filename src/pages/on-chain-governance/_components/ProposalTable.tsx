import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import { IoMdOpen } from "react-icons/io";
import { votingStages } from "../enum/votingStages";
import { Button } from "./Button";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { Proposal } from "./ProposalCard";

export function ProposalTable({
  proposals,
  currentStage,
}: {
  proposals: Proposal[];
  currentStage: votingStages;
}) {
  return (
    <div>
      <OverflowTable>
        <OverflowTable.Header>
          <OverflowTable.Head
            title={OnChainGovernanceTitles.nameOfProposalTitle}
          />
          <OverflowTable.Head title={OnChainGovernanceTitles.typeTitle} />
          <OverflowTable.Head title={OnChainGovernanceTitles.proposerTitle} />
          {currentStage === votingStages.vote ? (
            <>
              <OverflowTable.Head title="Community discussions" />
              <OverflowTable.Head title="Vote Breakdown" />
              <OverflowTable.Head title="Action" alignRight />
            </>
          ) : (
            <OverflowTable.Head title="Community discussions" alignRight />
          )}
        </OverflowTable.Header>

        {proposals.map((proposal: Proposal, index) => (
          <ProposalRow
            key={index}
            currentStage={currentStage}
            proposal={proposal}
          />
        ))}
      </OverflowTable>
      {(proposals === null || proposals.length === 0) && (
        <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
    </div>
  );
}

function ProposalRow({
  proposal,
  currentStage,
}: {
  proposal: Proposal;
  currentStage: votingStages;
}) {
  const router = useRouter();
  return (
    <OverflowTable.Row
      onClick={() => {
        router.push("/on-chain-governance/proposalid");
      }}
      className="hover:text-primary-500 dark:hover:text-gray-100 cursor-pointer"
    >
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {proposal.proposalName}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {proposal.proposalType}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="align-middle dark:text-gray-100">
        {proposal.proposer}
      </OverflowTable.Cell>
      {currentStage === votingStages.vote ? (
        <>
          <OverflowTable.Cell className="align-middle">
            <div className="flex flex-row gap-x-[27px]">
              <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline">
                <button
                  type="button"
                  onClick={() => {
                    document.location.href = proposal.links.github;
                  }}
                >
                  {OnChainGovernanceTitles.github}
                </button>
                <IoMdOpen />
              </div>
              <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline">
                <button
                  type="button"
                  onClick={() => {
                    document.location.href = proposal.links.reddit;
                  }}
                >
                  {OnChainGovernanceTitles.reddit}
                </button>
                <IoMdOpen />
              </div>
            </div>
          </OverflowTable.Cell>
          <OverflowTable.Cell className="align-middle">
            <div className="flex flex-row gap-x-5">
              <VotingResultPercentage
                value="78% Yes"
                customStyle="font-semibold group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="16% No"
                customStyle="group-hover:text-primary-500"
              />
              <VotingResultPercentage
                value="6% Neutral"
                customStyle="group-hover:text-primary-500"
              />
            </div>
          </OverflowTable.Cell>

          <OverflowTable.Cell>
            <Button
              label={`vote`.toUpperCase()}
              testId="OnChainGovernance.SubmitProposalButton"
              onClick={() => {
                window.location.href = "/on-chain-governance";
              }}
              customStyle="px-5 text-base w-full border bg-white hover:border-primary-200 active:border-primary-400"
            />
          </OverflowTable.Cell>
        </>
      ) : (
        <OverflowTable.Cell>
          <div className="flex flex-row gap-x-[27px] justify-end">
            <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline cursor-pointer">
              <a href={proposal.links.github}>
                {OnChainGovernanceTitles.github}
              </a>
              <IoMdOpen />
            </div>
            <div className="flex flex-row items-center gap-x-[11px] text-[#4A72DA] hover:underline cursor-pointer">
              <a href={proposal.links.reddit}>
                {OnChainGovernanceTitles.reddit}
              </a>
              <IoMdOpen />
            </div>
          </div>
        </OverflowTable.Cell>
      )}
    </OverflowTable.Row>
  );
}

function VotingResultPercentage({
  value,
  customStyle,
}: {
  value: string;
  customStyle?: string;
}) {
  return (
    <span className={`tracking-[0.0044em] text-gray-900 ${customStyle ?? ""}`}>
      {value}
    </span>
  );
}
