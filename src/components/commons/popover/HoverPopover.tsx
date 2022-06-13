import { JSX } from '@babel/types'
import { PropsWithChildren, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { Placement, useFloating, shift } from '@floating-ui/react-dom'

interface IconPopoverProps {
  popover: string | ReactNode
  placement?: Placement
  className?: string
}

export function HoverPopover (props: PropsWithChildren<IconPopoverProps>): JSX.Element {
  const [isHover, setIsHover] = useState(false)

  const {
    x,
    y,
    reference,
    floating,
    strategy
  } = useFloating({
    placement: props.placement ?? 'bottom',
    middleware: [shift()],
    strategy: 'fixed'
  })

  return (
    <>
      <div
        ref={reference}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchCancel={() => setIsHover(false)}
        className={classNames(props.className)}
      >
        {props.children}
      </div>

      {(() => {
        if (!isHover) {
          return null
        }

        return (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? ''
            }}
            className='p-2 z-20'
          >
            {typeof props.popover === 'string' ? (
              <div
                className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs dark:bg-gray-800 dark:border-gray-700 dark:text-dark-gray-900'
              >
                {props.popover}
              </div>
            ) : props.popover}
          </div>
        )
      })()}
    </>
  )
}
