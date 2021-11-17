import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import classNames from 'classnames'
import { usePopper } from 'react-popper'

interface CopyButtonProps {
  content: string
  className?: string
}

export function CopyButton (props: CopyButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const {
    styles,
    attributes
  } = usePopper(refEle, popperEle, { placement: 'bottom' })

  async function copy (): Promise<void> {
    await navigator.clipboard.writeText(props.content)
    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  return (
    <div className={classNames('relative', props.className)} ref={setRefEle}>
      <button
        className='cursor-pointer outline-none p-2 bg-gray-100 border border-black border-opacity-60 rounded'
        onClick={copy}
      >
        <MdContentCopy className='h-5 w-5 text-black opacity-60' />
      </button>
      {open && (
        <div ref={setPopperEle} style={styles.popper} {...attributes.popper}>
          <div className='mt-2 text-xs font-medium rounded shadow-md ring-1 ring-gray-100 bg-white p-2'>
            COPIED!
          </div>
        </div>
      )}
    </div>
  )
}
