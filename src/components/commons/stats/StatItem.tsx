import React, { PropsWithChildren } from 'react'

export function StatItem ({
  label,
  children,
  testId
}: PropsWithChildren<{ label: string, testId?: string }>): JSX.Element {
  return (
    <div className='flex flex-nowrap flex-row' data-testid={testId}>
      <div className='text-gray-500 min-w-max'>{label}</div>
      <div className='ml-2 text-gray-900 min-w-max'>{children}</div>
    </div>
  )
}
