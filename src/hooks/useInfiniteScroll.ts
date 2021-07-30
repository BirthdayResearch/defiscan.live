import { useEffect, useState } from 'react'
import { useWhaleApiClient } from '../layouts/contexts/WhaleContext'
import { tokens } from '@defichain/whale-api-client'

interface useInfiniteScrollData {
  loading: boolean
  tokens: tokens.TokenData[]
  hasNext: boolean
  next: string | number | undefined
  error: boolean
}

export function useInfiniteScroll (querySize: number, nextToken?: string): useInfiniteScrollData {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tokens, setTokens] = useState<tokens.TokenData[]>([])
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [next, setNext] = useState<string | number | undefined>(undefined)

  const api = useWhaleApiClient()

  useEffect(() => {
    setLoading(true)
    setError(false)
    api.tokens.list(querySize, nextToken ?? nextToken)
      .then(res => {
        setLoading(false)
        setTokens(prevTokens => [...prevTokens, ...res])
        setHasNext(res.hasNext)
        setNext(res.nextToken)
      })
      .catch(e => {
        setError(true)
      })
  }, [nextToken])

  return { loading, error, tokens, hasNext, next }
}
