import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import BigNumber from 'bignumber.js'
import { TransactionHeading, TransactionNotFoundHeading } from '@components/transactions/[txid]/TransactionHeadings'
import { TransactionVinVout } from '@components/transactions/[txid]/TransactionVinVout'
import { TransactionSummaryTable } from '@components/transactions/[txid]/TransactionSummaryTable'
import { TransactionDfTx } from '@components/transactions/[txid]/TransactionDfTx'

interface TransactionPageProps {
  txid: string
  transaction?: Transaction
  vins?: TransactionVin[]
  vouts?: TransactionVout[]
}

export default function TransactionPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (props.transaction === undefined || props.vins === undefined || props.vouts === undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <TransactionNotFoundHeading txid={props.txid} />
      </Container>
    )
  }

  const fee = getTransactionFee(props.transaction, props.vins)
  const feeRate = getTransactionFee(props.transaction, props.vins).dividedBy(props.transaction.size)

  return (
    <Container className='pt-12 pb-20'>
      <TransactionHeading transaction={props.transaction} />
      <TransactionSummaryTable
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        fee={fee}
        feeRate={feeRate}
      />
      <TransactionVinVout
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        fee={fee}
      />

      <TransactionDfTx
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
      />
    </Container>
  )
}

function getTransactionFee (transaction: Transaction, vins: TransactionVin[]): BigNumber {
  const fee = getTotalVinsValue(vins).minus(transaction.totalVoutValue)
  return new BigNumber(fee).multipliedBy(100000000)
}

function getTotalVinsValue (vins: TransactionVin[]): BigNumber {
  let value: BigNumber = new BigNumber(0)
  vins.forEach(vin => {
    if (vin.vout !== undefined) {
      value = new BigNumber(vin.vout.value).plus(value)
    }
  })
  return value
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string
  const limit = 100

  let transaction: Transaction | undefined
  const vins: TransactionVin[] = []
  const vouts: TransactionVout[] = []

  try {
    const [transactions] = await Promise.all([api.transactions.get(txid), getVins(), getVouts()])
    transaction = transactions
  } catch (WhaleApiException) {
    transaction = undefined
  }

  if (transaction === undefined) {
    return {
      props: {
        txid: txid
      }
    }
  }

  // Will improve with newer iteration of whale api
  async function getVins (): Promise<void> {
    let vinsResponse = await api.transactions.getVins(txid, limit)
    vins.push(...vinsResponse)
    while (vinsResponse.hasNext) {
      vinsResponse = await api.transactions.getVins(txid, limit, vinsResponse.nextToken)
      vins.push(...vinsResponse)
    }
  }

  async function getVouts (): Promise<void> {
    let voutsResponse = await api.transactions.getVouts(txid, limit)
    vouts.push(...voutsResponse)
    while (voutsResponse.hasNext) {
      voutsResponse = await api.transactions.getVouts(txid, limit, voutsResponse.nextToken)
      vouts.push(...voutsResponse)
    }
  }

  return {
    props: {
      txid,
      transaction,
      vins,
      vouts
    }
  }
}
