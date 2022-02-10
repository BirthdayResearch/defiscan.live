import { Head } from '@components/commons/Head'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Container } from '@components/commons/Container'
import { getWhaleRpcClient } from '@contexts/WhaleContext'

interface BurnInfoData {
  burnInfo: {
    address: string
    amount: string
    tokens: string[]
    feeburn: string
    emissionburn: string
    paybackburn: string
    dfipaybackfee: string
    dfipaybacktokens: string[]
  }
}

export default function BurnPage ({ burnInfo }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title='Burn Info' />
      <Container>
        <div className='mt-5 bg-gray-100 p-6 border-gray-500 text-gray-600 rounded'>
          <pre className='whitespace-pre-wrap break-all'>{JSON.stringify(burnInfo, null, 2)}</pre>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BurnInfoData>> {
  const rpc = getWhaleRpcClient(context)
  const burnInfo = await rpc.account.getBurnInfo()

  const tokens = burnInfo.tokens.map(token => {
    return String(token)
  })

  return {
    props: {
      burnInfo: {
        address: burnInfo.address,
        amount: burnInfo.amount.toFixed(8),
        tokens: tokens,
        feeburn: burnInfo.feeburn.toFixed(8),
        emissionburn: burnInfo.emissionburn.toFixed(8),
        paybackburn: burnInfo.paybackburn.toFixed(8),
        dfipaybackfee: burnInfo.dfipaybackfee.toFixed(8),
        dfipaybacktokens: burnInfo.dfipaybacktokens
      }
    }
  }
}
