import { ReactNode, useState } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

interface CollapsibleProps {
  children: ReactNode
  heading: string
  className?: string
}

export function Collapsible (props: CollapsibleProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleToggle (): void {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={props.className} data-testid='Collapsible'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold' data-testid='Collapsible.Heading'>{props.heading}</h2>
        <button className='outline-none px-5 py-3' onClick={() => handleToggle()}>
          {(() => {
            if (isOpen) {
              return <IoIosArrowUp className='h-6 w-6' />
            }
            return <IoIosArrowDown className='h-6 w-6' />
          })()}
        </button>
      </div>
      {isOpen && (
        <div className='mt-6 '>
          {props.children}
        </div>
      )}
    </div>
  )
}
