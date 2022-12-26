import BigNumber from "bignumber.js";
import classNames from "classnames";
import { AiFillGithub } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import { format, fromUnixTime } from "date-fns";
import {
  ProposalInfo,
  ProposalType,
  ProposalStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { Link } from "@components/commons/link/Link";
import { AddressLink } from "@components/commons/link/AddressLink";
import { ProposalDisplayName } from "./ProposalCard";

export function ProposalDetail({
  proposal,
  proposalEndMedianTime,
  proposalCreationMedianTime,
}: {
  proposal: ProposalInfo;
  currentBlockCount: number;
  proposalEndMedianTime: number;
  proposalCreationMedianTime: number;
}) {
  const dateFormat = "dd/MM/yy";
  const endDate = format(fromUnixTime(proposalEndMedianTime), dateFormat);
  const startDate = format(
    fromUnixTime(proposalCreationMedianTime),
    dateFormat
  );

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex mb-2">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {ProposalDisplayName[ProposalType.COMMUNITY_FUND_PROPOSAL]}
          </span>
        </div>
      </div>
      <div className="text-gray-900 dark:text-gray-100 text-2xl font-semibold md:text-4xl">
        {proposal.title}
      </div>
      <div className="mb-6 md:mb-10">
        {proposal.status === ProposalStatus.VOTING && (
          <div className="mt-2">
            <span className="text-sm md:text-lg text-gray-900 dark:text-gray-100">
              Voting stops at&nbsp;
            </span>
            <span className="text-sm md:text-lg text-gray-900 dark:text-gray-100 font-semibold">
              {endDate}&nbsp;
            </span>
            <Link href={{ pathname: `/blocks/${proposal.cycleEndHeight}` }}>
              <span className="text-sm md:text-lg hover:underline text-blue-500 cursor-pointer">
                ({proposal.cycleEndHeight})
              </span>
            </Link>
          </div>
        )}
      </div>
      <div
        className={classNames("grid md:grid-cols-3 gap-y-3 md:gap-y-1", {
          "md:grid-cols-4": proposal.status !== ProposalStatus.VOTING,
        })}
      >
        <div className="flex flex-row md:flex-col">
          <div className="w-1/2 md:w-full mb-0 md:mb-2">
            <DetailSectionTitle label="Date posted" />
          </div>
          <div className="w-1/2 md:w-full flex">
            <span className="text-gray-900 dark:text-gray-100 text-sm md:text-lg text-right md:text-left w-full">
              {startDate}
            </span>
          </div>
        </div>
        {proposal.status !== ProposalStatus.VOTING && (
          <div className="flex flex-row md:flex-col">
            <div className="w-1/2 md:w-full mb-0 md:mb-2">
              <DetailSectionTitle label="Ended on" />
            </div>
            <div className="w-1/2 md:w-full flex">
              <span className="text-gray-900 dark:text-gray-100 text-sm md:text-lg text-right md:text-left w-full">
                {endDate}
              </span>
            </div>
          </div>
        )}
        {proposal.type === ProposalType.COMMUNITY_FUND_PROPOSAL && (
          <>
            <div className="flex flex-row md:flex-col">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Cycles" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <span className="text-gray-900 dark:text-gray-100 text-sm md:text-lg text-right md:text-left w-full">
                  {proposal.totalCycles} cycle
                </span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Receiving address" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <AddressLink
                  address={proposal.payoutAddress ?? ""}
                  className="text-right md:text-left w-full break-all"
                >
                  <span className="text-sm md:text-lg text-right md:text-left w-full break-all">
                    {proposal.payoutAddress}
                  </span>
                </AddressLink>
              </div>
            </div>
            <div className="flex flex-row md:flex-col">
              <div className="w-1/2 md:w-full mb-0 md:mb-2">
                <DetailSectionTitle label="Amount requested" />
              </div>
              <div className="w-1/2 md:w-full flex">
                <NumericFormat
                  value={new BigNumber(proposal.amount ?? 0).toFixed(2)}
                  fixedDecimalScale
                  thousandSeparator=","
                  displayType="text"
                  suffix=" DFI"
                  className="text-gray-900 dark:text-gray-100 text-sm md:text-lg text-right md:text-left w-full"
                />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-row md:flex-col">
          <div className="w-1/2 md:w-full mb-0 md:mb-1">
            <DetailSectionTitle label="Discussions" />
          </div>
          <div className="w-1/2 md:w-full flex">
            <a
              href={proposal.context}
              className="text-right md:text-left w-full"
            >
              <div className="flex flex-row justify-end items-center gap-x-1 md:gap-x-2 md:px-2 md:py-1.5 md:border rounded-[30px] md:w-fit">
                <AiFillGithub
                  size={20}
                  className="text-gray-900 dark:text-gray-100"
                />
                <span className="text-gray-600 dark:text-gray-100 text-sm font-medium">
                  Github
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailSectionTitle({
  label,
  customStyle,
}: {
  label: string;
  customStyle?: string;
}) {
  return (
    <span
      className={classNames(
        "text-gray-500 text-sm lg:mb-2 tracking-[0.04px]",
        customStyle
      )}
    >
      {label}
    </span>
  );
}
