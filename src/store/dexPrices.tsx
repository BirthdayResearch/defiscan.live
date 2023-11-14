import { isPlayground } from "@waveshq/walletkit-core";
import { useNetwork } from "@contexts/NetworkContext";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DexPrice } from "@defichain/whale-api-client/dist/api/poolpairs";

interface DexPricesProps {
  [symbol: string]: DexPrice;
}

interface DexPricesState {
  dexPrices: { [symbol: string]: DexPricesProps };
}

const initialState: DexPricesState = {
  dexPrices: {},
};

export const dexPrices = createSlice({
  name: "dexPrices",
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<{ dexPrices: DexPricesProps; denomination: string }>
    ) => {
      state.dexPrices = {
        ...state.dexPrices,
        [action.payload.denomination]: action.payload.dexPrices,
      };
    },
  },
});

/**
 * Get dexprices by currency denomination
 */
export const dexPricesSelectorByDenomination = createSelector(
  [
    (state: DexPricesState) => state.dexPrices,
    (_state: DexPricesState, denomination: string): string => denomination,
  ],
  (dexPrices, denomination) => {
    return dexPrices[denomination] ?? {};
  }
);

export function DexPricesProvider(props: PropsWithChildren<{}>): JSX.Element {
  const connection = useNetwork().connection;
  const interval = isPlayground(connection) ? 3000 : 30000;
  const api = useWhaleApiClient();
  const dispatch = useDispatch();
  const denomination = "USDT";

  useEffect(() => {
    function fetch(): void {
      void api.poolpairs.listDexPrices(denomination).then((data) => {
        dispatch(
          dexPrices.actions.update({ dexPrices: data.dexPrices, denomination })
        );
      });
    }

    fetch();
    const intervalId = setInterval(fetch, interval);
    return () => clearInterval(intervalId);
  }, []);

  return <>{props.children}</>;
}
