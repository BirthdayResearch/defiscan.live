import BigNumber from "bignumber.js";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { ProposalStatus } from "@defichain/jellyfish-api-core/dist/category/governance";
import { getVotePercentage } from "../shared/getTotalVotes";

export function VotingDetail({
  yes,
  no,
  neutral,
  status,
}: {
  yes: number;
  no: number;
  neutral: number;
  status: ProposalStatus;
}) {
  const { percYes, percNo } = getVotePercentage(yes, no, neutral);
  const total = new BigNumber(yes).plus(no).plus(neutral);
  return (
    <div
      className={classNames("border border-gray-200 rounded-lg pb-6", {
        "pt-6": status === ProposalStatus.VOTING,
      })}
    >
      <div>
        {status === ProposalStatus.COMPLETED && (
          <div className="bg-green-50 py-3 rounded-t-lg w-full text-center mb-6">
            <span className="text-lg text-green-600 font-medium">
              Proposal approved
            </span>
          </div>
        )}
        {status === ProposalStatus.REJECTED && (
          <div className="bg-red-50 py-3 rounded-t-lg w-full text-center mb-6">
            <span className="text-lg text-red-600 font-medium">
              Proposal rejected
            </span>
          </div>
        )}
        <div className="px-6">
          <span className="font-semibold text-base md:text-xl text-gray-900 dark:text-gray-100">
            {status === ProposalStatus.VOTING
              ? "Current results"
              : "Voting results"}
          </span>
          <div className="flex flex-row mt-2 spca-x-2">
            <div>
              <span className="text-gray-900 dark:text-gray-100 text-sm">
                Total votes:&nbsp;
              </span>
              <NumericFormat
                value={total.toFixed(0)}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
                className="font-semibold text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
            <div className="ml-2">
              <span className="text-gray-900 dark:text-gray-100 text-sm">
                Neutral votes:&nbsp;
              </span>
              <NumericFormat
                value={neutral}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
                className="font-semibold text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
          </div>
          <div className="mt-8 mb-6">
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="space-x-2">
                <span className="text-base font-semibold text-gray-600 dark:text-gray-100">
                  Yes
                </span>
                {total.isGreaterThan(0) && (
                  <span className="font-semibold text-green-600">
                    ({percYes.toFixed(1)}%)
                  </span>
                )}
              </div>
              <NumericFormat
                value={yes}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
                suffix=" votes"
                className="text-xs text-gray-600 dark:text-gray-100"
              />
            </div>
            <Progress
              value={percYes.toNumber()}
              containerClass="bg-green-50"
              contentClass="bg-green-600"
            />

            <div className="flex flex-row justify-between items-center mt-4 mb-2">
              <div className="space-x-2">
                <span className="text-base font-semibold text-gray-600 dark:text-gray-100">
                  No
                </span>
                {total.isGreaterThan(0) && (
                  <span className="font-semibold text-red-600">
                    ({percNo.toFixed(1)}%)
                  </span>
                )}
              </div>
              <NumericFormat
                value={no}
                fixedDecimalScale
                thousandSeparator=","
                displayType="text"
                suffix=" votes"
                className="text-xs text-gray-600 dark:text-gray-100"
              />
            </div>
            <Progress
              value={percNo.toNumber()}
              containerClass="bg-red-50"
              contentClass="bg-red-600"
            />
          </div>
          {status === ProposalStatus.VOTING && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => {}}
                className={classNames(
                  "w-full py-4 rounded-sm font-medium text-base text-primary-500 bg-primary-25 hover:bg-primary-50 mb-2"
                )}
              >
                SUBMIT VOTE
              </button>
              <span className="text-xs text-center flex text-gray-600">
                Submitting your vote will generate a defi-cli command that needs
                to be used to record your vote on-chain
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Progress({
  value,
  containerClass,
  contentClass,
}: {
  value: number;
  containerClass: string;
  contentClass: string;
}) {
  return (
    <div
      className={classNames(
        "h-2 rounded-[54px] w-full bg-gray-200 relative overflow-hidden",
        containerClass
      )}
    >
      <div
        style={{ width: `${value}%` }}
        className={classNames(
          "absolute top-0 left-0 h-2 bg-primary-500",
          contentClass
        )}
      />
    </div>
  );
}
