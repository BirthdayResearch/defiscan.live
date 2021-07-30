import { useEffect, useState } from 'react'
import { useWhaleApiClient } from '../layouts/contexts/WhaleContext'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'

interface useInfiniteScrollData {
  loading: boolean
  tokens: TokenData[]
  hasNext: boolean
  next: string | number | undefined
  error: boolean
}

export function useInfiniteScroll (size?: number, nextToken?: string): useInfiniteScrollData {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [next, setNext] = useState<string | number | undefined>(undefined)

  const api = useWhaleApiClient()

  useEffect(() => {
    setLoading(true)
    setError(false)
    api.tokens.list(4, nextToken ?? nextToken)
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
