import { DfTx, SetCollateralToken } from "@defichain/jellyfish-transaction";
import { Link } from "@components/commons/link/Link";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxSetCollateralTokenProps {
  dftx: DfTx<SetCollateralToken>;
}

export function DfTxSetCollateralToken(
  props: DfTxSetCollateralTokenProps
): JSX.Element {
  return (
    <div>
      <DfTxHeader name="Set Collateral Token" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <AdaptiveList className="w-full lg:w-1/2">
          <AdaptiveList.Row
            name="Collateral Token"
            testId="DfTxSetCollateralToken.CollateralToken"
          >
            <Link href={{ pathname: `/tokens/${props.dftx.data.token}` }}>
              <a className="text-blue-500 hover:underline">
                {props.dftx.data.token}
              </a>
            </Link>
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Currency Pair"
            testId="DfTxSetCollateralToken.CurrencyPair"
          >
            {`${props.dftx.data.currencyPair.token}-${props.dftx.data.currencyPair.currency}`}
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Factor"
            testId="DfTxSetCollateralToken.Factor"
          >
            {props.dftx.data.factor.toFixed(8)}
          </AdaptiveList.Row>
          <AdaptiveList.Row
            name="Activate After Block"
            testId="DfTxSetCollateralToken.Block"
          >
            {props.dftx.data.activateAfterBlock}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  );
}
