import BigNumber from "bignumber.js";
import classNames from "classnames";

export function ProgressBar({
  totalTime,
  timeLeft,
}: {
  totalTime: BigNumber;
  timeLeft: BigNumber;
}) {
  const normalizedTimeLeft = timeLeft.dividedBy(totalTime).multipliedBy(100);
  return (
    <div className="h-3 rounded-[15px] bg-gray-200 w-full relative">
      <div
        style={{ width: `${normalizedTimeLeft.toFixed(2)}%` }}
        className={classNames(
          "absolute top-0 left-0 h-3 rounded-[15px] bg-[#FD1BB7]"
        )}
      />
      <div
        style={{ left: `${normalizedTimeLeft.toFixed(2)}%` }}
        className="w-1 h-10 rounded bg-primary-200 absolute -top-[14px]"
      />
    </div>
  );
}
