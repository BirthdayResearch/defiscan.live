import { Collapsible } from '@components/commons/Collapsible'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import ReactNumberFormat from 'react-number-format'

export function CollateralDetails ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <>
      <CollateralDetailsMobile collaterals={collaterals} />
      <CollateralDetailsDesktop collaterals={collaterals} />
    </>
  )
}

function CollateralDetailsMobile ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <Collapsible heading='Collateral Details' className='mt-10 block md:hidden'>
      <div className='mt-6 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {collaterals.map((col) => (
          <CollateralCard col={col} key={col.id} />
        ))}
      </div>
    </Collapsible>
  )
}

function CollateralDetailsDesktop ({ collaterals }: {collaterals: LoanVaultTokenAmount[]}): JSX.Element {
  return (
    <div className='mt-10 hidden md:block' data-testid='CollateralDetailsDesktop'>
      <div className='flex space-x-1 items-center'>
        <h2 data-testid='CollateralDetailsDesktop.Heading' className='text-xl font-semibold'>Collateral Details</h2>
        <HoverPopover popover='Proportion of collaterals deposited in the vault.'>
          <IoMdInformationCircleOutline className='h-6 w-6 text-secondary-300' />
        </HoverPopover>
      </div>
      <div className='mt-6 grid gap-2 justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-stretch'>
        {collaterals.map((col) => (
          <CollateralCard col={col} key={col.id} />
        ))}
      </div>
    </div>
  )
}

function CollateralCard ({ col }: {col: LoanVaultTokenAmount}): JSX.Element {
  const TokenSymbol = getAssetIcon(col.displaySymbol)
  return (
    <div className='p-4 border border-gray-300 h-28 rounded w-80 justify-self-center md:justify-self-stretch' data-testid='CollateralCard'>
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
