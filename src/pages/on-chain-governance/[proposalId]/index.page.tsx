import { Container } from "@components/commons/Container";
import { TextMiddleTruncate } from "@components/commons/text/TextMiddleTruncate";
import { DFI } from "@components/icons/assets/tokens/DFI";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { IoMdOpen } from "react-icons/io";
import { useState, useEffect } from "react";
import { getWhaleRpcClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import { useNetwork } from "@contexts/NetworkContext";
import { NumericFormat } from "react-number-format";
import { format, fromUnixTime } from "date-fns";
import { CheckIcon } from "../_components/CheckIcon";
import { CircularCheckIcon } from "../_components/CircularCheckIcon";
import { CopyToClipboardIcon } from "../_components/CopyToClipboardIcon";
import { ProgressBar } from "../_components/ProgressBar";
import { RejectedIcon } from "../_components/RejectedIcon";
import { VotingResultBreakdown } from "../_components/VotingResultBreakdown";
import { getDuration } from "../shared/durationHelper";
import { getVoteCount } from "../shared/getVoteCount";
import { getVotePercentage } from "../shared/getTotalVotes";

enum ProposalStatus {
  VOTING = "Voting",
  REJECTED = "Rejected",
  COMPLETED = "Completed",
}

export default function ProposalDetailPage({
  proposal,
  proposalVotes,
  currentBlockCount,
  proposalCreationMedianTime,
}) {
  const { yes, no, neutral } = getVoteCount(proposalVotes);
  const { percYes, percNo, percNeutral } = getVotePercentage(yes, no, neutral);

  return (
    <Container className="mt-[40px] md:mt-[44px]">
      <ProposalDetail
        proposal={proposal}
        proposalCreationMedianTime={proposalCreationMedianTime}
      />

      {proposal.status === ProposalStatus.VOTING ? (
        <VotingProgressSection
          percYes={percYes}
          percNo={percNo}
          percNeutral={percNeutral}
          currentBlockCount={currentBlockCount}
          proposal={proposal}
        />
      ) : (
        <VotingResultSection
          percYes={percYes}
          percNo={percNo}
          percNeutral={percNeutral}
          proposal={proposal}
        />
      )}
    </Container>
  );
}

function ProposalDetail({
  proposal,
  proposalCreationMedianTime,
}: {
  proposal: ProposalInfo;
  proposalCreationMedianTime: number;
}) {
  function onClickCopy(content: string) {
    navigator.clipboard.writeText(content);
  }

  let submittedTime = format(
    fromUnixTime(proposalCreationMedianTime),
    "dd/MM/yy HH:mm:ss"
  );
  submittedTime = submittedTime.replace(" ", " at ");
  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6">
      <div className="flex flex-col md:flex-row justify-between flex-wrap mb-6 md:mb-0">
        <span className="p-2 text-xs font-medium text-gray-900 bg-gray-100 border border-transparent rounded mb-2 inline-block w-fit">
          {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL
            ? "CFP PROPOSAL"
            : "DFIP PROPOSAL"}
        </span>
        {proposal.status !== ProposalStatus.VOTING && (
          <DetailSectionStatusTag type={proposal.status} />
        )}
      </div>
      <div className="flex items-center mb-6 md:mb-8 lg:mb-10">
        <div className="text-gray-900 text-2xl font-semibold md:text-4xl mr-3">
          {proposal.title}
        </div>
        <CircularCheckIcon />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div>
          <DetailSectionTitle label="Community links" />
          <div className="flex flex-col md:flex-row gap-5 lg:mb-1">
            <DetailSectionLink label="Github's Link" href={proposal.context} />
          </div>
        </div>
        <div className="lg:w-[202px]">
          <DetailSectionTitle label="Submitted" />
          <span className="text-gray-900 text-lg block">{submittedTime}</span>
        </div>
        {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL && (
          <>
            <div className="lg:w-[202px]">
              <DetailSectionTitle label="Request DFI" />
              <div className="flex items-center">
                <span className="text-gray-900 text-lg block">
                  <NumericFormat
                    displayType="text"
                    thousandSeparator
                    value={proposal.amount?.toString()}
                    decimalScale={2}
                  />
                </span>
                <DFI className="text-xl ml-2" />
              </div>
            </div>
            <div className="lg:w-[202px]">
              <DetailSectionTitle label="Payout address" />
              <button
                className="flex items-center bg-blue-100 lg:py-1.5 py-2.5 px-5 md:px-[17.5px] lg:px-[10.5px] rounded w-fit"
                onClick={() => onClickCopy(proposal.payoutAddress)}
                type="button"
              >
                <TextMiddleTruncate
                  text={proposal.payoutAddress}
                  textLength={8}
                  className="text-[#4A72DA] mr-3"
                />
                <CopyToClipboardIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DetailSectionTitle({ label }: { label: string }) {
  return (
    <span className="inline-block text-gray-500 text-sm mb-2 lg:mb-3 tracking-[0.04px]">
      {label}
    </span>
  );
}

function DetailSectionLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="flex items-center">
      <span className="text-lg text-[#4A72DA] mr-2 inline-block">{label}</span>
      <IoMdOpen size={24} className="text-[#4A72DA]" />
    </a>
  );
}

function DetailSectionStatusTag({ type }: { type: ProposalStatus }) {
  return (
    <div
      className={classNames(
        {
          "bg-green-100": type === ProposalStatus.COMPLETED,
          "bg-red-100": type === ProposalStatus.REJECTED,
        },
        "py-2 px-3 rounded-[5px] flex items-center w-fit"
      )}
    >
      <span
        className={classNames(
          {
            "text-green-700": type === ProposalStatus.COMPLETED,
            "text-red-700": type === ProposalStatus.REJECTED,
          },
          "text-sm font-medium lg:text-lg lg:font-semibold mr-2"
        )}
      >
        {type === ProposalStatus.COMPLETED
          ? "PROPOSAL ACCEPTED"
          : "PROPOSAL REJECTED"}
      </span>
      {type === ProposalStatus.COMPLETED ? (
        <CheckIcon />
      ) : (
        <RejectedIcon width={16} height={16} />
      )}
    </div>
  );
}

function VotingProgressSection({
  proposal,
  currentBlockCount,
  percYes,
  percNo,
  percNeutral,
}: {
  proposal: ProposalInfo;
  currentBlockCount: number;
  percYes: BigNumber;
  percNo: BigNumber;
  percNeutral: BigNumber;
}) {
  const { connection } = useNetwork();
  let blockSeconds = 30;
  switch (connection) {
    case "Playground":
      blockSeconds = 3;
      break;
    case "TestNet":
      blockSeconds = 3;
      break;
    case "MainNet":
    default:
      blockSeconds = 30;
  }

  const [timeLeft, setTimeLeft] = useState(
    (proposal.cycleEndHeight - currentBlockCount) * blockSeconds
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      window.location.reload();
    }
    return () => clearInterval(id);
  }, [timeLeft]);

  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6 mt-2 lg:mt-4">
      <div className="flex flex-col lg:flex-row lg:gap-[146px] gap-6 md:gap-2 mb-6 md:mb-5 lg:mb-4">
        <VotingProgressSectionInfo
          label="Proposal current stage:"
          value={
            timeLeft > proposal.votingPeriod * blockSeconds
              ? "Proposal submission & voting"
              : proposal?.status.toString()
          }
        />
        <VotingProgressSectionInfo
          label="Estimated Time left:"
          value={getDuration(timeLeft)}
        />
      </div>

      <ProgressBar
        votingProgress={{
          totalTime: new BigNumber(proposal.votingPeriod * blockSeconds),
          timeLeft: new BigNumber(
            timeLeft < proposal.votingPeriod * blockSeconds
              ? timeLeft
              : proposal.votingPeriod * blockSeconds
          ),
        }}
        submissionProgress={{
          totalTime: new BigNumber(
            (proposal.cycleEndHeight - proposal.votingPeriod) * blockSeconds
          ),
          timeLeft: new BigNumber(
            timeLeft > proposal.votingPeriod * blockSeconds ? timeLeft : 0
          ),
        }}
        segment={2}
      />
      <div className="flex flex-col lg:flex-row lg:mt-[38px] mb-5 mt-[46px] gap-4">
        <span className="text-lg text-gray-500">Voting Results:</span>
        <div className="flex gap-4 ">
          <VotingResultPercentage
            value={` ${percYes}% Yes`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percYes > percNo && percYes > percNeutral,
            })}
          />
          <VotingResultPercentage
            value={`${percNo}% No`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percNo > percYes && percNo > percNeutral,
            })}
          />
          <VotingResultPercentage
            value={`${percNeutral}% Neutral`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percNeutral > percYes && percNeutral > percNo,
            })}
          />
        </div>
      </div>
      {percYes.eq(BigNumber(0)) &&
      percNo.eq(BigNumber(0)) &&
      percNeutral.eq(BigNumber(0)) ? (
        <div className="">
          <VotingResultBreakdown
            yesPercent="0"
            neutralPercent="100"
            noPercent="0"
          />
        </div>
      ) : (
        <div className="">
          <VotingResultBreakdown
            yesPercent={percYes.toString()}
            neutralPercent={percNeutral.toString()}
            noPercent={percNo.toString()}
          />
        </div>
      )}
    </div>
  );
}

function VotingProgressSectionInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span className="text-lg text-gray-500">
      {`${label} `}
      <span className="text-lg text-gray-900 font-semibold block md:inline">
        {value}
      </span>
    </span>
  );
}

function VotingResultSection({
  proposal,
  percYes,
  percNo,
  percNeutral,
}: {
  proposal: ProposalInfo;
  percYes: BigNumber;
  percNo: BigNumber;
  percNeutral: BigNumber;
}) {
  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6 mt-2 lg:mt-4 text-center">
      <span className="text-lg md:text-2xl font-semibold text-gray-900 mb-2 block">
        Proposal has been voted on
      </span>
      <span className="md:text-lg text-gray-600">
        {proposal.status === ProposalStatus.COMPLETED ? (
          <div className="text-green-500">
            This proposal has been accepted by the community
          </div>
        ) : (
          <div className="text-red-500">
            This proposal has been rejected by the community
          </div>
        )}
      </span>
      <div className="flex flex-col lg:flex-row justify-center mt-6 md:mt-5 lg:mt-8 gap-2 mb-6 md:mb-5">
        <span className="text-lg text-gray-500">Voting results:</span>
        <div className="flex gap-4 justify-center">
          <VotingResultPercentage
            value={`${percYes}% Yes`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percYes > percNo && percYes > percNeutral,
            })}
          />
          <VotingResultPercentage
            value={`${percNo}% No`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percNo > percYes && percNo > percNeutral,
            })}
          />
          <VotingResultPercentage
            value={`${percNeutral}% Neutral`}
            customStyle={classNames("group-hover:text-primary-500", {
              "font-semibold": percNeutral > percYes && percNeutral > percNo,
            })}
          />
        </div>
      </div>
      {percYes.eq(BigNumber(0)) &&
      percNo.eq(BigNumber(0)) &&
      percNeutral.eq(BigNumber(0)) ? (
        <VotingResultBreakdown
          yesPercent="0"
          neutralPercent="100"
          noPercent="0"
        />
      ) : (
        <VotingResultBreakdown
          yesPercent={percYes.toString()}
          neutralPercent={percNeutral.toString()}
          noPercent={percNo.toString()}
        />
      )}
    </div>
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
    <span className={`text-lg text-gray-900 ${customStyle ?? ""}`}>
      {value}
    </span>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const proposalId = context.params?.proposalId?.toString().trim() as string;
  const rpc = getWhaleRpcClient(context);
  try {
    let proposal = await rpc.governance.getGovProposal(proposalId);
    proposal = JSON.parse(JSON.stringify(proposal));
    const proposalVotes = await rpc.governance.listGovProposalVotes(proposalId);
    const currentBlockCount = await rpc.blockchain.getBlockCount();
    const proposalCreationBlockInfo = await rpc.blockchain.getBlockStats(
      proposal.creationHeight
    );
    const proposalCreationMedianTime = proposalCreationBlockInfo.mediantime;

    console.log(proposal);
    console.log("---------------------------------");
    console.log("currentBlockHeight: ", currentBlockCount);

    return {
      props: {
        proposal,
        proposalVotes,
        currentBlockCount,
        proposalCreationMedianTime,
      },
    };
  } catch {
    return { notFound: true };
  }
}

export interface ProposalInfo {
  proposalId: string;
  title: string;
  context: string;
  contextHash: string;
  type: ProposalType;
  status: ProposalStatus;
  amount?: BigNumber;
  currentCycle: number;
  totalCycles: number;
  creationHeight: number;
  cycleEndHeight: number;
  proposalEndHeight: number;
  payoutAddress?: string;
  votingPeriod: number;
  approvalThreshold: string;
  quorum: string;
  votesPossible?: number;
  votesPresent?: number;
  votesPresentPct?: string;
  votesYes?: number;
  votesYesPct?: string;
  fee: number;
  options?: string[];
}

export enum ProposalType {
  COMMUNITY_FUND_PROPOSAL = "CommunityFundProposal",
  VOTE_OF_CONFIDENCE = "VoteOfConfidence",
}
