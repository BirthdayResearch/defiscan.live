import { JSX } from '@babel/types'
import { Transition } from '@headlessui/react'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { usePopper } from 'react-popper'

interface IconPopoverProps {
  popover: string | ReactNode
}

export function HoverPopover (props: PropsWithChildren<IconPopoverProps>): JSX.Element {
  const [isHover, setIsHover] = useState(false)

  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const {
    styles,
    attributes
  } = usePopper(refEle, popperEle, { placement: 'bottom' })

  return (
    <div>
      <div
        ref={setRefEle}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.children}
      </div>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
        show
      >
        {(() => {
          if (!isHover) {
            return null
          }

          return (
            <div ref={setPopperEle} style={styles.popper} {...attributes.popper}>
              <div className='p-2'>
                {typeof props.popover === 'string' ? (
                  <div
                    className='p-3 font-normal text-sm bg-black text-white rounded shadow-md ring-1 ring-gray-200 max-w-xs'
                  >
                    {props.popover}
                  </div>
                ) : props.popover}
              </div>
            </div>
          )
        })()}
      </Transition>
    </div>
  )
}
