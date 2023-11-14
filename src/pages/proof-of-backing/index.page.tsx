import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { Container } from "@components/commons/Container";
import { getWhaleApiClient } from "@contexts/WhaleContext";
import { getAllTokens } from "pages/tokens/shared/getAllTokens";
import BigNumber from "bignumber.js";
import { TOKEN_BACKED } from "constants/TokenBackedAddress";
import { BackingTable } from "./_components/BackingTable";
import { BackingCard } from "./_components/BackingCard";

interface ProofOfBackingPageProps {
  tokens: TokenWithBacking[];
}

export interface TokenWithBacking {
  symbol: string;
  displaySymbol: string;
  netSupply?: string;
}

export default function ProofOfBackingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  return (
    <Container>
      <div className="md:px-6 ">
        <h1
          className="mt-12 mb-2 text-2xl md:text-4xl font-semibold text-gray-900 dark:text-dark-gray-900"
          data-testid="title-header"
        >
          Proof of Backing
        </h1>
        <span
          className="text-sm md:text-lg text-gray-900 dark:text-dark-gray-900"
          data-testid="title-description"
        >
          All tokens have backed collateral from which they are minted. See
          proof of the backed amount on the addresses below.
        </span>
      </div>
      <div className="md:block hidden">
        <BackingTable tokens={props.tokens} />
      </div>
      <div className="md:hidden mt-8 mb-14">
        {props.tokens.map((token) => (
          <BackingCard key={token.symbol} token={token} />
        ))}
      </div>
    </Container>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProofOfBackingPageProps>> {
  const api = getWhaleApiClient(context);
  const tokenList = await getAllTokens(api);
  const burntTokenList = await api.address
    .listToken("8defichainBurnAddressXXXXXXXdRQkSm", 200)
    .catch(() => {});
  const result: TokenWithBacking[] = [];
  TOKEN_BACKED.forEach((token) => {
    const _token = tokenList.find((t) => t.displaySymbol === token.name);
    const _burntToken = burntTokenList?.find(
      (t) => t.displaySymbol === token.name
    );
    if (_token !== undefined) {
      result.push({
        displaySymbol: _token.displaySymbol,
        symbol: _token.symbol,
        netSupply: BigNumber(_token.minted)
          .minus(_burntToken?.amount ?? 0)
          .toFixed(8),
      });
    } else {
      result.push({
        displaySymbol: token.name,
        symbol: token.symbol,
      });
    }
  });

  return {
    props: {
      tokens: result,
    },
  };
}
