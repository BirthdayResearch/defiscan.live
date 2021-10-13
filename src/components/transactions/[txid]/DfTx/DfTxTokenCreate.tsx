import { DfTx, TokenCreate } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxTokenCreateProps {
  dftx: DfTx<TokenCreate>
}

interface DetailsTableProps {
  symbol: string
  decimal: number
  name: string
  limit: string
}

export function DfTxTokenCreate (props: DfTxTokenCreateProps): JSX.Element {
  const {
    dftx: {
      data: {
        symbol,
        decimal,
        name,
        limit
      }
    }
  } = props
  return (
    <div>
      <DfTxHeader name='Token Create' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          symbol={symbol}
          decimal={decimal}
          name={name}
          limit={limit.toString()}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: DetailsTableProps): JSX.Element {
  const {
    symbol,
    decimal,
    name,
    limit
  } = props
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Symbol' testId='DfTxTokenCreate.symbol'>
          {symbol}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Decimal' testId='DfTxTokenCreate.decimal'>
          {decimal}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='name' testId='DfTxTokenCreate.name'>
          {name}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Limit' testId='DfTxTokenCreate.limit'>
          {limit}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
