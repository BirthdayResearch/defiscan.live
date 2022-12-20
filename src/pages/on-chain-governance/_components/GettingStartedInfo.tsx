import { MdInfo } from "react-icons/md";

export function GettingStartedInfo(): JSX.Element {
  const link = "https://github.com/DeFiCh/dfips";
  return (
    <div className="bg-blue-50 dark:bg-dark-blue-50 py-6 px-6 md:py-9 md:px-10 rounded-lg mb-4">
      <div className="flex flex-row">
        <MdInfo size={24} className="mr-2 text-[#4A72DA]" />
        <span className="font-semibold text-base text-[#4A72DA]">
          Getting started
        </span>
      </div>
      <div className="mt-2">
        <span className="text-sm md:text-base text-gray-600">
          Before creating an On-chain proposal here, the proposal should have an
          active discussion&nbsp;
        </span>
        <a
          className="text-[#4A72DA] text-sm md:text-base underline"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          in Github
        </a>
        <span className="text-sm md:text-base text-gray-600">
          . Discuss with the community why this proposal should be approved.
        </span>
      </div>
    </div>
  );
}
