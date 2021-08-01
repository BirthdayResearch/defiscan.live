import { tokens } from '@defichain/whale-api-client/'

interface Iprops {
  data: tokens.TokenData
}

export function DetailedList ({ data }: Iprops): JSX.Element {
  return (
    <div className='bg-white w-full shadow-lg rounded-lg p-3'>
      <div className='flex flex-col md:flex-row md:space-x-3'>
        <div className='flex-1'>
          <div className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <dt className='font-semibold text-gray-500'>
              Name
            </dt>
            <dd className='text-gray-900'>
              {data.name}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <dt className='font-semibold text-gray-500'>
              Symbol
            </dt>
            <dd className='text-gray-900'>
              {data.symbol}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <dt className=' font-semibold text-gray-500'>
              Symbol Key
            </dt>
            <dd className='text-gray-900'>
              {data.symbolKey}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <dt className='font-semibold text-gray-500'>
              Creation Height
            </dt>
            <dd className='text-gray-900 '>
              {data.creation.height}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-white px-4 py-5'>
            <dt className='font-semibold text-gray-500'>
              Creation Tx
            </dt>
            <dd className='text-gray-900 break-all'>
              {data.creation.tx}
            </dd>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex flex-row items-center space-x-8   px-4 py-5'>
            <dt className='text-sm font-semibold text-gray-500'>
              Minted
            </dt>
            <dd className='ext-sm text-gray-900'>
              {data.minted}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8  bg-gray-50 px-4 py-5'>
            <dt className='text-sm font-semibold text-gray-500'>
              Destruction Height
            </dt>
            <dd className='ext-sm text-gray-900 break-all'>
              {data.destruction.height}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8   px-4 py-5'>
            <dt className='text-sm font-semibold text-gray-500'>
              Destruction Tx
            </dt>
            <dd className='ext-sm text-gray-900 break-all'>
              {data.destruction.tx}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8 bg-gray-50 px-4 py-5'>
            <dt className='text-sm font-semibold text-gray-500'>
              Finalized
            </dt>
            <dd className='ext-sm text-gray-900'>
              {data.finalized}
            </dd>
          </div>
          <div className='flex flex-row items-center space-x-8 px-4 py-5'>
            <dt className='text-sm font-semibold text-gray-500'>
              Collateral Address
            </dt>
            <dd className='ext-sm text-gray-900 break-all'>
              {data.collateralAddress}
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}
