import classNames from "classnames";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  testId: string;
  href?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  customStyle?: string;
}

export function Button({
  label,
  href,
  disabled,
  testId,
  onClick,
  customStyle,
}: ButtonProps): JSX.Element {
  if (href !== null) {
    return (
      <a href={href}>
        <ButtonElement
          disabled={disabled}
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
      disabled={disabled}
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
  disabled,
  onClick,
  customStyle,
}: {
  label: string;
  testId: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  customStyle?: string;
}) {
  return (
    <button
      disabled={disabled}
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={classNames(
        "p-2 text-sm font-medium text-primary-500",
        customStyle,
        { "text-gray-300": disabled }
      )}
    >
      {label}
    </button>
  );
}
