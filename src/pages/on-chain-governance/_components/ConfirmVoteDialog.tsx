import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose, MdClear, MdArrowBack } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import classNames from "classnames";
import { VoteDecision } from "@defichain/jellyfish-api-core/dist/category/governance";
import { debounce } from "lodash";
import { CopyButton } from "@components/commons/CopyButton";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useNetwork } from "@contexts/NetworkContext";
import { CircularCheckIcon } from "./CircularCheckIcon";
import { VoteStages } from "../enum/VoteStages";
import { RememberMasterNodeId } from "../enum/RememberMasterNodeId";
import {
  getLocalStorageItem,
  setLocalStorage,
} from "../shared/localStorageHelper";

export function ConfirmVoteDialog({
  isLoading,
  setIsLoading,
  voteStage,
  setVoteStage,
  setVoteCommand,
  userConfirmedSelectedVote,
  setUserConfirmedSelectedVote,
  proposalId,
  isOpen,
  voteCommand,
  onClose,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  voteStage: VoteStages;
  setVoteStage: Dispatch<SetStateAction<VoteStages>>;
  setVoteCommand: Dispatch<SetStateAction<string>>;
  userConfirmedSelectedVote: VoteDecision | undefined;
  setUserConfirmedSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
  proposalId: string;
  isOpen: boolean;
  voteCommand: string;
  onClose: () => void;
}) {
  const { connection } = useNetwork();

  const localStorageMasterNodeId =
    connection in getLocalStorageItem("masternodeID")
      ? getLocalStorageItem("masternodeID")[connection]
      : "";
  const [masterNodeID, setMasterNodeID] = useState(localStorageMasterNodeId);
  const [userSelectedVote, setUserSelectedVote] = useState<VoteDecision>();

  function closeStates() {
    const localStorageMasterNodeId =
      connection in getLocalStorageItem("masternodeID")
        ? getLocalStorageItem("masternodeID")[connection]
        : "";

    setVoteStage(VoteStages.VoteProposal);
    setUserSelectedVote(userConfirmedSelectedVote);
    setIsLoading(false);
    setMasterNodeID(localStorageMasterNodeId);
  }

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog
        as="div"
        className="relative z-[60]"
        onClose={() => {
          onClose();
          closeStates();
        }}
      >
        <Transition.Child as="div">
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2.5px]" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child as="div">
              <Dialog.Panel
                className={classNames(
                  "w-full max-w-[512px] transform overflow-hidden rounded-[10px] bg-white p-5 md:p-8 text-left align-middle shadow-xl transition-all",
                  { "max-w-[436px]": voteStage === VoteStages.ReadyVoteId }
                )}
              >
                {voteStage !== VoteStages.ReadyVoteId && (
                  <div
                    className={classNames("flex flex-row justify-end", {
                      "mb-1": voteStage === VoteStages.ReviewVote,
                    })}
                  >
                    {voteStage === VoteStages.ReviewVote && (
                      <button
                        data-testid="OnChainGovernance.VotingFlow.BackToVoting"
                        type="button"
                        onClick={() => setVoteStage(VoteStages.VoteProposal)}
                        className="grow"
                      >
                        <div className="flex flex-row gap-x-1 text-[#4A72DA] font-medium hover:underline">
                          <MdArrowBack size={24} className="self-center" />
                          Back to voting
                        </div>
                      </button>
                    )}
                    <button
                      type="button"
                      data-testid="OnChainGovernance.VotingFlow.CloseModal"
                      onClick={() => {
                        onClose();
                        closeStates();
                      }}
                    >
                      <MdClear size={24} className="text-gray-600" />
                    </button>
                  </div>
                )}

                <Dialog.Title
                  data-testid="OnChainGovernance.VotingFlow.ModalTitle"
                  as="h3"
                  className="font-semibold text-2xl text-gray-900 dark:text-gray-100"
                >
                  {voteStage !== VoteStages.ReadyVoteId && voteStage}
                </Dialog.Title>

                {voteStage === VoteStages.VoteProposal && (
                  <VoteForProposal
                    setMasterNodeID={setMasterNodeID}
                    masterNodeID={masterNodeID}
                    setUserSelectedVote={setUserSelectedVote}
                    userSelectedVote={userSelectedVote}
                    setVoteStage={setVoteStage}
                  />
                )}

                {voteStage === VoteStages.ReviewVote && (
                  <UserReviewVote
                    proposalId={proposalId}
                    setVoteCommand={setVoteCommand}
                    masternodeID={masterNodeID}
                    userSelectedVote={userSelectedVote}
                    setVoteStage={setVoteStage}
                    setIsLoading={setIsLoading}
                    setUserConfirmedSelectedVote={setUserConfirmedSelectedVote}
                  />
                )}

                {voteStage === VoteStages.ReadyVoteId && (
                  <ReadyVoteID
                    onClose={() => {
                      onClose();
                      closeStates();
                    }}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    userSelectedVote={userSelectedVote}
                    voteCommand={voteCommand}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function VoteForProposal({
  setMasterNodeID,
  masterNodeID,
  setUserSelectedVote,
  userSelectedVote,
  setVoteStage,
}: {
  setMasterNodeID: Dispatch<SetStateAction<string>>;
  masterNodeID: string;
  setUserSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
  userSelectedVote: VoteDecision | undefined;
  setVoteStage: Dispatch<SetStateAction<VoteStages>>;
}) {
  const { connection } = useNetwork();
  const [isMasterNodeInputFocus, setIsMasterNodeInputFocus] = useState(false);
  const [masterNodeErrorMsg, setMasterNodeErrorMsg] = useState("");

  const localStorageRememberMasterNodeId =
    connection in getLocalStorageItem("rememberMasterNodeId")
      ? getLocalStorageItem("rememberMasterNodeId")[connection]
      : RememberMasterNodeId.Yes;

  const [rememberMasterNodeId, setRememberMasterNodeId] = useState(
    localStorageRememberMasterNodeId
  );
  const ref = useRef<HTMLTextAreaElement>(null);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      if (masterNodeID === "") {
        ref.current.style.height = "20px";
      }
    }
  }, [ref, masterNodeID, dimension]);

  return (
    <>
      <div className="mt-2 mb-6">
        <span
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.SubTitle"
          className="text-lg text-gray-600 dark:text-gray-100"
        >
          Confirm your masternode and vote on the proposal
        </span>
      </div>

      <span
        data-testid="OnChainGovernance.VotingFlow.VoteForProposal.Masternode"
        className="text-gray-600 dark:text-gray-100 font-semibold text-sm tracking-[0.0025em]"
      >
        Masternode
      </span>

      <div className="flex flex-row items-center gap-x-2 mt-1">
        <div
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeInput"
          onBlur={() => {
            setIsMasterNodeInputFocus(false);
          }}
          onFocus={() => {
            setIsMasterNodeInputFocus(true);
          }}
          className={classNames(
            "flex flex-row rounded border py-3 px-4 w-full dark:bg-gray-800 justify-between",
            isMasterNodeInputFocus ? "border-primary-300" : "border-gray-300 ",
            { "border-red-500": masterNodeErrorMsg !== "" }
          )}
        >
          <textarea
            ref={ref}
            onChange={(v) => {
              if (v.target.value.length !== 64) {
                setMasterNodeErrorMsg("Please enter a valid masternode ID");
              } else {
                setMasterNodeErrorMsg("");
              }
              setMasterNodeID(v.target.value);
            }}
            value={masterNodeID}
            className="w-11/12 overflow-visible resize-none text-sm focus:outline-none focus:caret-[#007AFF] dark:bg-gray-800 text-gray-900 dark:text-dark-gray-900 disabled:bg-white dark:disabled:bg-gray-800 placeholder:text-gray-400 tracking-[0.0025em]"
            placeholder="Masternode ID"
          />

          {isMasterNodeInputFocus && (
            <button
              data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeClearInput"
              type="button"
              className="rounded-full h-4 w-4 bg-gray-100 self-center cursor-pointer text-center"
              onMouseDown={() => {
                setMasterNodeID("");
              }}
            >
              <MdClose
                size={12}
                className="text-gray-500 self-center cursor-pointer m-auto"
              />
            </button>
          )}
        </div>
      </div>

      {masterNodeErrorMsg !== "" ? (
        <div
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeErrorMsg"
          className="text-red-500 text-xs mt-2 md:mb-4 mb-6"
        >
          {masterNodeErrorMsg}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (rememberMasterNodeId === RememberMasterNodeId.Yes) {
              setRememberMasterNodeId(RememberMasterNodeId.No);
            } else {
              setRememberMasterNodeId(RememberMasterNodeId.Yes);
            }
          }}
          className={classNames(
            "flex flex-row gap-x-[6px] items-center mt-2 md:mb-4 mb-6 accent-blue-600"
          )}
        >
          <input
            data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeCheckBox"
            type="checkbox"
            onChange={(value) => {
              if (value.target.checked) {
                setRememberMasterNodeId(RememberMasterNodeId.Yes);
              } else {
                setRememberMasterNodeId(RememberMasterNodeId.No);
              }
            }}
            checked={rememberMasterNodeId === RememberMasterNodeId.Yes}
          />
          <div className="text-gray-600 text-sm tracking-[0.0025em]">
            Remember Masternode ID
          </div>
        </button>
      )}

      <UserVote
        masterNodeID={masterNodeID}
        masterNodeErrorMsg={masterNodeErrorMsg}
        userSelectedVote={userSelectedVote}
        setUserSelectedVote={setUserSelectedVote}
      />

      <button
        data-testid="OnChainGovernance.VotingFlow.VoteForProposal.ContinueButton"
        type="button"
        disabled={
          masterNodeErrorMsg !== "" ||
          masterNodeID === "" ||
          userSelectedVote === undefined
        }
        onClick={() => {
          const rememberMasterNodeObj = getLocalStorageItem(
            "rememberMasterNodeId"
          );
          rememberMasterNodeObj[connection] = rememberMasterNodeId;

          const masterNodeIdObj = getLocalStorageItem("masternodeID");
          masterNodeIdObj[connection] = masterNodeID;

          setLocalStorage(`rememberMasterNodeId`, rememberMasterNodeObj);

          setVoteStage(VoteStages.ReviewVote);
          if (rememberMasterNodeId === RememberMasterNodeId.Yes) {
            setLocalStorage(`masternodeID`, masterNodeIdObj);
          } else {
            masterNodeIdObj[connection] = "";
            setLocalStorage(`masternodeID`, masterNodeIdObj);
          }
        }}
        className="w-full py-3 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100 disabled:bg-gray-50 disabled:border-0 disabled:text-gray-300"
      >
        CONTINUE
      </button>
    </>
  );
}

