import React, { useState, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClear, MdEdit, MdArrowBack } from "react-icons/md";
import { TbLoaderQuarter } from "react-icons/tb";
import classNames from "classnames";
import { VoteDecision } from "@defichain/jellyfish-api-core/dist/category/governance";
import { debounce } from "lodash";
import { CopyButton } from "@components/commons/CopyButton";
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
  setUserConfirmedSelectedVote,
  proposalId,
  isOpen,
  voteCommand,
  onClose,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  hasUserSelectedVote: boolean;
  setHasUserSelectedVote: Dispatch<SetStateAction<boolean>>;
  isConfirmDetailsClicked: boolean;
  setIsConfirmDetailsClicked: Dispatch<SetStateAction<boolean>>;
  isMasterNodeConfirmClicked: boolean;
  setIsMasterNodeConfirmClicked: Dispatch<SetStateAction<boolean>>;
  isChangeVoteClicked: boolean;
  setVoteCommand: Dispatch<SetStateAction<string>>;
  setUserConfirmedSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
  proposalId: string;
  isOpen: boolean;
  voteCommand: string;
  onClose: () => void;
}) {
  const [masterNodeID, setMasterNodeID] = useState(
    localStorage.getItem("masternodeID") ?? ""
  );
  const [userSelectedVote, setUserSelectedVote] = useState<VoteDecision>();

  function closeState() {
    if (!isConfirmDetailsClicked && !isChangeVoteClicked) {
      setIsMasterNodeConfirmClicked(false);
      setHasUserSelectedVote(false);
      setIsLoading(false);
    }
    if (!isMasterNodeConfirmClicked) {
      setMasterNodeID(localStorage.getItem("masternodeID") ?? "");
    }
  }

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog
        as="div"
        className="relative z-[60]"
        onClose={() => {
          onClose();
          closeState();
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
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      userSelectedVote={userSelectedVote}
                      voteCommand={voteCommand}
                    />
                  </>
                ) : (
                  <>
                    {/* back to voting or close button */}
                    {isMasterNodeConfirmClicked &&
                    hasUserSelectedVote &&
                    !isConfirmDetailsClicked ? (
                      <button
                        type="button"
                        onClick={() => setHasUserSelectedVote(false)}
                      >
                        <div className="flex flex-row gap-x-[5px] text-[#4A72DA] font-medium hover:underline mb-1">
                          <MdArrowBack size={24} className="self-center" />
                          Back to voting
                        </div>
                      </button>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (
                              !isConfirmDetailsClicked &&
                              !isChangeVoteClicked
                            ) {
                              setIsMasterNodeConfirmClicked(false);
                              setHasUserSelectedVote(false);
                              setIsLoading(false);
                            }
                            if (!isMasterNodeConfirmClicked) {
                              setMasterNodeID(
                                localStorage.getItem("masternodeID") ?? ""
                              );
                            }
                          }}
                        >
                          <MdClear size={24} className="text-gray-600" />
                        </button>
                      </div>
                    )}

                    <Dialog.Title
                      as="h3"
                      className="font-semibold text-2xl text-gray-900 dark:text-gray-100"
                    >
                      {!hasUserSelectedVote
                        ? "Confirm your vote"
                        : "Review your vote"}
                    </Dialog.Title>

                    {isMasterNodeConfirmClicked ? (
                      // If masternode is confirmed check if voting page or review detail page
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
                              setUserConfirmedSelectedVote={
                                setUserConfirmedSelectedVote
                              }
                            />
                          </>
                        )}
                      </>
                    ) : (
                      // If masternode is not confirm show masternode confirm page
                      <ConfirmMasterNode
                        setMasterNodeID={setMasterNodeID}
                        masterNodeID={masterNodeID}
                        onClose={onClose}
                        setIsMasterNodeConfirmClicked={
                          setIsMasterNodeConfirmClicked
                        }
                        closeState={closeState}
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
  closeState,
}: {
  setMasterNodeID: Dispatch<SetStateAction<string>>;
  masterNodeID: string;
  onClose: () => void;
  setIsMasterNodeConfirmClicked: Dispatch<SetStateAction<boolean>>;
  closeState: () => void;
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
      <div className="mb-4">
        <span className="text-gray-600 dark:text-gray-100 font-semibold text-sm">
          Masternode
        </span>
        <div className="flex flex-row items-center gap-x-2 mt-1">
          <div
            onBlur={() => {
              setIsMasterNodeInputFocus(false);
            }}
            onFocus={() => {
              setIsMasterNodeInputFocus(true);
            }}
            className={classNames(
              "flex flex-row rounded border py-3 px-4 w-full dark:bg-gray-800",
              { "border-primary-300": isMasterNodeInputFocus },
              { "border-red-600": masterNodeErrorMsg !== "" }
            )}
          >
            <textarea
              onChange={(v) => {
                if (v.target.value.length !== 64) {
                  setMasterNodeErrorMsg("Enter a valid masternode ID");
                } else {
                  setMasterNodeErrorMsg("");
                }
                setMasterNodeID(v.target.value);
              }}
              disabled={!isMasterNodeEditClicked}
              value={masterNodeID}
              className=" overflow-hidden resize-none md:h-5 h-10 text-sm focus:outline-none grow focus:caret-[#007AFF] dark:bg-gray-800 dark:text-dark-gray-900 disabled:bg-white dark:disabled:bg-gray-800"
              placeholder="Set your masternode"
            />

            {(masterNodeID !== "" || isMasterNodeInputFocus) &&
              isMasterNodeEditClicked && (
                <MdClear
                  onClick={() => {
                    setMasterNodeID("");
                  }}
                  size={15}
                  className="text-gray-500 self-center cursor-pointer ml-[6px]"
                />
              )}
            {!isMasterNodeEditClicked && (
              <MdEdit
                role="button"
                size={18}
                onClick={() => setIsMasterNodeEditClicked(true)}
                className="text-primary-500 ml-[6px] self-center"
              />
            )}
          </div>

          {isMasterNodeEditClicked && (
            <>
              <Button
                label="SAVE"
                testId="OnChainGovernance.SaveMasterNodeID"
                disabled={masterNodeID === "" || masterNodeErrorMsg !== ""}
                onClick={() => {
                  setIsMasterNodeEditClicked(false);
                  localStorage.setItem("masternodeID", masterNodeID);
                }}
              />
            </>
          )}
        </div>
        {masterNodeErrorMsg !== "" && (
          <div className="text-red-600 text-xs mt-1">{masterNodeErrorMsg}</div>
        )}
      </div>
      <div className="flex flex-row space-x-2">
        <button
          onClick={() => {
            closeState();
            onClose();
          }}
          type="button"
          className="text-sm w-1/2 py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          CANCEL
        </button>
        <button
          type="button"
          disabled={isMasterNodeEditClicked || masterNodeID === ""}
          onClick={() => setIsMasterNodeConfirmClicked(true)}
          className="text-sm w-1/2 py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100 disabled:bg-gray-50 disabled:border-0 disabled:text-gray-300"
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

      <div className="flex flex-row gap-x-2 justify-evenly">
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.YES);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[144px] w-[85px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          YES
        </button>
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.NEUTRAL);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[144px] w-[85px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
        >
          NEUTRAL
        </button>
        <button
          onClick={() => {
            setUserSelectedVote(VoteDecision.NO);
            setHasUserSelectedVote(true);
          }}
          type="button"
          className="grow md:w-[144px] w-[85px] text-sm py-4 border rounded-sm font-medium border-gray-300 text-primary-500 hover:border-primary-200"
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
  setUserConfirmedSelectedVote,
}: {
  setVoteCommand: Dispatch<SetStateAction<string>>;
  masternodeID: string;
  userSelectedVote: VoteDecision | undefined;
  setIsConfirmDetailsClicked: Dispatch<SetStateAction<boolean>>;
  proposalId: string;
  setUserConfirmedSelectedVote: Dispatch<
    SetStateAction<VoteDecision | undefined>
  >;
}) {
  const voteCommand = `defi-cli votegov ${proposalId} ${masternodeID} ${userSelectedVote}`;
  return (
    <>
      <div className="grid grid-rows-[20px_minmax(100px,_1fr)] grid-cols-2 gap-y-3 mt-6">
        <div className="text-gray-600">Vote</div>

        <div className="text-gray-900 text-right capitalize font-medium">
          {userSelectedVote}
        </div>

        <div className="text-gray-600">Masternode</div>
        <div className="text-gray-900 break-all font-medium text-right">
          {masternodeID}
        </div>
      </div>

      <div className="flex flex-col mt-12">
        <button
          type="button"
          onClick={() => {
            setUserConfirmedSelectedVote(userSelectedVote);
            setIsConfirmDetailsClicked(true);
            setVoteCommand(voteCommand);
          }}
          className="text-sm w-full py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
        >
          CONFIRM DETAILS
        </button>
        <span className="text-xs self-center text-center mt-3 flex text-gray-500">
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
  userSelectedVote: VoteDecision | undefined;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
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
            className="font-semibold text-center text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Your vote is getting ready
          </Dialog.Title>
          <div className="flex flex-row mt-2 text-center">
            <span className="text-xs text-gray-600">You have voted &nbsp;</span>
            <span className="capitalize text-xs text-gray-600">
              {`'${userSelectedVote}'`}
            </span>
            <span className="text-xs text-gray-600">
              &nbsp; for this proposal.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CircularCheckIcon />
          <Dialog.Title
            as="h3"
            className="font-semibold text-center text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Vote ID is now ready
          </Dialog.Title>
          <span className="text-lg mt-3 text-center flex text-gray-600 mb-8">
            Use the provided command line to submit this on-chain through your
            full node wallet CLI.
          </span>

          <div className="rounded-[10px] border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-row">
              <div className="text-gray-900 break-all md:line-clamp-none line-clamp-2">
                {voteCommand}
              </div>
              <div className="flex flex-row ml-[18px] self-center align-middle gap-x-1">
                <CopyButton
                  withCopyText
                  buttonClass="border-0"
                  iconsClass="text-primary-500 self-center mr-[6px]"
                  content={voteCommand}
                />
              </div>
            </div>
          </div>

          <span className="text-xs text-center flex text-gray-500 mt-2 mb-8">
            Copy and paste this to your full-node wallet CLI.
          </span>

          <button
            type="button"
            onClick={() => {
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
