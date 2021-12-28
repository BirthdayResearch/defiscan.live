import { EmptySection } from '@components/commons/sections/EmptySection'
import { VaultAuctionBatchHistory } from '@defichain/whale-api-client/dist/api/loan'
import { OverflowTable } from '@components/commons/OverflowTable'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'
import { BiddingHistoryCard } from './BiddingHistoryMobileCard'
import { formatDistanceToNow } from 'date-fns'

interface AuctionBiddingHistoryProps {
  history: VaultAuctionBatchHistory[]
}

export function BiddingHistory (props: AuctionBiddingHistoryProps): JSX.Element {
  if (props.history.length <= 0) {
    return (
      <>
        <h2 className='text-xl font-semibold mt-8 mb-5' data-testid='BiddingHistory.Heading'>
          Bidding Details
        </h2>
        <EmptySection message='No Bidding history' />
      </>
    )
  }
  return (
    <>
      <div className='mt-6 hidden lg:block'>
        <h2 className='text-xl font-semibold mt-8 mb-5' data-testid='BiddingHistory.Heading'>
          Bidding Details
        </h2>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head
              title='Bid No.' infoDesc='Bid No.'
              className='lg:w-1/4'
              testId='BiddingHistory.Header.BidNo'
            />
            <OverflowTable.Head
              title='Time' infoDesc='Time'
              className='lg:w-1/4'
              testId='BiddingHistory.Header.Time'
            />
            <OverflowTable.Head
              title='Bidder ID'
              infoDesc='Bidder ID'
              testId='BiddingHistory.Header.BidId'
            />
            <OverflowTable.Head
              title='Bid Amount'
              alignRight
              infoDesc='Bid Amount'
              testId='BiddingHistory.Header.BidAmount'
            />
          </OverflowTable.Header>
          {props.history.map(history => (
            <BiddingHistoryRow
              history={history}
              key={history.key}
            />
          ))}
        </OverflowTable>
      </div>
      <div className='block lg:hidden'>
        <CollapsibleSection
          heading='Bidding History'
          testId='BiddingHistorySection'
        >
          <div className='space-y-4'>
            {props.history.map(history => (
              <BiddingHistoryCard history={history} key={history.key} />
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </>
  )
}

function BiddingHistoryRow ({ history }: {history: VaultAuctionBatchHistory}): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <span className='bg-gray-400 px-2 py-1 w-20 text-white text-center'>
          Bid #{history.index}
        </span>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {formatDistanceToNow(history.block.medianTime * 1000)}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-blue-500'>
        <TextTruncate text={history.from} width='w-full' />
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <div className='flex items-center space-x-1 justify-end'>
          <span>{history.amount.toString()}</span>
          <TokenSymbol tokenId={history.tokenId} symbolOnly />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
