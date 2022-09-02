import { DfTx, ResignMasternode } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxResignMasternodeProps {
  dftx: DfTx<ResignMasternode>;
}

export function DfTxResignMasternode(
  props: DfTxResignMasternodeProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Resign Masternode" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <DetailsTable nodeId={props.dftx.data.nodeId} />
      </div>
    </div>
  );
}

function DetailsTable(props: { nodeId: string }): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Node Id" testId="DfTxResignMasternode.nodeId">
          {props.nodeId}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  );
}
