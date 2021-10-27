import { AddressActivity } from '@defichain/whale-api-client/dist/api/address'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { AddressTransactionTableRow } from '@components/address/[addressid]/AddressTransactionTableRow'

interface AddressTransactionTableProps {
  addressId: string
}

export function AddressTransactionTable (props: AddressTransactionTableProps): JSX.Element {
  const api = useWhaleApiClient()
  const [transactionData, setTransactionData] = useState<AddressActivity[]>([])
  const [next, setNext] = useState<string | undefined>('')

  function getTransactions (): void {
    if (next !== undefined) {
      api.address.listTransaction(props.addressId, 10, next).then(data => {
        setTransactionData(transactionData.concat([...data]))
        if (data.hasNext) {
          setNext(data.nextToken)
        } else {
          setNext(undefined)
        }
      }).catch(() => {
        setTransactionData([])
        setNext(undefined)
      })
    }
  }

  useEffect(() => {
    setTransactionData([])
    setNext('')
  }, [props.addressId])

  useEffect(() => {
    if (transactionData.length === 0) {
      getTransactions()
    }
  }, [props.addressId, transactionData])

  return (
    <div className='mt-5 flex flex-wrap'>
      <OverflowTable className='w-full'>
        <OverflowTable.Header>
          <OverflowTable.Head>Tx ID</OverflowTable.Head>
          <OverflowTable.Head>Block</OverflowTable.Head>
          <OverflowTable.Head>Age</OverflowTable.Head>
          <OverflowTable.Head>Amount</OverflowTable.Head>
        </OverflowTable.Header>
        {transactionData.map((addressActivity) => {
          return (
            <AddressTransactionTableRow
              addressId={props.addressId}
              addressActivity={addressActivity}
              key={`${addressActivity.id}-${addressActivity.type}`}
            />
          )
        })}
      </OverflowTable>
      {next !== undefined && (
        <div className='flex w-full justify-center mt-4' onClick={getTransactions}>
          <button
            type='button'
            className='w-1/3 py-2.5 text-primary-500 border border-gray-200 hover:border-primary-500'
          >
            SHOW MORE
          </button>
        </div>
      )}
    </div>
  )
}
