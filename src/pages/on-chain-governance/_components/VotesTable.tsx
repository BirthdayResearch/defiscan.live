import { OverflowTable } from "@components/commons/OverflowTable";
import {
  ListVotesResult,
  VoteDecision,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { ProposalVotesResult } from "@defichain/whale-api-client/dist/api/governance";
import classNames from "classnames";

export function VotesTable({ votes }: { votes }): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title="Masternode" className="font-medium" />
        <OverflowTable.Head title="Vote" className="font-medium" />
      </OverflowTable.Header>
      {votes.map((vote) => (
        <VoteRow item={vote} key={vote.masternodeId} />
      ))}
    </OverflowTable>
  );
}

function getVotesStyle(vote) {
  if (vote === "NO") {
    return "md:bg-red-50 md:dark:bg-[#FF483D]/[0.15] text-red-600 dark:text-[#FB6C64]";
  }
  if (vote === "YES") {
    return "md:bg-green-50 md:dark:bg-[#21E529]/[0.15] text-green-600 dark:text-dark-green-600";
  }
  if (vote === "NEUTRAL") {
    return "md:bg-gray-50 md:dark:bg-dark-gray-200 text-gray-600 dark:text-dark-gray-600";
  }
}

function VoteRow({ item }: { item: ListVotesResult }): JSX.Element {
  const voteStyle = getVotesStyle(item.vote);
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <span className="text-gray-900 dark:text-dark-gray-900">
          {item.masternodeId}
        </span>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <span
          className={classNames(
            "capitalize py-1 px-3 rounded-[32px] text-sm font-medium",
            voteStyle
          )}
        >
          {VoteDecision[item.vote]}
        </span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}

export function VoteCards({
  votes,
}: {
  votes: ProposalVotesResult[];
}): JSX.Element {
  return (
    <div className="space-y-2">
      {votes.map((item) => (
        <div
          className="flex flex-row border-[0.5px] border-gray-300 dark:border-dark-gray-300 dark:bg-dark-gray-100 p-4 justify-between items-center space-x-3 rounded-xl"
          key={item.masternodeId}
        >
          <div className="flex flex-col scale-y-1 w-8/12">
            <div>
              <span className="text-xs text-gray-500 dark:text-dark-gray-500">
                Masternode
              </span>
            </div>
            <div className="break-all mt-1">
              <span className="text-sm text-gray-900 dark:text-dark-gray-900">
                {item.masternodeId}
              </span>
            </div>
          </div>
          <div>
            <span
              className={classNames(
                "capitalize py-1 px-3 rounded-[32px] text-sm font-medium text-right",
                getVotesStyle(item.vote)
              )}
            >
              {VoteDecision[item.vote]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
