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
        <h1 className="mt-12 mb-2 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-dark-gray-900">
          Proof of Backing
        </h1>
        <span className="text-sm md:text-lg text-gray-900 dark:text-dark-gray-900">
          This page shows the backing assets and overall supply of wrapped
          tokens (dTokens) which are used in the DeFiChain Ecosystem.
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
    .listToken("8defichainBurnAddressXXXXXXXdRQkSm")
    .catch(() => {});
  const result: TokenWithBacking[] = [];
  TOKEN_BACKED.forEach((token) => {
    const _token = tokenList.find((t) => t.displaySymbol === token.name);
    const _burntToken = burntTokenList?.find(
      (t) => t.displaySymbol === token.name
    );
    if (_token !== undefined && _burntToken !== undefined) {
      result.push({
        displaySymbol: _token.displaySymbol,
        symbol: _token.symbol,
        netSupply: BigNumber(_token.minted)
          .minus(_burntToken.amount)
          .toFixed(8),
      });
      return;
    }
    result.push({
      displaySymbol: token.name,
      symbol: token.symbol,
    });
  });

  return {
    props: {
      tokens: result,
    },
  };
}
