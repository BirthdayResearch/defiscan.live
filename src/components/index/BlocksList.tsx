import { IoChevronForward, IoTimeOutline } from 'react-icons/io5'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from '@components/commons/Link'

export function BlocksList ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <div className='w-full lg:w-1/2'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>Blocks</h1>
        <Link href={{ pathname: '/blocks' }}>
          <a
            className='flex items-center font-medium cursor-pointer text-primary-500 opacity-60 hover:opacity-100'
            data-testid='BlocksList.viewAllBlocksLink'
          >
            VIEW ALL BLOCKS <IoChevronForward size={18} className='inline' />
          </a>
        </Link>
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
                age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
              />
            )
          })
        }
      </div>

      <Link href={{ pathname: '/blocks' }}>
        <a
          className='flex items-center font-medium cursor-pointer text-primary-500 opacity-60 hover:opacity-100'
          data-testid='BlocksList.viewAllBlocksButton'
        >
          <button
            type='button'
            className='w-full mt-2 py-3 border border-gray-200'
          >
            VIEW ALL BLOCKS
          </button>
        </a>
      </Link>
    </div>
  )
}

function BlockDetails (props: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  return (
    <div className='flex flex-wrap p-4 border border-gray-200 cursor-pointer'>
      <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-2/6 xl:w-1/4 2xl:w-1/5'>
        <Link href={{ pathname: `/blocks/${props.height}` }}>
          <a className='text-lg md:text-xl  font-semibold'>#{props.height}</a>
        </Link>
        <div
          className='text-xs text-opacity-40 text-black font-medium flex mt-1'
        >
          <IoTimeOutline size={15} />
          <span className='ml-1'>{props.age}</span>
        </div>
      </div>
      <div className='flex flex-wrap my-auto w-1/2 sm:w-2/3 md:w-3/4 lg:w-4/6 xl:w-3/4 2xl:w-4/5'>
        <div className='flex w-full text-sm'>
          <span className='min-w-max text-right text-gray-400'>
            Minted by:
          </span>
          <span className='pl-2 md:pl-4 overflow-ellipsis overflow-hidden'>
            {props.mintedBy}
          </span>
        </div>
        <div className='flex w-full text-sm mt-1'>
          <span className='min-w-max text-right text-gray-400'>
            Transactions:
          </span>
          <span className='pl-2 md:pl-3 overflow-ellipsis overflow-hidden'>
            {props.transactionCount}
          </span>
        </div>
      </div>
    </div>
  )
}
