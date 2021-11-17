import { JSX } from '@babel/types'
import { Transition } from '@headlessui/react'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { usePopper } from 'react-popper'
import classNames from 'classnames'
import * as PopperJS from '@popperjs/core'

interface IconPopoverProps {
  popover: string | ReactNode
  placement?: PopperJS.Placement
  className?: string
}

export function HoverPopover (props: PropsWithChildren<IconPopoverProps>): JSX.Element {
  const [isHover, setIsHover] = useState(false)

  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const {
    styles,
    attributes
  } = usePopper(refEle, popperEle, {
    placement: props.placement ?? 'bottom',
    strategy: 'fixed'
  })

  return (
    <>
      <div
        ref={setRefEle}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsHover(!isHover)}
        className={classNames(props.className)}
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
            <div ref={setPopperEle} style={styles.popper} {...attributes.popper} className='p-2 z-20'>
              {typeof props.popover === 'string' ? (
                <div
                  className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
                >
                  {props.popover}
                </div>
              ) : props.popover}
            </div>
          )
        })()}
      </Transition>
    </>
  )
}
