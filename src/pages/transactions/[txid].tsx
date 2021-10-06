import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import {
  Transaction,
  TransactionVin,
  TransactionVout
} from '@defichain/whale-api-client/dist/api/transactions'

import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import BigNumber from 'bignumber.js'
import { TransactionHeading, TransactionNotFoundHeading } from '@components/transactions/[txid]/TransactionHeadings'
import { TransactionDetails } from '@components/transactions/[txid]/TransactionDetails'
import { TransactionSummaryTable } from '@components/transactions/[txid]/TransactionSummaryTable'

interface TransactionPageProps {
  txid: string
  transaction?: Transaction
  vins?: TransactionVin[]
  vouts?: TransactionVout[]
}

export default function TransactionPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (props.transaction !== undefined && props.vins !== undefined && props.vouts !== undefined) {
    const fee = getTransactionFee(props.transaction, props.vins)
    const feeRate = getTransactionFee(props.transaction, props.vins).dividedBy(props.transaction.size)

    return (
      <Container className='pt-12 pb-20'>
        <TransactionHeading transaction={props.transaction} />
        <TransactionSummaryTable transaction={props.transaction} vins={props.vins} vouts={props.vouts} fee={fee} feeRate={feeRate} />
        <TransactionDetails transaction={props.transaction} vins={props.vins} vouts={props.vouts} fee={fee} />
      </Container>
    )
  } else {
    return (
      <Container className='pt-12 pb-20'>
        <TransactionNotFoundHeading txid={props.txid} />
      </Container>
    )
  }
}

function getTransactionFee (transaction: Transaction, vins: TransactionVin[]): BigNumber {
  const fee = getTotalVinsValue(vins) - parseFloat(transaction.totalVoutValue)
  return new BigNumber(fee).multipliedBy(1000)
}

function getTotalVinsValue (vins: TransactionVin[]): number {
  let value = 0
  vins.forEach(vin => {
    if (vin.vout !== undefined) {
      value += parseFloat(vin.vout.value)
    }
  })
  return value
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string

  let transaction: Transaction | undefined

  try {
    transaction = await api.transactions.get(txid)
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
  const vins: TransactionVin[] = []
  let vinsResponse = await api.transactions.getVins(txid, 60)
  vins.push(...vinsResponse)
  while (vinsResponse.hasNext) {
    vinsResponse = await api.transactions.getVins(txid, 60, vinsResponse.nextToken)
    vins.push(...vinsResponse)
  }

  const vouts: TransactionVout[] = []
  let voutsResponse = await api.transactions.getVouts(txid, 60)
  vouts.push(...voutsResponse)
  while (voutsResponse.hasNext) {
    voutsResponse = await api.transactions.getVouts(txid, 60, voutsResponse.nextToken)
    vouts.push(...voutsResponse)
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
