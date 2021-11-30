import ReactNumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { StatItem } from '@components/commons/stats/StatItem'
import { StatsBar } from '@components/commons/stats/StatsBar'

export function AuctionsStatsBar (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <StatsBar>
      <StatItem label='Ongoing Auction Batches' testId='AuctionsStatsBar.AuctionsBatches'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.count?.openAuctions}
          decimalScale={2}
        />
      </StatItem>
      <StatItem label='Total Value Of Collateral For Auctions' testId='AuctionsStatsBar.TotalAuctionsValue'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.value?.collateral}
          decimalScale={0}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
    </StatsBar>
  )
}
