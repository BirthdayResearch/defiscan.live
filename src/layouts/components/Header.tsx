import { Link } from '@components/commons/Link'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import { getEnvironment } from '@contexts/Environment'
import { useNetwork } from '@contexts/NetworkContext'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { stats } from '@defichain/whale-api-client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import NumberFormat from 'react-number-format'

export function Header (): JSX.Element {
  return (
    <header className='bg-white'>
      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4 py-1'>
          <div className='flex items-center justify-between'>
            <HeaderCountBar />
            <HeaderNetworkMenu />
          </div>
        </div>
      </div>

      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center'>
            <Link href={{ pathname: '/' }} passHref>
              <div className='flex items-center cursor-pointer hover:text-primary'>
                <DeFiChainLogo className='w-16 h-full' />
                <h6 className='ml-3 text-xl font-medium'>Scan</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function HeaderCountBar (): JSX.Element {
  function HeaderCount (props: { text: string, count?: number, className: string }): JSX.Element {
    return (
      <li className={props.className}>
        <span className='text-sm'>{props.text}: </span>
        <span className='text-sm text-primary font-semibold'>
          {props.count !== undefined
            ? <NumberFormat value={props.count} displayType='text' thousandSeparator /> : '...'}
        </span>
      </li>
    )
  }

  function HeaderAmount (props: { text: string, count?: number, className: string }): JSX.Element {
    return (
      <li className={props.className}>
        <span className='text-sm'>{props.text}: </span>
        <span className='text-sm text-black opacity-60'>
          {props.count !== undefined
            ? <NumberFormat value={props.count} displayType='text' decimalScale={0} thousandSeparator suffix=' USD' /> : '...'}
        </span>
      </li>
    )
  }

  const api = useWhaleApiClient()
  const [stats, setStats] = useState<stats.StatsData | undefined>(undefined)

  useEffect(() => {
    void api.stats.get().then(stats => {
      setStats(stats)
    })
  }, [])

  return (
    <ul className='flex -m-2'>
      <HeaderCount className='p-2 hidden md:block' text='Blocks' count={stats?.count.blocks} />
      <HeaderCount className='p-2 hidden md:block' text='Tokens' count={stats?.count.tokens} />
      <HeaderCount className='p-2 hidden md:block' text='Price Feeds' count={stats?.count.prices} />
      <HeaderAmount className='p-2' text='Total Value Locked' count={stats?.tvl.total} />
    </ul>
  )
}

function HeaderNetworkMenu (): JSX.Element {
  const network = useNetwork()
  const { networks } = getEnvironment()

  return (
    <Menu as='div' className='relative inline-block'>
      <Menu.Button className='bg-gray-100 px-2 py-1 rounded flex items-center'>
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
                    <div className={active || network === item ? 'text-primary' : ''}>
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
