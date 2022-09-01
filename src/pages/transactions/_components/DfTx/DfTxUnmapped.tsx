import { DfTx } from "@defichain/jellyfish-transaction";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxUnmappedProps {
  dftx: DfTx<any>;
}

export function DfTxUnmapped(props: DfTxUnmappedProps): JSX.Element {
  return (
    <>
      <DfTxHeader name={props.dftx.name} />
      <div className="mt-5 bg-gray-100 p-6 border-gray-500 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-dark-gray-900 rounded">
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(props.dftx, null, 2)}
        </pre>
      </div>
    </>
  );
}
