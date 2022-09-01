import { PropsWithChildren } from "react";
import classnames from "classnames";
import { Link } from "@components/commons/link/Link";

interface VaultLinkProps {
  vault: string;
  className?: string;
  testId?: string;
}
export function VaultLink(
  props: PropsWithChildren<VaultLinkProps>
): JSX.Element {
  if (props.vault === undefined || props.vault.length === 0) {
    return <></>;
  }

  return (
    <div
      data-testid={props.testId}
      className={classnames(
        "hover:underline text-blue-500 cursor-pointer",
        props.className
      )}
    >
      <Link href={{ pathname: `/vaults/${props.vault}` }}>
        {(() => {
          if (props.children !== undefined) {
            return <a>{props.children}</a>;
          }
          return props.vault;
        })()}
      </Link>
    </div>
  );
}
