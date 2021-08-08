/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from '@reduxjs/toolkit'
import { stats } from '@store/stats'

/**
 * RootState for DeFi Scan
 *
 * All state reducers in this store must be designed for global use and placed in this
 * directory. Reducer that is not meant to be global must not be part of RootState.
 *
 * Non-global state should be managed independently within their own React Component/Page.
 */
export function createStore () {
  return configureStore({
    reducer: {
      stats: stats.reducer
    }
  })
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
