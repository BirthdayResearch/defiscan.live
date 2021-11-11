import { ReactNode, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

interface VaultCollapsibleSectionProps {
  children: ReactNode
  heading: string
  className?: string
}

export function VaultCollapsibleSection (props: VaultCollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleToggle (): void {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={props.className} data-testid='VaultCollapsibleSection'>
      <div className='flex items-center justify-between mt-6 cursor-pointer' onClick={() => handleToggle()}>
        <h2
          className='text-lg font-semibold text-gray-900'
          data-testid='VaultCollapsibleSection.Heading'
        >{props.heading}
        </h2>
        {(() => {
          if (isOpen) {
            return <IoIosArrowUp className='h-6 w-6 text-gray-900' />
          }
          return <IoIosArrowDown className='h-6 w-6 text-gray-900' />
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
