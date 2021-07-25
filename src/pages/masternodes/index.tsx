import { ChangeEvent, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useWhaleApiClient } from '../../layouts/contexts/WhaleContext'

import Container from '../../layouts/components/Container'
import { MasternodeItem } from '../../components/masternode'
import { PageHeading } from '../../components/shared'

import { MasternodeData } from '../../Interfaces'

const Masternodes: NextPage = (): JSX.Element => {
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [listSize, setListSize] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const [masternodes, setMasternodes] = useState<MasternodeData[]>([])

  // whaleAPI hook
  const rpc = useWhaleApiClient()

  useEffect(() => {
    const fetchMasternodes = async (): Promise<void> => {
      const response = await rpc.masternodes.list()
      setMasternodes(response)
      setLoading(false)
      setHasNext(response.hasNext)
    }

    if (loading) {
      void fetchMasternodes()
    }
  }, [loading])

  // TODO(siradji): List pagination when we have more data
  // const handlePaginate = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {}

  const handleListSizeSelect = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const size = e.target.value as any
    setListSize(size)
    setLoading(true)
    const response = await rpc.masternodes.list(Number(size))
    setLoading(false)
    setMasternodes(response)
    setHasNext(response.hasNext)
  }

  if (loading) {
    return (
      <div>
        <h1>Fetching data.....</h1>
      </div>
    )
  }
  return (
    <Container>
      <PageHeading>Masternodes</PageHeading>
      <div className='flex flex-row justify-end'>
        <div className='flex flex-col'>
          <label htmlFor='masternodeSelect' className='text-sm text-grey-300 font-semibold'>List size</label>
          <select
            id='masternodeSelect'
            className='w-20 text-center p-2 border border-grey-300'
            onChange={async e => await handleListSizeSelect(e)}
            value={listSize}
            defaultValue=''
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className='table border-collapse w-full border-2 rounded-2xl shadow rounded-lg bg-white mt-3'>
        <div className='table-row-group'>
          <div
            data-testid='mn_table_head'
            className='table-row border-b-2 border-gray-300 py-2'
          >
            <div className='table-cell text-lg py-4 px-2'>ownerAuthAddress</div>
            <div className='table-cell text-lg py-4 px-2'>operatorAuthAddress</div>
            <div className='table-cell text-lg py-4 px-2'>creationHeight</div>
            <div className='table-cell text-lg py-4 px-2'>resignHeight</div>
            <div className='table-cell text-lg py-4 px-2'>mintedBlocks</div>
            <div className='table-cell text-lg py-4 px-2'>state</div>
          </div>
          {(masternodes.length > 0) && masternodes.map(mn => (
            <MasternodeItem data={mn} key={mn.id} />
          ))}
        </div>
      </div>
      <div className='mx-auto my-6 max-w-xs'>
        <div className='flex flex-row space-x-3'>
          <button
            className='py-3 px-4 border border-grey-200 w-32 text-center font-medium transition-colors duration-500 ease-in-out hover:bg-primary hover:text-white'
            name='prev'
          >
            Previous
          </button>
          <button
            className='p-3 px-4 border border-grey-200 w-32 text-center font-medium transition-colors duration-500 ease-in-out hover:bg-primary hover:text-white'
            name='next'
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Masternodes
