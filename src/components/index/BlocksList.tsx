
import React from 'react'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from '@components/commons/link/Link'
import { AddressLink } from '@components/commons/link/AddressLink'
import { MdOutlineKeyboardArrowRight, MdStairs } from 'react-icons/md'
import { BlockLink } from '@components/commons/link/BlockLink'
import { CollapsibleSection } from '@components/commons/sections/CollapsibleSection'

export function BlocksList ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:flex justify-between md:mt-6 lg:mt-0' data-testid='Desktop.LatestBlocks'>
        <h1 className='text-xl font-semibold'>Latest Blocks</h1>
        <div className='hidden md:flex'>
          <Link href={{ pathname: '/blocks' }}>
            <a
              className='flex items-center font-medium text-primary-500'
              data-testid='BlocksList.viewAllBlocksLink'
            >
              VIEW ALL BLOCKS
            </a>
          </Link>
        </div>
      </div>
      <div className='md:hidden'>
        <CollapsibleSection heading='Latest Blocks' testId='BlockList.CollapsibleSection'>
          <BlockDetailCards blocks={blocks} />
        </CollapsibleSection>
        <div className='flex justify-center'>
          <ViewMoreButton />
        </div>
      </div>
      <div className='hidden md:block mt-6 cursor-pointer' data-testid='Desktop.Blocks'>
        <BlockDetailCards blocks={blocks} />
        <div className='flex justify-center'>
          <ViewMoreButton />
        </div>
      </div>
    </>
  )
}

function BlockDetailCards (props: { blocks: Block[] }): JSX.Element {
  return (
    <>
      {props.blocks.map((block) => {
        return (
          <Link href={{ pathname: `/blocks/${block.id}` }} key={block.id}>
            <span className='content'>
              <BlockDetails
                height={block.height.toString()}
                mintedBy={block.minter}
                transactionCount={block.transactionCount}
                age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
              />
            </span>
          </Link>
        )
      })}
    </>
  )
}

function BlockDetails (props: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  return (
    <div className='flex p-4 rounded border border-gray-200 my-1.5 hover:shadow-md'>
      <div className='flex-none w-11/12'>
        <div className='flex'>
          <div className='flex-none w-8'>
            <MdStairs className='text-gray-400 inline-block' size={22} />
          </div>
          <div className='flex-none w-36'>
            <BlockLink className='font-medium text-gray-900' block={props.height}>
              {props.height}
            </BlockLink>
            <div className='hidden md:block text-xs text-gray-400'>
              <span>{props.age}</span>
            </div>
          </div>
          <div className='flex-none w-3' />
          <div className='flex-grow w-10'>
            <MintedBy mintedBy={props.mintedBy} className='hidden md:flex text-sm' />
            <TransactionCount transactionCount={props.transactionCount} className='hidden md:flex text-sm' />
            <div className='md:hidden text-center text-xs text-gray-400'>
              <span>{props.age}</span>
            </div>
          </div>
        </div>
        <div className='md:hidden flex'>
          <div className='flex-none w-8' />
          <div>
            <MintedBy mintedBy={props.mintedBy} className='md:hidden flex text-sm' />
            <TransactionCount transactionCount={props.transactionCount} className='md:hidden block text-sm' />
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <MdOutlineKeyboardArrowRight size={38} />
      </div>
    </div>
  )
}

function MintedBy (props: { mintedBy: string | undefined, className: string }): JSX.Element {
  return (
    <div className={`${props.className}`}>
      <div className='text-gray-400'>
        <span>Minted by&nbsp;</span>
      </div>
      {
        props.mintedBy === undefined ? ('N/A') : (
          <AddressLink address={`${props.mintedBy}`} className='w-1/2'>
            <div className='text-gray-900 overflow-hidden overflow-ellipsis'>
              {props.mintedBy}
            </div>
          </AddressLink>
        )
      }
    </div>
  )
}

function TransactionCount (props: { transactionCount: number, className: string }): JSX.Element {
  return (
    <div className={`${props.className}`}>
      <span className='text-gray-400'>Transactions&nbsp;</span>
      <span className='text-gray-900'>{props.transactionCount}</span>
    </div>
  )
}

function ViewMoreButton (): JSX.Element {
  return (
    <Link href={{ pathname: '/blocks' }}>
      <a
        className='font-medium cursor-pointer text-primary-500'
        data-testid='BlocksList.viewAllBlocksButton'
      >
        <button
          type='button'
          className='mt-2 py-2 px-14 border border-gray-200 rounded-sm'
        >
          VIEW ALL BLOCKS
        </button>
      </a>
    </Link>
  )
}
