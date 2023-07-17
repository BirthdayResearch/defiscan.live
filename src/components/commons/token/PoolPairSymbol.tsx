import { useEffect, useState } from "react";
import classnames from "classnames";
import { useWhaleApiClient } from "@contexts/WhaleContext";
import { PoolPairData } from "@defichain/whale-api-client/dist/api/poolpairs";
import { getAssetIcon } from "@components/icons/assets/tokens";

interface PoolPairSymbolProps {
  poolPairId: string | number;
  className?: string;
  symbolSizeClassName: string;
  symbolMarginClassName: string;
  textClassName: string;
  testId?: string;
}

export function PoolPairSymbol(props: PoolPairSymbolProps): JSX.Element {
  const api = useWhaleApiClient();

  const [poolPairData, setPoolPairData] = useState<PoolPairData | undefined>(
    undefined
  );
  const [showPoolPairId, setShowPoolPairId] = useState<boolean>(false);

  useEffect(() => {
    if (props.poolPairId !== undefined) {
      const timeoutId = setTimeout(() => setShowPoolPairId(true), 30000);
      api.poolpairs
        .get(props.poolPairId.toString())
        .then((data) => {
          setPoolPairData(data);
        })
        .catch(() => {
          setPoolPairData(undefined);
          setShowPoolPairId(true);
        })
        .finally(() => {
          clearTimeout(timeoutId);
        });
    }
  }, [props.poolPairId]);

  if (poolPairData === undefined && !showPoolPairId) {
    return (
      <div className="animate-pulse py-2.5 w-10 rounded-md bg-gray-200 inline" />
    );
  }

  if (poolPairData === undefined || showPoolPairId) {
    return (
      <div
        className={props.className}
      >{`(PoolPair ID: ${props.poolPairId})`}</div>
    );
  }

  const IconA = getAssetIcon(poolPairData.tokenA.symbol);
  const IconB = getAssetIcon(poolPairData.tokenB.symbol);

  return (
    <div className="flex items-center" data-testid={props.testId}>
      <IconA
        data-testid="AddressTokenCard.TokenSymbol"
        className={classnames("absolute z-10", props.symbolSizeClassName)}
      />
      <IconB
        data-testid="AddressTokenCard.TokenSymbol"
        className={classnames(
          "absolute",
          props.symbolSizeClassName,
          props.symbolMarginClassName
        )}
      />
      <div className={classnames(props.textClassName)}>
        {`${poolPairData.tokenA.displaySymbol}-${poolPairData.tokenB.displaySymbol}`}
      </div>
    </div>
  );
}
