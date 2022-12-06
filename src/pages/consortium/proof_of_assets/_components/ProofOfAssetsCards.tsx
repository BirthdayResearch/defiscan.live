import { CardList } from "@components/commons/CardList";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { AssetBreakdownInfo } from "@defichain/whale-api-client/dist/api/consortium";
import classNames from "classnames";

export function ProofOfAssetCards({
  assets,
}: {
  assets: AssetBreakdownInfo[];
}): JSX.Element {
  return (
    <CardList>
      {assets.map((asset, index) => (
        <ProofOfAssetsCard key={index} asset={asset} />
      ))}
    </CardList>
  );
}

function ProofOfAssetsCard({
  asset,
}: {
  asset: AssetBreakdownInfo;
}): JSX.Element {
  const AssetIcon = getAssetIcon(asset.tokenSymbol);
  return (
    <CardList.Card testId="ProofOfAssetsCard">
      <CardList.Header isToggleDisplayed={false}>
        <div className={classNames("flex", {})}>
          <AssetIcon className="h-8 w-8" />
          <span className="ml-2 text-2xl font-medium text-gray-900 dark:text-dark-gray-900">
            {asset.tokenSymbol}
          </span>
        </div>
      </CardList.Header>

      <CardList.List>
        {asset.memberInfo.map((memberInfo) => {
          return (
            <>
              <span>{memberInfo.name}</span>
              <div className="flex flex-col">
                {memberInfo.backingAddresses.map((address) => (
                  <span>{address}</span>
                ))}
              </div>
            </>
          );
        })}
      </CardList.List>
    </CardList.Card>
  );
}
