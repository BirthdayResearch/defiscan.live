import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { TokenData } from '@defichain/whale-api-client/dist/api/tokens'
import classNames from 'classnames'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets/tokens'

interface TokenSymbolProps {
  tokenId: number
  className?: string
  testId?: string
  symbolLeft?: boolean
  symbolOnly?: boolean
}

export function TokenSymbol (props: TokenSymbolProps): JSX.Element {
  const api = useWhaleApiClient()
  const [tokenData, setTokenData] = useState<TokenData | undefined>(undefined)
  const [showTokenId, setShowTokenId] = useState<boolean>(false)

  useEffect(() => {
    if (typeof props.tokenId !== 'number') {
      return
    }

    const timeoutId = setTimeout(() => setShowTokenId(true), 30000)
    api.tokens.get(props.tokenId.toString()).then(data => {
      setTokenData(data)
    }).catch(() => {
      setTokenData(undefined)
      setShowTokenId(true)
    }).finally(() => {
      clearTimeout(timeoutId)
    })
  }, [props.tokenId])

  if (tokenData === undefined && !showTokenId) {
    return (
      <div className={classNames('animate-pulse py-2.5 w-10 rounded-md bg-gray-200 inline', props.className)} />
    )
  }

  if (tokenData === undefined || showTokenId) {
    return <div className={classNames(props.className)}>{`(Token ID: ${props.tokenId})`}</div>
  }

  return (
    <div className={classNames('flex items-center')}>
      <div
        className={classNames(props.className, (props.symbolLeft === undefined || !props.symbolLeft ? 'mr-1.5' : 'ml-1.5 order-last'))}
        data-testid={props.testId}
      >
        {tokenData.displaySymbol}{!tokenData.isDAT && `#${tokenData.id}`}
      </div>
      {(() => {
        if (props.symbolOnly !== undefined && props.symbolOnly) {
          return
        }

        if (tokenData.isDAT) {
          const AssetIcon = getAssetIcon(tokenData.symbol)
          return <AssetIcon className='h-6 w-6' />
        }

        const TokenIcon = getTokenIcon(tokenData.symbol)
        return <TokenIcon className='h-6 w-6' />
      })()}
    </div>
  )
}
