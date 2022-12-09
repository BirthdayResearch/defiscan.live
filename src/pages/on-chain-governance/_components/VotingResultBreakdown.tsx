export function VotingResultBreakdown({
  yesPercent,
  neutralPercent,
  noPercent,
}: {
  yesPercent: string;
  neutralPercent: string;
  noPercent: string;
}) {
  return (
    <div className="flex gap-1 md:gap-2">
      <BarSegment barWidth={yesPercent} barColor="bg-green-500" />
      <BarSegment barWidth={neutralPercent} barColor="bg-gray-200" />
      <BarSegment barWidth={noPercent} barColor="bg-red-500" />
    </div>
  );
}

function BarSegment({
  barWidth,
  barColor,
}: {
  barWidth: string;
  barColor: string;
}) {
  return (
    <div
      className={`h-3 rounded-[15px] relative ${barColor}`}
      style={{ width: `${barWidth}%` }}
    />
  );
}
