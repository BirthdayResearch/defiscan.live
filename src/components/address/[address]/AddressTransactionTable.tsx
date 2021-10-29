import { AddressActivity } from '@defichain/whale-api-client/dist/api/address'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { AddressTransactionTableRow } from '@components/address/[address]/AddressTransactionTableRow'
import { CgSpinner } from 'react-icons/cg'

interface AddressTransactionTableProps {
  address: string
}

export function AddressTransactionTable (props: AddressTransactionTableProps): JSX.Element {
  const api = useWhaleApiClient()
  const [transactionData, setTransactionData] = useState<AddressActivity[]>([])
  const [next, setNext] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function getTransactions (): void {
    if (next !== undefined) {
      setIsLoading(true)
      api.address.listTransaction(props.address, 10, next).then(data => {
        setTransactionData(transactionData.concat([...data]))
        if (data.hasNext) {
          setNext(data.nextToken)
        } else {
          setNext(undefined)
        }
      }).catch(() => {
        setTransactionData([])
        setNext(undefined)
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    setTransactionData([])
    setNext('')
  }, [props.address])

  useEffect(() => {
    if (transactionData.length === 0) {
      getTransactions()
    }
  }, [props.address, transactionData])

  return (
    <div className='mt-6 flex flex-wrap' data-testid='Transactions'>
      <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Transactions.title'>Transactions</span>
      {transactionData.length > 0 ? (
        <OverflowTable className='w-full'>
          <OverflowTable.Header>
            <OverflowTable.Head>TX ID</OverflowTable.Head>
            <OverflowTable.Head>BLOCK</OverflowTable.Head>
            <OverflowTable.Head>AGE</OverflowTable.Head>
            <OverflowTable.Head className='text-right'>AMOUNT</OverflowTable.Head>
          </OverflowTable.Header>
          {transactionData.map((addressActivity) => {
            return (
              <AddressTransactionTableRow
                address={props.address}
                addressActivity={addressActivity}
                key={`${addressActivity.id}-${addressActivity.type}`}
              />
            )
          })}
        </OverflowTable>
      )
        : (<NoTransactionsInfo />)}
      <ShowMoreButton isLoading={isLoading} next={next} handleGetTransactions={getTransactions} />
    </div>
  )
}

function ShowMoreButton (props: { isLoading: boolean, next?: string, handleGetTransactions: () => void }): JSX.Element {
  if (props.next === undefined) {
    return <></>
  }

  if (props.isLoading) {
    return (
      <div className='flex w-full justify-center mt-4'>
        <div className='flex justify-center pt-2 pb-4'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div
      className='flex w-full justify-center mt-4' onClick={props.handleGetTransactions}
      data-testid='AddressTransactionTable.showMoreBtn'
    >
      <button
        type='button'
        className='w-full md:w-1/3 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded'
      >
        SHOW MORE
      </button>
    </div>
  )
}

function NoTransactionsInfo (): JSX.Element {
  return (
    <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-200'>
      <span>No Transactions</span>
    </div>
  )
}
