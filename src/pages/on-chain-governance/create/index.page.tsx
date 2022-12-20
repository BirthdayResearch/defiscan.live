import { useState } from "react";
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
import { CopyButton } from "@components/commons/CopyButton";
import { ProposalDisplayName } from "../_components/ProposalCard";
import { ReviewProposal } from "../_components/ReviewProposal";
import { InputComponent } from "../_components/InputComponent";
import { GettingStartedInfo } from "../_components/GettingStartedInfo";
import { DisclosureComponent } from "../_components/DisclosureComponent";

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
    return "Invalid github URL";
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
      return "Invalid address";
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

  const command =
    proposalType === ProposalDisplayName.CommunityFundProposal
      ? `creategovcfp '{"title": "${title}" ,"context":"${context}","amount": ${amount} ,"payoutAddress":"${payoutAddress}", "cycle": "${cycle}"}'`
      : `creategovvoc '{"title": "${title}" ,"context":"${context}"}'`;
  return (
    <>
      <Head title="On-Chain Proposal" />
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
            title="Step 1: Proposal Details"
            isOpen={activeStep === 1}
            isCompleted={activeStep > 1}
            {...(activeStep > 1 && { onEdit: () => setActiveStep(1) })}
          >
            <span className="text-gray-600 dark:text-gray-100 text-sm md:text-base">
              Enter from Github the title of the proposal and the type of
              proposal.
            </span>
            <RadioGroup
              value={proposalType}
              onChange={setProposalType}
              className="flex flex-col md:flex-row my-6 md:space-x-3 space-y-2 md:space-y-0"
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
                onChange={(value) => setTitle(value as string)}
              />
              <InputComponent
                label="Github discussion"
                placeholder="Paste URL"
                error={isValidGithubUrl()}
                value={context}
                onChange={(value) => setContext(value as string)}
              />
              {proposalType === ProposalDisplayName.CommunityFundProposal && (
                <>
                  <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <InputComponent
                        label="Funding amount in DFI"
                        placeholder="0.00 DFI"
                        value={amount}
                        error={isValidAmount()}
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
                        infoDesc="Cycles"
                        error={isValidCycle()}
                        value={cycle}
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
                                  ? "text-gray-300"
                                  : "text-gray-900"
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
                                  ? "text-gray-300"
                                  : "text-gray-900"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InputComponent
                    label="Payout Address"
                    placeholder="Paste DFI address for receiving payout"
                    value={payoutAddress}
                    error={isValidAddress()}
                    onChange={(value) => setPayoutAddress(value as string)}
                  />
                </>
              )}
              <div className="flex flex-col-reverse md:flex-row md:space-x-2">
                <button
                  onClick={() => {
                    if (canClearForm()) {
                      setCycle(1);
                      setTitle("");
                      setAmount("");
                      setContext("");
                      setPayoutAddress("");
                    }
                  }}
                  disabled={!canClearForm()}
                  type="button"
                  className={classNames(
                    "w-full md:w-1/2 py-3 border rounded-sm font-semibold mt-4 md:mt-0",
                    canClearForm()
                      ? "border-gray-300 text-primary-500"
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
                    }
                  }}
                  className={classNames(
                    "w-full md:w-1/2 py-3 rounded-sm font-semibold border",
                    canReviewProposal()
                      ? "border-primary-50 text-primary-500 bg-primary-50"
                      : "text-gray-300 bg-gray-100 border-gray-50"
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
            <span className="text-gray-600 dark:text-gray-100 text-sm md:text-base">
              To finalize your submission on-chain, copy the generated command
              line, and paste it in the CLI located in your full node wallet. If
              you have not downloaded a full node wallet,
              <a
                className="text-[#4A72DA]"
                href="/"
                target="_blank"
                rel="noreferrer"
              >
                &nbsp;download here
              </a>
            </span>
            <div className="flex flex-row mt-6 mb-2 md:mb-4 bg-blue-100 rounded py-3 px-4 items-center">
              <span className="text-[#4A72DA] break-all">{command}</span>
              <CopyButton
                className="ml-2"
                content={command}
                iconsClass="text-[#4A72DA] h-6 w-6"
                buttonClass="cursor-pointer outline-none bg-transparent dark:bg-transparent border-none"
              />
            </div>
            <span className="text-orange-600 text-xs md:text-sm">
              Command line submitted into CLI will not be editable. Please check
              your details carefully before submitting.
            </span>
          </DisclosureComponent>
        </div>
      </Container>
    </>
  );
}
