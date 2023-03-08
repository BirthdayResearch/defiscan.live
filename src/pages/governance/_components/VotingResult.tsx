import React, { Dispatch, SetStateAction } from "react";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { VoteDecision } from "@defichain/jellyfish-api-core/dist/category/governance";
import {
  GovernanceProposal,
  GovernanceProposalStatus,
} from "@defichain/whale-api-client/dist/api/governance";
import { CgSpinner } from "react-icons/cg";
import { CopyButton } from "@components/commons/CopyButton";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
import { getVotePercentage } from "../shared/getTotalVotes";
import { EditVoteIcon } from "./EditVoteIcon";
import { CircularCheckIcon } from "./CircularCheckIcon";
import { CircularCrossIcon } from "./CircularCrossIcon";
import { VoteCount } from "../shared/getVoteCount";

// For desktop, the votepopover has been disabled as Min. required votes
// cannot be calculated as of now as the blockchain does not return this
// The corresponding mobile screen for proposals overview also hides the Min. required votes
// section for consistency.
// export function VotePopover(proposal) {
//   const votes = proposal.votes;
//   const total = new BigNumber(votes.neutral + votes.yes + votes.no);
//   const { percYes } = getVotePercentage(votes.yes, votes.no, votes.neutral);
//   const minVotes = getMinVotes(proposal.proposal);
//   return (
//     <>
//       <div className="p-3 shadow-md rounded w-96 text-sm text-gray-500 dark:text-dark-gray-500 bg-gray-50 dark:bg-gray-700">
//         <div className="p-2 gap-y-4 grid">
//           <div className="flex justify-between">
//             <div className="inline">Neutral votes</div>
//             <div className="inline">
//               <NumericFormat
//                 value={votes.neutral}
//                 fixedDecimalScale
//                 thousandSeparator=","
//                 displayType="text"
//                 className="md:text-base text-sm text-gray-600 dark:text-dark-gray-600 grow text-end"
//               />
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <div className="inline">Total votes</div>
//             <div className="inline">
//               <NumericFormat
//                 value={total.toNumber()}
//                 fixedDecimalScale
//                 thousandSeparator=","
//                 displayType="text"
//                 className="md:text-base text-sm text-gray-600 dark:text-dark-gray-600 grow text-end"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="m-2 border-t-[0.5px] dark:border-dark-gray-300" />

//         <div className="p-3 gap-y-4 grid">
//           <LabelWithInfoTooltipAndChecks
//             labelTitle="Min. required approval rate"
//             value={
//               new BigNumber(
//                 proposal.proposal.approvalThreshold.replace("%", "")
//               )
//             }
//             comparatorValue={percYes}
//             proposalStatus={proposal.proposal.status}
//             comparingMinimumValue
//             suffix="%"
//             decimalPlace={2}
//           />

//           <LabelWithInfoTooltipAndChecks
//             labelTitle="Min. required votes"
//             value={new BigNumber(minVotes)}
//             comparatorValue={total}
//             proposalStatus={proposal.proposal.status}
//             comparingMinimumValue
//             decimalPlace={0}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

