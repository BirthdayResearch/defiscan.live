import classNames from 'classnames'
import React, {
  createContext,
  Fragment,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useState
} from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineSort } from 'react-icons/md'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { Menu, Transition } from '@headlessui/react'
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
    <div className='w-full flex flex-wrap rounded border border-gray-200 p-4 text-gray-500 dark:bg-gray-800 dark:border-gray-700' data-testid={props.testId}>
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

function Header (props: PropsWithChildren<{ className?: string, path?: string }>): JSX.Element {
  const {
    isOpen,
    setIsOpen
  } = useContext(CardListContext)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className='w-full flex justify-between space-x-1.5' data-testid='CardList.Header'>
      <div className={classNames('w-full flex items-center', props.className)} data-testid='CardList.Header.Children'>
        {props.children}
      </div>
      {
        (props.path !== undefined) && (
          <Link href={{ pathname: props.path }}>
            <a className='contents'>
              <div
                data-testid='CardList.Header.ViewButton'
                onClick={() => setIsClicked(!isClicked)}
                className={classNames('border border-primary-300 rounded text-primary-400 dark:bg-gray-900 dark:border-gray-700 dark:text-dark-primary-500 px-1.5 py-1 text-sm h-min', { 'bg-primary-100': isClicked })}
              >
                VIEW
              </div>
            </a>
          </Link>
        )
      }
      <div
        className='text-primary-500 cursor-pointer dark:bg-gray-900 dark:border-gray-700 dark:text-dark-primary-500 border border-primary-300 rounded h-min'
        onClick={() => setIsOpen(!isOpen)}
        data-testid='CardList.Header.Toggle'
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
      <div className={classNames('w-full mt-4 space-y-2.5', props.className)}>
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
      <div className='mt-0.5'>
        <div
          className={classNames('flex items-center text-gray-500 dark:text-gray-400', props.titleClassNames)}
          data-testid='CardList.Row.Title'
        >
          {props.title}
          {props.infoDesc !== undefined && (
            <InfoHoverPopover className='ml-1 self-center' description={props.infoDesc} placement='top' />)}
        </div>
      </div>
      <div data-testid='CardList.Row.Child' className={classNames(props.className, 'dark:text-gray-100')}>
        {props.children}
      </div>
    </div>
  )
}

function DropDownSortButton (props: PropsWithChildren<{ selected?: { sortKey: string, sortOrder: string, value: string } }>): JSX.Element {
  return (
    <div data-testid='CardList.DropDownSortButton'>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button
          className='inline-flex items-center rounded border border-primary-300  shadow-sm text-sm px-2.5 py-1.5 bg-white text-primary-500 hover:bg-primary-50 dark:bg-gray-900 dark:border-gray-700 dark:text-dark-primary-500'
        >
          Sort By
          <MdOutlineSort size={18} className='ml-1' />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className='absolute right-0 w-64 z-20 mt-2 origin-top-right bg-white dark:bg-gray-900 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          >
            {props.children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function DropDownSortOption ({
  sortType,
  isSelected,
  onClick
}: {
  sortType: { sortKey: string, sortOrder: string, value: string }
  isSelected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <div className='px-1 py-0.5' data-testid='CardList.DropDownSortOption'>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${isSelected ? 'bg-primary-100 text-gray dark:bg-dark-primary-500 dark:text-gray-100'
              : active ? 'bg-primary-500 text-white' : 'text-gray-900 '
            } group flex rounded text-left items-center w-full px-2 py-2 text-sm dark:text-gray-100`}
            onClick={onClick}
          >
            {sortType.value}
          </button>
        )}
      </Menu.Item>
    </div>
  )
}

CardList.Card = Card
CardList.Header = Header
CardList.List = List
CardList.ListItem = ListItem
CardList.DropDownSortButton = DropDownSortButton
CardList.DropDownSortOption = DropDownSortOption
