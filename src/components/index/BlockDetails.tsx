import { IoTimeOutline } from 'react-icons/io5'

export function BlockDetails ({ height, mintedBy, transactionCount, age }: {height: string, mintedBy?: string, transactionCount: number, age: string}): JSX.Element {
  return (
    <div className='flex p-4 h-20 border border-gray-200' style={{ width: 'calc(100% + 15px' }}>
      <div>
        <span className='text-xl text-gray-900 font-semibold'>#{height}</span>
        <div
          className='text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'
        >
          <IoTimeOutline size={15} />
          <span>
            {age}
          </span>
        </div>
      </div>
      <div className='lg:ml-8'>
        <div className='text-sm leading-5 flex gap-x-6'>
          <span className='text-right w-28 text-gray-400'>
            Minted by:
          </span>
          <span>
            {mintedBy}
          </span>
        </div>
        <div className='text-sm leading-5 flex gap-x-6'>
          <span className='text-right w-28 text-gray-400'>
            Transactions:
          </span>
          <span className=''>
            {transactionCount} Txns
          </span>
        </div>
      </div>
    </div>
  )
}
