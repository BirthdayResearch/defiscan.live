import classNames from 'classnames'
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { Transition } from '@headlessui/react'
import { Link } from '@components/commons/link/Link'

interface CardListContextI {
  isOpen: boolean
  setIsOpen: (c: boolean) => void
}

const CardListContext = createContext<CardListContextI>({
  isOpen: true,
  setIsOpen: () => {
  }
})

export function CardList (props: PropsWithChildren<{ className?: string, testId?: string }>): JSX.Element {
  return (
    <div
      data-testid={props.testId}
      className={classNames('flex flex-wrap space-y-2', props.className)}
    >
      {props.children}
    </div>
  )
}

function Card (props: PropsWithChildren<{ className?: string, testId?: string }>): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='w-full flex flex-wrap rounded border border-gray-200 p-4 text-gray-500' data-testid={props.testId}>
      <CardListContext.Provider value={{
        isOpen,
        setIsOpen
      }}
      >
        {props.children}
      </CardListContext.Provider>
    </div>
  )
}

function Header (props: PropsWithChildren<{ className?: string, isView?: boolean, path?: string }>): JSX.Element {
  const {
    isOpen,
    setIsOpen
  } = useContext(CardListContext)

  return (
    <div className='w-full flex justify-between'>
      <div className='w-full flex items-center'>
        {props.children}
      </div>
      {
        props.isView === undefined || !props.isView ? (
          <div
            className='text-gray-600 cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
            data-testid='CardList.Toggle'
          >
            {(!isOpen)
              ? (<MdOutlineKeyboardArrowDown size={28} />)
              : (<MdOutlineKeyboardArrowUp size={28} />)}
          </div>
        ) : (
          <Link href={{ pathname: props.path }}>
            <a className='contents'>
              <div
                className='border border-primary-300 rounded text-primary-400 px-1.5 py-1 text-sm'
                data-testid='CardList.Header.ViewButton'
              >
                VIEW
              </div>
            </a>
          </Link>
        )
      }
    </div>
  )
}

function List (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  const { isOpen } = useContext(CardListContext)

  return (
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
      <div className='w-full mt-2 space-y-2'>
        {props.children}
      </div>
    </Transition>
  )
}

function ListItem (props: PropsWithChildren<{
  className?: string
  title: string
  infoDesc?: string
  titleClassNames?: string
  testId?: string
}>): JSX.Element {
  return (
    <div className='flex justify-between text-gray-900' data-testid={props.testId}>
      <div className='flex items-stretch'>
        <span
          className={classNames('text-gray-500', props.titleClassNames)}
          data-testid='CardList.Row.Title'
        >{props.title}
        </span>
        {props.infoDesc !== undefined && (
          <InfoHoverPopover className='ml-1 self-center' description={props.infoDesc} placement='top' />)}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

CardList.Card = Card
CardList.Header = Header
CardList.List = List
CardList.ListItem = ListItem
