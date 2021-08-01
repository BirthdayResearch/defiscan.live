import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import { getEnvironment, useNetworkContext, useWhaleRpcClient } from '@contexts'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import NumberFormat from 'react-number-format'

export function Header (): JSX.Element {
  return (
    <header className='bg-white'>
      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4 py-1.5'>
          <div className='flex items-center justify-between'>
            <HeaderCountBar />
            <HeaderNetworkMenu />
          </div>
        </div>
      </div>

      <div className='border-b border-gray-100'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center'>
            <Link href='/' passHref>
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
  function HeaderCount (props: { text: string, count: number }): JSX.Element {
    return (
      <li>
        <span>{props.text}: </span>
        <span className='text-primary font-semibold'>
          <NumberFormat value={props.count} displayType='text' thousandSeparator />
        </span>
      </li>
    )
  }

  const rpc = useWhaleRpcClient()
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Temporary Implementation Example Only
    void rpc.blockchain.getBlockchainInfo().then(({ blocks }) => {
      setCount(blocks)
    })
  }, [])

  return (
    <ul className='text-sm'>
      <HeaderCount text='Blocks' count={count} />
    </ul>
  )
}

function HeaderNetworkMenu (): JSX.Element {
  const { network } = useNetworkContext()
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
