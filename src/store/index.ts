/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from "@reduxjs/toolkit";
import { stats } from "@store/stats";
import { poolpairs } from "@store/poolpairs";
import { supply } from "@store/supply";
import { announcementWebsiteSlice, statusWebsiteSlice } from "./website";
import { metachainSlice } from "./metachain";
import { dexPrices } from "./dexPrices";

/**
 * RootState for DeFi Scan
 *
 * All state reducers in this store must be designed for global use and placed in this
 * directory. Reducer that is not meant to be global must not be part of RootState.
 *
 * Non-global state should be managed independently within their own React Component/Page.
 */
export function initializeStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      stats: stats.reducer,
      poolpairs: poolpairs.reducer,
      supply: supply.reducer,
      dexPrices: dexPrices.reducer,
      metachain: metachainSlice.reducer,
      [announcementWebsiteSlice.reducerPath]: announcementWebsiteSlice.reducer,
      [statusWebsiteSlice.reducerPath]: statusWebsiteSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(metachainSlice.middleware)
        .concat(announcementWebsiteSlice.middleware)
        .concat(statusWebsiteSlice.middleware),
    preloadedState: preloadedState,
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
