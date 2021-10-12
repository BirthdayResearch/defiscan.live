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
          testId='InternalLink.viewAllBlocksLink'
          pathname='/blocks'
        >
          <div className='flex items-center'>
            VIEW ALL BLOCKS <IoChevronForward size={18} className='inline' />
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
          data-testid='InternalLink.viewAllBlocksButton'
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
      <div className='w-1/3 md:w-1/6'>
        <Link href={{ pathname: `/blocks/${height}` }}>
          <a className='text-base md:text-xl text-gray-900 hover:text-primary-500 font-semibold'>#{height}</a>
        </Link>
        <div
          className='min-w-max text-xs text-opacity-40 text-black font-medium flex gap-x-1.5 mt-1'
        >
          <IoTimeOutline size={15} />
          <span>{age}</span>
        </div>
      </div>
      <div className='flex flex-wrap w-2/3 md:w-5/6 my-auto'>
        <div className='flex w-full text-sm'>
          <span className='min-w-max text-right text-gray-400'>
            Minted by:
          </span>
          <span className='pl-2 md:pl-4 overflow-ellipsis overflow-hidden'>
            {mintedBy}
          </span>
        </div>
        <div className='flex w-full text-sm mt-1'>
          <span className='min-w-max text-right text-gray-400'>
            Transactions:
          </span>
          <span className='pl-2 md:pl-3 overflow-ellipsis overflow-hidden'>
            {transactionCount}
          </span>
        </div>
      </div>
    </div>
  )
}
