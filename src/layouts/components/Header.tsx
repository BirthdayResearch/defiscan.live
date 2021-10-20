import { Link } from '@components/commons/Link'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import { getEnvironment } from '@contexts/Environment'
import { useNetwork } from '@contexts/NetworkContext'
import { Menu, Transition } from '@headlessui/react'
import { RootState } from '@store/index'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { MdArrowDropDown, MdClose, MdMenu } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { Container } from '@components/commons/Container'
import { IoSearchSharp } from 'react-icons/io5'

export function Header (): JSX.Element {
  const [menu, setMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function routeChangeStart (): void {
      setMenu(false)
    }

    router.events.on('routeChangeStart', routeChangeStart)
    return () => router.events.off('routeChangeStart', routeChangeStart)
  }, [])

  return (
    <header className='bg-white'>
      <div className='hidden md:block border-b border-gray-100'>
        <Container className='py-1'>
          <div className='flex items-center justify-between h-8'>
            <HeaderCountBar className='h-full flex flex-wrap -m-2 overflow-hidden' />
            <HeaderNetworkMenu />
          </div>
        </Container>
      </div>

      <div className='border-b border-gray-100'>
        <Container className='py-4 md:py-8'>
          <div className='flex items-center justify-between'>
            <div className='flex w-full'>
              <Link href={{ pathname: '/' }} passHref>
                <a className='flex items-center cursor-pointer hover:text-primary-500'>
                  <DeFiChainLogo className='w-12 lg:w-16 h-full' />
                  <h6 className='ml-3 text-xl font-medium'>Scan</h6>
                </a>
              </Link>

              <div className='hidden md:flex ml-2 lg:ml-8  md:w-full md:justify-between items-center'>
                <div className='hidden md:flex'>
                  <HeaderLink
                    className='ml-3 lg:ml-4' text='DEX' pathname='/dex'
                    testId='Desktop.HeaderLink.DEX'
                  />
                  <HeaderLink
                    className='ml-3 lg:ml-4' text='Blocks' pathname='/blocks'
                    testId='Desktop.HeaderLink.Blocks'
                  />
                  <HeaderLink
                    className='ml-3 lg:ml-4' text='Prices' pathname='/prices'
                    testId='Desktop.HeaderLink.Prices'
                  />
                  <HeaderLink
                    className='ml-3 lg:ml-4' text='Tokens' pathname='/tokens'
                    testId='Desktop.HeaderLink.Tokens'
                  />
                  <HeaderLink
                    className='ml-3 lg:ml-4' text='Masternodes' pathname='/masternodes'
                    testId='Desktop.HeaderLink.Masternodes'
                  />
                </div>
                <div className='hidden ml-4 md:flex' data-testid='Desktop.HeaderSearchBar'>
                  <HeaderSearchBar />
                </div>
              </div>
            </div>
            <div className='md:hidden'>
              {menu ? (
                <MdClose
                  className='h-6 w-6 text-primary-500' onClick={() => setMenu(false)}
                  data-testid='Header.CloseMenu'
                />
              ) : (
                <MdMenu
                  className='h-6 w-6 text-primary-500' onClick={() => setMenu(true)}
                  data-testid='Header.OpenMenu'
                />
              )}
            </div>
          </div>
        </Container>
      </div>

      <div>
        {menu && (
          <Container className='md:hidden pt-2 pb-4 border-b border-gray-100 shadow-sm'>
            <div className='flex flex-col'>
              <HeaderLink
                className='flex justify-center border-b border-gray-100' text='DEX' pathname='/dex'
                testId='Mobile.HeaderLink.DEX'
              />
              <HeaderLink
                className='flex justify-center border-b border-gray-100' text='Blocks' pathname='/blocks'
                testId='Mobile.HeaderLink.Blocks'
              />
              <HeaderLink
                className='flex justify-center border-b border-gray-100' text='Prices' pathname='/prices'
                testId='Mobile.HeaderLink.Prices'
              />
              <HeaderLink
                className='flex justify-center border-b border-gray-100' text='Tokens' pathname='/tokens'
                testId='Mobile.HeaderLink.Tokens'
              />
              <HeaderLink
                className='flex justify-center border-b border-gray-100' text='Masternodes'
                pathname='/masternodes'
                testId='Mobile.HeaderLink.Masternodes'
              />
            </div>

            <div className='mt-4' data-testid='Mobile.HeaderSearchBar'>
              <HeaderSearchBar />
            </div>

            <HeaderCountBar className='mt-4 border border-gray-100 rounded p-2 bg-gray-50 flex flex-wrap' />
            <div className='mt-4'>
              <HeaderNetworkMenu />
            </div>
          </Container>
        )}
      </div>
    </header>
  )
}

