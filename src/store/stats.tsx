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
  }
  tvl: {
    total?: number
    dex?: number
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
}

const initialState: StatsState = {
  count: {},
  tvl: {},
  burned: {},
  price: {}
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
  }, [api, interval, dispatch])

  return <>{props.children}</>
}
