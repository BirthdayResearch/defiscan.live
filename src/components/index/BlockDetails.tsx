import { IoTimeOutline } from 'react-icons/io5'

export function BlockDetails ({
  height,
  mintedBy,
  transactionCount,
  age
}: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  return (
    <div className='flex p-4 border border-gray-200'>
      <div className='my-auto'>
        <span className='text-xl text-gray-900 font-semibold'>#{height}</span>
        <div
          className='text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'
        >
          <IoTimeOutline size={15} />
          <span>{age}</span>
        </div>
      </div>
      <div className='table my-auto ml-4 w-full border-collapse'>
        <div className='table-row text-sm'>
          <span className='table-cell text-right text-gray-400'>
            Minted by:
          </span>
          <span className='table-cell pl-4 break-all'>
            {mintedBy}
          </span>
        </div>
        <div className='table-row text-sm'>
          <span className='table-cell pt-1 text-right text-gray-400'>
            Transactions:
          </span>
          <span className='table-cell pl-4 break-all'>
            {transactionCount} Txns
          </span>
        </div>
      </div>
    </div>
  )
}
