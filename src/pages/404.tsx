import { Head } from '@components/commons/Head'

export default function NotFound (): JSX.Element {
  return (
    <>
      <Head>
        <title>Page Not Found - DeFi Scan</title>
      </Head>

      <div className='container mx-auto px-4 py-10'>
        <h1 className='text-3xl font-semibold'>
          404 - Page Not Found
        </h1>
      </div>
    </>
  )
}
