import { GetServerSidePropsResult } from 'next'

export default function HomePage (): JSX.Element {
  return <></>
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<any>> {
  return {
    redirect: {
      statusCode: 302,
      destination: '/prices'
    }
  }
}
