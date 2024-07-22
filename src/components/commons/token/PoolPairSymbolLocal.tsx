import classnames from "classnames";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { renameTokenSymbol } from "../../../utils/commons/RenameToken";

interface PoolPairSymbolProps {
  tokenA: {
    symbol: string;
    displaySymbol: string;
  };
  tokenB: {
    symbol: string;
    displaySymbol: string;
  };
  className?: string;
  primarySymbolClassName: string;
  secondarySymbolClassName: string;
  textClassName: string;
  testId?: string;
  primaryTextClassName?: string;
  secondaryTextClassName?: string;
}

export function PoolPairSymbolLocal(props: PoolPairSymbolProps): JSX.Element {
  const IconA = getAssetIcon(props.tokenA.symbol);
  const IconB = getAssetIcon(props.tokenB.symbol);

  const tokenADisplaySymbol = renameTokenSymbol(props.tokenA.displaySymbol);
  const tokenBDisplaySymbol = renameTokenSymbol(props.tokenB.displaySymbol);

  return (
    <div className="flex items-center" data-testid={props.testId}>
      <IconA
        className={classnames("absolute z-10", props.primarySymbolClassName)}
      />
      <IconB
        className={classnames("absolute", props.secondarySymbolClassName)}
      />
      <div className={classnames(props.textClassName)}>
        <span className={classnames(props.primaryTextClassName)}>
          {tokenADisplaySymbol}
        </span>
        <span className={classnames(props.secondaryTextClassName)}>
          -{tokenBDisplaySymbol}
        </span>
      </div>
    </div>
  );
}
