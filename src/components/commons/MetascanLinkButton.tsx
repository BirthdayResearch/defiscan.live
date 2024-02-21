import React from "react";
import classNames from "classnames";
import { useTheme } from "@contexts/ThemeContext";

interface ViewOnMetascanButtonProps {
  href?: string;
  customStyle?: string;
}

export function MetascanLinkButton({
  href,
  customStyle,
}: ViewOnMetascanButtonProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="metascan-link-button"
    >
      <button
        type="button"
        data-testid="view-on-metachain-button"
        className={classNames(
          "border-[0.5px] rounded-[30px] border-gray-200 dark:border-gray-700",
          "flex items-center gap-2",
          "py-1.5 px-2 text-sm font-medium text-gray-700 dark:text-gray-300 tracking-[0.0025em]",
          customStyle,
        )}
      >
        <DFILogo />
        View on Metachain
      </button>
    </a>
  );
}

function DFILogo() {
  const { theme } = useTheme();
  const fill = theme === "dark" ? "#2F0421" : "#FFF0FA";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6625 17.5908V6.40917C16.0696 7.12833 17.8292 9.3625 17.8292 12C17.8292 14.6375 16.0696 16.8721 13.6625 17.5908ZM11.9958 4.5V10.8212L11.0438 9.86917L10.9221 7.49292L11.915 4.50417C11.2783 4.51083 10.6633 4.60167 10.0746 4.75792L9.59417 6.2025L8.2325 5.51958C7.69375 5.83333 7.19542 6.20875 6.7525 6.6425L9.27458 7.90625L9.34833 9.3525L7.9025 9.27833L6.63833 6.75667C6.205 7.19958 5.82917 7.6975 5.51542 8.23667L6.19875 9.59875L4.75333 10.0788C4.5975 10.6675 4.50667 11.2825 4.5 11.9192L7.48917 10.9263L9.86542 11.0475L10.8175 12L9.86542 12.9525L7.48917 13.0738L4.5 12.0808C4.50667 12.7175 4.5975 13.3325 4.75333 13.9212L6.19875 14.4012L5.51542 15.7633C5.82917 16.3025 6.205 16.8004 6.63833 17.2433L7.9025 14.7217L9.34833 14.6475L9.27458 16.0933L6.7525 17.3575C7.19542 17.7908 7.69375 18.1663 8.2325 18.4804L9.59417 17.7975L10.0746 19.2421C10.6633 19.3979 11.2783 19.4892 11.915 19.4958L10.9221 16.5071L11.0438 14.1308L11.9958 13.1788V19.5C16.1379 19.5 19.4958 16.1421 19.4958 12C19.4958 7.85792 16.1379 4.5 11.9958 4.5Z"
        fill="#F22CB3"
      />
    </svg>
  );
}
