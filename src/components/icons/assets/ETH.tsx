import Image from 'next/image'
import { SVGProps } from 'react'

export function ETH (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Image src={require('@content/prices/images/eth.png')} width={props.width} height={props.height} alt='ETH Logo' />
  )
}
