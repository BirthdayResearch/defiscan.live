import { ReactElement } from "react";

/* Only apply evm border color if it's an EVM Token */
export function EVMLinearGradient({
  children,
  isEvmToken,
}: {
  children: ReactElement;
  isEvmToken?: boolean;
}): JSX.Element | null {
  if (isEvmToken) {
    return (
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 32"
          width={24}
          height={24}
          className="absolute"
        >
          <g clipPath="url(#clip0_15739_7349)">
            <path
              d="M31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16Z"
              stroke="url(#paint0_linear_15739_7349)"
              strokeWidth="2"
              className="h-6 w-6"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_15739_7349"
              x1="3.10258"
              y1="-6.35713"
              x2="41.0738"
              y2="2.72093"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#02CF92" />
              <stop offset="1" stopColor="#3B57CF" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    );
  }

  return children;
}
