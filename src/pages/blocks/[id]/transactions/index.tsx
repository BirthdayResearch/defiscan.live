import { useRouter } from 'next/router'
import { TableHeader } from '../../../../components/Table/index'

interface Transaction {
  id: string
  txid: string
  coinbase?: string
  vout?: {
    id: string
    txid: string
    n: number
    value: string
    tokenId?: number
  }
  script?: {
    hex: string
  }
  txInWitness?: string[]
  sequence: string
}

export default function Transactions (): JSX.Element {
  const router = useRouter()
  const { query: { id } } = router

  const transactions: Transaction[] = [
    { id: '1', txid: '11', sequence: '1' },
    { id: '2', txid: '12', sequence: '2' },
    { id: '3', txid: '13', sequence: '3' },
    { id: '4', txid: '14', sequence: '4' },
    { id: '5', txid: '15', sequence: '5' }
  ]
  function renderRows (): JSX.Element[] {
    return transactions.map((t) => (
      <div className='blocks-table-row flex justify-between' key={t.id}>
        <div className='flex-1'>{t.id}</div>
        <div className='flex-1'>{t.sequence}</div>
      </div>
    ))
  }
  return (
    <div className='container'>
      <div>Blocks: {id}</div>
      <div>Transactions</div>
      <TableHeader>
        <div className='flex-1'>Id</div>
        <div className='flex-1'>Sequence</div>
      </TableHeader>
      <div className='block-table-body flex flex-col'>
        {renderRows()}
      </div>
    </div>
  )
}
