import { VaultAuctionBatchHistory } from '@defichain/whale-api-client/dist/api/loan'
import { TokenSymbol } from '@components/commons/token/TokenSymbol'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { formatDistanceToNow } from 'date-fns'
import { AddressLink } from '@components/commons/link/AddressLink'
import { fromScriptHex } from '@defichain/jellyfish-address'
import { useNetwork } from '@contexts/NetworkContext'

export function BiddingHistoryCard ({
  history,
  bidIndex
}: { history: VaultAuctionBatchHistory, bidIndex: number }): JSX.Element {
  const decoded = fromScriptHex(history.from, useNetwork().name)
  const address = decoded?.address ?? 'N/A'

  return (
    <div
      className='p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded w-full'
    >
      <div className='flex flex-col'>
        <div className='justify-start space-x-2'>
          <span className='bg-gray-400 dark:bg-gray-900 dark:text-dark-primary-500 px-2 py-1 w-20 text-sm text-white text-center'>
            {`Bid #${bidIndex}`}
          </span>
          <span className='text-gray-400'>
            {formatDistanceToNow(history.block.medianTime * 1000)}
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <div className='self-end space-x-1 flex items-center dark:text-gray-100'>
            <span>{history.amount.toString()}</span>
            <TokenSymbol tokenId={history.tokenId} symbolOnly />
          </div>
          <div className='flex flex-col'>
            <span className='text-gray-400 text-sm text-right'>Bidder</span>
            <AddressLink address={address}>
              <TextTruncate className='text-right' text={address ?? 'N/A'} />
            </AddressLink>
          </div>
        </div>
      </div>
    </div>
  )
}
