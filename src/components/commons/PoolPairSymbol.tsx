import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { getAssetIcon } from '@components/icons/assets'

interface PoolPairSymbolProps {
  id: string
  className?: string
  testId?: string
}

export function PoolPairSymbol (props: PoolPairSymbolProps): JSX.Element {
  const api = useWhaleApiClient()

  const [poolPairData, setPoolPairData] = useState<PoolPairData | undefined>(undefined)
  const [showPoolPairId, setShowPoolPairId] = useState<boolean>(false)

  useEffect(() => {
    if (props.id !== undefined) {
      const timeoutId = setTimeout(() => setShowPoolPairId(true), 30000)
      api.poolpairs.get(props.id).then(data => {
        setPoolPairData(data)
      }).catch(() => {
        setPoolPairData(undefined)
        setShowPoolPairId(true)
      }).finally(() => {
        clearTimeout(timeoutId)
      })
    }
  }, [props.id])

  if (poolPairData === undefined && !showPoolPairId) {
    return (
      <div className='animate-pulse py-2.5 w-10 rounded-md bg-gray-200 inline' />
    )
  }

  if (poolPairData === undefined || showPoolPairId) {
    return <div className={props.className}>{`(PoolPair ID: ${props.id})`}</div>
  }

  const [symbolA, symbolB] = poolPairData.symbol.split('-')
  const IconA = getAssetIcon(symbolA)
  const IconB = getAssetIcon(symbolB)

  return (
    <div className='flex gap-x-1'>
      <div className='flex items-center'>
        <IconA className='absolute h-8 w-8' />
        <IconB className='absolute h-8 w-8 ml-5' />
        <div className={classnames('ml-16', props.className)}>
          {poolPairData.symbol}
        </div>
      </div>
    </div>
  )
}
