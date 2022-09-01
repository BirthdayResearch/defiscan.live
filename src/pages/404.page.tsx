import { Head } from "@components/commons/Head";
import { Container } from "@components/commons/Container";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "@components/commons/link/Link";

export default function NotFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>Page Not Found - DeFi Scan</title>
      </Head>

      <Container className="py-10">
        <h1 className="h-80 flex flex-col text-center items-center justify-center">
          <div className="text-gray-500">
            <BiErrorCircle size={140} />
          </div>
          <div className="text-3xl font-semibold text-gray-500 mt-3">
            404 - Page Not Found
          </div>
          <div className="flex w-full justify-center mt-8">
            <Link href={{ pathname: "/" }}>
              <button
                type="button"
                className="w-48 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded"
              >
                BACK HOME
              </button>
            </Link>
          </div>
        </h1>
      </Container>
    </>
  );
}
