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
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import { InfoHoverPopover } from "@components/commons/popover/InfoHoverPopover";
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

  const localStorageMasterNodeId = getLocalStorageItem(
    "masternodeId",
    connection
  );

  const [masternodeId, setMasternodeId] = useState(localStorageMasterNodeId);
  const [userSelectedVote, setUserSelectedVote] = useState<VoteDecision>();

  function closeStates() {
    setVoteStage(VoteStages.VoteProposal);
    setUserSelectedVote(userConfirmedSelectedVote);
    setIsLoading(false);
    setMasternodeId(localStorageMasterNodeId);
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
                  "w-full max-w-[512px] transform overflow-hidden rounded-[10px] bg-white dark:bg-dark-gray-100 p-5 md:p-8 text-left align-middle shadow-xl transition-all",
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
                        <div className="flex flex-row gap-x-1 text-blue-500 font-medium hover:underline">
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
                      <MdClear
                        size={24}
                        className="text-gray-600 dark:text-dark-gray-600"
                      />
                    </button>
                  </div>
                )}

                <Dialog.Title
                  data-testid="OnChainGovernance.VotingFlow.ModalTitle"
                  as="h3"
                  className="font-semibold text-2xl text-gray-900 dark:text-dark-gray-900"
                >
                  {voteStage !== VoteStages.ReadyVoteId && voteStage}
                </Dialog.Title>

                {voteStage === VoteStages.VoteProposal && (
                  <VoteForProposal
                    setMasternodeId={setMasternodeId}
                    masternodeId={masternodeId}
                    setUserSelectedVote={setUserSelectedVote}
                    userSelectedVote={userSelectedVote}
                    setVoteStage={setVoteStage}
                  />
                )}

                {voteStage === VoteStages.ReviewVote && (
                  <UserReviewVote
                    proposalId={proposalId}
                    setVoteCommand={setVoteCommand}
                    masternodeId={masternodeId}
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
  setMasternodeId,
  masternodeId,
  setUserSelectedVote,
  userSelectedVote,
  setVoteStage,
}: {
  setMasternodeId: Dispatch<SetStateAction<string>>;
  masternodeId: string;
  setUserSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
  userSelectedVote: VoteDecision | undefined;
  setVoteStage: Dispatch<SetStateAction<VoteStages>>;
}) {
  const { connection } = useNetwork();
  const [isMasterNodeInputFocus, setIsMasterNodeInputFocus] = useState(false);
  const [masternodeErrorMsg, setMasterNodeErrorMsg] = useState("");

  const localStorageRememberMasterNodeId = getLocalStorageItem(
    "rememberMasternodeId",
    connection
  );

  const [rememberMasternodeId, setRememberMasternodeId] = useState(
    localStorageRememberMasterNodeId
  );
  const ref = useRef<HTMLTextAreaElement>(null);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (ref.current) {
      // Set initial base height to get the correct scrollHeight
      ref.current.style.height = "20px";
      // Then set the height = scrollHeight
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, masternodeId, dimension]);

  return (
    <>
      <div className="mt-2 mb-6">
        <span
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.SubTitle"
          className="text-lg text-gray-600 dark:text-dark-gray-600"
        >
          Confirm your masternode and vote on the proposal
        </span>
      </div>

      <div className="flex">
        <span
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.Masternode"
          className="text-gray-600 dark:text-dark-gray-600 font-semibold text-sm"
        >
          Masternode
        </span>
        <InfoHoverPopover
          className="ml-1 self-center"
          description={
            <div className="px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs dark:bg-gray-800 dark:border-gray-700 dark:text-dark-gray-900">
              Masternode ID can be retrieved by using the command
              <span className="font-medium bg-orange-100 dark:bg-dark-orange-500/[0.25] mx-1 px-1 rounded">
                &nbsp;getmininginfo&nbsp;
              </span>
              on CLI.
            </div>
          }
          placement="top"
        />
      </div>

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
            "flex flex-row rounded border py-3 px-4 w-full dark:bg-dark-gray-0 justify-between",
            isMasterNodeInputFocus
              ? "border-primary-300 dark:border-dark-primary-300"
              : "border-gray-300 dark:border-dark-gray-300",
            {
              "border-red-500 dark:border-dark-red-500":
                masternodeErrorMsg !== "",
            }
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
              setMasternodeId(v.target.value);
            }}
            value={masternodeId}
            className="w-11/12 overflow-visible resize-none text-sm focus:outline-none focus:caret-[#007AFF] dark:bg-dark-gray-0 text-gray-900 dark:text-dark-gray-900 disabled:bg-white dark:disabled:bg-gray-800 placeholder:text-gray-400"
            placeholder="Masternode ID"
          />

          {isMasterNodeInputFocus && (
            <button
              data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeClearInput"
              type="button"
              className="rounded-full h-4 w-4 bg-gray-100 self-center cursor-pointer text-center"
              onMouseDown={() => {
                setMasternodeId("");
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

      {masternodeErrorMsg !== "" ? (
        <div
          data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeErrorMsg"
          className="text-red-500 dark:text-dark-red-500 text-xs mt-2 md:mb-4 mb-6"
        >
          {masternodeErrorMsg}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (rememberMasternodeId === RememberMasterNodeId.Yes) {
              setRememberMasternodeId(RememberMasterNodeId.No);
            } else {
              setRememberMasternodeId(RememberMasterNodeId.Yes);
            }
          }}
          className={classNames(
            "flex flex-row gap-x-[6px] items-center mt-2 md:mb-4 mb-6 accent-blue-600 dark:accent-dark-blue-600"
          )}
        >
          <input
            data-testid="OnChainGovernance.VotingFlow.VoteForProposal.MasternodeCheckBox"
            type="checkbox"
            onChange={(value) => {
              if (value.target.checked) {
                setRememberMasternodeId(RememberMasterNodeId.Yes);
              } else {
                setRememberMasternodeId(RememberMasterNodeId.No);
              }
            }}
            checked={rememberMasternodeId === RememberMasterNodeId.Yes}
          />
          <div className="text-gray-600 dark:text-dark-gray-600 text-sm">
            Remember Masternode ID
          </div>
        </button>
      )}

      <UserVote
        masternodeId={masternodeId}
        masternodeErrorMsg={masternodeErrorMsg}
        userSelectedVote={userSelectedVote}
        setUserSelectedVote={setUserSelectedVote}
      />

      <button
        data-testid="OnChainGovernance.VotingFlow.VoteForProposal.ContinueButton"
        type="button"
        disabled={
          masternodeErrorMsg !== "" ||
          masternodeId === "" ||
          userSelectedVote === undefined
        }
        onClick={() => {
          onContinueVoteButtonClick(
            connection,
            rememberMasternodeId,
            masternodeId,
            setVoteStage
          );
        }}
        className="w-full py-3 rounded-sm font-medium border border-primary-50 dark:border-dark-primary-50 text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 hover:border-primary-100 hover:dark:border-dark-primary-100 disabled:bg-gray-50 disabled:dark:bg-dark-gray-50 disabled:border-transparent disabled:text-gray-300 disabled:dark:text-dark-gray-300"
      >
        CONTINUE
      </button>
    </>
  );
}

