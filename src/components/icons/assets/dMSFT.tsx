import { SVGProps } from 'react'

export function dMSFT (props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      height={32}
      width={32}
      viewBox='0 0 32 32'
      {...props}
    >
      <path
        d='M16,0 C7.163,0 0,7.163 0,16 C0,24.837 7.163,32 16,32 C24.838,32 32,24.837 32,16 C32,7.163 24.838,0 16,0 L16,0 Z'
        id='Path' fill='#F4F3F6'
      />
      <polygon
        id='Path' fill='#F35325' fillRule='nonzero'
        points='6.86956522 6.86956522 15.5652174 6.86956522 15.5652174 15.5652174 6.86956522 15.5652174'
      />
      <polygon
        id='Path' fill='#81BC06' fillRule='nonzero'
        points='16.4347826 6.86956522 25.1304348 6.86956522 25.1304348 15.5652174 16.4347826 15.5652174'
      />
      <polygon
        id='Path' fill='#05A6F0' fillRule='nonzero'
        points='6.86956522 16.4347826 15.5652174 16.4347826 15.5652174 25.1304348 6.86956522 25.1304348'
      />
      <polygon
        id='Path' fill='#FFBA08' fillRule='nonzero'
        points='16.4347826 16.4347826 25.1304348 16.4347826 25.1304348 25.1304348 16.4347826 25.1304348'
      />
    </svg>
  )
}
