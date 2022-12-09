import { Container } from "@components/commons/Container";
import { TextMiddleTruncate } from "@components/commons/text/TextMiddleTruncate";
import { DFI } from "@components/icons/assets/tokens/DFI";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { IoMdOpen } from "react-icons/io";
import { useState } from "react";
import { CheckIcon } from "../_components/CheckIcon";
import { CircularCheckIcon } from "../_components/CircularCheckIcon";
import { CopyToClipboardIcon } from "../_components/CopyToClipboardIcon";
import { ProgressBar } from "../_components/ProgressBar";
import { RejectedIcon } from "../_components/RejectedIcon";
import { VoteModal } from "../_components/VoteModal";
import { VotingResultBreakdown } from "../_components/VotingResultBreakdown";

enum DetailSectionStatusType {
  voting,
  accepted,
  rejected,
}

export default function ProposalDetailPage() {
  const mockProposalStatus = DetailSectionStatusType.voting;
  const mockPayoutAddress =
    "3432erthyhfujrgrterthyhqepojgfiboget784reedwfert534xD";
  const mockProposalId = "8Yv2DLTc8Yu8VV3ypC58V26wmRnJ7D6YuB";
  const [displayVoteModal, setDisplayVoteModal] = useState(false);
  return (
    <Container className="mt-[40px] md:mt-[44px]">
      <ProposalDetail
        payoutAddress={mockPayoutAddress}
        status={mockProposalStatus}
        onVoteButtonPress={(value) => setDisplayVoteModal(value)}
      />
      <VotingProgressSection />
      <VotingResultSection />
      {displayVoteModal && (
        <VoteModal
          proposalId={mockProposalId}
          onClose={() => setDisplayVoteModal(false)}
        />
      )}
    </Container>
  );
}

