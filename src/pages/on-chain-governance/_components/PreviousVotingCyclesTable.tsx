import React from "react";
import { useRouter } from "next/router";
import { OverflowTable } from "@components/commons/OverflowTable";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";

export function PreviousVotingCycleTable({
  previousCycles,
}: {
  previousCycles: PreviousVotingCycle[];
}) {
  return (
    <div>
      <OverflowTable>
        <OverflowTable.Header>
          <OverflowTable.Head
            title={OnChainGovernanceTitles.votingCyclesTitle}
          />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.startedTableTitle}
          />
          <OverflowTable.Head title={OnChainGovernanceTitles.endedTableTitle} />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.proposalsSubmittedTitle}
            alignRight
          />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.cfpTitle}
            alignRight
          />
          <OverflowTable.Head
            title={OnChainGovernanceTitles.dfipTitle}
            alignRight
          />
        </OverflowTable.Header>

        {previousCycles.map((previousCycle: PreviousVotingCycle, index) => (
          <React.Fragment key={index}>
            <PreviousVotingCycleRow previousCycle={previousCycle} />
          </React.Fragment>
        ))}
      </OverflowTable>
    </div>
  );
}

function PreviousVotingCycleRow({
  previousCycle,
}: {
  previousCycle: PreviousVotingCycle;
}) {
  const router = useRouter();
  return (
    <OverflowTable.Row
      onClick={() => {
        router.push(
          `/on-chain-governance/previous-voting-cycles/${previousCycle.votingCycles}`
        );
      }}
      className={classNames(
        "hover:text-primary-500 dark:hover:text-gray-100 cursor-pointer"
      )}
    >
      <OverflowTable.Cell className="dark:text-gray-100">
        <NumericFormat
          prefix="#"
          displayType="text"
          thousandSeparator
          value={previousCycle.votingCycles}
          decimalScale={0}
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className="dark:text-gray-100">
        {previousCycle.started}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="dark:text-gray-100">
        {previousCycle.ended}
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right dark:text-gray-100">
        <NumericFormat
          displayType="text"
          thousandSeparator
          value={previousCycle.submittedProposals}
          decimalScale={0}
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right dark:text-gray-100">
        <NumericFormat
          displayType="text"
          thousandSeparator
          value={previousCycle.cfp}
          decimalScale={0}
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className="text-right dark:text-gray-100">
        <NumericFormat
          displayType="text"
          thousandSeparator
          value={previousCycle.dfip}
          decimalScale={0}
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}

export interface PreviousVotingCycle {
  votingCycles: number;
  started: string;
  ended: string;
  submittedProposals: number;
  cfp: number;
  dfip: number;
}
