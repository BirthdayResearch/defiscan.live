import ReactNumberFormat from 'react-number-format'

export function NumberFormat (props: { className?: string, value?: number|string, prefix?: string, suffix?: string, decimalScale?: number }): JSX.Element {
  return (
    <ReactNumberFormat
      displayType='text'
      thousandSeparator
      {...props}
    />
  )
}
