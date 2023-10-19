import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Container } from "@components/commons/Container";
import { useNetwork } from "@contexts/NetworkContext";
import { Head } from "@components/commons/Head";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import { AddressType, getAddressType } from "@waveshq/walletkit-core";
import {
  AddressHeading,
  AddressNotFoundHeading,
} from "./_components/AddressHeadings";
import { AddressSummaryTable } from "./_components/AddressSummaryTable";
import { AddressTransactionTable } from "./_components/AddressTransactionTable";
import { AddressBalances } from "./_components/AddressBalances";
import { isAlphanumeric } from "../../utils/commons/StringValidator";
import { AddressVaults } from "./_components/AddressVaults";

interface AddressPageProps {
  address: string;
}

export default function AddressPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const addressType = getAddressType(props.address, useNetwork().name);

  if (addressType === undefined) {
    return (
      <Container className="pt-12 pb-20">
        <AddressNotFoundHeading address={props.address} />
      </Container>
    );
  }

  return (
    <>
      <Head title={`Address #${props.address}`} />

      <Container className="pt-12 pb-20">
        <AddressHeading address={props.address} />
        <AddressSummaryTable
          address={props.address}
          addressType={addressType}
        />
        {addressType !== AddressType.ETH && (
          <>
            <CollapsibleSection
              heading="Balances"
              className="mt-8"
              testId="Balances"
            >
              <AddressBalances address={props.address} />
            </CollapsibleSection>

            <CollapsibleSection
              heading="Vaults"
              className="mt-8"
              testId="Vaults"
            >
              <AddressVaults address={props.address} />
            </CollapsibleSection>

            <CollapsibleSection
              heading="Transactions"
              className="mt-8"
              testId="Transactions"
            >
              <AddressTransactionTable address={props.address} />
            </CollapsibleSection>
          </>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AddressPageProps>> {
  const address = context.params?.address?.toString().trim() as string;

  if (!isAlphanumeric(address)) {
    return { notFound: true };
  }

  return {
    props: {
      address: address,
    },
  };
}
