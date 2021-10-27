import { AdaptiveList } from '@components/commons/AdaptiveList'
import BigNumber from 'bignumber.js'
import { AddressAggregation, AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'

interface AddressSummaryTableProps {
  aggregation: AddressAggregation
  tokens: AddressToken[]
}

export function AddressSummaryTable (props: AddressSummaryTableProps): JSX.Element {
  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <div className='w-full lg:w-1/2'>
        <AdaptiveList>
          <AdaptiveList.Row name='Balance' className='text-left' testId='AddressSummaryTable.balance'>
            {new BigNumber(props.aggregation.amount.unspent).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Total Sent' className='text-left' testId='AddressSummaryTable.totalSent'>
            {new BigNumber(props.aggregation.amount.txOut).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Total Received' className='text-left' testId='AddressSummaryTable.totalReceived'>
            {new BigNumber(props.aggregation.amount.txIn).toFixed(8)} DFI
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name='No. of Transaction' className='text-left'
            testId='AddressSummaryTable.txCount'
          >
            {props.aggregation.statistic.txCount}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
      <SummaryTableListRight tokens={props.tokens} />
    </div>
  )
}

function SummaryTableListRight (props: {
  tokens: AddressToken[]
}): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <AdaptiveList>
        <AdaptiveList.Row name='Balances' testId='SummaryTableListRight.tokens'>
          {props.tokens.length > 0
            ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
                {props.tokens.map((token) => {
                  return (
                    <div className='flex flex-row' key={token.id}>
                      <span className='mr-1.5'>{token.amount}</span>
                      <div className='flex gap-x-1'>
                        <div>
                          {token.symbol}{!token.isDAT && `#${token.id}`}
                        </div>
                        <div className='my-auto'>
                          {(() => {
                            if (token.isDAT) {
                              const AssetIcon = getAssetIcon(token.symbol)
                              return <AssetIcon className='h-6 w-6' />
                            }
                            const TokenIcon = getTokenIcon(token.symbol)
                            return <TokenIcon className='h-6 w-6' />
                          })()}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              )
            : (<div>No Tokens</div>)}
        </AdaptiveList.Row>
      </AdaptiveList>
    </div>
  )
}
