import { ReactNode } from 'react'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

interface TransactionPageProps {
  transaction: Transaction
}

function padZero (num: number): string {
  return `0${num}`.slice(-2)
}

function parseTimestamp (timestamp: number): string {
  const date = new Date(timestamp * 1000)

  // split date and time parsing for readability
  const datestring = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`

  const hours = date.getHours()
  const timestring = `${hours % 12}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${hours < 12 ? 'AM' : 'PM'}`

  return `${datestring} ${timestring}`
}

export default function TransactionPage (props: TransactionPageProps): JSX.Element {
  console.log('props', props)
  const {
    transaction: {
      hash,
      size,
      block: {
        medianTime,
        hash: blockHash,
        time
      }
    }
  } = props

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-medium mb-6'>
        Transaction hash {hash}
      </h1>
      <h2 className='text-xl font-medium mb-6'>
        Summary
      </h2>
      <div className='flex flex-col'>
        <ListItem>
          <div>
            Size
          </div>
          <div className='mr-8'>
            {size} (bytes)
          </div>
        </ListItem>
        <ListItem>
          <div>
            Fee Rate
          </div>
          <div className='mr-8' />
        </ListItem>
        <ListItem>
          <div>
            Received Time
          </div>
          <div className='mr-8'>
            {parseTimestamp(medianTime)}
          </div>
        </ListItem>
        <ListItem>
          <div>
            Mined Time
          </div>
          <div className='mr-8'>
            {parseTimestamp(time)}
          </div>
        </ListItem>
        <ListItem>
          <div>
            Included in Block
          </div>
          <div className='text-lg hover:text-primary cursor-pointer underline mr-8'>
            <a href={`https://mainnet.defichain.io/#/DFI/mainnet/block/${blockHash}`} target='_blank' rel='noreferrer'>
              {blockHash}
            </a>
          </div>
        </ListItem>
        <ListItem>
          <div>
            Custom Transaction Info
          </div>
          <div className='mr-8'>
            <div className='text-lg hover:text-primary cursor-pointer underline'>
              <a href={`https://dex.defichain.com/mainnet/tx/${hash}`} target='_blank' rel='noreferrer'>
                View on DEX explorer
              </a>
            </div>
          </div>
        </ListItem>
      </div>
    </div>
  )
}

function ListItem (props: { children: ReactNode }): JSX.Element {
  return (
    <div className='flex justify-between border-b items-center' style={{ minHeight: '4.4rem' }}>
      {props.children}
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const txid = context.params?.txid as string

  return {
    props: {
      transaction: await api.transactions.get(txid)
    }
  }
}
