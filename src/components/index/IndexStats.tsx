import { DFI as DfiIcon } from '@components/icons/assets/tokens/DFI'
import { BsArrowUp } from 'react-icons/bs'
import { PropsWithChildren } from 'react'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import ReactNumberFormat from 'react-number-format'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'

export function IndexStats (): JSX.Element {
  return (
    <section className='mb-12'>
      <div className='hidden md:flex flex-row items-start'>
        <StatPriceCard />
        <div className='flex flex-wrap w-full'>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='DFI'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
        </div>
      </div>
      <CollapsibleSection className='flex flex-col md:hidden' heading='Overview'>
        <StatPriceCard />
        <div className='flex flex-wrap w-full space-y-2 mt-4'>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
          <StatCard
            infodesc='Total DFI Minted  is the total number of DFI emitted to date.'
            heading='Total DFI Minted'
            stat='711,565,082'
            suffix='/1.2B'
          >
            <div className='mt-auto text-gray-500'>
              <span className='font-semibold'>56%</span> from max supply
            </div>
          </StatCard>
        </div>
      </CollapsibleSection>
    </section>
  )
}

function StatPriceCard (): JSX.Element {
  return (
    <div className='rounded-xl border border-gray-200 lg:shrink-0 p-8 w-full md:w-[21rem] flex flex-col h-[15.5rem]'>
      <div className='flex flex-col space-y-3'>
        <div className='flex items-center'>
          <DfiIcon fontSize={32} />
          <div className='font-normal ml-2'>$DFI Price</div>
        </div>
        <div className='flex items-center'>
          <h1 className='font-semibold text-5xl'>$3.70</h1>
          <div className='flex text-green-500 items-center text-lg font-normal ml-3'>
            <BsArrowUp />
            <span>1.34%</span>
          </div>
        </div>
      </div>
      <span className='mt-auto text-gray-500 font-normal text-lg'>
        Updated at 23:26:13 UTC+8
      </span>
    </div>
  )
}

function StatCard (props: PropsWithChildren<{infodesc: string, heading: string, stat: string, suffix?: string}>): JSX.Element {
  return (
    <div className='md:pl-2 md:pb-2 w-full md:w-1/2'>
      <div className='flex flex-col border border-gray-200 py-4 px-6 h-[7.5rem]  rounded-lg'>
        <div className='flex items-center'>
          <span className='font-normal mr-2'>{props.heading}</span>
          <InfoHoverPopover description={props.infodesc} />
        </div>
        <div className='flex flex-wrap items-center'>
          <ReactNumberFormat
            value={props.stat}
            displayType='text'
            thousandSeparator
            className='text-2xl font-semibold'
          />
          <span>{props.suffix}</span>
        </div>
        {props.children}
      </div>
    </div>
  )
}
