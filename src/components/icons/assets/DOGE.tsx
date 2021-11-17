import Image from 'next/image'
import { SVGProps } from 'react'

export function DOGE (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Image src={require('@content/prices/images/doge.png')} width={props.width} height={props.height} alt='DOGE Logo' />
  )
}
