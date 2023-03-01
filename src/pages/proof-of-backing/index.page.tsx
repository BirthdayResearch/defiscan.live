import { Container } from "@components/commons/Container";

export default function ProofOfBackingPage(): JSX.Element {
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
    </Container>
  );
}
