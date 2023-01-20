import { isPlayground } from "@waveshq/walletkit-core";
import { useNetwork } from "@contexts/NetworkContext";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { SupplyData } from "@defichain/whale-api-client/dist/api/stats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";

interface SupplyState {
  max: number;
  total: number;
  circulating: number;
  burned: number;
}

const initialState: SupplyState = {
  max: 0,
  total: 0,
  circulating: 0,
  burned: 0,
};

export const supply = createSlice({
  name: "supply",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<SupplyData>) => {
      state.max = action.payload.max;
      state.total = action.payload.total;
      state.circulating = action.payload.circulating;
      state.burned = action.payload.burned;
    },
  },
});

export function SupplyProvider(props: PropsWithChildren<{}>): JSX.Element {
  const connection = useNetwork().connection;
  const interval = isPlayground(connection) ? 3000 : 30000;
  const api = useWhaleApiClient();
  const dispatch = useDispatch();

  useEffect(() => {
    function fetch(): void {
      void api.stats.getSupply().then((data) => {
        dispatch(supply.actions.update(data));
      });
    }

    fetch();
    const intervalId = setInterval(fetch, interval);
    return () => clearInterval(intervalId);
  }, []);

  return <>{props.children}</>;
}