function UserVote({
  masterNodeID,
  masterNodeErrorMsg,
  userSelectedVote,
  setUserSelectedVote,
}: {
  masterNodeID: string;
  masterNodeErrorMsg: string;
  userSelectedVote: VoteDecision | undefined;
  setUserSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
}) {
  const [isVoteSelectionDisabled, setIsVoteSelectionDisabled] = useState(
    masterNodeID === "" || masterNodeErrorMsg !== ""
  );
  useEffect(() => {
    setIsVoteSelectionDisabled(
      masterNodeID === "" || masterNodeErrorMsg !== ""
    );
  }, [masterNodeID, masterNodeErrorMsg]);

  return (
    <>
      <div className="text-gray-600 dark:text-gray-100 font-semibold text-sm  tracking-[0.0025em]">
        Vote
      </div>

      <div className="flex flex-row mb-12 mt-1">
        <button
          type="button"
          disabled={isVoteSelectionDisabled}
          data-testid="OnChainGovernance.VotingFlow.NoVote"
          className={classNames(
            "grow w-1/3 rounded-l border border-r-0 py-3 text-sm font-medium border-gray-300 disabled:opacity-30 tracking-[0.015em]",
            userSelectedVote === VoteDecision.NO
              ? "text-white border-0 bg-red-600"
              : "text-red-600"
          )}
          onClick={() => {
            setUserSelectedVote(VoteDecision.NO);
          }}
        >
          NO
        </button>

        <button
          type="button"
          data-testid="OnChainGovernance.VotingFlow.NeutralVote"
          disabled={isVoteSelectionDisabled}
          className={classNames(
            "grow w-1/3 border py-3 text-sm font-medium border-gray-300 disabled:opacity-30 tracking-[0.015em]",
            userSelectedVote === VoteDecision.NEUTRAL
              ? "text-white border-0 bg-gray-600"
              : "text-gray-600"
          )}
          onClick={() => {
            setUserSelectedVote(VoteDecision.NEUTRAL);
          }}
        >
          NEUTRAL
        </button>

        <button
          type="button"
          data-testid="OnChainGovernance.VotingFlow.YesVote"
          disabled={isVoteSelectionDisabled}
          className={classNames(
            "grow w-1/3 border border-l-0 rounded-r py-3 text-sm font-medium border-gray-300 disabled:opacity-30 tracking-[0.015em]",
            userSelectedVote === VoteDecision.YES
              ? "text-white border-0 bg-green-600"
              : "text-green-600"
          )}
          onClick={() => {
            setUserSelectedVote(VoteDecision.YES);
          }}
        >
          YES
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
  setUserConfirmedSelectedVote,
  setVoteStage,
  setIsLoading,
}: {
  setVoteCommand: Dispatch<SetStateAction<string>>;
  masternodeID: string;
  userSelectedVote: VoteDecision | undefined;
  proposalId: string;
  setUserConfirmedSelectedVote: Dispatch<
    SetStateAction<VoteDecision | undefined>
  >;
  setVoteStage: Dispatch<SetStateAction<VoteStages>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const voteCommand = `votegov ${proposalId} ${masternodeID} ${userSelectedVote}`;
  return (
    <>
      <div className="grid grid-rows-[20px_minmax(70px,_1fr)] grid-cols-2 gap-y-3 mt-6">
        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.Vote"
          className="text-gray-600 tracking-[0.0044em]"
        >
          Vote
        </div>

        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.UserSelectedVote"
          className={classNames(
            "text-right capitalize font-medium tracking-[0.0044em]",
            getVotesStyle(userSelectedVote)
          )}
        >
          {userSelectedVote}
        </div>

        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.Masternode"
          className="text-gray-600 tracking-[0.0044em]"
        >
          Masternode
        </div>
        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.UserMasternodeID"
          className="text-gray-900 break-all font-medium text-right tracking-[0.0044em]"
        >
          {masternodeID}
        </div>
      </div>

      <div className="flex flex-col mt-12">
        <button
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.ConfirmDetailsButton"
          type="button"
          onClick={() => {
            setUserConfirmedSelectedVote(userSelectedVote);
            setVoteStage(VoteStages.ReadyVoteId);
            setVoteCommand(voteCommand);
            setIsLoading(true);
          }}
          className="w-full py-4 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100 tracking-[0.0086em]"
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

  const transformUserSelectVote =
    userSelectedVote?.charAt(0).toLocaleUpperCase() +
    userSelectedVote!.slice(1);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <CgSpinner size={48} className="animate-spin text-blue-500" />
          <Dialog.Title
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.LoadingTitle"
            as="h3"
            className="font-semibold text-center text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Your vote is getting ready
          </Dialog.Title>
          <div className="flex flex-row mt-2 text-center">
            <div
              data-selected={userSelectedVote}
              className="text-lg text-gray-600"
            >
              You have voted &lsquo;{transformUserSelectVote}&rsquo; for this
              proposal.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CircularCheckIcon />
          <Dialog.Title
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.Title"
            as="h3"
            className="font-semibold text-center text-2xl text-gray-900 dark:text-gray-100 mt-6"
          >
            Vote ID is now ready
          </Dialog.Title>
          <span
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.SubTitle"
            className="text-lg mt-2 text-center flex text-gray-600 mb-8"
          >
            Use the provided command line to submit this on-chain through your
            full node wallet CLI.
          </span>

          <div className="rounded-[10px] border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-row">
              <div
                data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.VoteCommand"
                className="text-gray-900 break-all md:line-clamp-none line-clamp-2"
              >
                {voteCommand}
              </div>
              <div
                data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.CopyVoteCommand"
                className="flex flex-row ml-[18px] self-center align-middle gap-x-1"
              >
                <CopyButton
                  withCopyText
                  buttonClass="border-0"
                  iconsClass="text-primary-500 self-center mr-[6px] w-[18px] h-[18px]"
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
            className="w-full py-3 rounded-sm font-medium border border-primary-50 text-primary-500 bg-primary-50 hover:bg-primary-100 hover:border-primary-100"
          >
            CLOSE
          </button>
        </div>
      )}
    </>
  );
}

function getVotesStyle(vote: VoteDecision | undefined) {
  if (vote === VoteDecision.NO) {
    return "text-red-600";
  }
  if (vote === VoteDecision.YES) {
    return "text-green-600";
  }
  if (vote === VoteDecision.NEUTRAL) {
    return "text-gray-600";
  }
}
