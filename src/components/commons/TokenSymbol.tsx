import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { WhaleApiClient } from '@defichain/whale-api-client'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import classNames from 'classnames'

interface TokenSymbolProps {
  token: number
  timeout?: number
  className?: string
  testId: string
}

export function TokenSymbol (props: TokenSymbolProps): JSX.Element {
  const api = useWhaleApiClient()
  const [tokenData, setTokenData] = useState<TokenData | undefined>(undefined)
  const [hide, setHide] = useState<boolean>(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => setHide(true), props?.timeout ?? 10000)
    void fetchToken(api, props.token).then(data => {
      setTokenData(data)
      clearTimeout(timeoutId)
    })
  }, [])

  if (tokenData === undefined && !hide) {
    return (
      <>
        <div className='animate-pulse py-2.5 w-10 rounded-md bg-gray-100 inline' />
      </>
    )
  } else if (tokenData === undefined) {
    return <></>
  }

  return (
    <span className={classNames(props.className)} data-testid={props.testId}>
      {tokenData.symbol}
    </span>
  )
}

async function fetchToken (api: WhaleApiClient, token: number): Promise<TokenData> {
  return await api.tokens.get(token.toString())
}
