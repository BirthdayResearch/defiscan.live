import { AddressToken } from '@defichain/whale-api-client/dist/api/address'
import { getAssetIcon, getTokenIcon } from '@components/icons/assets/tokens'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { PoolPairSymbol } from '@components/commons/PoolPairSymbol'
import { Link } from '@components/commons/link/Link'

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

    api.address.listToken(props.address, 200, next).then((data) => {
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
      <div className='flex flex-wrap' data-testid='Balances'>
        <div className='flex w-full h-40 items-center justify-center rounded p-4 border border-gray-100'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-wrap' data-testid='Balances'>
      {tokensData.length > 0 ? (
        <div className='flex flex-wrap w-full -m-1'>
          {tokensData.map((token) => {
            return (
              <AddressTokenTableRow token={token} key={token.id} />
            )
          })}
        </div>
      ) : (<NoTokensInfo />)}
      <ShowMoreButton isLoading={isLoading} next={next} handleGetBalances={getBalances} />
    </div>
  )
}

function AddressTokenTableRow (props: { token: AddressToken }): JSX.Element {
  return (
    <div className='w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-1'>
      <div className='flex flex-wrap p-3 rounded border border-gray-200'>
        <div className='w-full flex  justify-between'>
          <div className='flex items-center'>
            {(() => {
              if (props.token.isLPS) {
                return (
                  <div className='mr-11'>
                    <PoolPairSymbol
                      poolPairId={props.token.id} symbolSizeClassName='h-6 w-6'
                      symbolMarginClassName='ml-3.5' textClassName='hidden'
                    />
                  </div>
                )
              }

              if (props.token.isDAT) {
                const AssetIcon = getAssetIcon(props.token.symbol)
                return <AssetIcon className='h-6 w-6 mr-1' />
              }

              const TokenIcon = getTokenIcon(props.token.displaySymbol)
              return <TokenIcon className='h-6 w-6 mr-1' />
            })()}

            <div className='text-gray-900 hover:text-primary-500'>
              <Link href={{ pathname: `/tokens/${props.token.id}` }}>
                <a className='contents'>
                  {props.token.displaySymbol}{!props.token.isDAT && `#${props.token.id}`}
                </a>
              </Link>
            </div>
          </div>

          <div className='bg-gray-200 p-1 rounded'>
            <div className='text-xs font-medium text-gray-600'>
              {(() => {
                if (props.token.isLPS) {
                  return 'LPS'
                }
                if (props.token.isDAT) {
                  return 'DAT'
                }
                return 'DCT'
              })()}
            </div>
          </div>
        </div>

        <div className='w-full mt-2.5 text-gray-900 font-medium'>
          {props.token.amount}
        </div>
      </div>
    </div>

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
