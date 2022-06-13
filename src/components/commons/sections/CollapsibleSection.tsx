import { ReactNode, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import classNames from 'classnames'

interface CollapsibleSectionProps {
  children: ReactNode
  heading?: string
  className?: string
  testId?: string
  mdNotCollapsible?: boolean
}

// TODO(joeldavidw): Merge CollapsibleSection and section.
export function CollapsibleSection (props: CollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleToggle (): void {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={props.className} data-testid={props.testId}>
      <div
        className={classNames('flex items-center justify-between mt-6 cursor-pointer', { 'md:cursor-default md:mt-0': props.mdNotCollapsible })}
        onClick={() => handleToggle()}
      >
        <h2
          className={classNames('text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100', { 'md:hidden': props.mdNotCollapsible })}
          data-testid='CollapsibleSection.Heading'
        >
          {props.heading}
        </h2>
        <div className={classNames('block', { 'md:hidden': props.mdNotCollapsible })}>
          {(() => {
            if (isOpen) {
              return <MdOutlineKeyboardArrowUp className='h-6 w-6 text-gray-900' />
            }
            return <MdOutlineKeyboardArrowDown className='h-6 w-6 text-gray-900' />
          })()}
        </div>
      </div>
      <div
        className={classNames('mt-4', isOpen ? 'block' : 'hidden', { 'md:block': props.mdNotCollapsible })}
      >
        {props.children}
      </div>
    </div>
  )
}
