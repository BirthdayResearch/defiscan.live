import { tokens } from '@defichain/whale-api-client/'

interface Iprops {
  data: tokens.TokenData
}

export function DetailedList ({ data }: Iprops): JSX.Element {
  return (
    <div className='bg-white w-full shadow-lg rounded-lg p-3'>
      <div className='flex flex-col md:flex-row md:space-x-3'>
        <div className='flex-1'>
          <div data-testid='token_detailed_list' className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <span className='font-semibold text-gray-500'>
              Name
            </span>
            <span className='text-gray-900'>
              {data.name}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <span className='font-semibold text-gray-500'>
              Symbol
            </span>
            <span className='text-gray-900'>
              {data.symbol}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <span className=' font-semibold text-gray-500'>
              Symbol Key
            </span>
            <span className='text-gray-900'>
              {data.symbolKey}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <span className='font-semibold text-gray-500'>
              Creation Height
            </span>
            <span className='text-gray-900 '>
              {data.creation.height}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <span className='font-semibold text-gray-500'>
              Creation Tx
            </span>
            <span className='text-gray-900 break-all'>
              {data.creation.tx}
            </span>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex flex-row items-center space-x-8   px-4 py-5'>
            <span className='text-sm font-semibold text-gray-500'>
              Minted
            </span>
            <span className='ext-sm text-gray-900'>
              {data.minted}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <span className='text-sm font-semibold text-gray-500'>
              Destruction Height
            </span>
            <span className='ext-sm text-gray-900 break-all'>
              {data.destruction.height}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8   px-4 py-5'>
            <span className='text-sm font-semibold text-gray-500'>
              Destruction Tx
            </span>
            <span className='ext-sm text-gray-900 break-all'>
              {data.destruction.tx}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-8 bg-gray-50 px-4 py-5'>
            <span className='text-sm font-semibold text-gray-500'>
              Finalized
            </span>
            <span className='ext-sm text-gray-900'>
              {data.finalized}
            </span>
          </div>
          <div data-testid='token_detailed_list' className='flex flex-row items-center space-x-8 px-4 py-5'>
            <span className='text-sm font-semibold text-gray-500'>
              Collateral Address
            </span>
            <span className='ext-sm text-gray-900 break-all'>
              {data.collateralAddress}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
