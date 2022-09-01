import { InferGetServerSidePropsType } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { format, fromUnixTime } from "date-fns";
import { AdaptiveList } from "@components/commons/AdaptiveList";
import { AddressLink } from "@components/commons/link/AddressLink";
import { BlockLink } from "@components/commons/link/BlockLink";
import { getServerSideProps } from "../index.page";

export function BlockDetailTable(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const { block } = props;
  const {
    count: { blocks },
  } = useSelector((state: RootState) => state.stats);

  return (
    <div className="mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0">
      <ListLeft block={block} nBlocks={blocks} />
      <ListRight block={block} />
    </div>
  );
}

function ListLeft(props: {
  block: Block;
  nBlocks: number | undefined;
}): JSX.Element {
  const confirmations =
    props.nBlocks !== undefined
      ? props.nBlocks - props.block.height
      : props.nBlocks;
  const blockTime = format(fromUnixTime(props.block.medianTime), "PPpp");
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="Height" testId="block-detail-height">
        {props.block.height}
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Transactions"
        testId="block-detail-transaction-count"
      >
        {props.block.transactionCount}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Timestamp" testId="block-detail-timestamp">
        {blockTime}
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Confirmations"
        testId="block-detail-confirmations"
      >
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Minter" testId="block-detail-minter">
        {props.block.minter === undefined || props.block.minter.length === 0 ? (
          "N/A"
        ) : (
          <AddressLink address={props.block.minter} className="break-all" />
        )}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Masternode" testId="block-detail-masternode">
        <div className="break-all">{props.block.masternode ?? "N/A"}</div>
      </AdaptiveList.Row>
      {/* TODO(fuxingloh): need to properly expose this variable on whale */}
      {/* <AdaptiveList.Row name='Block Reward' testId='block-detail-block-reward'> */}
      {/*  {reward} DFI */}
      {/* </AdaptiveList.Row> */}
    </AdaptiveList>
  );
}

function ListRight(props: { block: Block }): JSX.Element {
  return (
    <AdaptiveList>
      <AdaptiveList.Row name="Difficulty" testId="block-detail-difficulty">
        {props.block.difficulty}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Bits" testId="block-detail-bits">
        {props.block.weight}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Size (bytes)" testId="block-detail-size">
        {props.block.size}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Version" testId="block-detail-version">
        {props.block.version}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Merkle Root" testId="block-detail-merkle-root">
        <div className="break-all">{props.block.merkleroot}</div>
      </AdaptiveList.Row>
      <AdaptiveList.Row
        name="Previous Block"
        testId="block-detail-previous-block"
      >
        {props.block.previousHash === undefined ||
        props.block.previousHash.length === 0 ? (
          "N/A"
        ) : (
          <BlockLink block={props.block.previousHash} className="break-all" />
        )}
      </AdaptiveList.Row>
      <AdaptiveList.Row name="Next Block" testId="block-detail-next-block">
        <BlockLink
          block={(props.block.height + 1).toString()}
          className="break-all"
        />
      </AdaptiveList.Row>
    </AdaptiveList>
  );
}
