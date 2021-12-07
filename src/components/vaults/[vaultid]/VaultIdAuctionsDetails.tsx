import { LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import React from 'react'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/link/Link'
import { AuctionsTableRow, MobileAuctionDetailsCard } from '@components/vaults/common/VaultAuctionDetails'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export function VaultAuctions (props: { vault: LoanVaultLiquidated }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)

  return (
    <>
      <div className='hidden md:block mt-10' data-testid='VaultLoansDesktop'>
        <h2 className='text-xl font-semibold' data-testid='VaultLoansDesktop.Heading'>In Auction</h2>

        <div className='my-6'>
          <OverflowTable>
            <OverflowTable.Header>
              <OverflowTable.Head
                title='Time Left'
                testId='AuctionTable.TimeLeft'
              />
              <OverflowTable.Head
                title='Loan Token'
                testId='AuctionTable.LoanToken'
              />
              <OverflowTable.Head
                title='Collateral For Auction'
                testId='AuctionTable.CollateralForAuction'
                alignRight
                className='lg:w-52'
              />
              <OverflowTable.Head
                title='Collateral Value (USD)'
                testId='AuctionTable.CollateralValue'
                alignRight
              />
              <OverflowTable.Head
                title='Min. Next Bid'
                testId='AuctionTable.MinNextBid'
                alignRight
              />
            </OverflowTable.Header>
            {
              props.vault.batches.map(batch => (
                <Link href={{ pathname: `/vaults/${props.vault.vaultId}/auctions/${batch.index}` }} key={batch.index}>
                  <a className='contents'>
                    <AuctionsTableRow
                      batch={batch}
                      vault={props.vault}
                      blockCount={blocks}
                    />
                  </a>
                </Link>
              ))
            }
          </OverflowTable>
        </div>
      </div>

      <CollapsibleSection heading='In Auction' className='block md:hidden'>
        <div className='flex flex-wrap space-y-2'>
          {
            props.vault.batches.map(batch => (
              <MobileAuctionDetailsCard
                batch={batch}
                key={batch.index}
                vault={props.vault}
                blockCount={blocks}
              />
            ))
          }
        </div>
      </CollapsibleSection>
    </>
  )
}
