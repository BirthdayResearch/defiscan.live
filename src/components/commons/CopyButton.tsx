import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import classNames from 'classnames'
import { shift, useFloating } from '@floating-ui/react-dom'

interface CopyButtonProps {
  content: string
  className?: string
}

export function CopyButton (props: CopyButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  const {
    x,
    y,
    reference,
    floating,
    strategy
  } = useFloating({
    placement: 'bottom',
    middleware: [shift()]
  })

  function copy (): void {
    navigator.clipboard.writeText(props.content).then(
      () => {
        setOpen(true)
      }
    ).catch(
      () => {
        setOpen(false)
      }
    )

    setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  return (
    <div className={classNames('relative', props.className)} ref={reference}>
      <button
        className='cursor-pointer outline-none p-2 bg-white border border-gray-200 rounded'
        onClick={copy}
      >
        <MdContentCopy className='h-5 w-5 text-gray-600' />
      </button>
      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? ''
          }}
        >
          <div className='mt-2 text-xs font-medium rounded shadow-md ring-1 ring-gray-100 bg-white p-2'>
            COPIED!
          </div>
        </div>
      )}
    </div>
  )
}
