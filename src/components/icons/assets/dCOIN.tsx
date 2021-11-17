import { SVGProps } from 'react'

export function dCOIN (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      height={32}
      width={32}
      viewBox='0 0 32 32'
      {...props}
    >
      <path
        d='M16,0 C7.163,0 0,7.163 0,16 C0,24.837 7.163,32 16,32 C24.838,32 32,24.837 32,16 C32,7.163 24.838,0 16,0 L16,0 Z'
        id='Path' fill='#2150F5'
      />
      <path
        d='M21.6777427,17.2279281 C21.1889331,19.8180695 18.9162433,21.776603 16.184402,21.776603 C13.095565,21.776603 10.592201,19.273239 10.592201,16.184402 C10.592201,13.095565 13.095565,10.592201 16.184402,10.592201 C18.9162433,10.592201 21.1889331,12.551833 21.6777427,15.140876 L27.3204723,15.140876 C26.7943155,9.45310998 22.0094741,5 16.184402,5 C10.006728,5 5,10.0078264 5,16.184402 C5,22.3620761 10.0078264,27.3688041 16.184402,27.3688041 C22.0094741,27.3688041 26.7943155,22.9156941 27.3204723,17.2279281 L21.6777427,17.2279281 Z'
        id='Path' fill='#FFFFFF' fillRule='nonzero'
      />
    </svg>
  )
}
