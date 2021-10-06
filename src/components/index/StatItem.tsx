import { ReactNode, PropsWithChildren } from 'react'

export function StatItem ({ label, children, testId }: PropsWithChildren<{ label: string, children: ReactNode, testId?: string }>): JSX.Element {
  return (
    <div className='flex gap-x-8 text-sm' data-testid={testId}>
      <div className='text-gray-400 w-36'>{label}</div>
      <div className='w-44 text-black font-semibold'>{children}</div>
    </div>
  )
}
