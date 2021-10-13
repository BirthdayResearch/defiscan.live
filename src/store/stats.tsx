import { isPlayground } from '@contexts/Environment'
import { useNetwork } from '@contexts/NetworkContext'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { StatsData } from '@defichain/whale-api-client/dist/api/stats'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PropsWithChildren, useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface StatsState {
  count: {
    blocks?: number
    tokens?: number
    prices?: number
    masternodes?: number
  }
  tvl: {
    total?: number
    dex?: number
    masternodes?: number
  }
  burned: {
    total?: number
    fee?: number
    emission?: number
    address?: number
  }
  price: {
    usdt?: number
  }
  masternodes: {
    locked?: Array<{
      weeks: number
      tvl: number
      count: number
    }>
  }
  emission: {
    total?: number
    masternode?: number
    dex?: number
    community?: number
    anchor?: number
    burned?: number
  }
  blockchain: {
    difficulty?: number
  }
}

const initialState: StatsState = {
  count: {},
  tvl: {},
  burned: {},
  price: {},
  masternodes: {},
  emission: {},
  blockchain: {}
}

export const stats = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<StatsData>) => {
      state.count = action.payload.count
      state.tvl = action.payload.tvl
      state.burned = action.payload.burned
      state.price = action.payload.price
      state.masternodes = action.payload.masternodes
      state.emission = action.payload.emission
      state.blockchain = action.payload.blockchain
    }
  }
})

export function StatsProvider (props: PropsWithChildren<{}>): JSX.Element {
  const interval = isPlayground(useNetwork()) ? 3000 : 30000
  const api = useWhaleApiClient()
  const dispatch = useDispatch()

  useEffect(() => {
    function fetch (): void {
      void api.stats.get().then(data => {
        dispatch(stats.actions.update(data))
      })
    }

    fetch()
    const intervalId = setInterval(fetch, interval)
    return () => clearInterval(intervalId)
  }, [])

  return <>{props.children}</>
}
