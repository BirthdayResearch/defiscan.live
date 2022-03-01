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
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className='w-full flex justify-between space-x-1.5'>
      <div className='w-full flex items-center'>
        {props.children}
      </div>
      {
        (props.isView !== undefined && props.isView) && (
          <Link href={{ pathname: props.path }}>
            <a className='contents'>
              <div
                data-testid='CardList.Header.ViewButton'
                onClick={() => setIsClicked(!isClicked)}
                className={classNames('border border-primary-300 rounded text-primary-400 px-1.5 py-1 text-sm', { 'bg-primary-100': isClicked })}
              >
                VIEW
              </div>
            </a>
          </Link>
        )
      }
      <div
        className='text-primary-500 cursor-pointer border border-primary-300 rounded'
        onClick={() => setIsOpen(!isOpen)}
        data-testid='CardList.Toggle'
      >
        {(!isOpen)
          ? (<MdOutlineKeyboardArrowDown size={28} />)
          : (<MdOutlineKeyboardArrowUp size={28} />)}
      </div>
    </div>
  )
}

function List (props: PropsWithChildren<{ className?: string }>): JSX.Element {
  const { isOpen } = useContext(CardListContext)

  return (
    <Transition
      className='w-full'
      show={isOpen}
    >
      <div className={classNames('w-full mt-2 space-y-2', props.className)}>
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
