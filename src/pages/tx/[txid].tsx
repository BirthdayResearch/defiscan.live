import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export default function TxPage (): JSX.Element {
  return (
    <></>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  const txid = context.params?.txid?.toString().trim() as string

  return {
    redirect: {
      statusCode: 302,
      destination: `/transactions/${txid}`
    }
  }
}
