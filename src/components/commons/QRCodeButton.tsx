import { useState } from 'react'
import { MdOutlineClose, MdQrCode } from 'react-icons/md'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import { shift, useFloating } from '@floating-ui/react-dom'

interface QRCodeButtonProps {
  content: string
  className?: string
}

export function QRCodeButton (props: QRCodeButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  const {
    x,
    y,
    reference,
    floating,
    strategy
  } = useFloating({ placement: 'bottom', middleware: [shift()] })

  return (
    <div className={classNames('relative', props.className)} ref={reference}>
      <button
        className='cursor-pointer outline-none p-2 bg-white border border-gray-200 rounded dark:bg-gray-900 dark:border-gray-700'
        onClick={() => setOpen(!open)}
      >
        {
          !open ? <MdQrCode className='h-5 w-5 text-gray-600 dark:text-dark-primary-500' />
            : <MdOutlineClose className='h-5 w-5 text-gray-600 dark:text-dark-primary-500' />
        }
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
          <div className='mt-2 text-xs rounded shadow-md ring-1 ring-gray-100 bg-white p-2 text-gray-900 dark:bg-gray-800 dark:ring-gray-700 dark:text-dark-gray-900'>
            <div className='flex flex-wrap justify-center'>
              <QRCode value={props.content} size={128} />
              <div className='mt-3'>
                {props.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
