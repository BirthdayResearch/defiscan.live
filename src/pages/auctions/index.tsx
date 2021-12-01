import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Container } from '@components/commons/Container'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'
import { LoanVaultLiquidationBatch } from '@defichain/whale-api-client/dist/api/loan'
import { Link } from '@components/commons/link/Link'
import { MdChevronRight } from 'react-icons/md'
import ReactNumberFormat from 'react-number-format'
import { VaultTokenSymbols } from '@components/vaults/common/VaultTokenSymbols'
import { CalculateCollateralsValue } from '../../utils/vaults/CalculateCollateralsValue'
import BigNumber from 'bignumber.js'

interface ActionsPageProps {
  auctions: {
    items: LoanVaultLiquidationBatch[]
    pages: CursorPage[]
  }
}

export default function AuctionsPage ({ auctions }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Container className='pt-12 pb-20'>
        <Head title='Auctions' />
        {auctions.items.length === 0 ? (
          <div className='text-gray-400 flex w-full justify-center p-12'>
            There are no active auctions at this time.
          </div>
        ) : (
          <>
            <div className='flex items-center'>
              <h1 className='text-2xl font-medium'>Auctions</h1>
              <InfoHoverPopover className='ml-1' description='Auctions' />
            </div>
            <div className='my-6 hidden md:block'>
              <OverflowTable>
                <OverflowTable.Header>
                  <OverflowTable.Head
                    title='Loan Token'
                    infoDesc=''
                    testId='AuctionsPage.LoanToken'
                  />
                  <OverflowTable.Head
                    title='Highest Bid'
                    infoDesc=''
                    testId='AuctionsPage.HighestBid'
                    alignRight
                  />
                  <OverflowTable.Head
                    title='Collateral For Auction'
                    infoDesc=''
                    testId='AuctionsPage.CollateralForAuction'
                    alignRight
                  />
                  <OverflowTable.Head
                    title='Collateral Value (USD)'
                    infoDesc=''
                    testId='AuctionsPage.CollateralValue'
                    alignRight
                  />
                  <OverflowTable.Head
                    title='View Batch Details'
                    testId='AuctionsPage.ViewDetails'
                    alignRight
                  />
                </OverflowTable.Header>
                {(() => {
                  const sorted = sortByType(auctions.items)
                  return (
                    sorted.map(batch => (
                      <AuctionsTableRow batch={batch} key={batch.index} />
                    ))
                  )
                })()}

              </OverflowTable>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

function AuctionsTableRow ({ batch }: { batch: LoanVaultLiquidationBatch }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        {batch.loan.displaySymbol}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {(() => {
          if (batch.highestBid?.amount !== undefined) {
            return (
              <span>
                <ReactNumberFormat
                  value={batch.highestBid.amount.amount}
                  thousandSeparator
                  decimalScale={2}
                  displayType='text'
                />
                {batch.highestBid.amount.displaySymbol}
              </span>

            )
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultTokenSymbols className='justify-end' tokens={batch.collaterals} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='text-right'>
          <ReactNumberFormat
            value={CalculateCollateralsValue(batch.collaterals).value.toFixed(2, BigNumber.ROUND_HALF_UP)}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <Link href={{ pathname: '/auctions' }}>
          <a className='contents'>
            <div className='flex justify-end'>
              <MdChevronRight className='h-6  w-6' />
            </div>
          </a>
        </Link>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function sortByType (batch: LoanVaultLiquidationBatch[]): LoanVaultLiquidationBatch[] {
  const typeOrder = ['Ongoing', 'Ended']
  let sortedArr: LoanVaultLiquidationBatch[] = []

  const groups = batch.reduce((groups, item) => {
    const key = item.loan.activePrice?.isLive === true ? 'Ongoing' : 'Ended'
    if (key in groups) {
      groups[key].push(item)
    } else {
      groups[key] = [item]
    }
    return groups
  }, {})

  typeOrder.forEach(type => {
    if (type in groups) {
      sortedArr = sortedArr.concat(groups[type])
    }
  })

  return sortedArr
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const next = CursorPagination.getNext(context)
  const items: LoanVaultLiquidationBatch[] = []
  try {
    const response = await getWhaleApiClient(context).loan.listAuction(30, next)
    response.map(result => items.push(...result.batches))
    return {
      props: {
        auctions: {
          items,
          pages: CursorPagination.getPages(context, response)
        }
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
