import React from 'react'
import BigNumber from 'bignumber.js'
import { VaultCollateralizationRatio } from './VaultCollateralizationRatio'
import { LoanVaultActive } from '@defichain/whale-api-client/dist/api/loan'
import { getNextCollateralizationRatio } from '../../utils/NextCollateralizationRatio'

interface VaultHealthBarProps {
  vault: LoanVaultActive
}

export function VaultHealthBar (props: VaultHealthBarProps): JSX.Element {
  const atRiskThresholdMultiplier = 1.5
  const minColRatio = new BigNumber(props.vault.loanScheme.minColRatio)
  const maxRatio = getMaxRatio(minColRatio.multipliedBy(atRiskThresholdMultiplier))
  const normalizedColRatio = new BigNumber(props.vault.collateralRatio).dividedBy(maxRatio)
  const normalizedLiquidatedThreshold = minColRatio.multipliedBy(1.25).dividedBy(maxRatio).multipliedBy(100)
  const normalizedAtRiskThreshold = minColRatio.multipliedBy(atRiskThresholdMultiplier).dividedBy(maxRatio).multipliedBy(100)

  const nextColRatio = getNextCollateralizationRatio(props.vault.collateralAmounts, props.vault.loanAmounts)
  let normalizedNextRatio: BigNumber | undefined
  if (nextColRatio !== undefined) {
    normalizedNextRatio = new BigNumber(nextColRatio).dividedBy(maxRatio).multipliedBy(100)
  }

  return (
    <div className='md:w-full lg:w-1/3 mt-4 md:mt-4 lg:px-4 lg:mt-0' data-testid='VaultHealthBar'>
      <div className='w-full flex'>
        <div className='w-1/2 text-gray-500'>Collateralization Ratio</div>
        <div className='w-1/2 text-right'>
          <VaultCollateralizationRatio
            collateralizationRatio={new BigNumber(props.vault.collateralRatio).toFixed(0, BigNumber.ROUND_HALF_UP)}
            loanScheme={props.vault.loanScheme}
            vaultState={props.vault.state}
            testId='VaultHealthBar.CollateralizationRatio'
          />
        </div>
      </div>
      <div className='mt-0.5 w-full flex flex-wrap text-sm text-gray-500'>
        <div
          className='w-1/2'
          data-testid='VaultHealthBar.MinCollateralizationRatio'
        >{`Min: ${minColRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}%`}
        </div>
        <div className='w-1/2 text-right' data-testid='VaultHealthBar.NextCollateralizationRatio'>
          {
            nextColRatio === undefined ? ('N/A') : (`Next ~${nextColRatio.toFixed(0, BigNumber.ROUND_HALF_UP)}%`)
          }
        </div>
      </div>
      <div className='relative flex mt-2.5 items-center'>
        <div className='w-full flex rounded-lg h-4 bg-gray-100 border overflow-hidden'>
          <div
            className='bg-white h-4 overflow-hidden' style={{ width: `${normalizedColRatio.toNumber() * 100}%` }}
            data-testid='VaultHealthBar.BarProgress'
          />
        </div>
        <span
          className='absolute h-5 border-l border-black'
          style={{ left: `${BigNumber.min(normalizedColRatio.multipliedBy(100), 99.7).toFixed(2)}%` }}
          data-testid='VaultHealthBar.CurrentLine'
        />
        {
          normalizedNextRatio !== undefined && (
            <span
              className='absolute h-5 border-l border-black border-dashed'
              style={{ left: `${BigNumber.min(normalizedNextRatio, 99.7).toFixed(2)}%` }}
              data-testid='VaultHealthBar.NextLine'
            />
          )
        }
      </div>
      <ColorScale
        normalizedAtRiskThreshold={normalizedAtRiskThreshold}
        normalizedLiquidatedThreshold={normalizedLiquidatedThreshold}
      />
    </div>
  )
}

function ColorScale (props: { normalizedLiquidatedThreshold: BigNumber, normalizedAtRiskThreshold: BigNumber }): JSX.Element {
  return (
    <div className='w-full flex flex-row mt-1.5' data-testid='VaultHealthBar.ColorScale'>
      <div
        className='h-1 mr-0.5 bg-red-300'
        style={{ width: `${props.normalizedLiquidatedThreshold.toFixed(2)}%` }}
      />
      <div
        className='h-1 mr-0.5 bg-orange-300'
        style={{ width: `${props.normalizedAtRiskThreshold.minus(props.normalizedLiquidatedThreshold).toFixed(2)}%` }}
      />
      <div
        className='h-1 flex-1 bg-green-300'
      />
    </div>
  )
}

function getMaxRatio (atRiskThreshold: BigNumber): number {
  const healthyScaleRatio = 0.75
  return atRiskThreshold.dividedBy(new BigNumber(1).minus(healthyScaleRatio)).toNumber()
}
