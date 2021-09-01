import { useState } from 'react'
import { IoCopyOutline } from 'react-icons/io5'

export function CopyButton ({ text }: { text: string }): JSX.Element {
  const [open, setOpen] = useState<Boolean>(false)

  async function copy (): Promise<void> {
    await navigator.clipboard.writeText(text)
    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 500)
  }

  return (
    <div className='ml-1'>
      <button className='cursor-pointer outline-none p-1 bg-gray-100 rounded shadow-sm' onClick={copy}>
        <IoCopyOutline className='h-5 w-5 text-gray-500' />
      </button>
      {
        open === true
          ? (
            <span className='bg-gray-100 p-1 rounded absolute mr-4'>
              Copied!
            </span>
          )
          : null
      }
    </div>
  )
}
