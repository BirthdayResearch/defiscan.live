import { EmptySection } from '@components/commons/sections/EmptySection'
import { VaultAuctionBatchHistory } from '@defichain/whale-api-client/dist/api/loan'

interface AuctionBiddingHistoryProps {
  history: VaultAuctionBatchHistory[] | undefined
}
export function BiddingHistory (props: AuctionBiddingHistoryProps): JSX.Element {
  console.log(props.history)
  if (props.history === undefined) {
    return (
      <>
        <h2 className='text-xl font-semibold mt-8' data-testid='BiddingHistory.Heading'>
          Bidding Details
        </h2>
        <EmptySection message='Bidding history is not supported at this time' />
      </>
    )
  }
  return (
    <>

    </>
  )
}
