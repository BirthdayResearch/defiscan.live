import randomColor from "randomcolor";
import { SVGProps } from "react";

export function _Default(
  symbol: string
): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  function TokenDefaultSymbol(props: SVGProps<SVGSVGElement>): JSX.Element {
    const bg = randomColor({
      luminosity: "bright",
      format: "rgba",
      seed: symbol,
      alpha: 0.2,
    });
    const text = randomColor({
      luminosity: "dark",
      format: "rgba",
      seed: symbol,
      alpha: 100,
    });
    const first = symbol?.substring(0, 1);

    return (
      <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
        <path
          fill={bg}
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z"
        />
        <text
          dominantBaseline="central"
          fill={text}
          fontSize={16}
          fontWeight="bolder"
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {first}
        </text>
      </svg>
    );
  }

  return TokenDefaultSymbol;
}
