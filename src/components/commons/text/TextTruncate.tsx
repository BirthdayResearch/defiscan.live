import classNames from "classnames";
import React from "react";

export function TextTruncate(props: {
  text: string;
  className?: string;
  testId?: string;
  width?: string;
}): JSX.Element {
  return (
    <div
      className={classNames(
        "overflow-hidden overflow-ellipsis",
        props.width ?? "w-24",
        props.className
      )}
      data-testid={props.testId}
    >
      {props.text}
    </div>
  );
}
