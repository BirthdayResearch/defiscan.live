import { useWhaleApiClient } from "@contexts/WhaleContext";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { ReactElement, useCallback, useState } from "react";

export function RawAccountHistory(props: {
  transaction: Transaction;
}): ReactElement {
  return (
    <div className="mt-8 mb-6 dark:text-gray-100">
      <h2 className="font-medium text-xl">Raw Account History</h2>

      <p className="align-middle mb-4 text-sm">
        Query raw defid account state at TxId:{" "}
        <code className="p-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          {props.transaction.txid}
        </code>{" "}
        and TxNo:{" "}
        <code className="p-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          {props.transaction.order}
        </code>
      </p>

      <QueryAddressHistory transaction={props.transaction} />
    </div>
  );
}

function QueryAddressHistory(props: {
  transaction: Transaction;
}): ReactElement {
  const api = useWhaleApiClient();
  const [address, setAddress] = useState<string>();
  const [response, setResponse] = useState<any>();

  const onClick = useCallback(() => {
    if (address === undefined) {
      setResponse("Address is required");
      return;
    }

    api.address
      .getAccountHistory(
        address,
        props.transaction.block.height,
        props.transaction.order,
      )
      .then((response) => {
        setResponse(response);
      })
      .catch((e) => {
        setResponse(e);
      });
  }, [address]);

  return (
    <div className="">
      <div className="flex items-center mb-4 gap-4">
        <input
          type="text"
          name="text"
          className="block w-full max-w-sm rounded border-0 px-2 py-1.5 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 placeholder:text-gray-400"
          placeholder="DeFiChain address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="button"
          className="rounded px-2 py-1.5 bg-gray-100 dark:bg-gray-800"
          onClick={onClick}
        >
          GET
        </button>
      </div>

      {response !== undefined && (
        <div className="rounded text-xs p-3 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// function decodeAddresses (options: {
//   network: string
//   vins: TransactionVin[];
//   vouts: TransactionVout[];
// }): string[] {
//   const addresses = new Set<string>()
//
//   for (const vin of options.vins) {
//     if (vin.vout?.script?.hex === undefined) {
//       continue
//     }
//     const address = fromScriptHex(vin.vout.script.hex!, options.network)
//     if (address !== undefined) {
//       addresses.add(address.address)
//     }
//   }
//
//   for (const vout of options.vouts) {
//     if (vout.script?.hex === undefined) {
//       continue
//     }
//     const address = fromScriptHex(vout.script.hex!, options.network)
//     if (address !== undefined) {
//       addresses.add(address.address)
//     }
//   }
//   return Array.from(addresses)
// }
