import randomColor from 'randomcolor'
import { SVGProps } from 'react'

export function _Default (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  return (props: SVGProps<SVGSVGElement>): JSX.Element => {
    const color = randomColor({ luminosity: 'dark', seed: symbol })
    const startingLetter = symbol?.substring(0, 1) ?? 'T'

    return (
      <svg width='1em' height='1em' {...props}>
        <circle cx={16} cy={16} r={16} fill={color} />
        <text
          x='50%' y='50%' alignmentBaseline='central' textAnchor='middle' fontWeight='bolder'
          fontSize='24' fill='#ffffff'
        >
          {startingLetter}
        </text>
      </svg>
    )
  }
}
