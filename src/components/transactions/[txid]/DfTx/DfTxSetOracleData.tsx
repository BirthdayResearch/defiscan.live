import { DfTx, SetOracleData, TokenPrice } from '@defichain/jellyfish-transaction'
import BigNumber from 'bignumber.js'
import { format, fromUnixTime } from 'date-fns'

import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'

interface DfTxSetOracleDataProps {
  dftx: DfTx<SetOracleData>
}

export function DfTxSetOracleData (props: DfTxSetOracleDataProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Set Oracle Data' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <SetOracleDataTable
          oracleId={props.dftx.data.oracleId}
          timestamp={props.dftx.data.timestamp}
          tokens={props.dftx.data.tokens}
        />
      </div>
    </div>
  )
}

function SetOracleDataTable (props: { oracleId: string, timestamp: BigNumber, tokens: TokenPrice[] }): JSX.Element {
  return (
    <>
      <AdaptiveList className='w-full lg:w-1/2'>
        <AdaptiveList.Row name='Oracle ID' className='break-all' testId='DfTxSetOracleData.OracleId'>
          {props.oracleId}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Received Time' testId='DfTxSetOracleData.Timestamp'>
          {format(fromUnixTime(props.timestamp.toNumber()), 'PPpp')}
        </AdaptiveList.Row>
      </AdaptiveList>
      <AdaptiveList className='w-full lg:w-1/2'>
        {props.tokens.map(token => (
          <AdaptiveList.Row
            key={`${token.token}amount`} name={`Token ${token.token} Amount`}
            testId={`DfTxSetOracleData.${token.token}Amount`}
          >
            {token.prices[0].amount.toFixed(8)} {token.token}
          </AdaptiveList.Row>
        ))}

        {props.tokens.map(token => (
          <AdaptiveList.Row
            key={`${token.token}currency`} name={`Token ${token.token} Currency`}
            testId={`DfTxSetOracleData.${token.token}Currency`}
          >
            {token.prices[0].currency}
          </AdaptiveList.Row>
        ))}
      </AdaptiveList>
    </>
  )
}
