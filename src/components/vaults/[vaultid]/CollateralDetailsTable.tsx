import { LoanVaultTokenAmount } from '@defichain/whale-api-client/dist/api/loan'
import { Collapsible } from '@components/commons/Collapsible'
import { CollateralCard } from '@components/vaults/[vaultid]/VaultCollateralCard'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import React from 'react'

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
    <div className='mt-10 hidden md:block'>
      <div className='flex space-x-1 items-center'>
        <h2 className='text-xl font-semibold'>Collateral Details</h2>
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
