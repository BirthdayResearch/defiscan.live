/* eslint-disable no-restricted-imports */
import { getEnvironment } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { LinkProps as NextLinkProps } from "next/dist/client/link";
import NextLink from "next/link";
import { PropsWithChildren } from "react";
import { UrlObject } from "url";

export interface LinkUrlObject extends UrlObject {
  query?: Record<string, string>;
}

interface LinkProps extends NextLinkProps {
  href: LinkUrlObject;
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
export function Link(props: PropsWithChildren<LinkProps>): JSX.Element {
  const connection = useNetwork().connection;

  if (!getEnvironment().isDefaultConnection(connection)) {
    props.href.query = {
      ...(props.href.query ?? {}),
      network: connection,
    };
  }

  return (
    <NextLink passHref {...props} legacyBehavior>
      {props.children}
    </NextLink>
  );
}

export function SearchResultLink(
  props: PropsWithChildren<LinkProps>
): JSX.Element {
  const connection = useNetwork().connection;
  const { href, children, ...rest } = props;

  if (!getEnvironment().isDefaultConnection(connection)) {
    props.href.query = {
      ...(props.href.query ?? {}),
      network: connection,
    };
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}
