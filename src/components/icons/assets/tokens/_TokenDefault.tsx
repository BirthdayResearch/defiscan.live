import { SVGProps } from 'react'

export function _TokenDefault (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  function TokenDefaultSymbol (props: SVGProps<SVGSVGElement>): JSX.Element {
    const bg = '#000000'
    const text = 'white'

    return (
      <svg width='1em' height='1em' viewBox='0 0 32 32' {...props}>
        <path
          fill={bg}
          d='M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z'
        />
        <text
          className='pointer-events-none'
          dominantBaseline='central'
          fill={text}
          fontSize={10}
          fontWeight={700}
          textAnchor='middle'
          lengthAdjust='spacingAndGlyphs'
          textLength={25}
          x='50%'
          y='50%'
        >
          {symbol}
        </text>
      </svg>
    )
  }

  return TokenDefaultSymbol
}
