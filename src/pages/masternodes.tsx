import { ForwardedRef, forwardRef, PropsWithChildren, useCallback, useRef, useState } from 'react'
import { masternodes } from '@defichain/whale-api-client'
import { Loader } from '../components/shared/Loader'
import { useMasternodes } from '../hooks/useMasternodes'

interface MasternodeItemProps extends PropsWithChildren<unknown> {
  data: masternodes.MasternodeData
}

const MasternodeItem = forwardRef(function masternodes ({ data }: MasternodeItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      data-testid='masternode_item'
      ref={ref}
      className='flex flex-col md:flex-row justify-center md:justify-between border-b border-gray-300'
    >
      <div className='p-4 text-center md:text-left  md:w-1/4 break-all'>{data.owner.address}</div>
      <div className='p-4 text-center md:text-right md:w-1/4 break-all'>{data.operator.address}</div>
      <div className='p-4 text-center md:text-right'>{data.creation.height}</div>
      <div className='p-4 text-center md:text-right'>{data.resign.height}</div>
      <div className='p-4 text-center md:text-right'>{data.mintedBlocks}</div>
      <div className='p-4 text-center md:text-right'>{data.state}</div>
    </div>
  )
})

export default function MasternodePage (): JSX.Element {
  const [nextToken, setNextToken] = useState<string>('')
  const observer = useRef<IntersectionObserver>()
  const {
    error,
    hasNext,
    loading,
    masternodes,
    next
  } = useMasternodes(5, nextToken)

  const lastMasternodeRef = useCallback(node => {
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
    return (
      <h1>Can not get masternodes at this time please try again later.</h1>
    )
  }
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-medium pb-8'>Masternodes</h1>
      <div className='w-full px-3 border-2 rounded-2xl shadow rounded-lg bg-white mt-3 overflow-auto'>
        <div
          data-testid='mn_table_head'
          className='flex flex-col flex-wrap md:flex-row justify-center md:justify-between border-b-2 border-gray-300 py-2'
        >
          <div className='text-lg font-semibold text-center md:text-left text-lg py-4 px-2 md:w-1/4'>OwnerAuthAddress
          </div>
          <div className='text-lg font-semibold text-center text-lg py-4 md:w-1/4'>OperatorAuthAddress</div>
          <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>CreationHeight</div>
          <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>ResignHeight</div>
          <div className='text-lg font-semibold text-center md:text-right text-lg py-4'>MintedBlocks</div>
          <div className='text-lg font-semibold text-center md:text-right text-lg py-4 px-2'>State</div>
        </div>
        {(masternodes.length > 0) && masternodes.map((masternode, index, array) => {
          if (index === array.length - 1) {
            return <MasternodeItem ref={lastMasternodeRef} data={masternode} key={masternode.id} />
          } else {
            return <MasternodeItem data={masternode} key={masternode.id} />
          }
        })}
        {loading && (
          <div className='my-5'>
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}
