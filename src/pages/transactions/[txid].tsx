import { getWhaleApiClient } from "@contexts";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

interface TransactionPageProps {
  transaction: Transaction
}

export default function TransactionPage (props: TransactionPageProps): JSX.Element {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-medium mb-6'>
        Transaction (Playground Temporary Page)
      </h1>

      <div className='font-mono'>
        <pre>{JSON.stringify(props.transaction, null, 2)}</pre>
      </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TransactionPageProps>> {
  const api = getWhaleApiClient(context)
  const network = context.query['network']?.toString()
  const txid = context.params?.txid as string

  if (network === 'MainNet' || network === undefined) {
    return {
      redirect: {
        statusCode: 302,
        destination: `https://mainnet.defichain.io/#/DFI/mainnet/tx/${txid}`
      }
    }
  }

  if (network === 'TestNet') {
    return {
      redirect: {
        statusCode: 302,
        destination: `https://testnet.defichain.io/#/DFI/testnet/tx/${txid}`
      }
    }
  }

  return {
    props: {
      transaction: await api.transactions.get(txid)
    }
  }
}
