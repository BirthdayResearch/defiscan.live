import { DfTx, TakeLoan } from '@defichain/jellyfish-transaction'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Link } from '@components/commons/link/Link'
import { DfTxHierarchicalSubtitle } from '@components/transactions/[txid]/DfTx/DfTxHierarchicalSubtitle'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { DfTxNotAvailableMessage } from '@components/transactions/[txid]/DfTx/DfTxNotAvailableMessage'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'

interface DfTxTakeLoanProps {
  dftx: DfTx<TakeLoan>
}

interface Stack {
  type: string
  code?: string
  hex?: string
}

export function DfTxTakeLoan (props: DfTxTakeLoanProps): JSX.Element {
  return (
    <>
      <DfTxHeader name={props.dftx.name} />
      <AdaptiveList className='w-full mt-6'>
        <AdaptiveList.Row name='Type number' testId='transaction-take-loan-type-number'>
          {props.dftx.type}
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Vault ID' testId='transaction-take-loan-vaultId'>
          <Link href={{ pathname: `/vaults/${props.dftx.data.vaultId}` }}>
            <a className='hover:text-primary-500 overflow-ellipsis overflow-hidden'>
              {props.dftx.data.vaultId}
            </a>
          </Link>
        </AdaptiveList.Row>
        <AdaptiveList.Row name='Signature' testId='transaction-take-loan-signature'>
          {props.dftx.signature}
        </AdaptiveList.Row>
      </AdaptiveList>
      <div className='ml-10'>
        <DfTxHierarchicalSubtitle title='Stack' />
        {props.dftx.data.to.stack.length > 0 && (
          <AdaptiveTable className='lg:mt-6'>
            <AdaptiveTable.Header>
              <AdaptiveTable.Head>Type</AdaptiveTable.Head>
              <AdaptiveTable.Head>Code/Hex</AdaptiveTable.Head>
            </AdaptiveTable.Header>
            {props.dftx.data.to.stack.map((stack: Stack, i) => (
              <AdaptiveTable.Row key={`stack-to-row-${i}`}>
                <AdaptiveTable.Cell title='Type' testId={`transaction-take-loan-data-to-stack-type-${i}`}>{stack.type}</AdaptiveTable.Cell>
                <AdaptiveTable.Cell title='Code/Hex' testId={`transaction-take-loan-data-to-stack-code-${i}`}>{stack.code !== undefined ? stack.code : stack.hex}</AdaptiveTable.Cell>
              </AdaptiveTable.Row>
            ))}
          </AdaptiveTable>
        )}
        {props.dftx.data.to.stack.length === 0 && (
          <DfTxNotAvailableMessage notAvailableAttr='Stack' />
        )}
        <DfTxHierarchicalSubtitle title='Token Amounts' />
        {props.dftx.data.tokenAmounts.length > 0 && (
          <AdaptiveTable className='lg:mt-6'>
            <AdaptiveTable.Header>
              <AdaptiveTable.Head>Token</AdaptiveTable.Head>
              <AdaptiveTable.Head>Amount</AdaptiveTable.Head>
            </AdaptiveTable.Header>
            {props.dftx.data.tokenAmounts.map((tokenData, i) => (
              <AdaptiveTable.Row key={`tokenAmounts-row-${i}`}>
                <AdaptiveTable.Cell title='Token number' testId={`transaction-take-loan-data-tokenAmounts-token-${i}`}>
                  <Link href={{ pathname: `/tokens/${tokenData.token}` }}>
                    <a>{tokenData.token.toString()}</a>
                  </Link>
                </AdaptiveTable.Cell>
                <AdaptiveTable.Cell title='Amount' testId={`transaction-take-loan-data-tokenAmounts-amount-${i}`}>
                  {tokenData.amount.toNumber()}
                </AdaptiveTable.Cell>
              </AdaptiveTable.Row>
            ))}
          </AdaptiveTable>
        )}
        {props.dftx.data.tokenAmounts.length === 0 && (
          <DfTxNotAvailableMessage notAvailableAttr='Token' />
        )}
      </div>
    </>
  )
}
