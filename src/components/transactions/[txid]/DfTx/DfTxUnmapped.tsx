import { DfTx } from '@defichain/jellyfish-transaction'

interface DfTxUnmappedProps {
  dftx: DfTx<any>
}

export function DfTxUnmapped (props: DfTxUnmappedProps): JSX.Element {
  return (
    <div>
      <pre>{JSON.stringify(props.dftx, null, 2)}</pre>
    </div>
  )
}
