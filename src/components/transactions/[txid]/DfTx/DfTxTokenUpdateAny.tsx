import { DfTx, TokenUpdateAny } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import BigNumber from 'bignumber.js'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'

interface DfTxTokenUpdateAnyProps {
  dftx: DfTx<TokenUpdateAny>
}

export function DfTxTokenUpdateAny (props: DfTxTokenUpdateAnyProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Token Update Any' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <DetailsTable
          creationTx={props.dftx.data.creationTx}
          symbol={props.dftx.data.symbol}
          decimal={props.dftx.data.decimal}
          name={props.dftx.data.name}
          limit={props.dftx.data.limit}
          isDAT={props.dftx.data.isDAT}
          tradeable={props.dftx.data.tradeable}
        />
      </div>
    </div>
  )
}

function DetailsTable (props: { creationTx: string, symbol: string, decimal: number, name: string, limit: BigNumber, isDAT: boolean, tradeable: boolean }): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Creation Tx' testId='DfTxTokenUpdateAny.CreationTx'>
          {props.creationTx}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Name' testId='DfTxTokenUpdateAny.name'>
          {props.name}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Symbol' testId='DfTxTokenUpdateAny.symbol'>
          <div className='flex gap-x-1'>
            {props.symbol}
            {(() => {
              if (props.isDAT) {
                const AssetIcon = getAssetIcon(props.symbol)
                return <AssetIcon className='h-6 w-6' />
              }

              const TokenIcon = getTokenIcon(props.symbol)
              return <TokenIcon className='h-6 w-6' />
            })()}
          </div>
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Decimal' testId='DfTxTokenUpdateAny.decimal'>
          {props.decimal}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Limit' testId='DfTxTokenUpdateAny.limit'>
          {props.limit.toString()}
        </AdaptiveList.Row>

        <AdaptiveList.Row name='Tradeable' testId='DfTxTokenUpdateAny.Tradeable'>
          {props.tradeable.toString()}
        </AdaptiveList.Row>
      </AdaptiveList>
    </>
  )
}
