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
          <OverflowTable.Head>NAME</OverflowTable.Head>
          <OverflowTable.Head className='text-right'>AMOUNT</OverflowTable.Head>
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
          <div>
            {props.token.symbol}{!props.token.isDAT && `#${props.token.id}`}
          </div>
          <div className='my-auto'>
            {(() => {
              if (props.token.isDAT) {
                const AssetIcon = getAssetIcon(props.token.symbol)
                return <AssetIcon className='h-6 w-6' />
              }
              const TokenIcon = getTokenIcon(props.token.symbol)
              return <TokenIcon className='h-6 w-6' />
            })()}
          </div>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell sticky className='align-top lg:align-middle'>
        {props.token.name}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='text-right'>
        {`${props.token.amount} ${props.token.symbol}`}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}

function NoTokensRow (): JSX.Element {
  return (
    <td colSpan={3}>
      <div className='flex justify-center p-4'>
        <span>No Tokens</span>
      </div>
    </td>
  )
}
