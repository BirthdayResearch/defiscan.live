import { OverflowTable } from "@components/commons/OverflowTable";
import {
  ListVotesResult,
  VoteDecision,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import classNames from "classnames";

export function VotesTable({ votes }: { votes }): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title="Masternode" className="font-medium" />
        <OverflowTable.Head title="Result" className="font-medium" />
      </OverflowTable.Header>

      {votes.length > 0 ? (
        <>
          {votes.map((vote) => (
            <VoteRow item={vote} key={vote.masternodeId} />
          ))}
        </>
      ) : (
        <div className="my-5 mx-6">
          <span className="text-gray-900 dark:text-gray-100">
            No votes posted yet
          </span>
        </div>
      )}
    </OverflowTable>
  );
}

function getVotesStyle(vote) {
  if (vote === "NO") {
    return "bg-red-50 text-red-600";
  }
  if (vote === "YES") {
    return "bg-green-50 text-green-600";
  }
  if (vote === "NEUTRAL") {
    return "bg-gray-50 text-gray-600";
  }
}

function VoteRow({ item }: { item: ListVotesResult }): JSX.Element {
  const voteStyle = getVotesStyle(item.vote);
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <span className="text-gray-900 dark:text-gray-100">
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
  votes: ListVotesResult[];
}): JSX.Element {
  return (
    <div className="space-y-2">
      {votes.map((item) => (
        <div
          className="flex flex-row border-[0.5px] border-gray-300 p-4 justify-between items-center space-x-3 rounded-xl"
          key={item.masternodeId}
        >
          <div className="flex flex-col scale-y-1 w-8/12">
            <div>
              <span className="text-xs text-gray-500 dark:text-dark-gray-500">
                Masternode
              </span>
            </div>
            <div className="break-all mt-1">
              <span className="text-sm text-gray-900 dark:text-gray-100">
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