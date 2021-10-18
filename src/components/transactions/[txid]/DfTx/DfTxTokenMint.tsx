import { DfTx, TokenMint, TokenBalance } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { TokenSymbol } from '@components/commons/TokenSymbol'
import NumberFormat from 'react-number-format'

interface DfTxTokenMintProps {
  dfxt: DfTx<TokenMint>
}

export function DfTxTokenMint (props: DfTxTokenMintProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name='Token Mint' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          {props.dfxt.data.balances.map(balance => (
            <TokenMintRow balance={balance} key={balance.token} />
          ))}
        </AdaptiveList>
      </div>
    </div>
  )
}

function TokenMintRow ({ balance }: {balance: TokenBalance}): JSX.Element {
  return (
    <>
      <AdaptiveList.Row name='Token'>
        <TokenSymbol tokenId={balance.token} testId={`DfTxTokenMint.Token${balance.token}`} />
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Amount' testId={`DfTxTokenMint.Token${balance.token}Amount`}>
        <NumberFormat
          value={balance.amount.toNumber()}
          title='AMOUNT'
          displayType='text'
          thousandSeparator
        />
      </AdaptiveList.Row>
    </>
  )
}
