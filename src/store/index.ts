import { configureStore } from '@reduxjs/toolkit'
import { block } from './block'

/**
 * RootState for DeFi Explorer
 *
 * All state reducers in this store must be designed for global use and placed in this
 * directory. Reducer that is not meant to be global must not be part of RootState.
 *
 * Non-global state should be managed independently within their own React Component/Page.
 */
export const store = configureStore({
  reducer: {
    block: block.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
