import BigNumber from 'bignumber.js'

interface UnitSuffixProps {
  value?: number
  units: Record<number, string>
}

export function UnitSuffix (props: UnitSuffixProps): JSX.Element {
  if (props.value === undefined) {
    return (<>NA</>)
  }

  const value = new BigNumber(props.value)
  const places = Math.floor(value.e! / 3)
  const suffix = ` ${props.units[places * 3] ?? ''}`

  return (
    <>
      {value.dividedBy(Math.pow(1000, places))
        .toFormat(2, {
          decimalSeparator: '.',
          suffix: suffix
        })}
    </>
  )
}
