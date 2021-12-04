import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/link/Link'
import { useAuctionTimeLeft } from '../../../hooks/useAuctionTimeLeft'
import ReactNumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { VaultTokenSymbols } from '@components/vaults/common/VaultTokenSymbols'
import { CalculateCollateralsValue } from '../../../utils/vaults/CalculateCollateralsValue'
import { LoanVaultLiquidated, LoanVaultLiquidationBatch } from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'

interface VaultAuctionDetailsProps {
  batch: LoanVaultLiquidationBatch
  vault: LoanVaultLiquidated
  blockCount: number | undefined
}

export function AuctionsTableRow (props: VaultAuctionDetailsProps): JSX.Element {
  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, props.blockCount ?? 0)
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        {timeRemaining ?? '00 hr 00 mins'}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='flex'>
          <TokenSymbol className='w-6 h-6 mr-1.5' />
          <span>{props.batch.loan.displaySymbol}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {(() => {
          if (props.batch.highestBid?.amount !== undefined) {
            return (
              <ReactNumberFormat
                value={new BigNumber(props.batch.highestBid.amount.amount).toFixed(8)}
                thousandSeparator
                decimalScale={8}
                suffix={` ${props.batch.highestBid.amount.displaySymbol}`}
                displayType='text'
              />
            )
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='text-right'>
          <ReactNumberFormat
            value={CalculateCollateralsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

export function MobileAuctionDetailsCard (props: VaultAuctionDetailsProps): JSX.Element {
  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, props.blockCount ?? 0)
  const TokenSymbol = getAssetIcon(props.batch.loan.symbol)

  return (
    <div
      className='w-full flex flex-col rounded border border-gray-200 p-4 text-gray-500'
      data-testid='AuctionsMobileCard'
    >
      <div className='w-full flex justify-between'>
        <div className='flex items-center font-medium text-gray-900'>
          <TokenSymbol className='w-6 h-6 mr-1.5' />
          <span>{props.batch.loan.displaySymbol}</span>
        </div>
        <div
          className='cursor-pointer text-primary-500'
          data-testid='AuctionsMobileCard.Toggle'
        >
          <Link href={{ pathname: `/vaults/${props.vault.vaultId}/auctions/${props.batch.index}` }}>
            <a className='contents'>
              VIEW
            </a>
          </Link>
        </div>
      </div>
      <div className='text-xs mt-1 mb-4'>
        {(timeRemaining !== undefined) ? <span>{timeRemaining} left</span> : '00 hr 00 mins'}
      </div>

      <VaultDetailsListItem
        title='Current Highest Bid'
        titleClassNames='text-sm'
      >
        {(() => {
          if (props.batch.highestBid?.amount !== undefined) {
            return (
              <ReactNumberFormat
                value={new BigNumber(props.batch.highestBid.amount.amount).toFixed(8)}
                thousandSeparator
                decimalScale={8}
                suffix={` ${props.batch.highestBid.amount.displaySymbol}`}
                displayType='text'
              />
            )
          }
          return 'N/A'
        })()}
      </VaultDetailsListItem>

      <div className='w-full mt-2 space-y-2'>
        <VaultDetailsListItem
          title='Collateral For Auction'
          titleClassNames='text-sm'
          testId='AuctionsMobileCard.CollateralsForAuction'
        >
          <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
        </VaultDetailsListItem>
        <VaultDetailsListItem
          title='Collateral Value (USD)'
          titleClassNames='text-sm'
          testId='AuctionsMobileCard.CollateralValue'
        >
          <ReactNumberFormat
            value={CalculateCollateralsValue(props.batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </VaultDetailsListItem>
      </div>
    </div>
  )
}
