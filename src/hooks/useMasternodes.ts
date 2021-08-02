import { useEffect, useState } from 'react'
import { useWhaleApiClient } from '../layouts/contexts/WhaleContext'
import { masternodes } from '@defichain/whale-api-client'

interface useMasternodesData{
  loading: boolean
  masternodes: masternodes.MasternodeData[]
  hasNext: boolean
  next: string | number | undefined
  error: boolean
}

export function useMasternodes (querySize: number, nextToken?: string): useMasternodesData {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [masternodes, setMasternodes] = useState<masternodes.MasternodeData[]>([])
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [next, setNext] = useState<string | number | undefined>(undefined)

  const api = useWhaleApiClient()

  async function fetchMasternodes (size: number, next: string | undefined)  {
    try {
      const res = await api.masternodes.list(size, next)
      setLoading(false)
      setMasternodes(preMasternodes => [...preMasternodes, ...res])
      setHasNext(res.hasNext)
      setNext(res.nextToken)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    setLoading(bah)
    setError(false)
    
    fetchMasternodes(querySize, nextToken)
  }, [nextToken])

  return { loading, error, masternodes, hasNext, next }
}
