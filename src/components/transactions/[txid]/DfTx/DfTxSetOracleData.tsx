import { DfTx, SetOracleData, TokenPrice } from '@defichain/jellyfish-transaction'
import BigNumber from 'bignumber.js'
import { format, fromUnixTime } from 'date-fns'

import { AdaptiveList } from '@components/commons/AdaptiveList'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'

interface DfTxSetOracleDataProps {
  dftx: DfTx<SetOracleData>
}

export function DfTxSetOracleData (props: DfTxSetOracleDataProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Set Oracle Data' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <SetOracleDataDetails
          oracleId={props.dftx.data.oracleId}
          timestamp={props.dftx.data.timestamp}
          tokens={props.dftx.data.tokens}
        />
        <SetOracleDataTokenList
          oracleId={props.dftx.data.oracleId}
          timestamp={props.dftx.data.timestamp}
          tokens={props.dftx.data.tokens}
        />
      </div>
    </div>
  )
}

function SetOracleDataDetails (props: { oracleId: string, timestamp: BigNumber, tokens: TokenPrice[] }): JSX.Element {
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
    </>
  )
}

function SetOracleDataTokenList (props: { oracleId: string, timestamp: BigNumber, tokens: TokenPrice[] }): JSX.Element {
  if (props.tokens.length === 0) {
    return (
      <></>
    )
  }

  return (
    <>
      <AdaptiveTable className='w-full lg:w-1/2'>
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
          <AdaptiveTable.Head>AMOUNT</AdaptiveTable.Head>
          <AdaptiveTable.Head>CURRENCY</AdaptiveTable.Head>
        </AdaptiveTable.Header>

        {props.tokens.map(token => {
          return (
            <AdaptiveTable.Row key={token.token}>
              <AdaptiveTable.Cell title='TOKEN' className='align-middle'>
                <div className='flex items-center' data-testid='DfTxSetOracleData.Token'>
                  {token.token}
                </div>
              </AdaptiveTable.Cell>
              <AdaptiveTable.Cell title='AMOUNT' className='align-middle'>
                <span data-testid='DfTxSetOracleData.Amount'>{token.prices[0].amount.toFixed(8)}</span>
              </AdaptiveTable.Cell>
              <AdaptiveTable.Cell title='CURRENCY' className='align-middle'>
                <span data-testid='DfTxSetOracleData.Currency'>{token.prices[0].currency}</span>
              </AdaptiveTable.Cell>
            </AdaptiveTable.Row>
          )
        })}
      </AdaptiveTable>
    </>
  )
}
