import classnames from 'classnames'
import { getAssetIcon } from '@components/icons/assets/tokens'

interface PoolPairSymbolProps {
  tokenA: {
    symbol: string
    displaySymbol: string
  }
  tokenB: {
    symbol: string
    displaySymbol: string
  }
  className?: string
  symbolSizeClassName: string
  symbolMarginClassName: string
  textClassName: string
  testId?: string
}

export function PoolPairSymbolLocal (props: PoolPairSymbolProps): JSX.Element {
  const IconA = getAssetIcon(props.tokenA.symbol)
  const IconB = getAssetIcon(props.tokenB.symbol)

  return (
    <div className='flex items-center' data-testid={props.testId}>
      <IconA className={classnames('absolute z-10', props.symbolSizeClassName)} />
      <IconB className={classnames('absolute', props.symbolSizeClassName, props.symbolMarginClassName)} />
      <div className={classnames(props.textClassName)}>
        {`${props.tokenA.displaySymbol}-${props.tokenB.displaySymbol}`}
      </div>
    </div>
  )
}
