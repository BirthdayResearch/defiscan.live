import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { Head } from "@components/commons/Head";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { Container } from "@components/commons/Container";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BlocksTable } from "./_components/BlocksTable";
import { BlocksCards } from "./_components/BlocksCards";

export default function Blocks(): JSX.Element {
  const [blocks, setBlocks] = useState<{
    items: Block[];
    pages: CursorPage[];
  }>({ items: [], pages: [] });

  const router = useRouter();
  const next = CursorPagination.getNext(router);

  async function fetchData() {
    const items = await getWhaleApiClient(router).blocks.list(50, next);
    setBlocks({
      items,
      pages: CursorPagination.getPages(router, items),
    });
  }

  useEffect(() => {
    void fetchData();
  }, [router.query]);

  return (
    <Container className="pt-12 pb-20">
      <Head title="Blocks" />

      <h1 className="text-2xl font-medium dark:text-dark-gray-900">Blocks</h1>

      <div className="my-6 hidden md:block">
        <BlocksTable blocks={blocks.items} />
      </div>

      <div className="my-6 md:hidden">
        <BlocksCards blocks={blocks.items} />
      </div>

      <div className="flex justify-end mt-8">
        <CursorPagination pages={blocks.pages} path="/blocks" />
      </div>
    </Container>
  );
}
