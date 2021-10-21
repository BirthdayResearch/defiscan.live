import { useRouter } from 'next/router'
import { IoSearchSharp } from 'react-icons/io5'
import React from 'react'

export function HeaderSearchBar (): JSX.Element {
  const router = useRouter()
  return (
    <div className='flex p-2 rounded h-9 bg-white border border-gray-200'>
      <IoSearchSharp size={20} className='text-gray-400 self-center' />
      <input
        onKeyDown={(event) => event.code === 'Enter' && router.push(`/search/${(event.target as HTMLInputElement).value}`)}
        placeholder='Search'
        className='ml-1.5 w-full focus:outline-none'
        data-testid='Header.SearchInput'
      />
    </div>
  )
}
