import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from '@components/commons/link/Link'
import { AddressLink } from '@components/commons/link/AddressLink'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdStairs } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/CollapsibleSection'
import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { BlockLink } from '@components/commons/link/BlockLink'

export function BlocksList ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <>
      <div className='hidden md:block md:mt-8 lg:mt-0' data-testid='Desktop.Blocks'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold'>Latest Blocks</h1>
          <Link href={{ pathname: '/blocks' }}>
            <a
              className='flex items-center font-medium cursor-pointer text-primary-500'
              data-testid='BlocksList.viewAllBlocksLink'
            >
              VIEW ALL BLOCKS
            </a>
          </Link>
        </div>
        <div className='mt-6'>
          {blocks.map((block) => {
            return (
              <Link href={{ pathname: `/blocks/${block.id}` }} key={block.id}>
                <a className='content'>
                  <BlockDetails
                    height={block.height.toString()}
                    mintedBy={block.minter}
                    transactionCount={block.transactionCount}
                    age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
                  />
                </a>
              </Link>
            )
          })}
        </div>
        <div className='flex justify-center'>
          <ViewMoreButton />
        </div>
      </div>
      <CollapsibleSection heading='Latest Blocks' className='block md:hidden' testId='CollapsibleSection.Blocks'>
        <div className='mt-6 w-full'>
          {blocks.map((block) => {
            return (
              <Link href={{ pathname: `/blocks/${block.id}` }} key={block.id}>
                <a className='content'>
                  <BlockDetails
                    height={block.height.toString()}
                    mintedBy={block.minter}
                    transactionCount={block.transactionCount}
                    age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
                  />
                </a>
              </Link>
            )
          })}
        </div>
        <div className='flex justify-center'>
          <ViewMoreButton />
        </div>
      </CollapsibleSection>
    </>
  )
}

function BlockDetails (props: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  return (
    <div
      className='flex flex-wrap p-4 rounded border border-gray-200 cursor-pointer items-center my-1.5 hover:shadow-md'
    >
      <div className='w-2/3 lg:w-1/2 flex space-x-2'>
        <span className='text-lg leading-6'>
          <MdStairs className='text-gray-400 inline-block' size={22} />
        </span>
        <div>
          <BlockLink className='font-medium text-gray-900' block={props.height}>
            {props.height}
          </BlockLink>
          <div className='text-xs text-gray-400 leading-5'>
            <span>{props.age}</span>
          </div>
        </div>
      </div>
      <DesktopBlockDetails height={props.height} transactionCount={props.transactionCount} mintedBy={props.mintedBy} />
      <MobileBlockDetails height={props.height} transactionCount={props.transactionCount} mintedBy={props.mintedBy} />
    </div>
  )
}

function DesktopBlockDetails (props: { height: string, mintedBy?: string, transactionCount: number }): JSX.Element {
  return (
    <div className='w-1/3 lg:w-1/2 hidden md:block'>
      <div className='flex flex-wrap text-sm'>
        <div className='w-1/2 text-gray-500'>
          Minted by
        </div>
        {
          props.mintedBy === undefined ? ('N/A') : (
            <AddressLink address={`${props.mintedBy}`} className='w-1/2'>
              <div className='text-right text-gray-900 overflow-hidden overflow-ellipsis'>
                {props.mintedBy}
              </div>
            </AddressLink>
          )
        }
      </div>
      <div className='w-full flex flex-wrap text-sm mt-1 justify-between'>
        <div className='w-1/2 text-gray-500'>
          Transactions
        </div>
        <span className='w-1/2 text-right text-gray-900'>
          {props.transactionCount}
        </span>
      </div>
    </div>
  )
}

function MobileBlockDetails (props: { height: string, mintedBy?: string, transactionCount: number }): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className='w-1/3 text-primary-500 flex justify-end items-center self-start block md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {(!isOpen)
          ? (<>VIEW<MdOutlineKeyboardArrowDown size={22} /></>)
          : (<>HIDE<MdOutlineKeyboardArrowUp size={22} /></>)}
      </div>
      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full mt-5'
        show={isOpen}
      >
        <div className='flex flex-wrap items-center'>
          <div className='w-1/2 text-gray-500 text-sm'>
            Minted by
          </div>
          {
            props.mintedBy === undefined ? ('N/A') : (
              <AddressLink address={`${props.mintedBy}`} className='w-1/2'>
                <div className='text-right text-primary-500 overflow-hidden overflow-ellipsis underline'>
                  {props.mintedBy}
                </div>
              </AddressLink>
            )
          }
        </div>
        <div className='flex flex-wrap mt-1 justify-between'>
          <div className='w-1/2 text-gray-500 text-sm'>
            Transactions
          </div>
          <span className='w-1/2 text-right text-gray-900'>
            {props.transactionCount}
          </span>
        </div>
      </Transition>
    </>
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
