import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useWhaleApiClient } from '../../layouts/contexts/WhaleContext'
import Container from '../../layouts/components/Container'
import { PageHeading } from '../../components/shared'
import { MasternodeItem } from '../../components/masternode'

const Masternodes: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [masternodes, setMasternodes] = useState<any[]>([])

  // whaleAPI hook
  const rpc = useWhaleApiClient()

  useEffect(() => {
    const fetchMasternodes = async (): Promise<void> => {
      const masternodes = await rpc.masternodes.list()

      setMasternodes(masternodes)
      setLoading(false)
    }

    loading && fetchMasternodes()
  }, [loading])

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
      <div className='border-2 rounded shadow-sm bg-white p-3'>
        <div className='table border-collapse w-full'>
          <div className='table-row-group'>
            <div className='table-row'>
              <div className='table-cell text-lg'>OwnerAuthAddress</div>
              <div className='table-cell text-lg'>OperatorAuthAddress</div>
              <div className='table-cell text-lg'>creationHeight</div>
              <div className='table-cell text-lg'>resignHeight</div>
              <div className='table-cell text-lg'>mintedBlocks</div>
              <div className='table-cell text-lg'>state</div>
            </div>
            {(masternodes.length > 0) && masternodes.map(mn => (
              <MasternodeItem data={mn} key={mn.id}/>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
export default Masternodes
