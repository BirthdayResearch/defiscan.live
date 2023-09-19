import {
  Transaction,
  TransactionVin,
  TransactionVout,
} from "@defichain/whale-api-client/dist/api/transactions";
import { useNetwork } from "@contexts/NetworkContext";
import { IoArrowForwardOutline } from "react-icons/io5";
import { fromScriptHex } from "@defichain/jellyfish-address";
import BigNumber from "bignumber.js";
import { TransactionVectorRow } from "@components/commons/transactions/TransactionVectorRow";

interface TransactionVinVoutProps {
  transaction: Transaction;
  vins: TransactionVin[];
  vouts: TransactionVout[];
  fee: BigNumber;
  isEvmTx: boolean;
  dftxName?: string;
}

export function TransactionVinVout(
  props: TransactionVinVoutProps,
): JSX.Element {
  const network = useNetwork().name;

  return (
    <>
      <h1
        className="font-medium text-2xl mt-6 dark:text-dark-gray-900"
        data-testid="details-subtitle"
      >
        Details
      </h1>
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <div
            className="flex flex-col space-y-1"
            data-testid="TransactionDetailsLeft.List"
          >
            {props.isEvmTx ? (
              <TransactionVectorRow
                label="INPUT"
                address="N/A"
                value="EvmTx"
                network={network}
                isAddressClickable={false}
              />
            ) : (
              props.vins.map((vin) => {
                const decoded =
                  vin.vout !== undefined
                    ? fromScriptHex(vin.vout.script?.hex, network)
                    : undefined;
                const address = decoded?.address ?? "N/A";

                if (vin.vout === undefined) {
                  return (
                    <TransactionVectorRow
                      label="INPUT"
                      address={address}
                      value="Coinbase (Newly Generated Coins)"
                      key={vin.id}
                      network={network}
                      isAddressClickable={false}
                    />
                  );
                }

                return (
                  <TransactionVectorRow
                    label="INPUT"
                    address={address}
                    value={`${vin.vout.value} DFI`}
                    key={vin.id}
                    network={network}
                    isAddressClickable
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="flex items-center justify-center text-gray-600 w-full lg:w-auto lg:h-20">
          <IoArrowForwardOutline
            className="transform rotate-90 lg:rotate-0"
            size={24}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div
            className="flex flex-col space-y-1"
            data-testid="TransactionDetailsRight.List"
          >
            {props.vouts.map((vout, index) => {
              const decoded =
                vout.script !== undefined
                  ? fromScriptHex(vout.script?.hex, network)
                  : undefined;

              let address = decoded?.address ?? "N/A";
              if (index === 0) {
                address = decoded?.address ?? props.dftxName ?? "N/A";
              }

              return (
                <TransactionVectorRow
                  label="OUTPUT"
                  address={address}
                  value={`${vout.value} DFI`}
                  key={vout.n}
                  network={network}
                  isAddressClickable={decoded?.address !== undefined}
                />
              );
            })}
          </div>
        </div>
      </div>

      <TransactionSummary
        transaction={props.transaction}
        vins={props.vins}
        fee={props.fee}
        isEvmTx={props.isEvmTx}
      />
    </>
  );
}

function TransactionSummary(props: {
  transaction: Transaction;
  vins: TransactionVin[];
  fee: BigNumber;
  isEvmTx: boolean;
}): JSX.Element {
  let fee = `${props.fee.toFixed(8)} DFI`;
  if (props.isEvmTx) {
    fee = "EvmTx";
  } else if (props.vins.length > 0 && props.vins[0].vout === undefined) {
    fee = "Coinbase";
  }

  return (
    <div className="flex flex-col items-end justify-between mt-8 dark:text-dark-gray-900">
      <div
        className="flex justify-between space-x-3"
        data-testid="TransactionDetailsSummary.fee"
      >
        <span>Fees:</span>
        <span>{fee}</span>
      </div>
      <div
        className="flex justify-between space-x-3 mt-2"
        data-testid="TransactionDetailsSummary.total"
      >
        <span>Total:</span>
        <span>{props.transaction.totalVoutValue} DFI</span>
      </div>
    </div>
  );
}
