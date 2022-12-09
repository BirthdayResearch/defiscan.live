import classNames from "classnames";

interface ButtonProps {
  label: string;
  testId: string;
  href?: string;
  onClick?: () => void;
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
  onClick?: () => void;
  customStyle?: string;
}) {
  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={handleButtonClick}
      className={classNames(
        "p-2 text-sm font-medium text-primary-500",
        customStyle
      )}
    >
      {label}
    </button>
  );
}
