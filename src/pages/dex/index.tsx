import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Loader from '../../components/loader/loader'
// import { useWhaleApiClient } from '../../layouts/contexts/WhaleContext'

const DexPage: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [poolPairs, setPoolPairs] = useState<any>([])
  
  // const rpc = useWhaleApiClient()
  
  useEffect(() => {
    const listPoolPairs = async () => {
      // const poolPairs = await rpc.poolpair.list()
      const poolPairs = [
        { id: '0', symbol: 'BTC-DFI', totalLiquidityUsd: '174058812.06', dailyVolumeUsd30: '1213847.86', liquidity: '2851.29 BTC + 46161333.26 DFI', priceRatio: '16189.62 DFI/BTC', apr: '85.04'},
        { id: '1', symbol: 'ETH-DFI', totalLiquidityUsd: '37161024.14', dailyVolumeUsd30: '411450.11', liquidity: '10143.25 ETH + 9825594.18 DFI', priceRatio: '968.68 DFI/ETH', apr: '74.69'},
      ]
      setPoolPairs(poolPairs)
      setLoading(false)
    }
    if (loading) {
      listPoolPairs()
    }
  }, [loading])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={'container mx-auto px-4 py-6'}>
      <h1 className={'text-2xl font-medium pb-8'}>Liquidity Pool Pairs</h1>
      <table className="sm:shadow-2xl border-collapse w-full">
        <thead>
          <tr className="border-t-2">
            <th className="px-4 py-4 font-medium text-left">Name</th>
            <th className="px-4 py-4 font-medium text-right">Total Liquidity <span className="text-gray-500">USD</span></th>
            <th className="px-4 py-4 font-medium text-right">Daily Volume USD <span className="text-gray-500">(30d avg)</span></th>
            <th className="px-4 py-4 font-medium text-right">Liquidity</th>
            <th className="px-4 py-4 font-medium text-right">Price Ratio</th>
            <th className="px-4 py-4 font-medium text-right">APR</th>
          </tr>
        </thead>
        <tbody>
          {poolPairs.length !== 0 ? (
            poolPairs.map((p: any) => (
              <tr key={p.id}>
                <td className="px-4 py-4 border-t text-left">{p.symbol}</td>
                <td className="px-4 py-4 border-t text-right">{p.totalLiquidityUsd}</td>
                <td className="px-4 py-4 border-t text-right">{p.dailyVolumeUsd30}</td>
                <td className="px-4 py-4 border-t text-right">{p.liquidity}</td>
                <td className="px-4 py-4 border-t text-right">{p.priceRatio}</td>
                <td className="px-4 py-4 border-t text-right">{p.apr} %</td>
              </tr>
            ))
          ) : (
            <div>No pool pairs found</div>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DexPage