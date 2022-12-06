import { PropsWithChildren } from "react";
import { Head } from "@components/commons/Head";
import classNames from "classnames";
import { Container } from "@components/commons/Container";
import { HeaderLink } from "layouts/components/Header";

export function ConsortiumLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <Container className="px-0 pt-12 pb-20 sm:px-0 lg:px-0">
      <Head title="Consortium" />
      <h2 className="mb-8 text-2xl font-medium dark:text-dark-gray-900">
        Consortium Overview
      </h2>

      <div className="flex flex-row overflow-scroll whitespace-nowrap sm:overflow-auto">
        <HeaderLink
          className="flex justify-center sm:pr-11"
          text="Asset Breakdown"
          pathname="/consortium/asset_breakdown"
          testId="Desktop.HeaderLink.AssetBreakdown"
        />
        <HeaderLink
          className="flex justify-center sm:pr-11"
          text="Proof of Assets"
          pathname="/consortium/proof_of_assets"
          testId="Desktop.HeaderLink.ProofOfAssets"
        />
        {/* <HeaderLink
          className="flex justify-center border-b border-gray-100 dark:border-gray-700"
          text="Transaction History"
          pathname="/consortium/transaction_history"
          testId="Desktop.HeaderLink.TransactionHistory"
        /> */}
      </div>
      <div className={classNames(className)}>{children}</div>
    </Container>
  );
}

export function ConsortiumTitle(): JSX.Element {
  return (
    <h1 className="text-5xl font-medium dark:text-dark-gray-900">
      DeFiChain Consortium
    </h1>
  );
}

export function ConsortiumDescription({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div className={className}>
      DeFiChain consortium provides an overview of the dtokens which each
      consortium member is accountable for. Consortium members will be
      responsible for the backing of the available tokens that was minted
      through them.
    </div>
  );
}
