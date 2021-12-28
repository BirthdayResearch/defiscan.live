import { VaultAuctionBatchHistory } from '@defichain/whale-api-client/dist/api/loan'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'

export function BiddingHistoryCard ({ history }: {history: VaultAuctionBatchHistory}): JSX.Element {
  return (
    <div
      className='p-4 border border-gray-200 rounded w-full'
    >
      <div className='flex flex-col'>
        <div className='justify-start space-x-2'>
          <span className='bg-gray-400 p-1 w-20 text-white text-center'>
            Bid #{history.index}
          </span>
          <span className='text-gray-400'>
            {formatDistanceToNow(history.block.medianTime * 1000)}
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <div className='self-end space-x-1 flex items-center'>
            <span>{history.amount.toString()}</span>
            <TokenSymbol tokenId={history.tokenId} symbolOnly />
          </div>
          <div className='flex flex-col'>
            <span className='text-gray-400 text-sm text-right'>Bidder</span>
            <TextTruncate className='text-blue-500' text={history.from} />
          </div>
        </div>
      </div>
    </div>
  )
}
