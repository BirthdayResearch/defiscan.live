import BigNumber from "bignumber.js";
import classNames from "classnames";

interface Progress {
  totalTime: BigNumber;
  timeLeft: BigNumber;
}

export function ProgressBar({
  votingProgress,
  submissionProgress,
  segment = 1,
}: {
  votingProgress: Progress;
  submissionProgress?: Progress;
  segment?: 1 | 2;
}) {
  const normalizedVotingTimeLeft = votingProgress.timeLeft
    .dividedBy(votingProgress.totalTime)
    .multipliedBy(100);
  const normalizedSubmissionTimeLeft = submissionProgress?.timeLeft
    .dividedBy(submissionProgress.totalTime)
    .multipliedBy(100);

  if (segment === 1) {
    return (
      <div className="flex gap-1 md:gap-2">
        <BarSegment width={normalizedVotingTimeLeft.toFixed(2)} />
      </div>
    );
  }

  return (
    <div className="flex gap-1 md:gap-2">
      <BarSegment
        width={normalizedVotingTimeLeft.toFixed(2)}
        hasMarker={
          normalizedSubmissionTimeLeft?.isZero() &&
          !normalizedVotingTimeLeft.isZero()
        }
      />
      <BarSegment
        width={normalizedSubmissionTimeLeft?.toFixed(2) ?? "0"}
        hasMarker={!normalizedSubmissionTimeLeft?.isZero()}
      />
    </div>
  );
}

function BarSegment({
  width,
  hasMarker = false,
}: {
  width: string;
  hasMarker?: boolean;
}) {
  return (
    <div className="h-3 rounded-[15px] bg-gray-200 w-full relative">
      <div
        style={{ width: `${width}%` }}
        className={classNames(
          "absolute top-0 left-0 h-3 rounded-[15px] bg-[#FD1BB7]"
        )}
      />
      <div
        style={{ left: `${width}%` }}
        className={classNames(
          "w-1 h-10 rounded bg-primary-200 absolute -top-[14px]",
          { hidden: !hasMarker }
        )}
      />
    </div>
  );
}
