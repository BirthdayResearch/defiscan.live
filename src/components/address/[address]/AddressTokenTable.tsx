import { AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Link } from '@components/commons/link/Link'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'

interface AddressTokenTableProps {
  address: string
}

export function AddressTokenTable (props: AddressTokenTableProps): JSX.Element {
  const api = useWhaleApiClient()
  const [tokensData, setTokensData] = useState<AddressToken[]>([])
  const [next, setNext] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)

  function getBalances (): void {
    setIsLoading(true)

    api.address.listToken(props.address, 10, next).then((data) => {
      setTokensData(tokensData.concat([...data]))
      if (data.hasNext) {
        setNext(data.nextToken)
      } else {
        setNext(undefined)
      }
    }).catch(() => {
      setTokensData([])
      setNext(undefined)
    }).finally(() => {
      setIsLoading(false)
      setIsInitialLoad(false)
    })
  }

  useEffect(() => {
    setTokensData([])
    setNext(undefined)
    setIsInitialLoad(true)
  }, [props.address])

  useEffect(() => {
    if (isInitialLoad) {
      getBalances()
    }
  }, [isInitialLoad])

  if (isInitialLoad) {
    return (
      <div className='mt-8 flex flex-wrap' data-testid='Balances'>
        <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Balances.title'>Balances</span>
        <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-100'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div className='mt-8 flex flex-wrap' data-testid='Balances'>
      <span className='font-medium text-xl mb-2 text-gray-800' data-testid='Balances.title'>Balances</span>
      {tokensData.length > 0 ? (
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
      <ShowMoreButton isLoading={isLoading} next={next} handleGetBalances={getBalances} />
    </div>
  )
}

function AddressTokenTableRow (props: { token: AddressToken }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell className='align-middle'>
        <div className='flex items-center'>
          <div className='my-auto'>
            {(() => {
              if (props.token.isLPS) {
                return <></>
              }

              if (props.token.isDAT) {
                const AssetIcon = getAssetIcon(props.token.symbol)
                return <AssetIcon className='h-6 w-6 mr-1' />
              }

              const TokenIcon = getTokenIcon(props.token.displaySymbol)
              return <TokenIcon className='h-6 w-6 mr-1' />
            })()}
          </div>
          <div className='text-primary-500 group-hover:underline'>
            {(() => {
              if (props.token.isLPS) {
                return (
                  <PoolPairSymbol
                    poolPairId={props.token.id} symbolSizeClassName='h-6 w-6'
                    symbolMarginClassName='ml-5' textClassName='ml-12'
                  />
                )
              }
              return <>{props.token.displaySymbol}{!props.token.isDAT && `#${props.token.id}`}</>
            })()}
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

function ShowMoreButton (props: { isLoading: boolean, next?: string, handleGetBalances: () => void }): JSX.Element {
  if (props.next === undefined) {
    return <></>
  }

  if (props.isLoading) {
    return (
      <div className='flex w-full justify-center mt-4'>
        <div className='flex justify-center pt-2 pb-4'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div
      className='flex w-full justify-center mt-4' onClick={props.handleGetBalances}
      data-testid='AddressBalanceTable.showMoreBtn'
    >
      <button
        type='button'
        className='w-full md:w-1/3 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded'
      >
        SHOW MORE
      </button>
    </div>
  )
}

function NoTokensInfo (): JSX.Element {
  return (
    <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-200'>
      <span>No Tokens</span>
    </div>
  )
}
