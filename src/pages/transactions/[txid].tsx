import { useSelector } from 'react-redux'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import {
  Transaction,
  TransactionVin,
  TransactionVout
} from '@defichain/whale-api-client/dist/api/transactions'

import { RootState } from '@store/index'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Container } from '@components/commons/Container'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { CopyButton } from '@components/commons/CopyButton'
import { Link } from '@components/commons/Link'
import { format, fromUnixTime } from 'date-fns'
import BigNumber from 'bignumber.js'
import { useNetwork } from '@contexts/NetworkContext'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { fromScriptHex } from '@defichain/jellyfish-address'
import { NetworkName } from '@defichain/jellyfish-network'

interface TransactionPageProps {
  txid: string
  transaction?: Transaction
  vins?: TransactionVin[]
  vouts?: TransactionVout[]
}

export default function TransactionPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  if (props.transaction !== undefined && props.vins !== undefined && props.vouts !== undefined) {
    return (
      <Container className='pt-12 pb-20'>
        <TransactionHeading transaction={props.transaction} />
        <TransactionSummaryTable transaction={props.transaction} vins={props.vins} vouts={props.vouts} />
        <TransactionDetails transaction={props.transaction} vins={props.vins} vouts={props.vouts} />
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

function TransactionHeading (props: { transaction: Transaction }): JSX.Element {
  const network = useNetwork()

  return (
    <>
      <div className='flex items-center justify-center pb-6'>
        <div className='bg-orange-100 rounded p-3 text-center'>
          🚧 Work in progress, this is an early iteration of defiscan.live/transactions/*. Some features are not
          available and may not work as expected.
          {network === 'MainNet' && (
            <>
              <br />In the meantime, you can use
              <a
                target='_blank'
                href={`https://explorer.defichain.io/#/DFI/mainnet/tx/${props.transaction.id}`}
                className='cursor-pointer hover:underline text-primary-500 break-all ml-1' rel='noreferrer'
              >
                https://explorer.defichain.com
              </a>.
            </>
          )}
        </div>
      </div>

      <span className='leading-6 opacity-60' data-testid='title'>
        Transaction Hash
      </span>

      <div className='flex items-center mt-1'>
        <h1 className='text-2xl font-medium break-all' data-testid='transaction-hash'>{props.transaction.hash}</h1>
        <CopyButton className='ml-2' content={props.transaction.hash} />
      </div>
    </>
  )
}

function TransactionNotFoundHeading (props: { txid: string }): JSX.Element {
  const txid = props.txid

  return (
    <div className='bg-red-100 rounded p-3 text-center' data-testid='transaction-not-found-banner'>
      The requested transaction <code className='break-all'>{txid}</code> could not be found, it is most likely still
      being confirmed, please try again in a few minutes.
    </div>
  )
}

function TransactionSummaryTable (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const transaction = props.transaction
  const vins = props.vins
  const vouts = props.vouts

  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <SummaryTableListLeft transaction={transaction} vins={vins} vouts={vouts} />
      <SummaryTableListRight transaction={transaction} vins={vins} vouts={vouts} />
    </div>
  )
}

function SummaryTableListLeft (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - props.transaction.block.height : blocks
  const fee = props.vins[0].vout === undefined ? 'Coinbase' : `${(getTransactionFee(props.transaction, props.vins)).decimalPlaces(8).toString()} mDFI`

  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Total Amount' testId='transaction-detail-total-amount'>
        {props.transaction.totalVoutValue} DFI
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Fee' testId='transaction-detail-fee'>
        {fee}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Confirmations' testId='transaction-detail-confirmations'>
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Block Height'>
        <Link href={{ pathname: `/blocks/${props.transaction.block.height}` }}>
          <a className='cursor-pointer hover:text-primary-500' data-testid='transaction-detail-block-height'>
            {props.transaction.block.height}
          </a>
        </Link>
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function SummaryTableListRight (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const blockTime = format(fromUnixTime(props.transaction.block.medianTime), 'PPpp')

  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Fee Rate' testId='transaction-detail-fee-rate'>
        {props.vins[0].vout === undefined ? 'Coinbase' : `${(getTransactionFee(props.transaction, props.vins).dividedBy(props.transaction.size)).decimalPlaces(8).toString()} mDFI/byte`}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Size' testId='transaction-detail-size'>
        {props.transaction.size} bytes
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Received Time' testId='transaction-detail-received-time'>
        {blockTime}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
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

function TransactionDetails (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[] }): JSX.Element {
  const transaction = props.transaction
  const vins = props.vins
  const vouts = props.vouts
  const network = useNetwork()

  let networkName: NetworkName
  if (network.toString() === 'MainNet') {
    networkName = 'mainnet'
  } else if (network.toString() === 'TestNet') {
    networkName = 'testnet'
  } else {
    networkName = 'regtest'
  }

  return (
    <>
      <h1 className='font-medium text-2xl mt-6' data-testid='details-subtitle'>Details</h1>

      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <TransactionDetailsLeft transaction={transaction} vins={vins} vouts={vouts} networkName={networkName} />
        <div className='flex items-center justify-center text-gray-600 w-full lg:w-auto lg:h-20'>
          <IoArrowForwardOutline className='transform rotate-90 lg:rotate-0' size={24} />
        </div>
        <TransactionDetailsRight transaction={transaction} vins={vins} vouts={vouts} networkName={networkName} />
      </div>

      <TransactionDetailsSummary transaction={transaction} vins={vins} />
    </>
  )
}

function TransactionDetailsLeft (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[], networkName: NetworkName }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2 max-h-screen overflow-y-auto pr-1'>
      <div className='flex flex-col gap-y-1'>
        {props.vins
          .map((vin) => {
            if (vin.vout === undefined) {
              // Coinbase Txn
              return (
                <InputOutputBlock label='INPUT' address={undefined} value='Coinbase (Newly Generated Coins)' />
              )
            }

            const txid = vin.vout.txid
            const address = fromScriptHex(vin.vout.script.hex, props.networkName)?.address
            const value = vin.vout.value

            return (
              <InputOutputBlock label='INPUT' address={address} value={`${value} DFI`} key={txid} />
            )
          })}
      </div>
    </div>
  )
}

function TransactionDetailsRight (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[], networkName: NetworkName }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <div className='flex flex-col gap-y-1'>
        {props.vouts.map((vout) => {
          const address = fromScriptHex(vout.script.hex, props.networkName)?.address

          return (
            <InputOutputBlock
              label='OUTPUT'
              address={address}
              value={`${vout.value} DFI`}
              key={vout.txid}
            />
          )
        })}
      </div>
    </div>
  )
}

function TransactionDetailsSummary (props: { transaction: Transaction, vins: TransactionVin[] }): JSX.Element {
  const fee = props.vins[0].vout === undefined ? 'Coinbase' : `${(getTransactionFee(props.transaction, props.vins)).decimalPlaces(8).toString()} mDFI`

  return (
    <div className='flex flex-col items-end justify-between mt-8'>
      <div className='flex justify-between gap-x-3'>
        <span>Fees:</span>
        <span>{fee}</span>
      </div>
      <div className='flex justify-between gap-x-3 mt-2'>
        <span>Total:</span>
        <span>{props.transaction.totalVoutValue} DFI</span>
      </div>
    </div>
  )
}

function InputOutputBlock (props: { label: 'INPUT' | 'OUTPUT', address: string | undefined, value: string | undefined }): JSX.Element {
  return (
    <div className='bg-gray-50 h-20 p-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full w-full'>
        <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min mb-1.5'>
          {props.label}
        </span>
        <div className='flex justify-between gap-x-2'>
          <span className='opacity-60 overflow-ellipsis overflow-hidden'>
            {props.address !== undefined ? props.address : 'N/A'}
          </span>
          <span className='min-w-max'>{props.value !== undefined && `${props.value}`}</span>
        </div>
      </div>
    </div>
  )
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
