import { PropsWithChildren } from 'react'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import ReactNumberFormat from 'react-number-format'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import { RootState } from '@store/index'
import { StatPriceCard } from '@components/index/StatCard'
import { CalculatePercentage } from '../../utils/index/CalculatePercentage'
import { useSelector } from 'react-redux'

export function SupplyStats (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)
  const supply = useSelector((state: RootState) => state.supply)

  return (
    <section className='mb-12'>
      <div className='hidden md:flex flex-row items-start' data-testid='SupplyStats.Desktop'>
        <StatPriceCard stats={stats} />
        <div className='flex flex-wrap w-full' data-testid='IndexStats.Desktop'>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat={supply.total}
            suffix='/ 1.2B'
            testId='StatCard.TotalMinted'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='text-black'>{CalculatePercentage(supply.total, supply.max)}</span>  from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Circulating DFI is the total number of DFI coins that are publicly available and is circulating in the market.'
            heading='Circulating DFI'
            stat={supply.circulating}
            suffix='DFI'
            testId='StatCard.Circulating'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='text-black'>{CalculatePercentage(supply.circulating, supply.total)}</span> from total minted
            </div>
          </StatCard>
          <StatCard
            infodesc='Total Value Locked is the overall value of assets deposited in DeFiChain. This includes assets locked in DEXs, Masternodes, and collaterals in vaults'
            heading='Total Value Locked'
            stat={stats.tvl.total ?? 0}
            suffix=' DFI'
            testId='StatCard.Tvl'
          >
            <div className='mt-auto text-gray-500 flex divide-x text-sm md:text-xs lg:text-sm'>
              <div className='px-1'>
                Dex: <span className='text-black'>{CalculatePercentage(stats.tvl.dex!, stats.tvl.total!)}</span>
              </div>
              <div className='px-1'>
                Masternode: <span className='text-black'>{CalculatePercentage(stats.tvl.masternodes!, stats.tvl.total!)}</span>
              </div>
              <div className='px-1'>
                Vaults: <span className='text-black'>{CalculatePercentage(stats.tvl.loan!, stats.tvl.total!)}</span>
              </div>
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Burned is the total amount of DFI coins removed from circulation.'
            heading='Total DFI Burned'
            stat={supply.burned}
            testId='StatCard.TotalBurned'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='text-black'>{CalculatePercentage(supply.burned, supply.total)}</span> from total minted
            </div>
          </StatCard>
        </div>
      </div>
      <CollapsibleSection className='flex flex-col md:hidden' heading='Overview' testId='SupplyStats.Mobile'>
        <StatPriceCard stats={stats} />
        <div className='flex flex-wrap w-full space-y-2 mt-4'>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat={supply.total}
            suffix='/ 1.2B'
            testId='StatCard.TotalMinted'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='font-semibold'>{CalculatePercentage(supply.total, supply.max)}</span>  from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Circulating DFI is the total number of DFI coins that are publicly available and is circulating in the market.'
            heading='Circulating DFI'
            stat={supply.circulating}
            suffix='DFI'
            testId='StatCard.Circulating'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='font-semibold'>{CalculatePercentage(supply.circulating, supply.total)}</span> from total minted
            </div>
          </StatCard>
          <StatCard
            infodesc='Total Value Locked is the overall value of assets deposited in DeFiChain. This includes assets locked in DEXs, Masternodes, and collaterals in vaults'
            heading='Total Value Locked'
            stat={stats.tvl.total ?? 0}
            suffix=' DFI'
            testId='StatCard.Tvl'
          >
            <div className='mt-auto text-gray-500 flex divide-x text-sm'>
              <div className='px-1'>
                Dex: <span className='text-black'>{CalculatePercentage(stats.tvl.dex!, stats.tvl.total!)}</span>
              </div>
              <div className='px-1'>
                MN: <span className='text-black'>{CalculatePercentage(stats.tvl.masternodes!, stats.tvl.total!)}</span>
              </div>
              <div className='px-1'>
                Vaults: <span className='text-black'>{CalculatePercentage(stats.tvl.loan!, stats.tvl.total!)}</span>
              </div>
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Burned is the total amount of DFI coins removed from circulation.'
            heading='Total DFI Burned'
            stat={supply.burned}
            testId='StatCard.TotalBurned'
          >
            <div className='mt-auto text-gray-500 text-sm'>
              <span className='font-semibold'>{CalculatePercentage(supply.burned, supply.total)}</span> from total minted
            </div>
          </StatCard>
        </div>
      </CollapsibleSection>
    </section>
  )
}

function StatCard (props: PropsWithChildren<{infodesc: string, heading: string, stat: number, suffix?: string, testId: string}>): JSX.Element {
  return (
    <div className='md:pl-2 md:pb-2 w-full md:w-1/2' data-testid={props.testId}>
      <div className='flex flex-col border border-gray-200 py-4 px-6 h-[7.5rem] rounded-lg'>
        <div className='flex items-center'>
          <span className='font-normal text-sm md:text-base mr-2'>{props.heading}</span>
          <InfoHoverPopover description={props.infodesc} />
        </div>
        <div className='flex flex-wrap items-center'>
          <ReactNumberFormat
            value={props.stat}
            displayType='text'
            thousandSeparator
            className='text-lg lg:text-2xl font-semibold'
            decimalScale={0}
          />
          <span>{props.suffix}</span>
        </div>
        {props.children}
      </div>
    </div>
  )
}
