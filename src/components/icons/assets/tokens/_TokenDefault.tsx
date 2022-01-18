import { SVGProps } from 'react'

export function _TokenDefault (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  function TokenDefaultSymbol (props: SVGProps<SVGSVGElement>): JSX.Element {
    const bg = '#000000'
    const text = 'white'

    const symbolParts = symbol.split('-')

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
          textLength={symbolParts.length === 2 ? (symbolParts[0].length < symbolParts[1].length ? 15 : 20) : 25}
          x='50%'
          y={symbolParts.length === 2 ? '32%' : '50%'}
        >
          {symbolParts[0]}
        </text>
        {symbolParts.length === 2 &&
          <text
            className='pointer-events-none'
            dominantBaseline='central'
            fill={text}
            fontSize={10}
            fontWeight={700}
            textAnchor='middle'
            lengthAdjust='spacingAndGlyphs'
            textLength={symbolParts[0].length > symbolParts[1].length ? 15 : 20}
            x='50%'
            y='68%'
          >
            {symbolParts[1]}
          </text>}
      </svg>
    )
  }

  return TokenDefaultSymbol
}