function HeaderCountBar (props: { className: string }): JSX.Element {
  const {
    count,
    tvl
  } = useSelector((state: RootState) => state.stats)

  function HeaderCount (props: { text: string, count?: number, className: string }): JSX.Element {
    return (
      <li className={props.className}>
        <span className='text-sm'>{props.text}: </span>
        <span className='text-sm text-primary-500 font-semibold'>
          {props.count !== undefined ? (
            <NumberFormat value={props.count} displayType='text' thousandSeparator />
          ) : (
            '...'
          )}
        </span>
      </li>
    )
  }

  function HeaderAmount (props: { text: string, count?: number, className: string }): JSX.Element {
    return (
      <li className={props.className}>
        <span className='text-sm'>{props.text}: </span>
        <span className='text-sm font-medium text-black opacity-60'>
          {props.count !== undefined ? (
            <NumberFormat
              value={props.count}
              displayType='text'
              decimalScale={0}
              thousandSeparator
              prefix='$'
            />
          ) : (
            '...'
          )}
        </span>
      </li>
    )
  }

  function PopoverTVL (): JSX.Element {
    function PopoverTVLAmount (props: { text: string, count?: number, className: string }): JSX.Element {
      return (
        <li className={classNames(props.className, 'flex justify-between')}>
          <span className='text-sm mr-4'>{props.text}: </span>
          <span className='text-sm font-medium'>
            {props.count !== undefined ? (
              <NumberFormat
                value={props.count}
                displayType='text'
                decimalScale={0}
                thousandSeparator
                prefix='$'
              />
            ) : (
              '...'
            )}
          </span>
        </li>
      )
    }

    return (
      <div
        className='py-3 px-4 font-normal text-sm bg-black text-white rounded shadow-md ring-1 ring-gray-200 max-w-xs'
      >
        <PopoverTVLAmount className='py-1' text='DEX' count={tvl.dex} />
        <PopoverTVLAmount className='py-1' text='Masternode' count={tvl.masternodes} />
        <PopoverTVLAmount className='py-1' text='TOTAL' count={tvl.total} />
      </div>
    )
  }

  return (
    <ul className={props.className}>
      <HeaderCount className='px-2 py-1' text='Blocks' count={count.blocks} />
      <HeaderCount className='px-2 py-1' text='Tokens' count={count.tokens} />
      <HeaderCount className='px-2 py-1' text='Masternodes' count={count.masternodes} />
      <HeaderCount className='px-2 py-1' text='Price Feeds' count={count.prices} />
      <HoverPopover popover={<PopoverTVL />}>
        <HeaderAmount className='px-2 py-1 cursor-help' text='Total Value Locked' count={tvl.total} />
      </HoverPopover>
    </ul>
  )
}

function HeaderNetworkMenu (): JSX.Element {
  const network = useNetwork()
  const { networks } = getEnvironment()

  return (
    <Menu as='div' className='relative inline-block'>
      <Menu.Button className='bg-gray-50 px-2 py-1 rounded flex items-center'>
        <div className='bg-green-500 h-2 w-2 rounded-full' />
        <div className='text-xs ml-2 font-medium leading-none'>
          {network}
        </div>
        <MdArrowDropDown className='h-6 w-6 ml-1 text-gray-600' />
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
          static
          className='origin-top-right absolute right-0 mt-2 w-32 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5 focus:outline-none'
        >
          <div className='py-1'>
            {networks.map(item =>
              <Menu.Item key={item}>
                {({ active }) =>
                  <a
                    className='block px-4 py-2 text-sm font-medium cursor-pointer'
                    href={`/?network=${item}`}
                  >
                    <div className={active || network === item ? 'text-primary-500' : ''}>
                      {item}
                    </div>
                  </a>}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function HeaderLink (props: { text: string, pathname: string, className: string, testId?: string }): JSX.Element {
  const router = useRouter()
  return (
    <Link href={{ pathname: props.pathname }}>
      <a
        className={classNames(props.className, {
          'text-primary-500': router.pathname === props.pathname
        })} data-testid={props.testId}
      >
        <div className='p-2 text-lg hover:text-primary-500 cursor-pointer'>
          {props.text}
        </div>
      </a>
    </Link>
  )
}

function HeaderSearchBar (): JSX.Element {
  const router = useRouter()
  return (
    <div className='flex p-2 rounded h-9 bg-white border border-gray-200'>
      <input
        onKeyDown={(event) => event.code === 'Enter' && router.push(`/search/${(event.target as HTMLInputElement).value}`)}
        placeholder='Search'
        className='ml-1.5 w-full focus:outline-none'
        data-testid='Header.SearchInput'
      />
      <IoSearchSharp size={20} className='text-gray-400 ml-0.5 self-center' />
    </div>
  )
}
