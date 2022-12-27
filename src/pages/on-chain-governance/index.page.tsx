import React, { useState } from "react";
import { getEnvironment, isPlayground } from "@contexts/Environment";
import { useRouter } from "next/router";
import { Container } from "@components/commons/Container";
import { CursorPage } from "@components/commons/CursorPagination";
import { getWhaleRpcClient, newPlaygroundClient } from "@contexts/WhaleContext";
import { GetServerSidePropsContext } from "next";
import {
  ListProposalsType,
  ListProposalsStatus,
  ProposalInfo,
  ProposalStatus,
} from "@defichain/jellyfish-api-core/dist/category/governance";
import { useNetwork } from "@contexts/NetworkContext";
import { PlaygroundRpcClient } from "@defichain/playground-api-client";
import { FiInfo } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { TextTruncate } from "@components/commons/text/TextTruncate";
import classNames from "classnames";
import { Link } from "@components/commons/link/Link";
import { ProposalCards } from "./_components/ProposalCard";
import { ProposalTable } from "./_components/ProposalTable";
import { Button } from "./_components/Button";
import { useWindowDimensions } from "./shared/useWindowDimensions";

interface OCGProps {
  allProposalsDetails: {
    proposalsSubmitted: number;
    openProposals: number;
    closedProposals: number;
    currentBlockCount: number;
    currentBlockMedianTime: number;
  };
  proposals: {
    allProposals: ProposalInfo[];
    queryProposals: ProposalInfo[];
    pages: CursorPage[];
  };
}
export default function OnChainGovernancePage(props) {
  const router = useRouter();
  const connection = useNetwork().connection;
  const windowSize = useWindowDimensions().width;

  const userQueryProposalStatus = router.query.proposalStatus;
  let userQueryProposalType = ListProposalsType.ALL;
  switch (router.query.proposalType) {
    case ListProposalsType.CFP:
      userQueryProposalType = ListProposalsType.CFP;
      break;
    case ListProposalsType.VOC:
      userQueryProposalType = ListProposalsType.VOC;
      break;
    case ListProposalsType.ALL:
    default:
      userQueryProposalType = ListProposalsType.ALL;
  }

  const [isMasterNodeClicked, setIsMasterNodeClicked] = useState(false);
  const [masterNodeID, setMasterNodeID] = useState(
    localStorage.getItem("masternodeID") ?? ""
  );
  const [masterNodeErrorMsg, setMasterNodeErrorMsg] = useState("");
  const proposalType = userQueryProposalType;

  const [isOpenProposalsClicked, setIsOpenProposalsClicked] = useState(
    userQueryProposalStatus !== "close"
  );

  const { allProposalsDetails, proposals } = {
    allProposalsDetails: props.allProposalsDetails,
    proposals: props.proposals,
  };

  console.log(proposals);
  // TODO remove this before release to prod
  async function createDummyProposals(): Promise<void> {
    const playgroundRPC = new PlaygroundRpcClient(
      newPlaygroundClient(connection)
    );
    for (let i = 0; i < 5; i += 1) {
      const governanceType = ["creategovvoc", "creategovcfp"];
      const proposalType =
        governanceType[Math.floor(Math.random() * governanceType.length)]; // get random governance type
      const data = {
        title: `Long proposal title testing proposal ${new Date().getTime()}`,
        amount: "100000000",
        context: "https://github.com/WavesHQ/scan",
        payoutAddress: "mswsMVsyGMj1FzDMbbxw2QW3KvQAv2FKiy",
        cycles: 1,
      };
      const proposal = await playgroundRPC.call(
        proposalType,
        [data, []],
        "number"
      );
      console.log(
        `proposal created with id:${proposal} is created with ${proposalType}`
      );
    }
  }

  return (
    <div>
      {isPlayground(connection) && (
        <Button
          testId="dummy-proposal"
          label="Create dummy proposal"
          onClick={createDummyProposals}
          customStyle="hover:bg-gray-50"
        />
      )}
      <div className="py-4 bg-gray-50 w-screen">
        <Container>
          <span className="text-gray-900 tracking-[0.0044em]">
            Announcement: November 2022 voting round is now ongoing.&nbsp;
            <a className="text-[#4A72DA] underline" href="/">
              Read here for more details
            </a>
          </span>
        </Container>
      </div>

      <Container className="md:pt-11 pt-10 pb-20">
        <div className="flex md:flex-row flex-col">
          {/* main title */}
          <div className="flex flex-col grow">
            <div
              data-testid="OnChainGovernance.Title"
              className="text-[10px] tracking-[0.0015em] font-medium text-gray-500 dark:text-dark-gray-900"
            >
              ON-CHAIN GOVERNANCE
            </div>
            <div
              data-testid="OnChainGovernance.Proposals.Title"
              className="text-4xl leading-[48px] tracking-[0.0015em] font-semibold dark:text-dark-gray-900"
            >
              Proposals
            </div>

            {isMasterNodeClicked ? (
              <>
                <div className="flex flex-row items-center gap-x-[10px] mt-2">
                  <input
                    onChange={(v) => setMasterNodeID(v.target.value)}
                    value={masterNodeID}
                    className="rounded border py-2 px-4 text-sm"
                    placeholder="Set your masternode"
                  />
                  <Button
                    label="SAVE"
                    testId="OnChainGovernance.SaveMasterNodeID"
                    onClick={() => {
                      if (
                        masterNodeID.length < 64 ||
                        masterNodeID.length > 64
                      ) {
                        setMasterNodeErrorMsg("Invalid masternode address");
                      } else {
                        setMasterNodeErrorMsg("");
                        setIsMasterNodeClicked(false);
                        localStorage.setItem("masternodeID", masterNodeID);
                      }
                    }}
                  />
                  <FiInfo role="button" size={20} className="text-blue-500" />
                </div>
                <div className="text-red-600 text-xs px-4 mt-1">
                  {masterNodeErrorMsg}
                </div>
              </>
            ) : (
              <>
                {!isMasterNodeClicked &&
                masterNodeID !== "" &&
                masterNodeErrorMsg === "" ? (
                  <div className="flex flex-row gap-x-[10px] items-center mt-[14px]">
                    Masternode:
                    <TextTruncate width="w-60" text={` ${masterNodeID}`} />
                    <MdEdit
                      role="button"
                      size={15}
                      onClick={() => setIsMasterNodeClicked(true)}
                      className="text-primary-500"
                    />
                    <FiInfo role="button" size={20} className="text-blue-500" />
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-x-[10px] mt-[14px]">
                    <Button
                      customStyle="px-0 text-[#4A72DA] py-[6px] hover:underline"
                      label="Set Masternode"
                      testId="OnChainGovernance.SetMasterNode"
                      onClick={() => setIsMasterNodeClicked(true)}
                    />
                    <FiInfo role="button" size={20} className="text-blue-500" />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="justify-self-center border border-gray-200 rounded-lg flex flex-row items-center px-3 py-6 md:h-[104px] h-[84px] md:w-[412px] lg:w-fit justify-evenly md:mt-0 mt-[46px]">
            <div className="flex-col grow lg:px-[28px]">
              <div className="lg:text-2xl text-lg font-semibold text-center">
                {allProposalsDetails.proposalsSubmitted}
              </div>
              <div className="lg:text-base text-sm text-center">Total</div>
            </div>
            <div className="flex-col grow border-r border-l lg:px-[28px]">
              <div className="lg:text-2xl text-lg font-semibold text-center">
                {allProposalsDetails.openProposals}
              </div>
              <div className="lg:text-base text-sm text-center">Open</div>
            </div>
            <div className="flex-col grow lg:border-r lg:px-[28px]">
              <div className="lg:text-2xl text-lg font-semibold text-center">
                {allProposalsDetails.closedProposals}
              </div>
              <div className="lg:text-base text-sm text-center">Closed</div>
            </div>
            <div className="px-[28px] lg:block hidden">
              <button
                type="button"
                className="py-3 px-6 bg-primary-50 hover:bg-primary-100 rounded"
              >
                <Link href={{ pathname: "on-chain-governance/create" }}>
                  <span className="text-sm font-medium text-primary-500">
                    CREATE PROPOSAL
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex w-full md:justify-end mt-4">
          <button
            type="button"
            className="py-3 px-6 bg-primary-50 hover:bg-primary-100 rounded md:w-fit w-full"
          >
            <Link href={{ pathname: "on-chain-governance/create" }}>
              <span className="text-sm font-medium text-primary-500">
                CREATE PROPOSAL
              </span>
            </Link>
          </button>
        </div>

        <div className="mt-[30px] flex flex-row">
          <div className="flex flex-row w-fit grow">
            <button
              onClick={() => {
                router
                  .replace(
                    {
                      pathname: router.pathname,
                      query: getEnvironment().isDefaultConnection(connection)
                        ? {}
                        : {
                            proposalStatus: isOpenProposalsClicked
                              ? "open"
                              : "close",
                            proposalType: ListProposalsType.ALL,
                            network: connection,
                          },
                    },
                    undefined,
                    { shallow: true }
                  )
                  .then(() => router.reload());
                // setProposalType(ListProposalsType.ALL)
              }}
              type="button"
              data-testid="OnChainGovernance.AllProposalsButton"
              className={classNames(
                "rounded-l border border-r-0 py-[6px] md:px-[25px] px-3 md:text-base text-xs text-primary-500 border-gray-200",
                {
                  "border-0 bg-primary-500 text-white":
                    proposalType === ListProposalsType.ALL,
                }
              )}
            >
              All
            </button>

            <button
              onClick={() => {
                router
                  .replace(
                    {
                      pathname: router.pathname,
                      query: getEnvironment().isDefaultConnection(connection)
                        ? {}
                        : {
                            proposalStatus: isOpenProposalsClicked
                              ? "open"
                              : "close",
                            proposalType: ListProposalsType.CFP,
                            network: connection,
                          },
                    },
                    undefined,
                    { shallow: true }
                  )
                  .then(() => router.reload());
                // setProposalType(ListProposalsType.CFP)
              }}
              type="button"
              data-testid="OnChainGovernance.CfpProposalsButton"
              className={classNames(
                "border py-[6px] md:px-[25px] px-3 md:text-base text-xs text-primary-500",
                {
                  "border-0 bg-primary-500 text-white":
                    proposalType === ListProposalsType.CFP,
                }
              )}
            >
              CFP
            </button>

            <button
              onClick={() => {
                router
                  .replace(
                    {
                      pathname: router.pathname,
                      query: getEnvironment().isDefaultConnection(connection)
                        ? {}
                        : {
                            proposalStatus: isOpenProposalsClicked
                              ? "open"
                              : "close",
                            proposalType: ListProposalsType.VOC,
                            network: connection,
                          },
                    },
                    undefined,
                    { shallow: true }
                  )
                  .then(() => router.reload());
                // setProposalType(ListProposalsType.VOC)
              }}
              type="button"
              data-testid="OnChainGovernance.CfpProposalsButton"
              className={classNames(
                "border border-l-0 rounded-r py-[6px] md:px-[25px] px-3 md:text-base text-xs text-primary-500",
                {
                  "border-0 bg-primary-500 text-white":
                    proposalType === ListProposalsType.VOC,
                }
              )}
            >
              DFIP
            </button>
          </div>

          <div className="flex flex-row w-fit">
            <button
              onClick={() => {
                setIsOpenProposalsClicked(true);
                router.push({
                  pathname: router.pathname,
                  query: getEnvironment().isDefaultConnection(connection)
                    ? {}
                    : {
                        proposalType: userQueryProposalType,
                        proposalStatus: "open",
                        network: connection,
                      },
                });
              }}
              type="button"
              data-testid="OnChainGovernance.AllProposalsButton"
              className={classNames(
                "rounded-l border border-r-0 py-[6px] md:px-[25px] px-3 md:text-base text-xs text-primary-500 border-gray-200",
                { "border-0 bg-primary-500 text-white": isOpenProposalsClicked }
              )}
            >
              {windowSize <= 420 ? "Open" : "Open proposals"}
            </button>
            <button
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: getEnvironment().isDefaultConnection(connection)
                    ? {}
                    : {
                        proposalType: userQueryProposalType,
                        proposalStatus: "close",
                        network: connection,
                      },
                });
                setIsOpenProposalsClicked(false);
              }}
              type="button"
              data-testid="OnChainGovernance.CfpProposalsButton"
              className={classNames(
                "border border-l-0 rounded-r py-[6px] md:px-[25px] px-3 md:text-base text-xs text-primary-500",
                {
                  "border-0 bg-primary-500 text-white": !isOpenProposalsClicked,
                }
              )}
            >
              {windowSize <= 420 ? "Closed" : "Closed proposals"}
            </button>
          </div>
        </div>

        <div className="hidden md:block mt-8">
          <ProposalTable
            data-testid="OnChainGovernance.CurrentProposalListTable"
            proposals={proposals.queryProposals}
            currentBlockHeight={allProposalsDetails.currentBlockCount}
            currentBlockMedianTime={allProposalsDetails.currentBlockMedianTime}
            isOpenProposalsClicked={isOpenProposalsClicked}
          />
        </div>
        <div className="md:hidden block mt-[62px]">
          <ProposalCards
            data-testid="OnChainGovernance.CurrentProposalListCard"
            currentBlockHeight={allProposalsDetails.currentBlockCount}
            currentBlockMedianTime={allProposalsDetails.currentBlockMedianTime}
            isOpenProposalsClicked={isOpenProposalsClicked}
            proposals={proposals.queryProposals}
          />
        </div>
        {/* <div className="flex justify-end mt-8">
          <CursorPagination pages={proposals.pages} path="/on-chain-governance" />
        </div> */}
      </Container>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const rpc = getWhaleRpcClient(context);

  let userQueryProposalType = ListProposalsType.ALL;
  const userQueryProposalStatus = context.query.proposalStatus ?? "open";

  switch (context.query.proposalType) {
    case ListProposalsType.CFP:
      userQueryProposalType = ListProposalsType.CFP;
      break;
    case ListProposalsType.VOC:
      userQueryProposalType = ListProposalsType.VOC;
      break;
    case ListProposalsType.ALL:
    default:
      userQueryProposalType = ListProposalsType.ALL;
  }

  const currentBlockCount = await rpc.blockchain.getBlockCount();
  const currentBlockInfo = await rpc.blockchain.getBlockStats(
    currentBlockCount
  );
  const currentBlockMedianTime = currentBlockInfo.mediantime;
  const allProposals = await rpc.governance.listGovProposals({
    type: ListProposalsType.ALL,
    status: ListProposalsStatus.ALL,
  });

  let queryProposals = await rpc.governance.listGovProposals({
    type: userQueryProposalType,
    status: ListProposalsStatus.ALL,
  });

  queryProposals = queryProposals.filter((proposal) => {
    if (userQueryProposalStatus === "open") {
      return proposal.status === ProposalStatus.VOTING;
    } else {
      return proposal.status !== ProposalStatus.VOTING;
    }
  });

  return {
    props: getOCGData(
      JSON.parse(JSON.stringify(allProposals)),
      JSON.parse(JSON.stringify(queryProposals)),
      currentBlockCount,
      currentBlockMedianTime
    ),
  };
}

function getOCGData(
  allProposals: ProposalInfo[],
  queryProposals: ProposalInfo[],
  currentBlockCount: number,
  currentBlockMedianTime: number
): OCGProps {
  return {
    allProposalsDetails: {
      proposalsSubmitted: allProposals.length,
      openProposals: allProposals.filter(
        (item) => item.status === ProposalStatus.VOTING
      ).length,
      closedProposals: allProposals.filter(
        (item) => item.status !== ProposalStatus.VOTING
      ).length,
      currentBlockCount: currentBlockCount,
      currentBlockMedianTime: currentBlockMedianTime,
    },
    proposals: {
      allProposals,
      queryProposals,
      pages: [
        {
          n: 1,
          active: true,
          cursors: [],
        },
        {
          n: 2,
          active: false,
          cursors: ["1"],
        },
        {
          n: 3,
          active: false,
          cursors: ["1", "2"],
        },
      ],
    },
  };
}
