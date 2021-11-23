import { IoChevronForward } from 'react-icons/io5'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { formatDistanceToNow } from 'date-fns'
import { Link } from '@components/commons/link/Link'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { AddressLink } from '@components/commons/link/AddressLink'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdStairs } from 'react-icons/md'
import { CollapsibleSection } from '@components/commons/CollapsibleSection'
import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { BlockLink } from '@components/commons/link/BlockLink'

export function BlocksList ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <>
      <div className='w-full lg:w-1/2'>
        <div className='hidden md:block'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-semibold'>Blocks</h1>
            <Link href={{ pathname: '/blocks' }}>
              <a
                className='flex items-center font-medium cursor-pointer text-primary-500'
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
                    mintedBy={block.minter}
                    transactionCount={block.transactionCount}
                    age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
                  />
                )
              })
            }
          </div>
          <ViewMoreButton />
        </div>
        <CollapsibleSection
          heading='Blocks'
          className='block md:hidden'
        >
          <div className='mt-6 w-full space-y-1'>
            {
              blocks.map((block) => {
                return (
                  <BlockDetails
                    key={block.id}
                    height={block.height.toString()}
                    mintedBy={block.minter}
                    transactionCount={block.transactionCount}
                    age={formatDistanceToNow(block.medianTime * 1000, { addSuffix: true })}
                  />
                )
              })
            }
          </div>
          <ViewMoreButton />
        </CollapsibleSection>
      </div>
    </>
  )
}

function BlockDetails (props: { height: string, mintedBy?: string, transactionCount: number, age: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className='flex flex-wrap p-4 border border-gray-200 cursor-pointer items-baseline justify-between'
    >
      <div className='flex items-baseline space-x-2'>
        <MdStairs className='text-primary-500 bg-white h-4 w-4 rounded' />
        <div>
          <BlockLink className='sm:text-lg md:text-xl font-medium text-primary-500' block={props.height}>
            {props.height}
          </BlockLink>
          <div className='text-xs text-opacity-40 text-black font-medium flex mt-1'>
            <span>{props.age}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap my-auto hidden md:block'>
        <div className='flex w-full text-sm justify-between'>
          <span className='min-w-max text-right text-gray-400'>
            Minted by:
          </span>
          {(() => {
            if (props.mintedBy !== undefined) {
              return (
                <AddressLink address={`${props.mintedBy}`}>
                  <TextMiddleTruncate
                    text={props.mintedBy} textLength={6}
                    className='pl-2 md:pl-4 overflow-ellipsis overflow-hidden'
                  />
                </AddressLink>
              )
            }
          })()}
        </div>
        <div className='flex w-full text-sm mt-1 justify-between'>
          <span className='min-w-max text-right text-gray-400'>
            Transactions:
          </span>
          <span className='pl-2 md:pl-3 overflow-ellipsis overflow-hidden'>
            {props.transactionCount}
          </span>
        </div>
      </div>
      <div
        className='text-primary-500 text-xs flex items-center block md:hidden'
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
        className='w-full'
        show={isOpen}
      >
        <div className='mt-3'>
          <div className='flex w-full mt-2 text-sm justify-between'>
            <span className='min-w-max text-right text-gray-400'>
              Minted by:
            </span>
            {(() => {
              if (props.mintedBy !== undefined) {
                return (
                  <AddressLink address={`${props.mintedBy}`}>
                    <TextMiddleTruncate
                      text={props.mintedBy} textLength={6}
                      className='pl-2 md:pl-4 overflow-ellipsis overflow-hidden'
                    />
                  </AddressLink>
                )
              }
            })()}
          </div>
          <div className='flex w-full text-sm mt-1 justify-between'>
            <span className='min-w-max text-right text-gray-400'>
              Transactions:
            </span>
            <span className='pl-2 md:pl-3 overflow-ellipsis overflow-hidden'>
              {props.transactionCount}
            </span>
          </div>
        </div>
      </Transition>
    </div>
  )
}

function ViewMoreButton (): JSX.Element {
  return (
    <Link href={{ pathname: '/blocks' }}>
      <a
        className='flex items-center font-medium cursor-pointer text-primary-500'
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
  )
}
