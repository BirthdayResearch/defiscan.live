
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useWhaleApiClient } from '../layouts/contexts/WhaleContext'

import { MasternodeData } from '../interfaces'
import { Loader } from '../components/shared'

const MasternodeItem = ({ data }): JSX.Element => {
  return (
    <div data-testid='masternode_item' className='flex flex-col md:flex-row justify-center md:justify-between border-b border-gray-300'>
      <div className='p-4 text-center md:text-left  md:w-1/4 break-all'>{data.owner.address}</div>
      <div className='p-4 text-center md:text-right md:w-1/4 break-all'>{data.operator.address}</div>
      <div className='p-4 text-center md:text-right'>{data.creation.height}</div>
      <div className='p-4 text-center md:text-right'>{data.resign.height}</div>
      <div className='p-4 text-center md:text-right'>{data.mintedBlocks}</div>
      <div className='p-4 text-center md:text-right'>{data.state}</div>
    </div>
  )
}

const Masternodes: NextPage = (): JSX.Element => {
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [nextToken, setNextToken] = useState<string | number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [masternodes, setMasternodes] = useState<MasternodeData[]>([])

  // whaleAPI hook
  const rpc = useWhaleApiClient()

  useEffect(() => {
    const fetchMasternodes = async (): Promise<void> => {
      // NOTE(siradji) Made 2 the default query size. Will be changing it when design is finalized.
      const response = await rpc.masternodes.list(2)
      setLoading(false)
      setMasternodes(response as any)
      setHasNext(response.hasNext)
      setNextToken(response.nextToken)
    }

    if (loading) {
      void fetchMasternodes()
    }
  }, [])

  // TODO(siradji) Figure out a way to  implement previous button.
  const handlePreviousPagination = async (): Promise<void> => {}

  const handleNextPagination = async (): Promise<void> => {
    if (!hasNext) return

    setLoading(true)
    const response = await rpc.masternodes.list(2, (nextToken as string))
    setLoading(false)
    setMasternodes(response as any)
    setHasNext(response.hasNext)
    setNextToken(response.nextToken)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-medium pb-8'>Tokens</h1>
      {loading ? <Loader /> : (
        <>
          <div className='w-full px-3 border-2 rounded-2xl shadow rounded-lg bg-white mt-3 overflow-auto'>
            <div data-testid='mn_table_head' className='flex flex-col flex-wrap md:flex-row justify-center md:justify-between border-b-2 border-gray-300 py-2'>
              <div className='text-lg font-semibold text-center md:text-left text-lg py-4 px-2 md:w-1/4'>OwnerAuthAddress</div>
              <div className='text-lg font-semibold text-center text-lg py-4 md:w-1/4'>OperatorAuthAddress</div>
              <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>CreationHeight</div>
              <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>ResignHeight</div>
              <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>MintedBlocks</div>
              <div className='text-lg font-semibold text-center md:text-right text-lg py-4 px-2'>State</div>
            </div>
            {(masternodes.length > 0) && masternodes.map(token => (
              <MasternodeItem data={token} key={token.id} />
            ))}
          </div>
          <div className='flex justify-center md:justify-end my-10'>
            <div className='flex flex-row'>
              <button data-testid='masternode_previous_btn' className='border-2 border-grey-300 p-2 flex flex-row items-center transition-colors duration-500 ease-in-out disabled:opacity-50 hover:bg-primary hover:text-white' disabled onClick={handlePreviousPagination}>
                <span>
                  <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z' />
                  </svg>
                </span>
                Previous
              </button>
              <button data-testid='masternode_next_btn' className='border-2 border-grey-300 p-2 flex flex-row items-center transition-colors duration-500 ease-in-out hover:bg-primary hover:text-white disabled:opacity-50 disabled:bg-transparent' onClick={async e => await handleNextPagination()} disabled={!hasNext}>
                Next
                <span>
                  <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z' />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Masternodes
