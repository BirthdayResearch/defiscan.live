import { SVGProps } from "react";

export function _TokenDefault(
  symbol: string
): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  // TODO (@joeldavidw): Need to properly determine whether a token is LPS or DAT.

  const symbolParts = symbol.split("-");

  function TokenDefaultSymbol(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 0C10.7445 0 0 10.7445 0 24C0 37.2555 10.7445 48 24 48C37.257 48 48 37.2555 48 24C48 10.7445 37.257 0 24 0Z"
          fill="#0E0A0D"
        />
        <path
          d="M0.25 24C0.25 10.8826 10.8826 0.25 24 0.25C37.1189 0.25 47.75 10.8826 47.75 24C47.75 37.1174 37.1189 47.75 24 47.75C10.8826 47.75 0.25 37.1174 0.25 24Z"
          stroke="url(#paint0_linear_58_4012)"
          strokeOpacity="0.9"
          strokeWidth="0.9"
        />
        <defs>
          <linearGradient
            id="paint0_linear_58_4012"
            x1="0"
            y1="24"
            x2="48"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF01AF" />
            <stop offset="0.0703125" stopColor="#FB01AF" />
            <stop offset="0.169271" stopColor="#EF01B1" />
            <stop offset="0.289062" stopColor="#DB02B5" />
            <stop offset="0.408854" stopColor="#C004BA" />
            <stop offset="0.528646" stopColor="#9D06C0" />
            <stop offset="0.648438" stopColor="#7208C8" />
            <stop offset="0.815104" stopColor="#3F0BD1" />
            <stop offset="1" stopColor="#0E0EDB" />
          </linearGradient>
        </defs>
        <text
          className="pointer-events-none"
          dominantBaseline="central"
          fill="white"
          fontSize={symbolParts[0].length < 5 ? "11" : "9.5"}
          fontWeight="700"
          fontFamily='"IBM Plex Sans Condensed", sans-serif'
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {symbolParts[0]}
        </text>
      </svg>
    );
  }

  function PoolPairTokenSymbol(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
      <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
        <path
          fill="#000000"
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z"
        />
        <text
          className="pointer-events-none"
          fill="white"
          fontSize="9"
          fontWeight="700"
          fontFamily='"IBM Plex Sans Condensed", sans-serif'
          y="50%"
        >
          <tspan
            x="50%"
            y={symbolParts[0].length <= symbolParts[1].length ? "48%" : ""}
            textAnchor="middle"
          >
            {symbolParts[0]}
          </tspan>
          <tspan x="50%" dy="9" textAnchor="middle">
            {symbolParts[1]}
          </tspan>
        </text>
      </svg>
    );
  }

  if (symbolParts.length === 2) {
    return PoolPairTokenSymbol;
  }

  return TokenDefaultSymbol;
}
