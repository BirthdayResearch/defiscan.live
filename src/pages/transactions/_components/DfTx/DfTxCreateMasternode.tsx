import { CreateMasternode, DfTx } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxCreateMasternodeProps {
  dftx: DfTx<CreateMasternode>;
}

export function DfTxCreateMasternode(
  props: DfTxCreateMasternodeProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Create Masternode" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <DetailsTable
          operatorType={props.dftx.data.operatorType}
          operatorAuthAddress={props.dftx.data.operatorPubKeyHash}
        />
      </div>
    </div>
  );
}

function DetailsTable(props: {
  operatorType: number;
  operatorAuthAddress: string;
}): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row
          name="Operator Type"
          testId="DfTxCreateMasternode.operatorType"
        >
          {props.operatorType}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Operator Auth Address">
          <AddressLink
            address={props.operatorAuthAddress}
            testId="DfTxCreateMasternode.operatorAuthAddress"
          />
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
