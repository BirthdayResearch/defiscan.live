import Link from 'next/link'
import { forwardRef, useState, useRef, useCallback, ForwardedRef, PropsWithChildren } from 'react'
import { Loader } from '../../components/shared/Loader'
import { useTokens } from '../../hooks/useTokens'
import { tokens } from '@defichain/whale-api-client'
import { Container } from '../../layouts/components/Container'

interface TokenItemProps extends PropsWithChildren<unknown> {
  data: tokens.TokenData
}

const TokenItem = forwardRef(function tokens ({ data }: TokenItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      ref={ref} data-testid='tokens_listitem'
      className='flex flex-col md:flex-row justify-center md:justify-between border-b border-gray-300'
    >
      <Link href={`tokens/${data.id}`}>
        <a data-testid={`token_page_link_${data.id}`}>
          <div className='p-4 text-center flex-none md:flex-1 md:text-left'>{data.symbol}</div>
        </a>
      </Link>
      <div className='p-4 text-center flex-none md:flex-1 md:text-center'>{data.symbolKey}</div>
      <div className='p-4 text-center flex-none md:flex-1 md:text-right'>{data.minted}</div>
    </div>
  )
})

export default function TokensPage (): JSX.Element {
  const [nextToken, setNextToken] = useState<string>('')
  const observer = useRef<IntersectionObserver>()
  const {
    tokens,
    loading,
    error,
    hasNext,
    next
  } = useTokens(5, nextToken)

  const lastTokenRef = useCallback(node => {
    if (loading) return
    if (observer.current != null) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNext) {
        setNextToken(next as string)
      }
    })
    if (node !== null) observer.current.observe(node)
  }, [loading, hasNext])

  if (error) {
    return <h1>Can not fetch tokens at this time.</h1>
  }

  return (
    <Container>
      <h1 className='text-2xl font-medium pb-8'>Tokens</h1>
      <div className='w-full px-3 border-2 rounded-2xl shadow rounded-lg bg-white mt-3'>
        <div
          data-testid='tokens_table_head'
          className='flex flex-col md:flex-row justify-center md:justify-between border-b-2 border-gray-300 py-2'
        >
          <div className='text-lg font-semibold text-lg py-4 px-2 text-center md:text-left '>name</div>
          <div className='text-lg font-semibold text-lg py-4 px-2 text-center md:text-center '>symbol</div>
          <div className='text-lg font-semibold text-lg py-4 px-2 text-center md:text-right'>minted</div>
        </div>
        {(tokens.length > 0) && tokens.map((token, index, array) => {
          if (index === array.length - 1) {
            return <TokenItem ref={lastTokenRef} data={token} key={token.id} />
          } else {
            return <TokenItem data={token} key={token.id} />
          }
        })}
        {loading && (
          <div className='my-5'>
            <Loader />
          </div>
        )}
      </div>
    </Container>
  )
}
