import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { Transaction } from "@defichain/whale-api-client/dist/api/transactions";
import { Breadcrumb } from "@components/commons/Breadcrumb";
import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { CopyButton } from "@components/commons/CopyButton";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { Head } from "@components/commons/Head";
import { Container } from "@components/commons/Container";
import { MetascanLinkButton } from "@components/commons/MetascanLinkButton";
import { useState } from "react";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import { useNetwork } from "@contexts/NetworkContext";
import { isAlphanumeric } from "../../../utils/commons/StringValidator";
import { BlockTransactions } from "./_components/BlockTransactions";
import { BlockDetailTable } from "./_components/BlockDetailTable";

interface BlockDetailsPageProps {
  block: Block;
  transactions: {
    items: Transaction[];
    pages: CursorPage[];
  };
  mappedEvmBlockNum?: string | null;
}
interface VmmapResult {
  input: string;
  type: string;
  output: string;
}

enum VmmapTypes {
  BlockNumberDVMToEVM = 1,
}

export default function BlockDetails(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  return (
    <Container className="pt-8 pb-20">
      <BlockHeading {...props} />
      <BlockDetailTable {...props} />
      <BlockTransactions {...props} />
    </Container>
  );
}

function BlockHeading({
  block,
  mappedEvmBlockNum,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const network = useNetwork().connection;
  const [metachainBlockUrl, setMetachainBlockUrl] = useState<string>();

  if (mappedEvmBlockNum) {
    const txUrl = getMetaScanBlockUrl(network, mappedEvmBlockNum);
    if (!metachainBlockUrl) {
      setMetachainBlockUrl(txUrl);
    }
  }
  return (
    <div className="lg:flex flex-col lg:flex-row items-end lg:justify-between">
      <div>
        <Head title={`Block #${block.height}`} />

        <Breadcrumb
          items={[
            {
              path: "/blocks",
              name: "Blocks",
            },
            {
              path: `/blocks/${block.height}`,
              name: `#${block.height}`,
              canonical: true,
            },
          ]}
        />

        <h1 className="font-medium text-2xl mt-1 dark:text-dark-gray-900">
          Block #{block.height}
        </h1>

        <div className="flex items-center my-1 dark:text-dark-gray-900">
          <div className="font-semibold">Hash:</div>
          <div className="ml-1 text-lg break-all" data-testid="block-hash">
            {block.hash}
          </div>
          <CopyButton className="ml-2" content={block.hash} />
        </div>
      </div>
      <div className="mt-2 lg:mt-0">
        {metachainBlockUrl && <MetascanLinkButton href={metachainBlockUrl} />}
      </div>
    </div>
  );
}

function getNetworkParams(network: EnvironmentNetwork): string {
  switch (network) {
    case EnvironmentNetwork.MainNet:
      // no-op: network param not required for MainNet
      return "";
    case EnvironmentNetwork.TestNet:
      return `?network=${EnvironmentNetwork.TestNet}`;
    case EnvironmentNetwork.DevNet:
      return `?network=${EnvironmentNetwork.DevNet}`;

    case EnvironmentNetwork.LocalPlayground:
    case EnvironmentNetwork.RemotePlayground:
      return `?network=${EnvironmentNetwork.RemotePlayground}`;
    case EnvironmentNetwork.Changi:
      return `?network=${EnvironmentNetwork.Changi}`;
    default:
      return "";
  }
}

function getMetaScanBlockUrl(
  network: EnvironmentNetwork,
  id?: string | null,
): string {
  const baseMetaScanUrl = "https://meta.defiscan.live";
  const networkParams = getNetworkParams(network);
  return `${baseMetaScanUrl}/block/${id}${networkParams}`;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const api = getWhaleApiClient(context);
  const idOrHeight = context.params?.blockId?.toString().trim() as string;

  if (!isAlphanumeric(idOrHeight)) {
    return { notFound: true };
  }

  const block = await api.blocks.get(idOrHeight);

  if (block === undefined) {
    return { notFound: true };
  }

  const next = CursorPagination.getNext(context);
  const transactions = await api.blocks.getTransactions(block.id, 50, next);

  async function getEvmTxDetails() {
    try {
      const vmmap: VmmapResult = await api.rpc.call(
        "vmmap",
        [block.height.toString(), VmmapTypes.BlockNumberDVMToEVM],
        "lossless",
      );
      return vmmap.output;
    } catch (e) {
      return null;
    }
  }

  return {
    props: {
      block,
      transactions: {
        items: transactions,
        pages: CursorPagination.getPages(context, transactions),
      },
      mappedEvmBlockNum: await getEvmTxDetails(),
    },
  };
}
