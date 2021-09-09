import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import classNames from 'classnames'

interface CopyButtonProps {
  content: string
  className?: string
}

export function CopyButton (props: CopyButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  async function copy (): Promise<void> {
    await navigator.clipboard.writeText(props.content)
    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  return (
    <div className={classNames('relative', props.className)}>
      <button className='cursor-pointer border border-gray-200 p-1 bg-gray-100 rounded' onClick={copy}>
        <MdContentCopy className='h-4 w-4 text-gray-600' />
      </button>
      <div className='absolute'>
        {open && (
          <div className='mt-2 text-sm font-medium rounded shadow-md ring-1 ring-gray-100 bg-white p-2'>
            COPIED!
          </div>
        )}
      </div>
    </div>
  )
}