export function VotingResultMobile({
  voteCounts,
  proposal,
}: {
  voteCounts: VoteCount;
  proposal: GovernanceProposal;
}) {
  // const minVotes = getMinVotes(proposal);
  const { percYes, percNo } = getVotePercentage(
    voteCounts.yes,
    voteCounts.no,
    voteCounts.neutral
  );
  // const total = new BigNumber(voteCounts.yes)
  //   .plus(voteCounts.no)
  //   .plus(voteCounts.neutral);
  return (
    <div className="w-full">
      <div>
        <div
          className={classNames("flex flex-col", {
            "mt-5": proposal.status === GovernanceProposalStatus.VOTING,
          })}
        >
          <div className="mb-[11px] pb-[22px] w-full border-b-[0.5px] dark:border-dark-gray-300">
            <div className="flex flex-col w-full gap-y-[10px]">
              <Progress
                yesValue={percYes.toNumber()}
                noValue={percNo.toNumber()}
                approvalThreshold={Number(
                  proposal.approvalThreshold.replace("%", "")
                )}
                containerClass="bg-gray-100 dark:bg-dark-gray-200"
              />
              <div className="flex flex-row">
                <div className="flex flex-col grow">
                  <span
                    className={classNames(
                      percYes > percNo
                        ? "text-green-600 dark:text-[#21E529] font-semibold"
                        : "text-gray-900 dark:text-dark-gray-900"
                    )}
                  >
                    {percYes.toFixed(2)}%
                  </span>
                  <NumericFormat
                    value={voteCounts.yes}
                    fixedDecimalScale
                    thousandSeparator=","
                    displayType="text"
                    suffix=" votes"
                    className="text-xs text-gray-600 dark:text-dark-gray-600"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={classNames(
                      "grow text-right",
                      percNo > percYes
                        ? "text-red-600 dark:text-[#FF483D] font-semibold"
                        : "text-gray-900 dark:text-dark-gray-900"
                    )}
                  >
                    {percNo.toFixed(2)}%
                  </span>

                  <NumericFormat
                    value={voteCounts.no}
                    fixedDecimalScale
                    thousandSeparator=","
                    displayType="text"
                    suffix=" votes"
                    className="text-xs text-gray-600 dark:text-dark-gray-600 text-right"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col mt-5">
              <LabelWithInfoTooltipAndChecks
                labelTitle="Neutral votes"
                value={new BigNumber(voteCounts.neutral)}
                // toolTipDesc="Included as part of the total votes submitted, excluded from min. approval." // TODO: uncomment when blockchain fixes neutral votes as no bug
                decimalPlace={0}
              />
              <div className="flex flex-col mt-4">
                <LabelWithInfoTooltipAndChecks
                  labelTitle="Total votes"
                  value={total}
                  toolTipDesc="Total number of votes submitted on chain."
                  suffix=" votes"
                  decimalPlace={0}
                />
              </div>
            </div> */}
          </div>

          {/* <div className="lg:w-full md:w-1/2 w-full md:pl-8 lg:pl-0 lg:border-l-0 md:border-l-[0.5px] dark:border-dark-gray-300">
            <div className="flex flex-col gap-y-4">
              <LabelWithInfoTooltipAndChecks
                labelTitle="Min. required approval rate"
                value={
                  new BigNumber(proposal.approvalThreshold.replace("%", ""))
                }
                comparatorValue={percYes}
                proposalStatus={proposal.status}
                comparingMinimumValue
                suffix="%"
                toolTipDesc="The percentage of required “yes” votes for proposal to be considered accepted."
                decimalPlace={2}
              />

              <LabelWithInfoTooltipAndChecks
                labelTitle="Min. required votes"
                value={new BigNumber(minVotes)}
                comparatorValue={new BigNumber(total)}
                proposalStatus={proposal.status}
                comparingMinimumValue
                toolTipDesc="Votes needed to surpass the minimum required votes for proposal to be considered accepted."
                decimalPlace={0}
              />
            </div>

            <div className="pt-6 border-b-[0.5px] dark:border-dark-gray-300" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export function VotingResult({
  voteCounts,
  status,
  onSubmitVote,
  voteCommand,
  userSelectedVote,
  setIsChangeVoteClicked,
  isLoading,
  proposal,
}: {
  voteCounts: VoteCount;
  status: GovernanceProposalStatus;
  onSubmitVote: () => void;
  voteCommand: string;
  userSelectedVote: VoteDecision | undefined;
  setIsChangeVoteClicked: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  proposal: GovernanceProposal;
}) {
  const minVotes = getMinVotes(proposal);
  const { percYes, percNo } = getVotePercentage(
    voteCounts.yes,
    voteCounts.no,
    voteCounts.neutral
  );
  const total = new BigNumber(voteCounts.yes)
    .plus(voteCounts.no)
    .plus(voteCounts.neutral);
  return (
    <div
      className={classNames(
        "border border-gray-200 dark:border-dark-gray-200 rounded-lg pb-6 dark:bg-dark-gray-100",
        {
          "pt-6": status === GovernanceProposalStatus.VOTING,
        }
      )}
    >
      <div>
        {status === GovernanceProposalStatus.COMPLETED && (
          <div className="bg-green-600 dark:bg-[#21E529] py-3 rounded-t-lg w-full text-center mb-6">
            <span className="text-lg text-white dark:text-black font-semibold">
              Approved
            </span>
          </div>
        )}
        {status === GovernanceProposalStatus.REJECTED && (
          <div className="bg-red-600 dark:bg-[#FF483D] py-3 rounded-t-lg w-full text-center mb-6">
            <span className="text-lg text-white dark:text-black font-semibold">
              Rejected
            </span>
          </div>
        )}
        <div className="px-6">
          <span
            className={classNames(
              "font-semibold text-xl text-gray-900 dark:text-dark-gray-900"
            )}
          >
            {status === GovernanceProposalStatus.VOTING && "Current votes"}
          </span>

          <div
            className={classNames("flex flex-col lg:flex-col md:flex-row", {
              "mt-5": proposal.status === GovernanceProposalStatus.VOTING,
            })}
          >
            <div
              className={classNames(
                "mb-[22px] lg:pb-[22px] lg:pr-0 md:pr-8 md:pb-0 pb-[22px] lg:w-full w-full md:w-1/2 lg:border-b-[0.5px] md:border-b-0 border-b-[0.5px] dark:border-dark-gray-300"
              )}
            >
              <div className="flex flex-col w-full gap-y-[10px]">
                <div className="flex flex-row">
                  <span className="md:text-base text-sm font-semibold text-gray-900 dark:text-dark-gray-900 grow">
                    Yes
                  </span>
                  <span className="md:text-base text-sm font-semibold text-gray-900 dark:text-dark-gray-900">
                    No
                  </span>
                </div>

                <Progress
                  yesValue={percYes.toNumber()}
                  noValue={percNo.toNumber()}
                  approvalThreshold={Number(
                    proposal.approvalThreshold.replace("%", "")
                  )}
                  containerClass="bg-gray-100 dark:bg-dark-gray-200"
                />
                <div className="flex flex-row">
                  <div className="flex flex-col grow">
                    <span
                      className={classNames(
                        percYes > percNo
                          ? "text-green-600 dark:text-[#21E529] font-semibold"
                          : "text-gray-900 dark:text-dark-gray-900"
                      )}
                    >
                      {percYes.toFixed(2)}%
                    </span>
                    <NumericFormat
                      value={voteCounts.yes}
                      fixedDecimalScale
                      thousandSeparator=","
                      displayType="text"
                      suffix=" votes"
                      className="text-xs text-gray-600 dark:text-dark-gray-600"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={classNames(
                        "grow text-right",
                        percNo > percYes
                          ? "text-red-600 dark:text-[#FF483D] font-semibold"
                          : "text-gray-900 dark:text-dark-gray-900"
                      )}
                    >
                      {percNo.toFixed(2)}%
                    </span>

                    <NumericFormat
                      value={voteCounts.no}
                      fixedDecimalScale
                      thousandSeparator=","
                      displayType="text"
                      suffix=" votes"
                      className="text-xs text-gray-600 dark:text-dark-gray-600 text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-5">
                <LabelWithInfoTooltipAndChecks
                  labelTitle="Neutral votes"
                  value={new BigNumber(voteCounts.neutral)}
                  // toolTipDesc="Included as part of the total votes submitted, excluded from min. approval." // TODO: uncomment when blockchain fixes neutral votes as no bug
                  decimalPlace={0}
                />
                <div className="flex flex-col mt-4">
                  <LabelWithInfoTooltipAndChecks
                    labelTitle="Total votes"
                    value={total}
                    toolTipDesc="Total number of votes submitted on chain."
                    suffix=" votes"
                    decimalPlace={0}
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-full md:w-1/2 w-full md:pl-8 lg:pl-0 lg:border-l-0 md:border-l-[0.5px] dark:border-dark-gray-300">
              {/* show Details header and approval rate in 2nd col when not voting for tablet view */}
              {proposal.status !== GovernanceProposalStatus.VOTING && (
                <>
                  <div
                    className={classNames(
                      "lg:hidden md:flex hidden text-sm font-semibold mb-3 dark:text-dark-gray-900"
                    )}
                  >
                    Details
                  </div>
                </>
              )}

              <div className="flex flex-col gap-y-4">
                <LabelWithInfoTooltipAndChecks
                  labelTitle="Min. required approval rate"
                  value={
                    new BigNumber(proposal.approvalThreshold.replace("%", ""))
                  }
                  comparatorValue={percYes}
                  proposalStatus={proposal.status}
                  comparingMinimumValue
                  suffix="%"
                  toolTipDesc="The percentage of required “yes” votes for proposal to be considered accepted."
                  decimalPlace={2}
                />

                <LabelWithInfoTooltipAndChecks
                  labelTitle="Min. required votes"
                  value={new BigNumber(minVotes)}
                  comparatorValue={new BigNumber(total)}
                  proposalStatus={proposal.status}
                  comparingMinimumValue
                  toolTipDesc="Votes needed to surpass the minimum required votes for proposal to be considered accepted."
                  decimalPlace={0}
                />
              </div>

              {status === GovernanceProposalStatus.VOTING && (
                <>
                  {voteCommand === "" ? (
                    <div className="lg:mt-12 md:mt-7 mt-12">
                      <button
                        type="button"
                        onClick={() => {
                          onSubmitVote();
                        }}
                        className={classNames(
                          "w-full py-4 rounded font-medium text-base text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 mb-2"
                        )}
                      >
                        SUBMIT VOTE
                      </button>
                      <span className="text-xs lg:text-center text-center flex text-gray-600 dark:text-dark-gray-600">
                        Submitting your vote will generate a defi-cli command
                        that needs to be used to record your vote on-chain
                      </span>
                    </div>
                  ) : (
                    <div className="w-full border-t-[0.5px] dark:border-dark-gray-300 mt-5 pt-6">
                      <div className="flex flex-row items-center ">
                        {isLoading ? (
                          <div className="grow">
                            <span className="text-gray-500 dark:text-dark-gray-500">
                              Generating vote ID
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-row grow items-center">
                            {userSelectedVote !== VoteDecision.NEUTRAL && (
                              <div className="mr-[10px]">
                                {userSelectedVote === VoteDecision.NO && (
                                  <CircularCrossIcon
                                    width={20}
                                    height={20}
                                    className="fill-red-600 dark:fill-[#FF483D]"
                                  />
                                )}
                                {userSelectedVote === VoteDecision.YES && (
                                  <CircularCheckIcon
                                    width={20}
                                    height={20}
                                    className="fill-green-600 dark:fill-dark-green-600"
                                  />
                                )}
                              </div>
                            )}
                            <div>
                              <span className="text-gray-900 dark:text-dark-gray-900 font-medium">
                                You have voted
                                <span className="capitalize">
                                  &nbsp;{userSelectedVote}
                                </span>
                              </span>
                            </div>
                          </div>
                        )}

                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() => {
                            setIsChangeVoteClicked(isLoading);
                            onSubmitVote();
                          }}
                        >
                          <div
                            className={classNames(
                              "flex flex-row border border-gray-200 dark:border-dark-gray-200 rounded-sm p-2 gap-x-[5px] items-center hover:border-primary-200 hover:dark:border-dark-primary-200",
                              {
                                "hover:border-gray-100 border-gray-100 hover:dark:border-dark-gray-100 dark:border-dark-gray-100":
                                  isLoading,
                              }
                            )}
                          >
                            <EditVoteIcon
                              className={
                                isLoading
                                  ? "fill-gray-200 dark:fill-dark-gray-200"
                                  : "fill-primary-500 dark:fill-dark-primary-500"
                              }
                            />
                            <span
                              className={classNames(
                                "text-primary-500 text-sm font-medium whitespace-nowrap",
                                {
                                  "text-gray-300 dark:text-dark-gray-300":
                                    isLoading,
                                }
                              )}
                            >
                              EDIT
                            </span>
                          </div>
                        </button>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-dark-gray-300 px-4 py-[22px] mt-4">
                        {isLoading ? (
                          <div className="flex justify-center">
                            <CgSpinner
                              size={16}
                              className="animate-spin text-blue-500 dark:text-dark-blue-500"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row gap-x-[18px]">
                            <div className="break-all line-clamp-1 text-gray-900 dark:text-dark-gray-900">
                              {voteCommand}
                            </div>
                            <CopyButton
                              withCopyText
                              buttonClass="border-0"
                              iconsClass="text-primary-500 dark:text-dark-primary-500 self-center mr-[6px] w-[18px] h-[18px]"
                              content={voteCommand}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Progress({
  yesValue,
  noValue,
  containerClass,
  approvalThreshold,
}: {
  yesValue: number;
  noValue: number;
  approvalThreshold: number;
  containerClass: string;
}) {
  return (
    <div className="relative">
      <div
        style={{ width: `${approvalThreshold}%` }}
        className="absolute left-0 -top-1.5 h-6 border-r border-gray-200 dark:border-dark-gray-400"
      />
      <div
        className={classNames(
          "h-3 rounded-[54px] w-full bg-gray-200 dark:bg-dark-gray-200 relative overflow-hidden",
          containerClass
        )}
      >
        <div
          style={{ width: `${yesValue}%` }}
          className="absolute top-0 left-0 h-3 bg-green-600 dark:bg-[#21E529]"
        />
        <div
          style={{ width: `${noValue}%` }}
          className="absolute top-0 right-0 h-3 bg-red-600 dark:bg-[#FF483D]"
        />
      </div>
    </div>
  );
}

function LabelWithInfoTooltipAndChecks({
  labelTitle,
  value,
  comparatorValue,
  comparingMinimumValue = false,
  proposalStatus,
  suffix,
  toolTipDesc,
  decimalPlace,
}: {
  labelTitle: string;
  value: BigNumber;
  comparatorValue?: BigNumber;
  comparingMinimumValue?: boolean;
  proposalStatus?: GovernanceProposalStatus;
  suffix?: string;
  toolTipDesc?: string;
  decimalPlace: number;
}) {
  if (!comparingMinimumValue) {
    return (
      <div className="flex items-center">
        <div className="text-gray-500 dark:text-dark-gray-500 text-sm">
          {labelTitle}
        </div>
        {toolTipDesc && (
          <InfoHoverPopover
            className="ml-1"
            description={toolTipDesc}
            placement="top"
          />
        )}
        <NumericFormat
          value={value.toString()}
          fixedDecimalScale
          thousandSeparator=","
          displayType="text"
          className="md:text-base text-sm text-gray-600 dark:text-dark-gray-600 grow text-end"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-end">
      <div className="inline grow">
        <span className="text-gray-500 dark:text-dark-gray-500 text-sm">
          {labelTitle}
        </span>
        <button type="button" className="ml-1 align-sub">
          {toolTipDesc && (
            <InfoHoverPopover description={toolTipDesc} placement="top" />
          )}
        </button>
      </div>

      <div className="flex items-center">
        <NumericFormat
          value={value.toFixed(decimalPlace)}
          fixedDecimalScale
          thousandSeparator=","
          displayType="text"
          suffix={suffix}
          className="md:text-base text-sm font-medium text-gray-900 dark:text-dark-gray-900 grow text-end"
        />

        <div className="ml-[5.33px]">
          {proposalStatus === GovernanceProposalStatus.VOTING ? (
            <CircularCheckIcon
              width={14}
              height={14}
              className={classNames(
                comparatorValue!.isGreaterThanOrEqualTo(value)
                  ? "fill-green-600 dark:fill-dark-green-500"
                  : "fill-gray-300 dark:fill-dark-gray-400"
              )}
            />
          ) : (
            <>
              {comparatorValue!.isGreaterThanOrEqualTo(value) ? (
                <CircularCheckIcon
                  width={14}
                  height={14}
                  className={classNames(
                    "fill-green-600 dark:fill-dark-green-500"
                  )}
                />
              ) : (
                <CircularCrossIcon className="fill-red-600 dark:fill-[#FF483D]" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getMinVotes(proposal: GovernanceProposal) {
  const quorum = Number(proposal.quorum.replace("%", ""));
  const votesPossible = proposal.votesPossible ?? 0;
  return Math.ceil((quorum / 100) * votesPossible);
}
