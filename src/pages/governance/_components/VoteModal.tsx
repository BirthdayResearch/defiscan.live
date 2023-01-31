import { IoMdClose } from "react-icons/io";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { useState, useMemo } from "react";
import { CopyToClipboardIcon } from "./CopyToClipboardIcon";

enum VoteDecision {
  Yes = "yes",
  No = "no",
  Neutral = "neutral",
}

export function VoteModal({
  proposalId,
  onClose,
}: {
  proposalId: string;
  onClose: () => void;
}) {
  const mockMasternodeId =
    "3432erthyhfujrgrterthyhqepojgfiboget784reedwfert534xD";
  const [decision, setDecision] = useState<VoteDecision | undefined>();
  const [isCopy, setIsCopy] = useState(false);
  function onClickCopy(content: string) {
    navigator.clipboard.writeText(content).then(() => setIsCopy(true));
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  }

  const voteCommand = useMemo(() => {
    return `votegov ${proposalId} ${mockMasternodeId} ${decision}`;
  }, [decision]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[60] flex justify-center backdrop-blur-2xl">
      <div className="bg-white mx-5 mt-20 px-4 pb-5 pt-11 md:p-10 w-[536px] h-fit relative md:rounded-lg rounded-xl">
        <IoMdClose
          size={24}
          className="absolute text-gray-600 cursor-pointer top-5 md:top-6 right-4 md:right-6"
          onClick={() => onClose()}
        />
        <span className="text-2xl font-semibold text-gray-900 mb-3 block">
          Vote on [Name of Proposal]
        </span>
        <span className="text-gray-900 mb-4 block">
          1. Choose on the option below
        </span>
        <div className="flex flex-col md:flex-row gap-2">
          <VoteButton
            label="YES"
            onClick={() => setDecision(VoteDecision.Yes)}
          />
          <VoteButton label="NO" onClick={() => setDecision(VoteDecision.No)} />
          <VoteButton
            label="NEUTRAL"
            onClick={() => setDecision(VoteDecision.Neutral)}
          />
        </div>
        {decision !== undefined && (
          <div className="mt-4 md:mt-8">
            <span className="text-gray-900 mb-4 block">
              2. Copy and paste command below on CLI
            </span>
            <span className="text-sm text-gray-500">Voting command</span>
            <button
              className="border border-blue-200 bg-blue-50 rounded mt-1 md:mt-2 py-2.5 px-4 flex items-center justify-between"
              onClick={() => onClickCopy(voteCommand)}
              type="button"
            >
              <span className="text-[#4A72DA] mr-3 text-left break-all">
                {isCopy ? "Copied to dashboard!" : voteCommand}
              </span>
              {isCopy ? (
                <MdOutlineCheckCircleOutline
                  size={24}
                  className="shrink-0 text-[#4A72DA]"
                />
              ) : (
                <CopyToClipboardIcon customStyle="shrink-0" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function VoteButton({
  label,
  customStyle,
  onClick,
}: {
  label: string;
  customStyle?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full rounded-sm text-center py-3 text-primary-500 font-medium border border-gray-300 hover:border-primary-200 focus:bg-primary-50 focus:border-primary-50 ${
        customStyle ?? ""
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
