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
import { useMemo } from "react";
import { useNetwork } from "@contexts/NetworkContext";
import { isAlphanumeric } from "../../../utils/commons/StringValidator";
import { BlockTransactions } from "./_components/BlockTransactions";
import { BlockDetailTable } from "./_components/BlockDetailTable";
import { VmmapResult, VmmapTypes } from "../../transactions/enum/VmmapTypes";
import { getMetaScanBlockUrl } from "../../../utils/commons/getNetworkParams";

interface BlockDetailsPageProps {
  block: Block;
  transactions: {
    items: Transaction[];
    pages: CursorPage[];
  };
  mappedEvmBlockNum?: string | null;
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

  const metachainBlockUrl = useMemo(() => {
    if (mappedEvmBlockNum) {
      return getMetaScanBlockUrl(network, mappedEvmBlockNum);
    }
    return undefined;
  }, [mappedEvmBlockNum, network]);
  return (
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
      <div className="lg:flex flex-col lg:flex-row items-center lg:justify-between">
        <div>
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
    </div>
  );
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
