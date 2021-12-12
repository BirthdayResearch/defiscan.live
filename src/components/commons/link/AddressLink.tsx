import { Link } from '@components/commons/link/Link'
import classnames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { WarningHoverPopover } from '@components/commons/popover/WarningHoverPopover'

interface AddressLinkProps {
  address: string
  className?: string
  textClassName?: string
  testId?: string
}

export function AddressLink (props: PropsWithChildren<AddressLinkProps>): JSX.Element {
  if (props.address === undefined || props.address.length === 0) {
    return <></>
  }

  return (
    <div
      data-testid={props.testId}
      className={classnames('hover:underline cursor-pointer', props.className, props.textClassName === undefined ? 'text-blue-400' : props.textClassName)}
    >
      <Link href={{ pathname: `/address/${props.address}` }}>
        {(() => {
          if (props.children !== undefined) {
            return (<a>{props.children}</a>)
          }
          return props.address
        })()}
      </Link>
    </div>
  )
}

export function AddressLinkExternal (props: { text: string, url: string, testId?: string }): JSX.Element {
  return (
    <div className='flex items-center text-blue-400 hover:underline cursor-pointer' data-testid={props.testId}>
      <a href={props.url} target='_blank' rel='noreferrer'>
        {props.text}
      </a>
      <WarningHoverPopover
        className='ml-1'
        description='This link opens in a new window and goes to an external site.'
      />
    </div>
  )
}
