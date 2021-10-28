import { AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { OverflowTable } from '@components/commons/OverflowTable'

interface AddressTokenTableProps {
  tokens: AddressToken[]
}

export function AddressTokenTable (props: AddressTokenTableProps): JSX.Element {
  return (
    <div className='mt-6 flex flex-wrap' data-testid='Balances'>
      <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Balances.title'>Balances</span>
      <OverflowTable className='w-full'>
        <OverflowTable.Header>
          <OverflowTable.Head>TOKEN</OverflowTable.Head>
          <OverflowTable.Head>AMOUNT</OverflowTable.Head>
          <OverflowTable.Head>NAME</OverflowTable.Head>
          <OverflowTable.Head>CATEGORY</OverflowTable.Head>
        </OverflowTable.Header>
        {props.tokens.length > 0 ? (
          props.tokens.map((token) => {
            return (
              <AddressTokenTableRow token={token} key={token.id} />
            )
          }))
          : (<NoTokensRow />)}
      </OverflowTable>
    </div>
  )
}

function AddressTokenTableRow (props: { token: AddressToken }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>
        <div className='flex gap-x-1'>
          <div className='my-auto'>
            {(() => {
              if (props.token.isDAT) {
                const AssetIcon = getAssetIcon(props.token.displaySymbol)
                return <AssetIcon className='h-6 w-6' />
              }
              const TokenIcon = getTokenIcon(props.token.displaySymbol)
              return <TokenIcon className='h-6 w-6' />
            })()}
          </div>
          <div>
            {props.token.displaySymbol}{!props.token.isDAT && `#${props.token.id}`}
          </div>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        <div className='flex gap-x-1 '>
          <span>{props.token.amount}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {(() => {
          if (props.token.isDAT) {
            return props.token.name.replace('Default Defi token', 'DeFiChain')
          }

          return props.token.name
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle group-hover:text-primary-500'>
        {(() => {
          if (props.token.isLPS) {
            return 'LPS'
          }

          if (props.token.isDAT) {
            return 'DAT'
          }

          return 'DCT'
        })()}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function NoTokensRow (): JSX.Element {
  return (
    <td colSpan={4}>
      <div className='flex justify-center p-4'>
        <span>No Tokens</span>
      </div>
    </td>
  )
}
