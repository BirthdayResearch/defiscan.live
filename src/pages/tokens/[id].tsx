import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWhaleApiClient } from '../../layouts/contexts/WhaleContext'

import { tokens } from '@defichain/whale-api-client'
import { Loader } from '../../components/shared/Loader'
import { Container } from '../../layouts/components/Container'
import { DetailedList } from '../../components/DetailedList'

export default function Token (): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<tokens.TokenData | null>(null)
  const [error, setError] = useState<boolean>(false)

  const { query: { id }, back } = useRouter()
  const api = useWhaleApiClient()

  useEffect(() => {
    async function fetchTokens (): Promise<void> {
      try {
        const data = await api.tokens.get(id as string)
        setLoading(false)
        setData(data)
      } catch (e) {
        setError(true)
      }
    }

    void fetchTokens()
  }, [])

  if (error) {
    return (
      <h1>Error: Something went wrong</h1>
    )
  }

  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div>
      <Container>
        <button
          className='px-7 py-2 border-grey-300 border-2 rounded-sm'
          onClick={() => back()}
        >
          Back
        </button>
        {(data != null) && <DetailedList data={data} />}
      </Container>
    </div>
  )
}
