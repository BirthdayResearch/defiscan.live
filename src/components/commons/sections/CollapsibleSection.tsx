import { ReactNode, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'

interface CollapsibleSectionProps {
  children: ReactNode
  heading?: string
  className?: string
  testId?: string
}

export function CollapsibleSection (props: CollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleToggle (): void {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={props.className} data-testid={props.testId}>
      <div className='flex items-center justify-between mt-6 cursor-pointer' onClick={() => handleToggle()}>
        <h2
          className='text-lg lg:text-xl font-semibold text-gray-900'
          data-testid='VaultCollapsibleSection.Heading'
        >
          {props.heading}
        </h2>
        {(() => {
          if (isOpen) {
            return <MdOutlineKeyboardArrowUp className='h-6 w-6 text-gray-900' />
          }
          return <MdOutlineKeyboardArrowDown className='h-6 w-6 text-gray-900' />
        })()}
      </div>
      {isOpen && (
        <div className='mt-4'>
          {props.children}
        </div>
      )}
    </div>
  )
}
