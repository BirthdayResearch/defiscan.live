import randomColor from 'randomcolor'
import { SVGProps } from 'react'

export function _Default (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  return (props: SVGProps<SVGSVGElement>): JSX.Element => {
    const bg = randomColor({ luminosity: 'bright', format: 'rgba', seed: symbol, alpha: 0.2 })
    const text = randomColor({ luminosity: 'dark', format: 'rgba', seed: symbol, alpha: 100 })
    const first = symbol?.substring(0, 1)

    return (
      <div className={props.className}>
        <div className='rounded-full w-full h-full' style={{ backgroundColor: bg }}>
          <div className='w-full h-full flex items-center'>
            <div className='flex-1 w-1 text-center font-semibold' style={{ color: text }}>{first}</div>
          </div>
        </div>
      </div>
    )
  }
}
