import { DfTx, ICXCloseOrder } from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { TxIdLink } from "@components/commons/link/TxIdLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxICXCloseOrderProps {
  dftx: DfTx<ICXCloseOrder>;
}

export function DfTxICXCloseOrder(props: DfTxICXCloseOrderProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="ICX Close Order" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList>
          <AdaptiveList.Row name="Order Tx">
            <TxIdLink
              txid={props.dftx.data.orderTx}
              testId="DfTxICXCloseOrder.OrderTx"
              className="break-all"
            />
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
