import { PropsWithChildren } from 'react'
import classnames from 'classnames'
import { Link } from '@components/commons/link/Link'

interface VaultLinkProps {
  vault: string
  className?: string
  textClassName?: string
  testId?: string
}

export function VaultLink (props: PropsWithChildren<VaultLinkProps>): JSX.Element {
  if (props.vault === undefined || props.vault.length === 0) {
    return <></>
  }

  return (
    <div
      data-testid={props.testId}
      className={classnames('hover:underline cursor-pointer', props.className, props.textClassName === undefined ? 'text-blue-400' : props.textClassName)}
    >
      <Link href={{ pathname: `/vaults/${props.vault}` }}>
        {(() => {
          if (props.children !== undefined) {
            return (<a>{props.children}</a>)
          }
          return props.vault
        })()}
      </Link>
    </div>
  )
}
