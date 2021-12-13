import { SVGProps } from 'react'

export function SignalCellular1 (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path
        d='M19.5,5.5V18.5H17.5V5.5H19.5M12.5,10.5V18.5H10.5V10.5H12.5M21,14H2V20H7V14Z'
      />
      <path d='M21,4H16V20H21V4M14,9H9V20H14V9M7' fill='#cecece' />
    </svg>
  )
}
