import { useState } from 'react'
import { MdQrCode, MdOutlineClose } from 'react-icons/md'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import { usePopper } from 'react-popper'

interface QRCodeButtonProps {
  content: string
  className?: string
}

export function QRCodeButton (props: QRCodeButtonProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const {
    styles,
    attributes
  } = usePopper(refEle, popperEle, { placement: 'bottom' })

  return (
    <div className={classNames('relative', props.className)} ref={setRefEle}>
      <button
        className='cursor-pointer outline-none p-2 bg-white border border-gray-200 rounded'
        onClick={() => setOpen(!open)}
      >
        {
          !open ? <MdQrCode className='h-5 w-5 text-gray-600' />
            : <MdOutlineClose className='h-5 w-5 text-gray-600' />
        }
      </button>
      {open && (
        <div ref={setPopperEle} style={styles.popper} {...attributes.popper}>
          <div className='mt-2 text-xs rounded shadow-md ring-1 ring-gray-100 bg-white p-2 text-gray-900'>
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
