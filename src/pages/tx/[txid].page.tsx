import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { isAlphanumeric } from "../../utils/commons/StringValidator";

export default function TxPage(): JSX.Element {
  return <></>;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const txid = context.params?.txid?.toString().trim() as string;

  if (!isAlphanumeric(txid)) {
    return { notFound: true };
  }

  return {
    redirect: {
      statusCode: 302,
      destination: `/transactions/${txid}`,
    },
  };
}
