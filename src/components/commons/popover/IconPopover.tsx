import { JSX } from "@babel/types";
import { Popover, Transition } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import { usePopper } from "react-popper";

interface IconPopoverProps {
  description: string
}

export function IconPopover (props: PropsWithChildren<IconPopoverProps>): JSX.Element {
  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const { styles, attributes } = usePopper(refEle, popperEle, { placement: 'right-start' })

  return (
    <Popover>
      <Popover.Button ref={setRefEle}>
        {props.children}
      </Popover.Button>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel ref={setPopperEle} style={styles.popper} {...attributes.popper}>
          <div className='p-2'>
            <div className='p-2.5 text-sm bg-black text-white rounded shadow-md ring-1 ring-gray-200 max-w-sm'>
              {props.description}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
