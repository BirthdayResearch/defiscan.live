import React, { PropsWithChildren } from 'react'
import { Container } from '@components/commons/Container'

export function StatsBar (props: PropsWithChildren<{}>): JSX.Element {
  return (
    <div className='w-full bg-gray-50 py-3'>
      <Container>
        <div className='flex flex-row flex-nowrap overflow-x-auto space-x-8 no-scrollbar'>
          {props.children}
        </div>
      </Container>
    </div>
  )
}
