import classNames from "classnames";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  testId: string;
  href?: string;
  onClick?: MouseEventHandler;
  customStyle?: string;
}

export function Button({
  label,
  href,
  testId,
  onClick,
  customStyle,
}: ButtonProps): JSX.Element {
  if (href !== null) {
    return (
      <a href={href}>
        <ButtonElement
          label={label}
          testId={testId}
          onClick={onClick}
          customStyle={customStyle}
        />
      </a>
    );
  }

  return (
    <ButtonElement
      label={label}
      testId={testId}
      onClick={onClick}
      customStyle={customStyle}
    />
  );
}

function ButtonElement({
  label,
  testId,
  onClick,
  customStyle,
}: {
  label: string;
  testId: string;
  onClick?: MouseEventHandler;
  customStyle?: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={classNames(
        "p-2 text-sm font-medium text-primary-500",
        customStyle
      )}
    >
      {label}
    </button>
  );
}
