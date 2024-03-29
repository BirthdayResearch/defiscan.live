import { getEnvironment } from "@contexts/Environment";
import { RootState } from "@store/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  useGetBlockchainStatusQuery,
  useGetOceanStatusQuery,
} from "@store/website";

// MAX_TIME_DIFF set to 45 mins to display warning message (in WarningBanner) when blockchain is down only in Production mode, else 5 seconds for local runs
const MAX_TIME_DIFF = getEnvironment().debug ? 5 * 1000 : 45 * 60 * 1000; // 45 mins in milliseconds

export function useApiStatus(): {
  isBlockchainDown: boolean;
  isOceanDown: boolean;
} {
  const { lastSync, lastSuccessfulSync } = useSelector(
    (state: RootState) => state.stats
  );
  const { data: blockchainStatus, isSuccess: isBlockchainSuccess } =
    useGetBlockchainStatusQuery(
      {},
      {
        pollingInterval:
          getEnvironment().name === "Development" ? 3000 : 1000 * 60 * 5, // every 5mins
      }
    );

  const { data: oceanStatus, isSuccess: isOceanSuccess } =
    useGetOceanStatusQuery(
      {},
      {
        pollingInterval:
          getEnvironment().name === "Development" ? 3000 : 1000 * 60 * 5, // every 5mins
      }
    );

  const [isBlockchainDown, setIsBlockchainDown] = useState(false);
  const [isOceanDown, setIsOceanDown] = useState(false);

  function getBlockStatus(
    lastSync?: string,
    lastSuccessfulSync?: string
  ): void {
    if (lastSync !== undefined && lastSuccessfulSync !== undefined) {
      // stats api is down - if syncing time is more than MAX_TIME_DIFF - checks which api is down
      if (dayjs(lastSync).diff(dayjs(lastSuccessfulSync)) > MAX_TIME_DIFF) {
        // blockchain api is down
        if (
          isBlockchainSuccess &&
          blockchainStatus?.status.description === "outage"
        ) {
          setIsBlockchainDown(true);
        } else if (
          isOceanSuccess &&
          oceanStatus?.status.description === "outage"
        ) {
          // ocean api is down
          setIsOceanDown(true);
        } else {
          // both apis are down
          setIsBlockchainDown(true);
          setIsOceanDown(true);
        }
      } else {
        // stats api is up - both blockchain and ocean apis are up
        setIsOceanDown(false);
        setIsBlockchainDown(false);
      }
    }
  }
  useEffect(() => {
    getBlockStatus(lastSync, lastSuccessfulSync);
  }, [
    lastSync,
    lastSuccessfulSync,
    blockchainStatus,
    isBlockchainSuccess,
    oceanStatus,
    isOceanSuccess,
  ]);

  return {
    isBlockchainDown,
    isOceanDown,
  };
}
