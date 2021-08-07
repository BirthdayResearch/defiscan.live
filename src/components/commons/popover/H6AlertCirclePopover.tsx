import { JSX } from "@babel/types";
import { Popover, Transition } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import { usePopper } from "react-popper";

interface H6AlertCirclePopoverProps {
  name: string,
  description: string
}

export function H6AlertCirclePopover (props: PropsWithChildren<H6AlertCirclePopoverProps>): JSX.Element {
  const [refEle, setRefEle] = useState<any>()
  const [popperEle, setPopperEle] = useState<any>()
  const { styles, attributes } = usePopper(refEle, popperEle, { placement: 'right-start' })

  return (
    <Popover>
      <Popover.Button ref={setRefEle}>
        <div className='flex items-center group'>
          <h6 className='text-sm font-semibold text-black opacity-60 mr-1'>{props.name}</h6>
          <IoAlertCircle className='h-4 w-4 text-black opacity-60 group-hover:text-primary group-hover:opacity-100' />
        </div>
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
