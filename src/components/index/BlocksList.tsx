import { IoChevronForward, IoTimeOutline } from 'react-icons/io5'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { InternalLink } from '@components/index/Link'
import { formatDistanceToNow } from 'date-fns'
import { enUSShort } from '@utils/locale/en-US-short'
import { Link } from '@components/commons/Link'

export function BlocksList ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <div className='w-full lg:w-3/5'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>Blocks</h1>
        <InternalLink
          testId='view-all-blocks-link'
          pathname='/blocks'
        >
          <div className='flex items-center'>
            VIEW ALL BLOCKS <IoChevronForward size={18} className='ml-px inline' />
          </div>
        </InternalLink>
      </div>
      <div className='mt-6 w-full space-y-1'>
        {
          blocks.map((block) => {
            return (
              <BlockDetails
                key={block.id}
                height={block.height.toString()}
                mintedBy={block.id}
                transactionCount={block.transactionCount}
                age={formatDistanceToNow(block.medianTime * 1000, { locale: enUSShort })}
              />
            )
          })
        }
      </div>
      <InternalLink pathname='/blocks'>
        <button
          type='button'
          className='w-full mt-2 py-3 border border-gray-200'
          data-testid='view-all-blocks-button'
        >
          VIEW ALL BLOCKS
        </button>
      </InternalLink>
    </div>
  )
}

function BlockDetails ({
  height,
  mintedBy,
  transactionCount,
  age
}: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  return (
    <div className='flex p-4 border border-gray-200'>
      <div className='my-auto'>
        <Link href={{ pathname: `/blocks/${height}` }}>
          <a className='text-xl text-gray-900 hover:text-primary-500 font-semibold'>#{height}</a>
        </Link>
        <div
          className='min-w-max text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'
        >
          <IoTimeOutline size={15} />
          <span>{age}</span>
        </div>
      </div>
      <div className='table my-auto ml-4 w-full border-collapse'>
        <div className='table-row text-sm'>
          <span className='table-cell text-right text-gray-400'>
            Minted by:
          </span>
          <span className='table-cell pl-4 break-all'>
            {mintedBy}
          </span>
        </div>
        <div className='table-row text-sm'>
          <span className='table-cell pt-1 text-right text-gray-400'>
            Transactions:
          </span>
          <span className='table-cell pl-4 break-all'>
            {transactionCount} Txns
          </span>
        </div>
      </div>
    </div>
  )
}
