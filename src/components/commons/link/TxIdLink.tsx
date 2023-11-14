import { Link } from "@components/commons/link/Link";
import classnames from "classnames";
import { PropsWithChildren } from "react";

interface TxIdLinkProps {
  txid: string;
  className?: string;
  testId?: string;
}

export function TxIdLink(props: PropsWithChildren<TxIdLinkProps>): JSX.Element {
  if (props.txid === undefined || props.txid.length === 0) {
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
      <Link href={{ pathname: `/transactions/${props.txid}` }}>
        {(() => {
          if (props.children !== undefined) {
            return <a>{props.children}</a>;
          }
          return props.txid;
        })()}
      </Link>
    </div>
  );
}
