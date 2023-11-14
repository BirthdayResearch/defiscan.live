import { DfTx, PoolCreatePair } from "@defichain/jellyfish-transaction";
import { fromScript } from "@defichain/jellyfish-address";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenBalance } from "@defichain/jellyfish-transaction/dist/script/dftx/dftx_balance";
import { AdaptiveTable } from "@components/commons/AdaptiveTable";
import { TokenSymbol } from "@components/commons/token/TokenSymbol";
import { AddressLink } from "@components/commons/link/AddressLink";
import { DfTxHeader } from "./DfTxHeader";

interface DfTxPoolCreatePairProps {
  dftx: DfTx<PoolCreatePair>;
}

export function DfTxPoolCreatePair(
  props: DfTxPoolCreatePairProps
): JSX.Element {
  const network = useNetwork().name;
  const address = fromScript(props.dftx.data.ownerAddress, network);

  return (
    <div>
      <DfTxHeader name="Pool Create Pair" />
      <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
        <PoolCreatePairDetailsTable
          tokenA={props.dftx.data.tokenA}
          tokenB={props.dftx.data.tokenB}
          commission={props.dftx.data.commission.toFixed(8)}
          ownerAddress={address?.address}
          status={props.dftx.data.status}
          pairSymbol={props.dftx.data.pairSymbol}
        />
        <PoolCreatePairList customRewards={props.dftx.data.customRewards} />
      </div>
    </div>
  );
}

function PoolCreatePairDetailsTable(props: {
  tokenA: number;
  tokenB: number;
  status: boolean;
  pairSymbol: string;
  ownerAddress?: string;
  commission: string;
}): JSX.Element {
  return (
    <>
      <AdaptiveList className="w-full lg:w-1/2">
        <AdaptiveList.Row name="Token A">
          <TokenSymbol
            tokenId={props.tokenA}
            testId="DfTxPoolCreatePair.tokenASymbol"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Token B">
          <TokenSymbol
            tokenId={props.tokenB}
            testId="DfTxPoolCreatePair.tokenBSymbol"
          />
        </AdaptiveList.Row>
        <AdaptiveList.Row
          name="Commission"
          testId="DfTxPoolCreatePair.commission"
        >
          {props.commission}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Owner Address">
          {(() => {
            if (props.ownerAddress !== undefined) {
              return (
                <AddressLink
                  address={props.ownerAddress}
                  testId="DfTxPoolCreatePair.ownerAddress"
                />
              );
            }
            return "N/A";
          })()}
        </AdaptiveList.Row>
        <AdaptiveList.Row name="Status" testId="DfTxPoolCreatePair.status">
          {Number(props.status)}
        </AdaptiveList.Row>
        {props.pairSymbol.trim().length !== 0 && (
          <AdaptiveList.Row
            name="Pair Symbol"
            testId="DfTxPoolCreatePair.pairSymbol"
          >
            {props.pairSymbol}
          </AdaptiveList.Row>
        )}
      </AdaptiveList>
    </>
  );
}

function PoolCreatePairList(props: {
  customRewards: TokenBalance[];
}): JSX.Element {
  if (props.customRewards === undefined || props.customRewards.length === 0) {
    return <></>;
  }

  return (
    <>
      <AdaptiveTable className="w-full lg:w-1/2">
        <AdaptiveTable.Header>
          <AdaptiveTable.Head>TOKEN</AdaptiveTable.Head>
          <AdaptiveTable.Head>AMOUNT</AdaptiveTable.Head>
        </AdaptiveTable.Header>

        {props.customRewards.map((reward) => {
          return (
            <AdaptiveTable.Row key={reward.token}>
              <AdaptiveTable.Cell title="TOKEN" className="align-middle">
                <div
                  className="flex items-center"
                  data-testid="PoolCreatePair.Token"
                >
                  {reward.token}
                </div>
              </AdaptiveTable.Cell>
              <AdaptiveTable.Cell title="AMOUNT" className="align-middle">
                <span data-testid="PoolCreatePair.Amount">
                  {reward.amount.toFixed(8)}
                </span>
              </AdaptiveTable.Cell>
            </AdaptiveTable.Row>
          );
        })}
      </AdaptiveTable>
    </>
  );
}
