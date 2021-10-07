import { DfTx, PoolSwap } from '@defichain/jellyfish-transaction'

interface DfTxPoolSwapProps {
  dftx: DfTx<PoolSwap>
}

export function DfTxPoolSwap (props: DfTxPoolSwapProps): JSX.Element {
  return (
    <div>
      <pre>{JSON.stringify(props.dftx, null, 2)}</pre>
    </div>
  )
}
