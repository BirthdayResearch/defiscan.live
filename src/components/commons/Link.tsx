import { EnvironmentNetwork, getEnvironment, useNetworkContext } from '@contexts'
import { LinkProps as NextLinkProps } from 'next/dist/client/link'
/* eslint-disable no-restricted-imports */
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'
import { UrlObject } from 'url'

export interface LinkUrlObject extends UrlObject {
  query?: Record<string, string>
}

interface LinkProps extends NextLinkProps {
  href: LinkUrlObject
}

/**
 * Overrides the default next/link to provide ability to 'keep ?network= query string'.
 * This allows `<Link>` usage to be network agnostic where ?network= are automatically appended.
 *
 * To keep implementation simple, LinkProps enforce href to be strictly a `UrlObject` object
 * where query is a `Record<string, string>`. Hence only use this for internal linking.
 *
 * @param {PropsWithChildren<LinkProps>} props
 */
export function Link (props: PropsWithChildren<LinkProps>): JSX.Element {
  const { network } = useNetworkContext()

  if (!isDefaultNetwork(network)) {
    props.href.query = {
      ...props.href.query ?? {},
      network: network
    }
  }

  return (
    <NextLink {...props}>
      {props.children}
    </NextLink>
  )
}

function isDefaultNetwork (network: EnvironmentNetwork): boolean {
  const env = getEnvironment()
  return env.networks[0] === network
}
