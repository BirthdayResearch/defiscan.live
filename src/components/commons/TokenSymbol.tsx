import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import classNames from 'classnames'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'

interface TokenSymbolProps {
  tokenId: number
  timeout?: number
  className?: string
  testId: string
}

export function TokenSymbol (props: TokenSymbolProps): JSX.Element {
  const api = useWhaleApiClient()
  const [tokenData, setTokenData] = useState<TokenData | undefined>(undefined)

  useEffect(() => {
    if (typeof props.tokenId !== 'number') {
      return
    }

    const response = api.tokens.get(props.tokenId.toString())
    void response.then(data => {
      setTokenData(data)
    }).catch(() => {
      setTokenData(undefined)
    })
  }, [props.tokenId])

  if (tokenData === undefined) {
    return (
      <div className='animate-pulse py-2.5 w-10 rounded-md bg-gray-200 inline ml-1' />
    )
  }

  return (
    <div className='flex gap-x-1'>
      <div className={classNames(props.className)} data-testid={props.testId}>
        {tokenData.symbol}{!tokenData.isDAT && `#${tokenData.id}`}
      </div>
      <div className='my-auto'>
        {(() => {
          if (tokenData.isDAT) {
            const AssetIcon = getAssetIcon(tokenData.symbol)
            return <AssetIcon className='h-6 w-6' />
          }

          const TokenIcon = getTokenIcon(tokenData.symbol)
          return <TokenIcon className='h-6 w-6' />
        })()}
      </div>
    </div>
  )
}
