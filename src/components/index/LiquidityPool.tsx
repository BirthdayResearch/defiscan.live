
import NumberFormat from 'react-number-format'
import { ReactNode, PropsWithChildren } from 'react'
import { getAssetIcon } from '@components/icons/assets'

export function LiquidityPool (
  {
    poolSymbol,
    apr,
    totalLiquidity,
    priceRatio,
    tokenASymbol,
    tokenBSymbol
  }: {
    poolSymbol: string
    apr: number | undefined
    totalLiquidity: string
    priceRatio: string
    tokenASymbol: string
    tokenBSymbol: string
  }): JSX.Element {
  const SymbolBIcon = getAssetIcon(tokenBSymbol)
  const SymbolAIcon = getAssetIcon(tokenASymbol)
  return (

    <div className='p-6 border border-gray-300 w-80 h-40'>
      <div className='flex justify-between'>
        <div className='flex'>
          <div className='icons flex flex-row-reverse'>
            <SymbolBIcon className='h-6 w-6 -ml-2' />
            <SymbolAIcon className='h-6 w-6' />
          </div>
          <div className='mr-2' />
          <h1 className='font-semibold text-lg leading-6'>{poolSymbol}</h1>
        </div>
        {/* <Link href={{ pathname: '/#' }}> */}
        {/*   <a */}
        {/*     className={` */}
        {/*     text-sm  */}
        {/*     font-medium */}
        {/*     leading-4 */}
        {/*     cursor-pointer */}
        {/*     text-primary-500 */}
        {/*     hover:text-primary-500 */}
        {/*     opacity-60 */}
        {/*     hover:opacity-100'`} */}
        {/*   > */}
        {/*     <div className='flex items-center'> */}
        {/*       VIEW<IoChevronForward size={15} className='ml-px inline' /> */}
        {/*     </div> */}
        {/*   </a> */}
        {/* </Link> */}
      </div>
      <div className='mt-4'>
        <LiquidityCardStat label='APR'>
          <NumberFormat
            value={apr}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix='%'
          />
        </LiquidityCardStat>
        <LiquidityCardStat label='Total Liquidity'>
          <NumberFormat
            value={totalLiquidity}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix=' USD'
          />
        </LiquidityCardStat>
        <LiquidityCardStat
          label='Price Ratio'
        >
          <NumberFormat
            value={priceRatio}
            displayType='text'
            decimalScale={2}
            thousandSeparator
            suffix={` ${tokenBSymbol}/${tokenASymbol}`}
          />
        </LiquidityCardStat>
      </div>
    </div>

  )
}

function LiquidityCardStat ({ label, children }: PropsWithChildren<{label: string, children: ReactNode}>): JSX.Element {
  return (
    <div className='flex gap-x-4'>
      <div className='font-normal text-sm opacity-40 leading-5 w-24'>
        {label}:
      </div>
      <div className='text-sm leading-5'>{children}</div>
    </div>
  )
}
