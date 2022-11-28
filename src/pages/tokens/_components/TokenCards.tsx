import React from "react";
import { CardList } from "@components/commons/CardList";
import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";
import { getAssetIcon, getTokenIcon } from "@components/icons/assets/tokens";
import { NumericFormat } from "react-number-format";
import { getTokenName } from "../../../utils/commons/token/getTokenName";

export function TokenCards({ tokens }: { tokens: TokenData[] }): JSX.Element {
  return (
    <CardList>
      {tokens.map((token) => {
        return <TokenCard token={token} key={token.id} />;
      })}
    </CardList>
  );
}

function TokenCard({ token }: { token: TokenData }): JSX.Element {
  return (
    <CardList.Card testId="TokenCard">
      <CardList.Header
        path={`tokens/${
          token.isDAT || token.isLPS
            ? token.displaySymbol
            : token.displaySymbol.concat("-", token.id)
        }`}
      >
        <div className="flex items-center">
          {(() => {
            if (token.isDAT) {
              const AssetIcon = getAssetIcon(token.symbol);
              return <AssetIcon className="h-6 w-6" />;
            }

            const TokenIcon = getTokenIcon(token.displaySymbol);
            return <TokenIcon className="h-6 w-6" />;
          })()}
          <div className="font-medium ml-2 text-gray-900 dark:text-gray-100">
            {token.displaySymbol}
            {!token.isDAT && `#${token.id}`}
          </div>
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title="Name"
          titleClassNames="text-sm"
          testId="TokenCard.CardList.Name"
        >
          {getTokenName(token)}
        </CardList.ListItem>

        <CardList.ListItem
          title="Category"
          titleClassNames="text-sm"
          testId="TokenCard.CardList.Category"
        >
          {(() => {
            if (token.isLPS) {
              return "LPS";
            }

            if (token.isDAT) {
              return "DAT";
            }

            return "DCT";
          })()}
        </CardList.ListItem>

        <CardList.ListItem
          title="Minted"
          titleClassNames="text-sm"
          testId="TokenCard.CardList.Minted"
        >
          {(() => {
            if (token.isLPS) {
              return <div>-</div>;
            }

            if (token.id === "0") {
              return <div>-</div>;
            }

            return (
              <NumericFormat
                value={token.minted}
                displayType="text"
                thousandSeparator
                decimalScale={2}
              />
            );
          })()}
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  );
}
