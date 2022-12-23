import React, { useEffect, useState } from "react";
import { Container } from "@components/commons/Container";
import { Head } from "@components/commons/Head";
import {
  MdRemove,
  MdAdd,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import { fromAddress } from "@defichain/jellyfish-address";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkName } from "@defichain/jellyfish-network";
import { isPlayground } from "@contexts/Environment";
import { ProposalDisplayName } from "../_components/ProposalCard";
import { ReviewProposal } from "../_components/ReviewProposal";
import { InputComponent } from "../_components/InputComponent";
import { GettingStartedInfo } from "../_components/GettingStartedInfo";
import { DisclosureComponent } from "../_components/DisclosureComponent";
import { ConfirmDialog } from "../_components/ConfirmDialog";
import { SubmitProposal } from "../_components/SubmitProposal";

export default function ProposalDetailPage() {
  const { connection } = useNetwork();
  const [activeStep, setActiveStep] = useState(1);
  const [title, setTitle] = useState<string>("");
  const [proposalType, setProposalType] = useState(
    ProposalDisplayName.CommunityFundProposal
  );
  const [payoutAddress, setPayoutAddress] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [cycle, setCycle] = useState<number>(1);
  const [minCycle, maxCycle] = [1, 100];
  const [isEditing, setEditing] = useState<boolean>(false);
  const [visited, setVisited] = useState<{ [key: string]: boolean }>({});
  const [canSwitchType, setCanSwitchType] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setEditing(false);
    }
  }, [title, proposalType, payoutAddress, context, amount, cycle]);

  const proposalTypes = [
    {
      name: "Community Funding Proposal (CFP)",
      description:
        "Proposal to build on top of the DeFiChain blockchain, and funded by the Community Development Fund.",
      value: ProposalDisplayName.CommunityFundProposal,
    },
    {
      name: "DeFiChain Improvement Proposal (DFIP)",
      description: "Proposal to improve the key function(s) on DeFiChain.",
      value: ProposalDisplayName.VoteOfConfidence,
    },
  ];

  function isValidName() {
    if (title === "" || new Blob([title]).size > 128) {
      return "Invalid proposal name";
    }
    return "";
  }

  function isValidAmount() {
    if (amount === "") {
      return "Invalid amount";
    }
    return "";
  }

  function isValidGithubUrl() {
    const regex = /https?:\/\/github\.com\/(?:[^/\s]+\/)+(?:issues\/\d+)$/gm;
    if (regex.test(context)) {
      return "";
    }
    return "Invalid URL. Only Github URL are accepted";
  }

  function isValidCycle() {
    if (cycle >= minCycle && cycle <= maxCycle) {
      return "";
    }
    return "Invalid cycle";
  }

  function isValidAddress(): string {
    const network = isPlayground(connection)
      ? "regtest"
      : (connection.toLowerCase() as NetworkName);
    const decodedAddress = fromAddress(payoutAddress, network);
    if (decodedAddress === undefined) {
      return "Invalid payout address. Only DFI addresses are accepted";
    }
    return "";
  }

  function canReviewProposal(): boolean {
    if (isValidName() !== "" || isValidGithubUrl() !== "") {
      return false;
    }
    if (proposalType === ProposalDisplayName.CommunityFundProposal) {
      if (
        isValidCycle() !== "" ||
        isValidAmount() !== "" ||
        isValidAddress() !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  function canClearForm(): boolean {
    if (
      title !== "" ||
      context !== "" ||
      amount !== "" ||
      payoutAddress !== "" ||
      cycle > minCycle
    ) {
      return true;
    }
    return false;
  }

  function clearForm() {
    if (canClearForm()) {
      setCycle(1);
      setTitle("");
      setAmount("");
      setContext("");
      setPayoutAddress("");
      setVisited({});
    }
  }

  const command =
    proposalType === ProposalDisplayName.CommunityFundProposal
      ? `creategovcfp '{"title": "${title}" ,"context":"${context}","amount": ${amount} ,"payoutAddress":"${payoutAddress}", "cycle": "${cycle}"}'`
      : `creategovvoc '{"title": "${title}" ,"context":"${context}"}'`;

  return (
    <>
      <Head title="Create Proposal" />
      <Container className="mt-10 md:mt-12 px-6 lg:px-[312px]">
        <Breadcrumb
          items={[
            {
              path: "/on-chain-governance",
              name: "Proposal",
            },
            {
              path: `/on-chain-governance/create`,
              name: "Create Proposal",
              canonical: true,
            },
          ]}
        />
        <h1 className="text-2xl	md:text-4xl font-semibold mt-2 mb-6 text-gray-900 dark:text-gray-100">
          Create Proposal
        </h1>
        <div className="flex flex-col space-y-2">
          <GettingStartedInfo />
          {/* Step 1 */}
          <DisclosureComponent
            title="Step 1: Proposal details"
            isOpen={activeStep === 1}
            isCompleted={activeStep > 1 || (isEditing && activeStep === 1)}
            {...(activeStep > 1 && {
              onEdit: () => {
                setActiveStep(1);
                setEditing(true);
              },
            })}
          >
            <span className="text-gray-600 dark:text-gray-100 text-sm md:text-base">
              Enter from Github the title of the proposal and the type of
              proposal.
            </span>
            <RadioGroup
              value={proposalType}
              onChange={(type) => {
                if (canSwitchType) {
                  return setProposalType(type);
                }
                setIsDialogOpen(true);
              }}
              className="flex flex-col md:flex-row my-6 md:space-x-3 space-y-3 md:space-y-0"
            >
              {proposalTypes.map((item) => (
                <RadioGroup.Option
                  value={item.value}
                  key={item.value}
                  className={({ checked }) =>
                    classNames(
                      "p-4 border rounded w-full md:w-1/2",
                      checked
                        ? "border-primary-300 dark:text-dark-primary-500"
                        : "border-gray-200 dark:border-gray-700"
                    )
                  }
                >
                  {({ checked }) => (
                    <div className="flex flex-row w-full cursor-pointer">
                      <div className="mr-2">
                        {checked ? (
                          <MdRadioButtonChecked
                            size={20}
                            className="text-primary-500 dark:text-dark-primary-500"
                          />
                        ) : (
                          <MdRadioButtonUnchecked
                            size={20}
                            className="text-gray-300"
                          />
                        )}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-dark-gray-500">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>

            <div className="space-y-6">
              <InputComponent
                label="Name of proposal"
                placeholder="Enter title of the proposal (required)"
                note="Make sure that the name added here is the same as from the one posted in Github."
                value={title}
                error={isValidName()}
                isVisited={visited.title}
                onBlur={() => setVisited({ ...visited, title: true })}
                onChange={(value) => setTitle(value as string)}
              />
              <InputComponent
                label="Github discussion"
                placeholder="Paste URL"
                error={isValidGithubUrl()}
                value={context}
                isVisited={visited.context}
                onBlur={() => setVisited({ ...visited, context: true })}
                onChange={(value) => setContext(value as string)}
              />
              {proposalType === ProposalDisplayName.CommunityFundProposal && (
                <>
                  <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <InputComponent
                        label="Amount requested in DFI"
                        placeholder="0.00 DFI"
                        value={amount}
                        isVisited={visited.amount}
                        error={isValidAmount()}
                        onBlur={() => setVisited({ ...visited, amount: true })}
                        onChange={(value) => {
                          const re = /^\d*\.?\d*$/;
                          if (value === "" || re.test(value.toString())) {
                            setAmount(value as string);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-row w-full md:w-1/2 md:ml-6">
                      <InputComponent
                        label="Cycles"
                        placeholder=""
                        infoDesc="Cycles determine the duration for which a proposal can accept votes. Each voting cycle lasts ~130,000 blocks."
                        error={isValidCycle()}
                        value={cycle}
                        isVisited={visited.cycle}
                        onBlur={() => setVisited({ ...visited, cycle: true })}
                        onChange={(value) => {
                          const re = /^\d*\.?\d*$/;
                          if (value === "" || re.test(value.toString())) {
                            if (value > maxCycle) {
                              return setCycle(maxCycle);
                            }
                            if (value < minCycle) {
                              return setCycle(minCycle);
                            }
                            setCycle(value as number);
                          }
                        }}
                      />
                      <div>
                        <div className="pt-5 flex flex-row">
                          <button
                            type="button"
                            disabled={cycle <= minCycle}
                            onClick={() => setCycle(cycle - 1)}
                            className="px-4 py-3 border-y border-l border-gray-300 rounded-l ml-2"
                          >
                            <MdRemove
                              size={24}
                              className={
                                cycle <= minCycle
                                  ? "text-gray-300 dark:text-gray-600"
                                  : "text-gray-900 dark:text-gray-100"
                              }
                            />
                          </button>
                          <button
                            type="button"
                            disabled={cycle >= maxCycle}
                            onClick={() => setCycle(cycle + 1)}
                            className="px-4 py-3 border border-gray-300 rounded-r"
                          >
                            <MdAdd
                              size={24}
                              className={
                                cycle >= maxCycle
                                  ? "text-gray-300 dark:text-gray-600"
                                  : "text-gray-900 dark:text-gray-100"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InputComponent
                    label="Receiving address"
                    placeholder="Paste DFI address for receiving payout"
                    value={payoutAddress}
                    error={isValidAddress()}
                    isVisited={visited.payoutAddress}
                    onBlur={() =>
                      setVisited({ ...visited, payoutAddress: true })
                    }
                    onChange={(value) => setPayoutAddress(value as string)}
                  />
                </>
              )}
              <div className="flex flex-col-reverse md:flex-row md:space-x-2">
                <button
                  onClick={clearForm}
                  disabled={!canClearForm()}
                  type="button"
                  className={classNames(
                    "w-full md:w-1/2 py-3 border rounded-sm font-medium text-base mt-4 md:mt-0",
                    canClearForm()
                      ? "border-gray-300 text-primary-500 hover:border-primary-200"
                      : "border-gray-100 text-gray-300"
                  )}
                >
                  CLEAR FORM
                </button>
                <button
                  type="button"
                  disabled={!canReviewProposal()}
                  onClick={() => {
                    if (canReviewProposal()) {
                      setActiveStep(2);
                      setCanSwitchType(false);
                      setEditing(false);
                    }
                  }}
                  className={classNames(
                    "w-full md:w-1/2 py-3 rounded-sm font-medium text-base border",
                    canReviewProposal()
                      ? "text-primary-500 bg-primary-50 border-primary-50 hover:bg-primary-100 hover:border-primary-100"
                      : "text-gray-300 bg-gray-100 border-gray-100"
                  )}
                >
                  REVIEW PROPOSAL
                </button>
              </div>
            </div>
          </DisclosureComponent>

          {/* Step 2 */}
          <DisclosureComponent
            title="Step 2: Review proposal"
            isOpen={activeStep === 2}
            isCompleted={activeStep > 2}
          >
            <ReviewProposal
              title={title}
              proposalType={proposalType}
              context={context}
              cycle={cycle}
              amount={amount}
              payoutAddress={payoutAddress}
              onClick={() => setActiveStep(3)}
            />
          </DisclosureComponent>

          {/* Step 3 */}
          <DisclosureComponent
            title="Step 3: Submit proposal on-chain"
            isOpen={activeStep === 3}
          >
            <SubmitProposal command={command} />
          </DisclosureComponent>
        </div>
      </Container>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          clearForm();
          setIsDialogOpen(false);
          setCanSwitchType(true);
          setProposalType(
            proposalType === ProposalDisplayName.CommunityFundProposal
              ? ProposalDisplayName.VoteOfConfidence
              : ProposalDisplayName.CommunityFundProposal
          );
        }}
      />
    </>
  );
}
