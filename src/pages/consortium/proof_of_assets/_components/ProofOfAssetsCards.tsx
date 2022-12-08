import { CardList } from "@components/commons/CardList";
import { Link } from "@components/commons/link/Link";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { AssetBreakdownInfo } from "@defichain/whale-api-client/dist/api/consortium";
import classNames from "classnames";
import { getBackingAddressLink } from "../index.page";

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

      <CardList.List className="space-y-12 ml-10">
        {asset.memberInfo.map((memberInfo, index) => {
          return (
            <div key={index}>
              <div className="font-semibold text-lg pb-6 text-gray-900 dark:text-dark-gray-900">
                {memberInfo.name}
              </div>
              <div className="flex flex-col divide-y">
                {memberInfo.backingAddresses.map(
                  (backingAddress, backingIndex) => {
                    const backingAddressLink = getBackingAddressLink(
                      backingAddress,
                      asset.tokenSymbol
                    );
                    const isLastRow =
                      backingIndex === memberInfo.backingAddresses.length - 1;

                    return (
                      <div
                        key={backingIndex}
                        className={classNames(
                          "border-gray-100 dark:border-gray-700",
                          {
                            "pt-3": backingIndex > 0,
                            "pb-3": !isLastRow,
                          }
                        )}
                      >
                        {backingAddressLink === undefined && (
                          <span>{backingAddress}</span>
                        )}
                        {backingAddressLink !== undefined && (
                          <Link
                            href={{
                              pathname: backingAddressLink,
                            }}
                          >
                            <a className="block w-5/6 overflow-ellipsis overflow-hidden text-hyperlink-default hover:text-hyperlink-focused">
                              {backingAddress}
                            </a>
                          </Link>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </CardList.List>
    </CardList.Card>
  );
}
