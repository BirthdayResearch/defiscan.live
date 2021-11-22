import React from 'react'
import ReactNumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { StatItem } from '@components/commons/stats/StatItem'
import { StatsBar } from '@components/commons/stats/StatsBar'

export function VaultStatsBar (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <StatsBar>
      <StatItem label='Total Collateral Value' testId='VaultStatsBar.TotalCollateralValue'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.value?.collateral}
          decimalScale={0}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
      <StatItem label='Total Loan Value' testId='VaultStatsBar.TotalLoanValue'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.value?.loan}
          decimalScale={0}
          prefix='$'
          suffix=' USD'
        />
      </StatItem>
      <StatItem label='Total Active Vaults' testId='VaultStatsBar.TotalActiveVaults'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.count?.openVaults}
          decimalScale={2}
        />
      </StatItem>
      <StatItem label='Active Auctions' testId='VaultStatsBar.ActiveAuctions'>
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.count?.openAuctions}
        />
      </StatItem>
    </StatsBar>
  )
}
