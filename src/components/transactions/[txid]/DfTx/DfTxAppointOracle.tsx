import { DfTx, AppointOracle, CurrencyPair } from '@defichain/jellyfish-transaction'
import { fromScript } from '@defichain/jellyfish-address'
import { useNetworkObject } from '@contexts/NetworkContext'

import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { OverflowTable } from '@components/commons/OverflowTable'

interface DfTxAppointOracleProps {
  dftx: DfTx<AppointOracle>
}

interface AppointOracleProps {
  address: string | undefined
  weightage: number
  priceFeeds: CurrencyPair[]
}

export function DfTxAppointOracle (props: DfTxAppointOracleProps): JSX.Element {
  const network = useNetworkObject().name
  const script = fromScript(props.dftx.data.script, network)
  return (
    <div>
      <DfTxHeader name='Appoint Oracle' />
      <div className='mt-5'>
        <AppointOracleTable
          address={script?.address}
          weightage={props.dftx.data.weightage}
          priceFeeds={props.dftx.data.priceFeeds}
        />
      </div>
    </div>
  )
}

function AppointOracleTable ({
  address,
  priceFeeds,
  weightage
}: AppointOracleProps): JSX.Element {
  return (
    <>
      <div className='flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Address' testId='DfTxAppointOracle.Address' className='break-all'>
            {address ?? 'N/A'}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Weightage' testId='DfTxAppointOracle.Weightage'>
            {weightage}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
      <div className='w-full lg:w-1/2 mt-4'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head>Token</OverflowTable.Head>
            <OverflowTable.Head>Currency</OverflowTable.Head>
          </OverflowTable.Header>
          {priceFeeds.map((feed, index) => (
            <OverflowTable.Row key={index}>
              <OverflowTable.Cell>
                <span data-testId={`DfTxAppointOracle.${feed.token}Token`}>{feed.token}</span>
              </OverflowTable.Cell>
              <OverflowTable.Cell>
                <span data-testId={`DfTxAppointOracle.${feed.token}Currency`}>{feed.currency}</span>
              </OverflowTable.Cell>
            </OverflowTable.Row>
          )
          )}
        </OverflowTable>
      </div>
    </>
  )
}
