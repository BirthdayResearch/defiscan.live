import React, { useState, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClear, MdEdit, MdContentCopy } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TbLoaderQuarter } from "react-icons/tb";
import classNames from "classnames";
import { VoteDecision } from "@defichain/jellyfish-api-core/dist/category/governance";
import { debounce } from "lodash";
import { Button } from "./Button";
import { CircularCheckIcon } from "./CircularCheckIcon";

export function ConfirmVoteDialog({
  isLoading,
  setIsLoading,
  hasUserSelectedVote,
  setHasUserSelectedVote,
  isConfirmDetailsClicked,
  setIsConfirmDetailsClicked,
  isMasterNodeConfirmClicked,
  setIsMasterNodeConfirmClicked,
  isChangeVoteClicked,
  setVoteCommand,
  userSelectedVote,
  setUserSelectedVote,
  proposalId,
  isOpen,
  voteCommand,
  onClose,
}) {
  const [masterNodeID, setMasterNodeID] = useState(
    localStorage.getItem("masternodeID") ?? ""
  );

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog
        as="div"
        className="relative z-[60]"
        onClose={() => {
          onClose();
          if (!isConfirmDetailsClicked && !isChangeVoteClicked) {
            setIsMasterNodeConfirmClicked(false);
            setHasUserSelectedVote(false);
          }
        }}
      >
        <Transition.Child as="div">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2.5px]" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child as="div">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[10px] bg-white p-8 pt-6 text-left align-middle shadow-xl transition-all">
                {isConfirmDetailsClicked ? (
                  <>
                    <ReadyVoteID
                      onClose={onClose}
                      masterNodeID={masterNodeID}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      userSelectedVote={userSelectedVote}
                      voteCommand={voteCommand}
                    />
                  </>
                ) : (
                  <>
                    {hasUserSelectedVote &&
                    !isConfirmDetailsClicked &&
                    isMasterNodeConfirmClicked ? (
                      <button
                        type="button"
                        onClick={() => setHasUserSelectedVote(false)}
                      >
                        <div className="flex flex-row gap-x-[7px] text-[#4A72DA] font-medium hover:underline">
                          <AiOutlineArrowLeft
                            size={15}
                            className="self-center"
                          />
                          Back to voting
                        </div>
                      </button>
                    ) : (
                      <div className="flex justify-end">
                        <button type="button" onClick={onClose}>
                          <MdClear size={24} className="text-gray-600" />
                        </button>
                      </div>
                    )}

                    <Dialog.Title
                      as="h3"
                      className="font-semibold text-2xl text-gray-900 dark:text-gray-100"
                    >
                      {userSelectedVote === undefined
                        ? "Confirm your vote"
                        : "Review your vote"}
                    </Dialog.Title>

                    {isMasterNodeConfirmClicked ? (
                      <>
                        {!hasUserSelectedVote ? (
                          <UserSelectVote
                            setHasUserSelectedVote={setHasUserSelectedVote}
                            setUserSelectedVote={setUserSelectedVote}
                          />
                        ) : (
                          <>
                            <UserReviewVote
                              proposalId={proposalId}
                              setVoteCommand={setVoteCommand}
                              masternodeID={masterNodeID}
                              userSelectedVote={userSelectedVote}
                              setIsConfirmDetailsClicked={
                                setIsConfirmDetailsClicked
                              }
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <ConfirmMasterNode
                        setMasterNodeID={setMasterNodeID}
                        masterNodeID={masterNodeID}
                        onClose={onClose}
                        setIsMasterNodeConfirmClicked={
                          setIsMasterNodeConfirmClicked
                        }
                      />
                    )}
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function ConfirmMasterNode({
  setMasterNodeID,
  masterNodeID,
  onClose,
  setIsMasterNodeConfirmClicked,
}: {
  setMasterNodeID: Dispatch<SetStateAction<string>>;
  masterNodeID: string;
  onClose: () => {};
  setIsMasterNodeConfirmClicked: Dispatch<SetStateAction<boolean>>;
}) {
  const [isMasterNodeEditClicked, setIsMasterNodeEditClicked] = useState(false);
  const [isMasterNodeInputFocus, setIsMasterNodeInputFocus] = useState(false);
  const [masterNodeErrorMsg, setMasterNodeErrorMsg] = useState("");
  return (
    <>
      <div className="mt-2 mb-6">
        <span className="text-lg text-gray-600 dark:text-gray-100">
          Confirm your masternode and vote on the proposal
        </span>
      </div>
      <div className="mt-2 mb-4">
        <span className="text-gray-600 dark:text-gray-100 font-semibold text-sm">
          Masternode
        </span>
        <div className="flex flex-row items-center gap-x-[10px]">
          <div
            onBlur={() => {
              setIsMasterNodeInputFocus(false);
            }}
            onFocus={() => {
              setIsMasterNodeInputFocus(true);
            }}
            className={classNames(
              "flex flex-row rounded border py-2 px-4 lg:w-[385px] md:w-[190px] dark:bg-gray-800",
              { "border-primary-300": isMasterNodeInputFocus },
              { "border-red-200": masterNodeErrorMsg !== "" }
            )}
          >
            <input
              onChange={(v) => {
                if (v.target.value.length !== 64) {
                  setMasterNodeErrorMsg("Invalid masternode address");
                } else {
                  setMasterNodeErrorMsg("");
                }
                setMasterNodeID(v.target.value);
              }}
              disabled={!isMasterNodeEditClicked}
              value={masterNodeID}
              className="w-2/3 text-sm focus:outline-none grow focus:caret-[#007AFF] dark:bg-gray-800 dark:text-dark-gray-900 disabled:bg-white dark:disabled:bg-gray-800"
              placeholder="Set your masternode"
            />
            {(masterNodeID !== "" || isMasterNodeInputFocus) &&
              isMasterNodeEditClicked && (
                <MdClear
                  onClick={() => {
                    setMasterNodeID("");
                  }}
                  size={15}
                  className="text-gray-500 self-center cursor-pointer m-auto"
                />
              )}
          </div>

          {isMasterNodeEditClicked ? (
            <>
              <Button
                label="SAVE"
                testId="OnChainGovernance.SaveMasterNodeID"
                disabled={masterNodeID === ""}
                onClick={() => {
                  setIsMasterNodeEditClicked(false);
                  localStorage.setItem("masternodeID", masterNodeID);
                }}
              />
            </>
          ) : (
            <MdEdit
              role="button"
              size={18}
              onClick={() => setIsMasterNodeEditClicked(true)}
              className="text-primary-500"
            />
          )}
        </div>
        {masterNodeErrorMsg !== "" && (
          <div className="text-red-600 text-xs px-4 mt-1">
            {masterNodeErrorMsg}
          </div>
        )}
      </div>
      <div className="flex flex-row space-x-2">
        <button
          onClick={onClose}
          type="button"
          className="text-sm w-1/2 py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          CANCEL
        </button>
        <button
          type="button"
          onClick={() => setIsMasterNodeConfirmClicked(true)}
          className="text-sm w-1/2 py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
        >
          CONFIRM
        </button>
      </div>
    </>
  );
}

function UserSelectVote({
  setUserSelectedVote,
  setHasUserSelectedVote,
}: {
  setUserSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
  setHasUserSelectedVote: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="mt-2 mb-6">
        <span className="text-lg text-gray-600 dark:text-gray-100">
          Select your vote carefully
        </span>
      </div>

      <div className="flex flex-row gap-x-1 justify-evenly">
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.YES);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[165px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          YES
        </button>
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.NEUTRAL);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[165px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          NEUTRAL
        </button>
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.NO);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[165px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          NO
        </button>
      </div>
    </>
  );
}

function UserReviewVote({
  setVoteCommand,
  masternodeID,
  userSelectedVote,
  proposalId,
  setIsConfirmDetailsClicked,
}: {
  setVoteCommand: Dispatch<SetStateAction<string>>;
  masternodeID: string;
  userSelectedVote: VoteDecision;
  setIsConfirmDetailsClicked: Dispatch<SetStateAction<boolean>>;
  proposalId: string;
}) {
  const voteCommand = `defi-cli votegov ${proposalId} ${masternodeID} ${userSelectedVote}`;
  return (
    <>
      <div className="grid grid-rows-[20px_minmax(100px,_1fr)] grid-cols-2 gap-y-3 mt-6">
        <div className="text-gray-600">Vote</div>

        <div className="text-right capitalize font-medium">
          {userSelectedVote}
        </div>

        <div className="text-gray-600">Masternode</div>
        <div className="break-all font-medium">{masternodeID}</div>
      </div>

      <div className="flex flex-col mt-12">
        <button
          type="button"
          onClick={() => {
            setIsConfirmDetailsClicked(true);
            setVoteCommand(voteCommand);
          }}
          className="text-sm w-full py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
        >
          CONFIRM DETAILS
        </button>
        <span className="text-xs self-center mt-3 flex text-gray-500">
          A command line will be generated once all details are confirmed
        </span>
      </div>
    </>
  );
}

function ReadyVoteID({
  userSelectedVote,
  isLoading,
  setIsLoading,
  onClose,
  voteCommand,
}: {
  voteCommand: string;
  masterNodeID: string;
  userSelectedVote: VoteDecision | undefined;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onClose: () => {};
}) {
  const debounceSetSearchList = debounce(() => {
    setIsLoading(false);
  }, 1000);
  debounceSetSearchList();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <TbLoaderQuarter size={48} className="animate-spin text-blue-500" />
          <Dialog.Title
            as="h3"
            className="font-semibold text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Your Vote is getting ready
          </Dialog.Title>
          <span className="text-xs mt-3 flex text-gray-500">
            You have voted {`'${userSelectedVote}'`} for this proposal.
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CircularCheckIcon />
          <Dialog.Title
            as="h3"
            className="font-semibold text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Vote ID is now ready
          </Dialog.Title>
          <span className="text-xs mt-3 flex text-gray-500">
            Use the provided command line to submit this on-chain through your
            full node wallet CLI.
          </span>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-row">
              <div className="break-all">{voteCommand}</div>
              <button
                type="button"
                className="flex flex-row ml-[18px] self-center align-middle gap-x-1"
              >
                <MdContentCopy size={18} className="text-primary-500" />
                <div className="text-primary-500 text-sm">COPY</div>
              </button>
            </div>
          </div>

          <span className="text-xs flex text-gray-500 mt-2">
            Copy and paste this to your full-node wallet CLI.
          </span>

          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              onClose();
            }}
            className="text-sm w-full py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
          >
            CLOSE
          </button>
        </div>
      )}
    </>
  );
}
