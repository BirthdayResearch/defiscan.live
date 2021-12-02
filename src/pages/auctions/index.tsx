import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Container } from '@components/commons/Container'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { OverflowTable } from '@components/commons/OverflowTable'
import { LoanVaultLiquidated, LoanVaultLiquidationBatch } from '@defichain/whale-api-client/dist/api/loan'
import { Link } from '@components/commons/link/Link'
import { MdChevronRight, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import ReactNumberFormat from 'react-number-format'
import { VaultTokenSymbols } from '@components/vaults/common/VaultTokenSymbols'
import { CalculateCollateralsValue } from '../../utils/vaults/CalculateCollateralsValue'
import BigNumber from 'bignumber.js'
import { useAuctionTimeLeft } from '../../hooks/useAuctionTimeLeft'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { getAssetIcon } from '@components/icons/assets'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'

interface ActionsPageProps {
  auctions: {
    items: LoanVaultLiquidated[]
    pages: CursorPage[]
  }
}

interface AuctionDetailProps {
  batch: LoanVaultLiquidationBatch
  vault: LoanVaultLiquidated
  blockCount: number | undefined
}

export default function AuctionsPage ({ auctions }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)

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
              <h1 className='text-2xl font-medium' data-testid='AuctionsPage.Heading'>Auctions</h1>
              <InfoHoverPopover className='ml-1' description='Auctions' />
            </div>
            <div className='my-6 hidden md:block'>
              <OverflowTable>
                <OverflowTable.Header>
                  <OverflowTable.Head
                    title='Time Left'
                    infoDesc=''
                    testId='AuctionPage.TimeLeft'
                  />
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
                {auctions.items.map(auction => {
                  return auction.batches.map(batch => (
                    <AuctionsTableRow
                      batch={batch}
                      key={batch.index}
                      vault={auction}
                      blockCount={blocks}
                    />
                  ))
                })}
              </OverflowTable>
            </div>
            <div className='my-6 block md:hidden'>
              <div className='flex flex-wrap space-y-2'>
                {auctions.items.map(auction => {
                  return auction.batches.map(batch => (
                    <AuctionsMobileCard
                      batch={batch}
                      key={batch.index}
                      vault={auction}
                      blockCount={blocks}
                    />
                  ))
                })}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

function AuctionsTableRow (props: AuctionDetailProps): JSX.Element {
  const totalCollateral = CalculateCollateralsValue(props.batch.collaterals).value
    .toFixed(2, BigNumber.ROUND_HALF_UP)

  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, props.blockCount ?? 0)

  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        {timeRemaining ?? '00 hr 00 mins'}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {props.batch.loan.displaySymbol}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {(() => {
          if (props.batch.highestBid?.amount !== undefined) {
            return (
              <span>
                <ReactNumberFormat
                  value={props.batch.highestBid.amount.amount}
                  thousandSeparator
                  decimalScale={2}
                  displayType='text'
                />
                {props.batch.highestBid.amount.displaySymbol}
              </span>

            )
          }
          return 'N/A'
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className='text-right'>
          <ReactNumberFormat
            value={totalCollateral}
            thousandSeparator
            decimalScale={2}
            prefix='$'
            displayType='text'
          />
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <Link href={{ pathname: `/vaults/${props.vault.vaultId}/auctions/${props.batch.index}` }}>
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

function AuctionsMobileCard (props: AuctionDetailProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, props.blockCount ?? 0)

  const LoanSymbol = getAssetIcon(props.batch.loan.displaySymbol)

  const totalCollateral = CalculateCollateralsValue(props.batch.collaterals).value
    .toFixed(2, BigNumber.ROUND_HALF_UP)

  return (
    <div
      className='w-full flex flex-col rounded border border-gray-200 p-4 text-gray-500'
      data-testid='AuctionsMobileCard'
    >
      <div className='w-full flex justify-between'>
        <div className='flex items-center space-x-1 font-medium'>
          <LoanSymbol className='w-6 h-6' />
          <span>{props.batch.loan.displaySymbol}</span>
        </div>
        <div
          className='flex items-center px-2  cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
          data-testid='AuctionsMobileCard.Toggle'
        >
          {(!isOpen)
            ? <MdOutlineKeyboardArrowDown size={28} />
            : <MdOutlineKeyboardArrowUp size={28} />}
        </div>
      </div>
      <div className='text-xs mt-1 mb-4'>
        {(timeRemaining !== undefined) ? <span>{timeRemaining} left</span> : '00 hr 00 mins'}
      </div>

      <VaultDetailsListItem
        title='Current Highest Bid'
        infoDesc='Current Highest Bid'
      >
        {(() => {
          if (props.batch.highestBid?.amount !== undefined) {
            return (
              <span>
                <ReactNumberFormat
                  value={props.batch.highestBid.amount.amount}
                  thousandSeparator
                  decimalScale={2}
                  displayType='text'
                />
                {props.batch.highestBid.amount.displaySymbol}
              </span>

            )
          }
          return 'N/A'
        })()}
      </VaultDetailsListItem>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        <div className='w-full mt-2 space-y-2'>
          <VaultDetailsListItem
            title='Collateral For Auction'
            infoDesc='Collateral For Auction'
            testId='AuctionsMobileCard.CollateralsForAuction'
          >
            <VaultTokenSymbols className='justify-end' tokens={props.batch.collaterals} />
          </VaultDetailsListItem>
          <VaultDetailsListItem
            title='Collateral Value (USD)'
            infoDesc='Collateral Value (USD)'
            testId='AuctionsMobileCard.CollateralValue'
          >
            <ReactNumberFormat
              value={totalCollateral}
              thousandSeparator
              decimalScale={2}
              prefix='$'
              displayType='text'
            />
          </VaultDetailsListItem>
        </div>
        <div className='flex justify-center mt-5'>
          <div
            data-testid='AuctionsMobileCard.ViewBatchesButton'
            className='text-primary-500 p-2 text-center border border-gray-200 rounded-sm'
          >
            <Link href={{ pathname: `/vaults/${props.vault.vaultId}/auctions/${props.batch.index}` }}>
              <a className='contents'>
                VIEW BATCH DETAILS
              </a>
            </Link>
          </div>
        </div>
      </Transition>

    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const next = CursorPagination.getNext(context)
  try {
    const items = await getWhaleApiClient(context).loan.listAuction(30, next)
    return {
      props: {
        auctions: {
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
