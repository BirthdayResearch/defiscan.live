import { useNetwork } from '@contexts/NetworkContext'
import { getEnvironment } from '@contexts/Environment'
import { Menu, Transition } from '@headlessui/react'
import { MdArrowDropDown } from 'react-icons/md'
import React, { Fragment } from 'react'

export function HeaderNetworkMenu (): JSX.Element {
  const connection = useNetwork().connection
  const { networks } = getEnvironment()

  return (
    <Menu as='div' className='relative flex'>
      <Menu.Button className='bg-gray-50 px-2 py-1 rounded flex items-center w-full justify-between'>
        <div className='flex items-center'>
          <div className='bg-green-500 h-2 w-2 rounded-full' />
          <div className='text-xs ml-2 font-medium leading-none'>
            {connection}
          </div>
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
                    <div className={active || connection === item ? 'text-primary-500' : ''}>
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
