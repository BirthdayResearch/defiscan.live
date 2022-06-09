import { PropsWithChildren } from 'react'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'

export function StatItem ({
  label,
  children,
  testId,
  infoDesc
}: PropsWithChildren<{ label: string, testId?: string, infoDesc?: string }>): JSX.Element {
  return (
    <div className='flex items-center'>
      <div className='whitespace-nowrap' data-testid={testId}>
        <span className='text-gray-500 dark:text-dark-gray-500'>{label}</span>
        <span className='ml-2 text-gray-900 dark:text-dark-gray-900'>{children}</span>
      </div>
      {infoDesc !== undefined && (<InfoHoverPopover className='ml-1' description={infoDesc} />)}
    </div>
  )
}