function ProposalDetail({
  payoutAddress,
  status,
  onVoteButtonPress,
}: {
  payoutAddress: string;
  status: DetailSectionStatusType;
  onVoteButtonPress: (value: boolean) => void;
}) {
  function onClickCopy(content: string) {
    navigator.clipboard.writeText(content);
  }
  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6">
      <div className="flex flex-col md:flex-row justify-between flex-wrap mb-6 md:mb-0">
        <span className="p-2 text-xs font-medium text-gray-900 bg-gray-100 border border-transparent rounded mb-2 inline-block w-fit">
          CFP PROPOSAL
        </span>
        {status !== DetailSectionStatusType.voting && (
          <DetailSectionStatusTag type={status} />
        )}
      </div>
      <div className="flex items-center mb-6 md:mb-8 lg:mb-10">
        <div className="text-gray-900 text-2xl font-semibold md:text-4xl mr-3">
          Name of proposal
        </div>
        <CircularCheckIcon />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div>
          <DetailSectionTitle label="Community links" />
          <div className="flex flex-col md:flex-row gap-5 lg:mb-1">
            <DetailSectionLink label="Github's Link" href="/" />
            <DetailSectionLink label="Reddit's Link" href="/" />
          </div>
        </div>
        <div className="lg:w-[202px]">
          <DetailSectionTitle label="Submitted" />
          <span className="text-gray-900 text-lg block">
            23/08/22 at 12:34:32
          </span>
        </div>
        <div className="lg:w-[202px]">
          <DetailSectionTitle label="Request DFI" />
          <div className="flex items-center">
            <span className="text-gray-900 text-lg block">2,000</span>
            <DFI className="text-xl ml-2" />
          </div>
        </div>
        <div className="lg:w-[202px]">
          <DetailSectionTitle label="Payout address" />
          <button
            className="flex items-center bg-blue-100 lg:py-1.5 py-2.5 px-5 md:px-[17.5px] lg:px-[10.5px] rounded w-fit"
            onClick={() => onClickCopy(payoutAddress)}
            type="button"
          >
            <TextMiddleTruncate
              text={payoutAddress}
              textLength={8}
              className="text-[#4A72DA] mr-3"
            />
            <CopyToClipboardIcon />
          </button>
        </div>
        <button
          className={classNames(
            { hidden: status !== DetailSectionStatusType.voting },
            "bg-primary-50 text-primary-500 rounded-sm text-sm font-medium py-2 px-18 self-auto md:self-start lg:self-end grow w-full md:w-[200px] lg:w-auto hover:bg-primary-100"
          )}
          type="button"
          onClick={() => onVoteButtonPress(true)}
        >
          VOTE
        </button>
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

function DetailSectionStatusTag({ type }: { type: DetailSectionStatusType }) {
  return (
    <div
      className={classNames(
        {
          "bg-green-100": type === DetailSectionStatusType.accepted,
          "bg-red-100": type === DetailSectionStatusType.rejected,
        },
        "py-2 px-3 rounded-[5px] flex items-center w-fit"
      )}
    >
      <span
        className={classNames(
          {
            "text-green-700": type === DetailSectionStatusType.accepted,
            "text-red-700": type === DetailSectionStatusType.rejected,
          },
          "text-sm font-medium lg:text-lg lg:font-semibold mr-2"
        )}
      >
        {type === DetailSectionStatusType.accepted
          ? "PROPOSAL ACCEPTED"
          : "PROPOSAL REJECTED"}
      </span>
      {type === DetailSectionStatusType.accepted ? (
        <CheckIcon />
      ) : (
        <RejectedIcon width={16} height={16} />
      )}
    </div>
  );
}

function VotingProgressSection() {
  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6 mt-2 lg:mt-4">
      <div className="flex flex-col lg:flex-row lg:gap-[146px] gap-6 md:gap-2 mb-6 md:mb-5 lg:mb-4">
        <VotingProgressSectionInfo
          label="Proposal current stage:"
          value="Voting"
        />
        <VotingProgressSectionInfo
          label="Time left:"
          value="08 days 12 hours 23 minutes"
        />
      </div>
      <ProgressBar
        votingProgress={{
          totalTime: new BigNumber(100),
          timeLeft: new BigNumber(100),
        }}
        submissionProgress={{
          totalTime: new BigNumber(100),
          timeLeft: new BigNumber(10),
        }}
        segment={2}
      />
      <div className="mt-8">
        <ProgressBar
          votingProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(100),
          }}
        />
      </div>
      <div className="mt-8">
        <ProgressBar
          votingProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(70),
          }}
          submissionProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(0),
          }}
          segment={2}
        />
      </div>
      <div className="mt-8">
        <ProgressBar
          votingProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(70),
          }}
        />
      </div>
      <div className="mt-8">
        <ProgressBar
          votingProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(0),
          }}
          submissionProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(0),
          }}
          segment={2}
        />
      </div>
      <div className="mt-8">
        <ProgressBar
          votingProgress={{
            totalTime: new BigNumber(100),
            timeLeft: new BigNumber(0),
          }}
        />
      </div>
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

function VotingResultSection() {
  return (
    <div className="border border-gray-200 rounded-lg py-6 px-5 md:px-6 mt-2 lg:mt-4 text-center">
      <span className="text-lg md:text-2xl font-semibold text-gray-900 mb-2 block">
        Proposal has been voted on
      </span>
      <span className="md:text-lg text-gray-600">
        This proposal has been accepted by the community
      </span>
      <div className="flex flex-col lg:flex-row justify-center mt-6 md:mt-5 lg:mt-8 gap-2 mb-6 md:mb-5">
        <span className="text-lg text-gray-500">Voting results:</span>
        <div className="flex gap-4 justify-center">
          <VotingResultPercentage value="78% Yes" customStyle="font-semibold" />
          <VotingResultPercentage value="6% Neutral" />
          <VotingResultPercentage value="16% No" />
        </div>
      </div>
      <VotingResultBreakdown
        yesPercent="78"
        neutralPercent="6"
        noPercent="16"
      />
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
