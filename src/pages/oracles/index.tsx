import { Head } from '@components/commons/Head'
import { OracleFeed, PriceFeedProps } from '@components/oracles/OracleFeed'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { prices } from '@defichain/whale-api-client'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { useState } from 'react'
import { getPriceCopy, PriceCopy } from '@content/prices'
import classNames from 'classnames'
import { Switch } from '@headlessui/react'

interface PricesPageProps {
  prices: {
    items: prices.PriceTicker[]
  }
}

export default function PricesPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const types = ['All', 'Crypto', 'Stocks', 'Forex', 'Commodity', 'ETF']

  const [typeSelection, setTypeCurrentSelection] = useState<string>('All')
  const [availabilitySelection, setAvailabilitySelection] = useState<boolean>(true)
  const tickers: PriceFeedProps[] = []

  props.prices.items.forEach(item => {
    const copy: PriceCopy | undefined = getPriceCopy(item.id)
    const ticker = {
      price: item,
      copy: copy
    }
    tickers.push(ticker)
  })

  return (
    <Container className='pt-12 pb-20'>
      <Head title='Oracles' />

      <div>
        <div className='flex flex-wrap justify-between'>
          <h1 className='text-2xl font-medium'>
            Oracle Feeds
          </h1>

          <div className='flex text-sm mt-8 md:mt-0'>
            <div className='flex flex-wrap gap-2' data-testid='FeedFilter.Types'>
              {types.map(type => (
                <div
                  className={classNames('rounded p-2 border cursor-pointer', typeSelection === type ? 'text-white bg-primary-500 border-primary-500' : 'border-gray-300 text-gray-900')}
                  onClick={() => setTypeCurrentSelection(type)}
                  key={type}
                  data-testid='FeedFilter.Types'
                >
                  {type}
                </div>
              ))}
            </div>
            <div className='ml-4 flex items-center' data-testid='FeedFilter.Availability'>
              <Switch.Group>
                <div className='flex items-center'>
                  <Switch
                    checked={availabilitySelection}
                    onChange={setAvailabilitySelection}
                    className={`${
                      availabilitySelection ? 'bg-primary-500' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
              availabilitySelection ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className='ml-1'>Only show assets available on DeFiChain</Switch.Label>
                </div>
              </Switch.Group>
            </div>
          </div>
        </div>

        <div className='mt-4 -m-4 flex flex-wrap'>
          {(() => {
            const sortedTickers = sortByType(tickers.filter(item => (typeSelection === 'All' || item.copy?.type === typeSelection.toUpperCase()) && (!availabilitySelection || item.copy?.available === availabilitySelection)))
            return (
              sortedTickers.length === 0 ? (
                <div className='w-full flex justify-center my-32 text-gray-400'>No price feed matched your filter
                  selection
                </div>
              ) : (
                sortedTickers.map(item => (
                  <OracleFeed price={item.price} copy={item.copy} key={item.price.id} />
                ))
              )
            )
          })()}
        </div>
      </div>
    </Container>
  )
}

function sortByType (tickers: PriceFeedProps[]): PriceFeedProps[] {
  const typeOrder = ['CRYPTO', 'STOCKS', 'FOREX', 'COMMODITY', 'ETF', 'UKN']
  let sortedArr: PriceFeedProps[] = []

  const groups = tickers.reduce((groups, item) => {
    const key = item.copy?.type === undefined ? 'UKN' : item.copy?.type
    if (key in groups) {
      groups[key].push(item)
    } else {
      groups[key] = [item]
    }
    return groups
  }, {})

  typeOrder.forEach(type => {
    if (type in groups) {
      sortedArr = sortedArr.concat(groups[type])
    }
  })

  return sortedArr
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const prices: prices.PriceTicker[] = []

  let pricesResponse = await getWhaleApiClient(context).prices.list(200)
  prices.push(...pricesResponse)
  while (pricesResponse.hasNext) {
    pricesResponse = await getWhaleApiClient(context).prices.list(200, pricesResponse.nextToken)
    prices.push(...pricesResponse)
  }

  return {
    props: {
      prices: {
        items: prices
      }
    }
  }
}
