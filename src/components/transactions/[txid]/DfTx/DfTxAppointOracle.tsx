import { DfTx, AppointOracle, CurrencyPair } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'

interface DfTxAppointOracleProps {
  dfxt: DfTx<AppointOracle>
}

interface AppointOracleProps {
  address: string | undefined
  weightage: number
  priceFeeds: CurrencyPair[]
}

export function DfTxAppointOracle (props: DfTxAppointOracleProps): JSX.Element {
  const network = useNetworkObject().name
  const script = fromScript(props.dfxt.data.script, network)
  return (
    <div>
      <DfTxHeader name='Appoint Oracle' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AppointOracleTable
          address={script?.address}
          weightage={props.dfxt.data.weightage}
          priceFeeds={props.dfxt.data.priceFeeds}
        />
      </div>
    </div>
  )
}

function AppointOracleTable ({ address, priceFeeds, weightage }: AppointOracleProps): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Address' testId='DfTxAppointOracle.Address' className='break-all'>
          {address ?? 'N/A'}
        </AdaptiveList.Row>
        {priceFeeds.map((feed, index) => (
          <AdaptiveList.Row name='PriceFeed Token' key={index} testId={`DfTxAppointOracle.${feed.token}Token`}>
            {feed.token}
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Weightage' testId='DfTxAppointOracle.Weightage'>
          {weightage}
        </AdaptiveList.Row>
        {priceFeeds.map((feed, index) => (
          <AdaptiveList.Row name='PriceFeed Currency' key={index} testId={`DfTxAppointOracle.${feed.token}Currency`}>
            {feed.currency}
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
    </>
  )
}
