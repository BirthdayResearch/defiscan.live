import { Container } from '@components/commons/Container'
import { GetServerSidePropsResult } from 'next'
import { IoSearchOutline } from 'react-icons/io5'

function Banner (): JSX.Element {
  return (
    <div className='h-52 flex flex-col items-center'>
      <div className='pt-11'>
        <h1 className='text-4xl font-semibold'>DeFiChain Blockchain Explorer</h1>
      </div>
      <div className='mt-6 w-9/12'>
        <div className='flex'>
          <div className='rounded-l-full h-12 border-primary-100 w-12 border-t border-l border-b flex justify-center items-center'><IoSearchOutline size={17} className='text-gray-400' /></div>
          <input
            className='text-lg text-gray-600 placeholder-gray-400 rounded-r-full border-primary-100 h-12 border-t border-r border-b w-full focus:outline-none'
            placeholder='Search by address / Txn hash / Block / Token'
          />
        </div>

      </div>
    </div>
  )
}

export default function HomePage (): JSX.Element {
  return (
    <Container>
      <Banner />
    </Container>
  )
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {}
    // redirect: {
    //   statusCode: 302,
    //   destination: '/prices'
    // }
  }
}
