import { useState } from 'react'
import { MdQrCode, MdOutlineClose } from 'react-icons/md'
import classNames from 'classnames'
import QRCode from 'qrcode.react'

interface QRCodeButtonProps {
  content: string
  className?: string
}

export function QRCodeButton (props: QRCodeButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={classNames('relative', props.className)}>
      <button
        className='cursor-pointer outline-none p-2 bg-gray-100 border border-black border-opacity-60 rounded'
        onClick={() => setOpen(!open)}
      >
        {
          !open ? <MdQrCode className='h-5 w-5 text-black opacity-60' />
            : <MdOutlineClose className='h-5 w-5 text-black opacity-60' />
        }
      </button>

      <div className='absolute'>
        {open && (
          <div className='mt-2 text-xs rounded shadow-md ring-1 ring-gray-100 bg-white p-2'>
            <div className='flex flex-wrap justify-center'>
              <QRCode value={props.content} size={128} />
              <div className='mt-3'>
                {props.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
