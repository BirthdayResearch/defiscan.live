import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { PoolPairData } from "@defichain/whale-api-client/dist/api/poolpairs";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { getWhaleApiClient, useWhaleApiClient } from "@contexts/WhaleContext";
import { Container } from "@components/commons/Container";
import { IndexHeader } from "@components/index/IndexHeader";
import { LiquidityPoolList } from "@components/index/LiquidityPoolList";
import { BlocksList } from "@components/index/BlocksList";
import { TransactionsList } from "@components/index/TransactionsList";
import { useEffect, useState } from "react";
import { SupplyStats } from "@components/index/SupplyStats";
import {
  StatsData,
  SupplyData,
} from "@defichain/whale-api-client/dist/api/stats";

interface HomePageProps {
  blocks: Block[];
  stats: StatsData;
  supply: SupplyData;
  transactions: Transaction[];
  liquidityPools: PoolPairData[];
}

interface HomePageStateI {
  blocks: Block[];
  transactions: Transaction[];
  liquidityPools: PoolPairData[];
}

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const api = useWhaleApiClient();
  const [data, setData] = useState<HomePageStateI>({
    blocks: props.blocks,
    transactions: props.transactions,
    liquidityPools: props.liquidityPools,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData(): Promise<void> {
    const blocks = await api.blocks.list(8);
    let transactions: Transaction[] = [];
    await Promise.all(
      blocks.map(
        async (block) =>
          await api.blocks.getTransactions(block.id, 8).then((results) => {
            return results;
          })
      )
    ).then((results) => {
      results.map((result) => transactions.push(...result));
    });
    transactions = transactions.slice(0, 8);

    const liquidityPools = await api.poolpairs.list(8);

    setData({
      transactions,
      blocks,
      liquidityPools,
    });
  }

  return (
    <>
      <IndexHeader />
      <Container className="pb-20 relative z-1">
        <SupplyStats stats={props.stats} supply={props.supply} />
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-3/5 xl:w-2/3 px-1">
            <TransactionsList transactions={data.transactions} />
          </div>
          <div className="w-full lg:w-2/5 xl:w-1/3 px-1">
            <BlocksList blocks={data.blocks} />
          </div>
        </div>
        <LiquidityPoolList liquidityPools={data.liquidityPools} />
      </Container>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context);

  const [blocks, supply, stats] = await Promise.all([
    api.blocks.list(8),
    api.stats.getSupply(),
    api.stats.get(),
  ]);

  let transactions: Transaction[] = [];
  await Promise.all(
    blocks.map(
      async (block) =>
        await api.blocks.getTransactions(block.id, 8).then((results) => {
          return results;
        })
    )
  ).then((results) => {
    results.map((result) => transactions.push(...result));
  });
  transactions = transactions.slice(0, 8);

  const liquidityPools = await api.poolpairs.list(8);

  return {
    props: {
      blocks,
      stats,
      supply,
      transactions,
      liquidityPools,
    },
  };
}
