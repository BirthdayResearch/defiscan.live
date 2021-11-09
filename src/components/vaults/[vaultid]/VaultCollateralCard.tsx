import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'

export function CollateralCard ({ col }: {col: LoanVaultTokenAmount}): JSX.Element {
  const TokenSymbol = getAssetIcon(col.displaySymbol)
  return (
    <div className='p-2.5 md:p-4 border border-gray-300 h-28 rounded w-80 justify-self-center md:justify-self-stretch'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center'>
          <TokenSymbol className='h-6 w-6 z-10' />
          <span className='ml-2 font-medium'>{col.name}</span>
        </div>
        {/* <span>10%</span> */}
      </div>
      <div className='mt-4 text-gray-500'>
        <span className='text-sm'>collateral amount</span>
        <span className='block '>
          <ReactNumberFormat
            className='text-gray-800'
            displayType='text'
            thousandSeparator
            value={col.amount}
            decimalScale={2}
            suffix={col.symbol}
          />
        </span>
      </div>
    </div>
  )
}
