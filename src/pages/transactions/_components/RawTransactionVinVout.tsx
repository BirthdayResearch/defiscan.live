import { useNetwork } from "@contexts/NetworkContext";
import { IoArrowForwardOutline } from "react-icons/io5";
import { fromScript } from "@defichain/jellyfish-address";
import BigNumber from "bignumber.js";
import { TransactionVectorRow } from "@components/commons/transactions/TransactionVectorRow";
import {
  Transaction,
  TransactionSegWit,
  Vin,
  Vout,
} from "@defichain/jellyfish-transaction";

interface RawTransactionVinVoutProps {
  transaction: Transaction | TransactionSegWit;
  vins: Vin[];
  vouts: Vout[];
  dftxName?: string;
}

export function RawTransactionVinVout(
  props: RawTransactionVinVoutProps
): JSX.Element {
  const network = useNetwork().name;

  return (
    <>
      <h1
        className="font-medium text-2xl mt-6 dark:text-dark-gray-900"
        data-testid="RawTransaction.details-subtitle"
      >
        Details
      </h1>
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <div
            className="flex flex-col space-y-1"
            data-testid="RawTransaction.DetailsLeft.List"
          >
            {props.vins.map((vin) => {
              const decoded =
                vin.script !== undefined
                  ? fromScript(vin.script, network)
                  : undefined;
              return (
                <TransactionVectorRow
                  label="INPUT"
                  address={decoded?.address ?? "N/A"}
                  value=""
                  key={vin.txid}
                  network={network}
                  isAddressClickable={false}
                />
              );
            })}
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
            data-testid="RawTransaction.DetailsRight.List"
          >
            {props.vouts.map((vout, index) => {
              const decoded =
                vout.script !== undefined
                  ? fromScript(vout.script, network)
                  : undefined;

              let address = decoded?.address ?? "N/A";
              if (index === 0) {
                address = decoded?.address ?? props.dftxName ?? "N/A";
              }
              return (
                <TransactionVectorRow
                  label="OUTPUT"
                  address={address}
                  value={`${vout.value.toFixed(8)} DFI`}
                  key={index}
                  network={network}
                  isAddressClickable={decoded?.address !== undefined}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between mt-8 dark:text-dark-gray-900">
        <div
          className="flex justify-between space-x-3 mt-2"
          data-testid="RawTransaction.DetailsSummary.total"
        >
          <span>Total:</span>
          <span>{getTotalVoutValue(props.vouts)} DFI</span>
        </div>
      </div>
    </>
  );
}

function getTotalVoutValue(vouts: Vout[] | undefined): string {
  let value: BigNumber = new BigNumber(0);
  if (vouts !== undefined) {
    vouts.forEach((vout) => {
      value = new BigNumber(vout.value).plus(value);
    });
  }
  return value.toFixed(8);
}
