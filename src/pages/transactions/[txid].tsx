import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import BigNumber from 'bignumber.js'
import { TransactionHeading, TransactionNotFoundHeading } from '@components/transactions/[txid]/TransactionHeadings'
import { TransactionVinVout } from '@components/transactions/[txid]/TransactionVinVout'
import { TransactionSummaryTable } from '@components/transactions/[txid]/TransactionSummaryTable'
import { TransactionDfTx } from '@components/transactions/[txid]/TransactionDfTx'
import { SmartBuffer } from 'smart-buffer'
import {
  AccountToUtxos,
  CAccountToUtxos,
  DfTx,
  OP_DEFI_TX,
  toOPCodes
} from '@defichain/jellyfish-transaction'

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

  const dftx: DfTx<any> | undefined = getDfTx(props.vouts)
  const isDeFiTransaction = dftx !== undefined
  const fee = getTransactionFee(props.transaction, props.vins, dftx)
  const feeRate = fee.dividedBy(props.transaction.size)

  return (
    <Container className='pt-12 pb-20'>
      <TransactionHeading transaction={props.transaction} />
      <TransactionSummaryTable
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        fee={fee}
        feeRate={feeRate}
        isDeFiTransaction={isDeFiTransaction}
      />
      <TransactionVinVout
        transaction={props.transaction}
        vins={props.vins}
        vouts={props.vouts}
        fee={fee}
        dftxName={dftx?.name}
      />
      <TransactionDfTx
        dftx={dftx}
      />
    </Container>
  )
}

function getTransactionFee (transaction: Transaction, vins: TransactionVin[], dftx?: DfTx<any>): BigNumber {
  if (dftx === undefined || dftx.type !== CAccountToUtxos.OP_CODE) {
    return new BigNumber(getTotalVinsValue(vins).minus(transaction.totalVoutValue))
  }

  // AccountToUtxos
  const accountToUtxos = dftx as DfTx<AccountToUtxos>
  const sumOfInputs = getTotalVinsValue(vins)
  const sumOfAccountInputs = accountToUtxos.data.balances.map(balance => balance.amount).reduce((a, b) => a.plus(b))
  return new BigNumber(sumOfInputs.plus(sumOfAccountInputs).minus(transaction.totalVoutValue))
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

function getDfTx (vouts: TransactionVout[]): DfTx<any> | undefined {
  const hex = vouts[0].script.hex
  const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
  const stack = toOPCodes(buffer)
  if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
    return undefined
  }
  return (stack[1] as OP_DEFI_TX).tx
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string

  // Will improve with newer iteration of whale api
  async function getVins (): Promise<TransactionVin[]> {
    const vins: TransactionVin[] = []
    let vinsResponse = await api.transactions.getVins(txid, 100)
    vins.push(...vinsResponse)
    while (vinsResponse.hasNext) {
      vinsResponse = await api.transactions.getVins(txid, 100, vinsResponse.nextToken)
      vins.push(...vinsResponse)
    }
    return vins
  }

  async function getVouts (): Promise<TransactionVout[]> {
    const vouts: TransactionVout[] = []
    let voutsResponse = await api.transactions.getVouts(txid, 100)
    vouts.push(...voutsResponse)
    while (voutsResponse.hasNext) {
      voutsResponse = await api.transactions.getVouts(txid, 100, voutsResponse.nextToken)
      vouts.push(...voutsResponse)
    }
    return vouts
  }

  try {
    return {
      props: {
        txid: txid,
        transaction: await api.transactions.get(txid),
        vins: await getVins(),
        vouts: await getVouts()
      }
    }
  } catch (e) {
    return {
      props: {
        txid: txid
      }
    }
  }
}
