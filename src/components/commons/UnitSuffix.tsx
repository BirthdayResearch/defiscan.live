import BigNumber from 'bignumber.js'

interface UnitSuffixProps {
  value: number
  units: Record<number, string>
}

export function UnitSuffix (props: UnitSuffixProps): JSX.Element {
  const difficulty = new BigNumber(props.value)
  const places = Math.floor(difficulty.e! / 3)
  const unit = props.units[places * 3]

  return (
    <>
      {difficulty.dividedBy(Math.pow(1000, places))
        .toFormat(2, {
          decimalSeparator: '.',
          suffix: ` ${unit}`
        }
        )}
    </>
  )
}
