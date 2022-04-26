import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DexPrice, DexPricesResult } from '@defichain/whale-api-client/dist/api/poolpairs'
import { PropsWithChildren, useEffect } from 'react'
import { useNetwork } from '@contexts/NetworkContext'
import { isPlayground } from '@contexts/Environment'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { useDispatch } from 'react-redux'

interface DexState {
  dexPrices: { [symbol: string]: DexPrice }
}

const initialState: DexState = {
  dexPrices: {}
}

export const dex = createSlice({
  name: 'dex',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<DexPricesResult>) => {
      state.dexPrices = action.payload.dexPrices
    }
  }
})

export function DexProvider (props: PropsWithChildren<{}>): JSX.Element {
  const connection = useNetwork().connection
  const interval = isPlayground(connection) ? 3000 : 30000
  const client = useWhaleApiClient()
  const dispatch = useDispatch()

  useEffect(() => {
    function fetch (): void {
      void client.poolpairs.listDexPrices('USDT').then(data => {
        dispatch(dex.actions.update(data))
      })
    }

    fetch()
    const intervalId = setInterval(fetch, interval)
    return () => clearInterval(intervalId)
  }, [])

  return <>{props.children}</>
}