function UserVote({
  masternodeId,
  masternodeErrorMsg,
  userSelectedVote,
  setUserSelectedVote,
}: {
  masternodeId: string;
  masternodeErrorMsg: string;
  userSelectedVote: VoteDecision | undefined;
  setUserSelectedVote: Dispatch<SetStateAction<VoteDecision>>;
}) {
  const [isVoteSelectionDisabled, setIsVoteSelectionDisabled] = useState(
    masternodeId === "" || masternodeErrorMsg !== ""
  );
  useEffect(() => {
    setIsVoteSelectionDisabled(
      masternodeId === "" || masternodeErrorMsg !== ""
    );
  }, [masternodeId, masternodeErrorMsg]);

  return (
    <>
      <div className="text-gray-600 dark:text-dark-gray-600 font-semibold text-sm ">
        Vote
      </div>

      <div className="flex flex-row mb-12 mt-1">
        <button
          type="button"
          disabled={isVoteSelectionDisabled}
          data-testid="OnChainGovernance.VotingFlow.NoVote"
          className={classNames(
            "grow w-1/3 rounded-l border border-r-[0.5px] py-3 text-sm font-medium border-gray-300 dark:border-dark-gray-300 disabled:opacity-30",
            userSelectedVote === VoteDecision.NO
              ? "text-white dark:text-dark-gray-0 border-0 bg-red-600 dark:bg-dark-red-600"
              : "text-red-600 dark:text-dark-red-600 dark:bg-dark-gray-50"
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
          disabled
          className={classNames(
            "grow w-1/3 border border-r-[0.5px] border-l-[0.5px] py-3 text-sm font-medium border-gray-300 dark:border-dark-gray-300 disabled:dark:border-opacity-30 disabled:border-opacity-30 disabled:dark:text-opacity-30 disabled:text-opacity-30",
            userSelectedVote === VoteDecision.NEUTRAL
              ? "text-white dark:text-dark-gray-0 border-0 bg-gray-600/[0.30] dark:bg-dark-gray-600/[0.30]"
              : "text-gray-600 dark:text-dark-gray-600 dark:bg-dark-gray-50 dark:bg-opacity-30"
          )}
          onClick={() => {
            setUserSelectedVote(VoteDecision.NEUTRAL);
          }}
        >
          <div className="flex self-center justify-center">
            NEUTRAL
            <InfoHoverPopover
              className="ml-1 self-center"
              description="The neutral option is disabled due to a bug which treats the neutral vote as a no vote"
              placement="top"
            />
          </div>
        </button>

        <button
          type="button"
          data-testid="OnChainGovernance.VotingFlow.YesVote"
          disabled={isVoteSelectionDisabled}
          className={classNames(
            "grow w-1/3 border border-l-[0.5px] rounded-r py-3 text-sm font-medium border-gray-300 dark:border-dark-gray-300 disabled:opacity-30",
            userSelectedVote === VoteDecision.YES
              ? "text-white dark:text-dark-gray-0 border-0 bg-green-600 dark:bg-dark-green-600"
              : "text-green-600 dark:text-dark-green-600 dark:bg-dark-gray-50"
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
  masternodeId,
  userSelectedVote,
  proposalId,
  setUserConfirmedSelectedVote,
  setVoteStage,
  setIsLoading,
}: {
  setVoteCommand: Dispatch<SetStateAction<string>>;
  masternodeId: string;
  userSelectedVote: VoteDecision | undefined;
  proposalId: string;
  setUserConfirmedSelectedVote: Dispatch<
    SetStateAction<VoteDecision | undefined>
  >;
  setVoteStage: Dispatch<SetStateAction<VoteStages>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const voteCommand = `votegov ${proposalId} ${masternodeId} ${userSelectedVote}`;
  return (
    <>
      <div className="grid grid-rows-[20px_minmax(70px,_1fr)] grid-cols-2 gap-y-3 mt-6">
        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.Vote"
          className="text-gray-600 dark:text-dark-gray-600"
        >
          Vote
        </div>

        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.UserSelectedVote"
          className={classNames(
            "text-right capitalize font-medium",
            getVotesStyle(userSelectedVote)
          )}
        >
          {userSelectedVote}
        </div>

        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.Masternode"
          className="text-gray-600 dark:text-dark-gray-600"
        >
          Masternode
        </div>
        <div
          data-testid="OnChainGovernance.VotingFlow.UserReviewVote.UserMasternodeID"
          className="text-gray-900 dark:text-dark-gray-900 break-all font-medium text-right"
        >
          {masternodeId}
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
          className="w-full py-4 rounded-sm font-medium border border-primary-50 dark:border-dark-primary-50 text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 hover:border-primary-100 hover:dark:border-dark-primary-100"
        >
          CONFIRM DETAILS
        </button>
        <span className="text-xs self-center text-center mt-3 flex text-gray-500 dark:text-dark-gray-500">
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
          <CgSpinner
            size={48}
            className="animate-spin text-blue-500 dark:text-dark-blue-500"
          />
          <Dialog.Title
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.LoadingTitle"
            as="h3"
            className="font-semibold text-center text-2xl text-gray-900 dark:text-dark-gray-900 mt-6"
          >
            Your vote is getting ready
          </Dialog.Title>
          <div className="flex flex-row mt-2 text-center">
            <div
              data-selected={userSelectedVote}
              className="text-lg text-gray-600 dark:text-dark-gray-600"
            >
              You have voted &lsquo;{transformUserSelectVote}&rsquo; for this
              proposal.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CircularCheckIcon className="fill-green-600 dark:fill-dark-green-600" />
          <Dialog.Title
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.Title"
            as="h3"
            className="font-semibold text-center text-2xl text-gray-900 dark:text-dark-gray-900 mt-6"
          >
            Vote ID is now ready
          </Dialog.Title>
          <span
            data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.SubTitle"
            className="text-lg mt-2 text-center flex text-gray-600 dark:text-dark-gray-600 mb-8"
          >
            Use the provided command line to submit this on-chain through your
            full node wallet CLI.
          </span>

          <div className="rounded-[10px] border border-gray-200 dark:border-dark-gray-300 p-4">
            <div className="flex flex-row">
              <div
                data-testid="OnChainGovernance.VotingFlow.ReadyVoteID.VoteCommand"
                className="text-gray-900 dark:text-dark-gray-900 break-all md:line-clamp-none line-clamp-2"
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
                  iconsClass="text-primary-500 dark:text-dark-primary-500 self-center mr-[6px] w-[18px] h-[18px]"
                  content={voteCommand}
                />
              </div>
            </div>
          </div>

          <span className="text-xs text-center flex text-gray-500 dark:text-dark-gray-500 mt-2 mb-8">
            Copy and paste this to your full-node wallet CLI.
          </span>

          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="w-full py-3 rounded-sm font-medium border border-primary-50 dark:border-dark-primary-50 text-primary-500 dark:text-dark-primary-500 bg-primary-50 dark:bg-dark-primary-50 hover:bg-primary-100 hover:dark:bg-dark-primary-100 hover:border-primary-100 hover:dark:border-dark-primary-100"
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
    return "text-red-600 dark:text-dark-red-600";
  }
  if (vote === VoteDecision.YES) {
    return "text-green-600 dark:text-dark-green-600";
  }
  if (vote === VoteDecision.NEUTRAL) {
    return "text-gray-900 dark:text-dark-gray-900";
  }
}

/**
 * Update `masternodeId` and `rememberMasternodeId` in localStorage for current network without overwriting others
 */
function onContinueVoteButtonClick(
  connection: EnvironmentNetwork,
  rememberMasternodeId: RememberMasterNodeId,
  masternodeId: string,
  setVoteStage: Dispatch<SetStateAction<VoteStages>>
) {
  const rememberMasternodeObj =
    getLocalStorageItem("rememberMasternodeId") ?? {};
  rememberMasternodeObj[connection] = rememberMasternodeId;

  const masternodeIdObj = getLocalStorageItem("masternodeId") ?? {};
  masternodeIdObj[connection] = masternodeId;

  setLocalStorage(`rememberMasternodeId`, rememberMasternodeObj);

  setVoteStage(VoteStages.ReviewVote);
  if (rememberMasternodeId === RememberMasterNodeId.Yes) {
    setLocalStorage(`masternodeId`, masternodeIdObj);
  } else {
    masternodeIdObj[connection] = "";
    setLocalStorage(`masternodeId`, masternodeIdObj);
  }
}
