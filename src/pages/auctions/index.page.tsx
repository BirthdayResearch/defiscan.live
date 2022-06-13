import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Container } from '@components/commons/Container'
import { LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/link/Link'
import React from 'react'
import { EmptySection } from '@components/commons/sections/EmptySection'
import { AuctionsTableRow, MobileAuctionDetailsCard } from '../vaults/_components/commons/VaultAuctionDetails'
import { CardList } from '@components/commons/CardList'

interface ActionsPageProps {
  vaults: {
    items: LoanVaultLiquidated[]
    pages: CursorPage[]
  }
}

export default function AuctionsPage ({ vaults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title='Auctions' />

      <Container className='pt-12 pb-20'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-medium dark:text-dark-gray-900' data-testid='AuctionsPage.Heading'>Auctions</h1>
        </div>

        {vaults.items.length === 0 ? (
          <EmptySection message='There are no active auctions at this time' />
        ) : (
          <>
            <div className='my-6 hidden md:block'>
              <OverflowTable>
                <OverflowTable.Header>
                  <OverflowTable.Head
                    title='Time Left'
                    infoDesc='Estimated based on the number of blocks remaining.'
                    testId='AuctionTable.TimeLeft'
                  />
                  <OverflowTable.Head
                    title='Loan Token'
                    testId='AuctionTable.LoanToken'
                  />
                  <OverflowTable.Head
                    title='Collateral For Auction'
                    testId='AuctionTable.CollateralForAuction'
                    className='lg:w-52'
                    alignRight
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
                {vaults.items.map(vault => {
                  return vault.batches.map(batch => (
                    <Link href={{ pathname: `/vaults/${vault.vaultId}/auctions/${batch.index}` }} key={batch.index}>
                      <a className='contents'>
                        <AuctionsTableRow
                          batch={batch}
                          vault={vault}
                        />
                      </a>
                    </Link>
                  ))
                })}
              </OverflowTable>
              <div className='flex justify-end mt-4'>
                <CursorPagination pages={vaults.pages} path='/auctions' />
              </div>
            </div>

            <div className='my-6 block md:hidden'>
              <CardList testId='MobileAuctionDetailsCards'>
                {vaults.items.map(vault => {
                  return vault.batches.map(batch => (
                    <MobileAuctionDetailsCard
                      batch={batch}
                      key={batch.index}
                      vault={vault}
                    />
                  ))
                })}
              </CardList>

              <div className='flex justify-end mt-4'>
                <CursorPagination pages={vaults.pages} path='/auctions' />
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const next = CursorPagination.getNext(context)
  try {
    const items = await getWhaleApiClient(context).loan.listAuction(10, next)
    return {
      props: {
        vaults: {
          items,
          pages: CursorPagination.getPages(context, items)
        }
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
