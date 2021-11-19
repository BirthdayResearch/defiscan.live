import { AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Link } from '@components/commons/Link'

interface AddressTokenTableProps {
  address: string
}

export function AddressTokenTable (props: AddressTokenTableProps): JSX.Element {
  const api = useWhaleApiClient()
  const [tokensData, setTokensData] = useState<AddressToken[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function getAggregation (): void {
    api.address.listToken(props.address).then((data: AddressToken[]) => {
      setTokensData(data)
    }).catch(() => {
      setTokensData(undefined)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getAggregation()
  }, [props.address])

  if (isLoading) {
    return (
      <div className='mt-6 flex flex-wrap' data-testid='Balances'>
        <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Balances.title'>Balances</span>
        <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-100'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div className='mt-6 flex flex-wrap' data-testid='Balances'>
      <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Balances.title'>Balances</span>
      {tokensData !== undefined && tokensData.length > 0 ? (
        <OverflowTable className='w-full'>
          <OverflowTable.Header>
            <OverflowTable.Head title='TOKEN' />
            <OverflowTable.Head title='AMOUNT' />
            <OverflowTable.Head title='NAME' />
            <OverflowTable.Head title='CATEGORY' />
          </OverflowTable.Header>
          {tokensData.map((token) => {
            return (
              <Link href={{ pathname: `/tokens/${token.id}` }} key={token.id}>
                <a className='contents'>
                  <AddressTokenTableRow token={token} />
                </a>
              </Link>
            )
          })}
        </OverflowTable>
      ) : (<NoTokensInfo />)}
    </div>
  )
}

function AddressTokenTableRow (props: { token: AddressToken }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell className='align-middle'>
        <div className='flex items-center space-x-2'>
          <div className='my-auto'>
            {(() => {
              if (props.token.isDAT) {
                const AssetIcon = getAssetIcon(props.token.symbol)
                return <AssetIcon className='h-6 w-6' />
              }

              const TokenIcon = getTokenIcon(props.token.displaySymbol)
              return <TokenIcon className='h-6 w-6' />
            })()}
          </div>
          <div className='text-primary-500 group-hover:underline'>
            {props.token.displaySymbol}{!props.token.isDAT && `#${props.token.id}`}
          </div>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {props.token.amount}
      </OverflowTable.Cell>
      <OverflowTable.Cell>
        {(() => {
          if (props.token.isDAT) {
            return props.token.name.replace('Default Defi token', 'DeFiChain')
          }
          return props.token.name
        })()}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='align-middle'>
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

function NoTokensInfo (): JSX.Element {
  return (
    <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-200'>
      <span>No Tokens</span>
    </div>
  )
}
