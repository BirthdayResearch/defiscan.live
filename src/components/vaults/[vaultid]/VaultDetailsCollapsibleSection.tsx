import { ReactNode, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import classNames from 'classnames'

interface VaultDetailsCollapsibleSectionProps {
  children: ReactNode
  heading: string
  className?: string
}

export function VaultDetailsCollapsibleSection (props: VaultDetailsCollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleToggle (): void {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={classNames(props.className, 'cursor-pointer')} data-testid='VaultDetailsCollapsibleSection' onClick={() => handleToggle()}>
      <div className='flex items-center justify-between mt-6'>
        <h2
          className='text-lg font-semibold text-gray-900'
          data-testid='VaultDetailsCollapsibleSection.Heading'
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
