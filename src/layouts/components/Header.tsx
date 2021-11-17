import { Link } from '@components/commons/Link'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { Container } from '@components/commons/Container'
import { HeaderCountBar } from './HeaderCountBar'
import { HeaderSearchBar } from './HeaderSearchBar'
import { HeaderNetworkMenu } from './HeaderNetworkMenu'

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
    <header className='bg-white shadow-lg md:shadow-none sticky top-0 md:static'>
      <div className='hidden md:block border-b border-gray-100 bg-primary-700'>
        <Container className='py-1'>
          <div className='flex items-center justify-between h-8'>
            <HeaderCountBar className='h-full flex ' />
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
              <DesktopNavbar />
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
        {menu && (<MobileMenu />)}
      </div>
    </header>
  )
}

function DesktopNavbar (): JSX.Element {
  return (
    <div className='hidden md:flex ml-2 lg:ml-8 md:w-full md:justify-between items-center text-gray-600'>
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
          className='ml-3 lg:ml-4' text='Vaults' pathname='/vaults'
          testId='Desktop.HeaderLink.Vaults'
        />
        <HeaderLink
          className='ml-3 lg:ml-4' text='Oracles' pathname='/oracles'
          testId='Desktop.HeaderLink.Oracles'
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
  )
}

function MobileMenu (): JSX.Element {
  return (
    <div className='md:hidden'>
      <Container className='pt-2 pb-4 border-b border-gray-100 shadow-sm text-gray-600'>
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
            className='flex justify-center border-b border-gray-100' text='Vaults' pathname='/vaults'
            testId='Mobile.HeaderLink.Vaults'
          />
          <HeaderLink
            className='flex justify-center border-b border-gray-100' text='Oracles' pathname='/oracles'
            testId='Mobile.HeaderLink.Oracles'
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
      </Container>

      <div className='p-2 bg-primary-700 flex flex-wrap p-4 md:p-0'>
        <HeaderCountBar className='w-full flex flex-wrap' />
        <div className='w-full mt-4'>
          <HeaderNetworkMenu />
        </div>
      </div>
    </div>
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
        <div className={classNames('inline m-2 text-lg pb-0.5 hover:text-primary-500 cursor-pointer', {
          'border-b-2 border-primary-500': router.pathname === props.pathname
        })}
        >
          {props.text}
        </div>
      </a>
    </Link>
  )
}
