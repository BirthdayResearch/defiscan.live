import { Breadcrumb } from "@components/commons/Breadcrumb";
import { Head } from "@components/commons/Head";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import {
  PriceOracle,
  PriceTicker,
} from "@defichain/whale-api-client/dist/api/prices";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Container } from "@components/commons/Container";
import { OracleTickerDetail } from "./_components/OracleTickerDetail";
import { OracleTable } from "./_components/OracleTable";
import { OracleGraph } from "./_components/OracleGraph";
import { isAlphanumeric } from "../../utils/commons/StringValidator";

interface PricesPageProps {
  price: PriceTicker;
  oracles: PriceOracle[];
}

export default function SymbolPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  const {
    price: {
      price: { token, currency },
    },
  } = props;

  return (
    <Container className="pt-12 pb-20">
      <Head title={`${token}/${currency}`} />
      <Breadcrumb
        items={[
          {
            path: "/oracles",
            name: "Oracles",
          },
          {
            path: `/oracles/${token}-${currency}`,
            name: `${token}/${currency}`,
            hide: true,
            canonical: true,
          },
        ]}
      />

      <div className="flex flex-wrap -mx-6">
        <div className="w-full lg:w-1/3 px-6">
          <OracleTickerDetail {...props} />
        </div>

        <div
          className="w-full lg:w-2/3 lg:px-6"
          style={{
            height: "32rem",
            maxHeight: "80vh",
          }}
        >
          <OracleGraph {...props} />
        </div>
      </div>

      <div className="mt-12 py-12 border-t border-gray-100">
        <OracleTable {...props} />
      </div>
    </Container>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PricesPageProps>> {
  const api = getWhaleApiClient(context);
  const symbol = context.params?.symbol?.toString().trim() as string;

  if (!isAlphanumeric(symbol, "-.")) {
    return { notFound: true };
  }

  const [token, currency] = symbol.split("-");
  if (token === undefined || currency === undefined) {
    return { notFound: true };
  }

  const price = await api.prices.get(token, currency);
  if (price === undefined) {
    return { notFound: true };
  }

  const oracles = await api.prices.getOracles(token, currency, 60);
  if (oracles === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      price: price,
      oracles: oracles,
    },
  };
}
