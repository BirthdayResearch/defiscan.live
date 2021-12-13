import Image from 'next/image'
import { SVGProps } from 'react'

export function USDT (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Image src={require('@content/prices/images/usdt.png')} width={props.width} height={props.height} alt='USDT Logo' />
  )
}
