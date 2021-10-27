import { AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { OverflowTable } from '@components/commons/OverflowTable'

interface AddressTokenTableProps {
  tokens: AddressToken[]
}

export function AddressTokenTable (props: AddressTokenTableProps): JSX.Element {
  return (
    <div className='mt-6 flex flex-wrap'>
      <span className='font-medium text-xl mb-2 text-gray-800'>Balances</span>
      <OverflowTable className='w-full'>
        <OverflowTable.Header>
          <OverflowTable.Head>TOKEN</OverflowTable.Head>
          <OverflowTable.Head>NAME</OverflowTable.Head>
          <OverflowTable.Head>AMOUNT</OverflowTable.Head>
        </OverflowTable.Header>
        {props.tokens.map((token) => {
          return (
            <AddressTokenTableRow token={token} key={token.id} />
          )
        })}
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
      <OverflowTable.Cell>
        {props.token.amount}
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
