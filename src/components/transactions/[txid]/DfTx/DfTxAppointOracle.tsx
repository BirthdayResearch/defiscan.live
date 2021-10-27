import { DfTx, AppointOracle, CurrencyPair } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkConnection } from '@contexts/NetworkContext'

import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { OverflowTable } from '@components/commons/OverflowTable'

interface DfTxAppointOracleProps {
  dftx: DfTx<AppointOracle>
}

export function DfTxAppointOracle (props: DfTxAppointOracleProps): JSX.Element {
  const network = useNetworkConnection().name
  const script = fromScript(props.dftx.data.script, network)
  return (
    <div>
      <DfTxHeader name='Appoint Oracle' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Address' testId='DfTxAppointOracle.Address' className='break-all'>
            {script?.address ?? 'N/A'}
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Weightage' testId='DfTxAppointOracle.Weightage'>
            {props.dftx.data.weightage}
          </AdaptiveList.Row>
        </AdaptiveList>
        <div className='w-full lg:w-1/2'>
          <OverflowTable>
            <OverflowTable.Header>
              <OverflowTable.Head>Token</OverflowTable.Head>
              <OverflowTable.Head>Currency</OverflowTable.Head>
            </OverflowTable.Header>
            {props.dftx.data.priceFeeds.map((priceFeed) => (
              <AppointOracleTableRow priceFeed={priceFeed} key={`${priceFeed.token}-${priceFeed.currency}`} />
            )
            )}
          </OverflowTable>
        </div>
      </div>
    </div>
  )
}

function AppointOracleTableRow (props: { priceFeed: CurrencyPair }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <span data-testId={`DfTxAppointOracle.${props.priceFeed.token}Token`}>{props.priceFeed.token}</span>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        <span data-testId={`DfTxAppointOracle.${props.priceFeed.token}Currency`}>{props.priceFeed.currency}</span>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
