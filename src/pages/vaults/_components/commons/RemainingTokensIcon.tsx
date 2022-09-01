interface RemainingTokensIconProps {
  tokensCount: number;
}

export function RemainingTokensIcon({
  tokensCount,
}: RemainingTokensIconProps): JSX.Element {
  const fontSize = 16 - tokensCount.toString().length;

  return (
    <svg width="1em" height="1em" className="h-6 w-6" viewBox="0 0 32 32">
      <circle cx={16} cy={16} r={16} fill="#d3d4d4" />
      <text fontSize={fontSize} fontWeight="700" fill="#2b2b2b" dy=".05em">
        {(() => {
          if (tokensCount > 99) {
            return (
              <tspan
                x="50%"
                y="50%"
                fontSize="22"
                dy=".1em"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                ∞
              </tspan>
            );
          }

          return (
            <tspan
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              +{tokensCount}
            </tspan>
          );
        })()}
      </text>
    </svg>
  );
}
