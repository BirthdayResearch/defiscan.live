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
      <StatItem
        label='Vaults'
        testId='VaultStatsBar.Vaults'
      >
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stats.loan.count?.openVaults}
          decimalScale={2}
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
      {(stats.loan.value?.loan !== undefined && stats.loan.value?.collateral !== undefined) && (
        <StatItem label='Total Collateralization Ratio' testId='VaultStatsBar.TotalCollateralizationRatio'>
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={(stats.loan.value?.collateral / stats.loan.value?.loan) * 100}
            decimalScale={0}
            suffix='%'
          />
        </StatItem>
      )}
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
