import { Link } from "@components/commons/link/Link";
import classnames from "classnames";
import { PropsWithChildren } from "react";

interface BlockLinkProps {
  block: string;
  className?: string;
  testId?: string;
}

export function BlockLink(
  props: PropsWithChildren<BlockLinkProps>
): JSX.Element {
  if (props.block === undefined || props.block.length === 0) {
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
      <Link href={{ pathname: `/blocks/${props.block}` }}>
        {(() => {
          if (props.children !== undefined) {
            return <a>{props.children}</a>;
          }
          return `#${props.block}`;
        })()}
      </Link>
    </div>
  );
}
