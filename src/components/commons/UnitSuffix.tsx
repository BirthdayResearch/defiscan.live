import BigNumber from "bignumber.js";

interface UnitSuffixProps {
  value?: number;
  units: Record<number, string>;
  noSuffixSpacing?: boolean;
}

export function UnitSuffix(props: UnitSuffixProps): JSX.Element {
  if (props.value === undefined) {
    return <span>...</span>;
  }

  const value = new BigNumber(props.value);
  const places = Math.floor(value.e! / 3);
  let suffix = `${props.units[places * 3] ?? ""}`;
  suffix =
    props.noSuffixSpacing !== undefined && props.noSuffixSpacing
      ? `${suffix}`
      : ` ${suffix}`;

  return (
    <>
      {value.dividedBy(Math.pow(1000, places)).toFormat(2, {
        decimalSeparator: ".",
        suffix: suffix,
      })}
    </>
  );
}
