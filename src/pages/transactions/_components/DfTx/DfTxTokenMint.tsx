import {
  DfTx,
  TokenBalance,
  TokenMint,
} from "@defichain/jellyfish-transaction";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { NumericFormat } from "react-number-format";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxTokenMintProps {
  dftx: DfTx<TokenMint>;
}

export function DfTxTokenMint(props: DfTxTokenMintProps): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Token Mint" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="w-full grid gap-2 grid-cols-1 lg:grid-cols-2">
          {props.dftx.data.balances.map((balance) => (
            <TokenMintRow balance={balance} key={balance.token} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenMintRow({ balance }: { balance: TokenBalance }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="Token">
        <TokenSymbol
          tokenId={balance.token}
          testId={`DfTxTokenMint.Token${balance.token}`}
        />
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Amount"
        testId={`DfTxTokenMint.Token${balance.token}Amount`}
      >
        <NumericFormat
          value={balance.amount.toNumber()}
          title="AMOUNT"
          displayType="text"
          thousandSeparator
        />
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}
