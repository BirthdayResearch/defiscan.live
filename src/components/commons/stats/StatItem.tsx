import React, { PropsWithChildren } from 'react'

export function StatItem ({
  label,
  children,
  testId
}: PropsWithChildren<{ label: string, testId?: string }>): JSX.Element {
  return (
    <div className='whitespace-nowrap' data-testid={testId}>
      <span className='text-gray-500'>{label}</span>
      <span className='ml-2 text-gray-900'>{children}</span>
    </div>
  )
}
