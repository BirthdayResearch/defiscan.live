import { SVGProps } from 'react'

export function _TokenDefault (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  // TODO (@joeldavidw): Need to properly determine whether a token is LPS or DAT.

  const symbolParts = symbol.split('-')

  function TokenDefaultSymbol (props: SVGProps<SVGSVGElement>): JSX.Element {
    let fontSize

    switch (symbolParts[0].length) {
      case (1):
      case (2):
      case (3):
        fontSize = 11
        break
      case (4):
        fontSize = 10
        break
      case (5):
        fontSize = 8.5
        break
      default:
        fontSize = 8
        break
    }

    return (
      <svg width='1em' height='1em' viewBox='0 0 32 32' {...props}>
        <path
          fill='#000000'
          d='M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z'
        />
        <text
          className='pointer-events-none'
          dominantBaseline='central'
          fill='white'
          fontSize={fontSize}
          fontWeight='600'
          textAnchor='middle'
          x='50%'
          y='50%'
        >
          {symbolParts[0]}
        </text>
      </svg>
    )
  }

  function PoolPairTokenSymbol (props: SVGProps<SVGSVGElement>): JSX.Element {
    const textLength = symbolParts[0].length > symbolParts[1].length ? symbolParts[0].length : symbolParts[1].length
    const baseFontSize = 9
    const fontSize = baseFontSize - ((textLength - 3) * 0.5)

    return (
      <svg width='1em' height='1em' viewBox='0 0 32 32' {...props}>
        <path
          fill='#000000'
          d='M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z'
        />
        <text
          className='pointer-events-none'
          fill='white'
          fontSize={fontSize}
          fontWeight='600'
          y='50%'
        >
          <tspan x='50%' y={symbolParts[0].length <= symbolParts[1].length ? '48%' : ''} textAnchor='middle'>
            {symbolParts[0]}
          </tspan>
          <tspan x='50%' dy={fontSize} textAnchor='middle'>
            {symbolParts[1]}
          </tspan>
        </text>
      </svg>
    )
  }

  if (symbolParts.length === 2) {
    return PoolPairTokenSymbol
  }

  return TokenDefaultSymbol
}
