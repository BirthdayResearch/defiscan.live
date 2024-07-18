import { isPlayground } from "@waveshq/walletkit-core";
import { useNetwork } from "@contexts/NetworkContext";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PoolPairData } from "@defichain/whale-api-client/dist/api/poolpairs";

interface StatsState {
  poolpairs: PoolPairData[];
}

const initialState: StatsState = {
  poolpairs: [],
};

export const poolpairs = createSlice({
  name: "poolpairs",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<PoolPairData[]>) => {
      state.poolpairs = action.payload;
    },
  },
});

export function PoolPairsProvider(props: PropsWithChildren<{}>): JSX.Element {
  const connection = useNetwork().connection;
  const interval = isPlayground(connection) ? 3000 : 30000;
  const api = useWhaleApiClient();
  const dispatch = useDispatch();

  useEffect(() => {
    function fetch(): void {
      void api.poolpairs.list(200).then((data) => {
        const updatedData = data.map((poolpair) => {
          if (poolpair.displaySymbol.includes("dUSDT")) {
            return {
              ...poolpair,
              displaySymbol: poolpair.displaySymbol.replace("dUSDT", "csUSDT"),
            };
          }
          return poolpair;
        });
        dispatch(poolpairs.actions.update(updatedData));
      });
    }

    fetch();
    const intervalId = setInterval(fetch, interval);
    return () => clearInterval(intervalId);
  }, []);

  return <>{props.children}</>;
}
