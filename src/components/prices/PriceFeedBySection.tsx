import { ORACLES } from '@content/oracles'
import Image from 'next/image'

export function PricingFeedsBySection (): JSX.Element {
  const oracles = Object.values(ORACLES)

  return (
    <section>
      <h1 className='text-2xl font-medium'>
        Pricing feeds by
      </h1>

      <div className='mt-6 -m-2 flex flex-wrap'>
        {oracles.map(item => (
          <div className='w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-2' key={item.name}>
            <div className='border border-gray-200 flex items-center justify-center p-4' key={item.name}>
              <a href={item.url} target='_blank' rel='nofollow noopener noreferrer'>
                <Image src={item.image} width={150} height={90} alt={item.name} objectFit='contain' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
