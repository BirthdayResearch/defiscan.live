import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { OnChainGovernanceTitles } from "../enum/onChainGovernanceTitles";
import { PreviousVotingCycle } from "./PreviousVotingCyclesTable";

export function PreviousVotingCyclesCards({
  previousVotingCycles,
}: {
  previousVotingCycles: PreviousVotingCycle[];
}) {
  const router = useRouter();
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="border-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
        {previousVotingCycles.map(
          (previousCycle: PreviousVotingCycle, index) => (
            <React.Fragment key={index}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  router.push(
                    `/on-chain-governance/previous-voting-cycles/${previousCycle.votingCycles}`
                  );
                }}
              >
                <PreviousVotingCyclesCard previousCycle={previousCycle} />
              </div>
            </React.Fragment>
          )
        )}
      </div>
      {(previousVotingCycles === null || previousVotingCycles.length === 0) && (
        <div className="relative overflow-x-auto border-gray-200 dark:border-gray-700 pt-[80px] pb-[328px] text-center dark:text-gray-100 text-gray-900 font-semibold text-2xl whitespace-nowrap">
          {OnChainGovernanceTitles.noProposals}
        </div>
      )}
    </div>
  );
}

function PreviousVotingCyclesCard({
  previousCycle,
}: {
  previousCycle: PreviousVotingCycle;
}) {
  return (
    <div className={classNames("hover:bg-primary-50 dark:hover:bg-gray-600")}>
      <div className="group lg:hidden md:block hidden">
        <div className="grid grid-cols-7 border-b py-[14px] px-6">
          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.votingCycleTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                prefix="#"
                displayType="text"
                thousandSeparator
                value={previousCycle.votingCycles}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.startedTableTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousCycle.started}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.endedTableTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousCycle.ended}
            </div>
          </div>

          <div className="flex flex-col gap-y-1 items-end col-span-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.proposalsSubmittedTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.submittedProposals}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 items-end">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.cfpTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.cfp}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 items-end">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.dfipTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.dfip}
                decimalScale={0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="group md:hidden block hover:bg-primary-50 dark:hover:bg-gray-600">
        <div className="grid grid-cols-4 grid-rows-3 border-b py-5 px-6 gap-y-4">
          <div className="flex flex-col gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.votingCycleTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                prefix="#"
                displayType="text"
                thousandSeparator
                value={previousCycle.votingCycles}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 row-start-2 col-span-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.proposalsSubmittedTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.submittedProposals}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col row-start-2 gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.cfpTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.cfp}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col row-start-2 gap-y-1">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.dfipTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              <NumericFormat
                displayType="text"
                thousandSeparator
                value={previousCycle.dfip}
                decimalScale={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 row-start-3 col-span-2">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.startedTableTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousCycle.started}
            </div>
          </div>

          <div className="flex flex-col gap-y-1 row-start-3">
            <div className="text-xs text-gray-500">
              {OnChainGovernanceTitles.endedTableTitle}
            </div>
            <div className="text-gray-900 group-hover:text-primary-500">
              {previousCycle.ended}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
