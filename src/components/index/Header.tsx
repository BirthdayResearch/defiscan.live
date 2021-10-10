import { Container } from '@components/commons/Container'

export function Header (): JSX.Element {
  return (
    <div
      className='h-60 flex flex-col items-center'
      style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}
    >
      <Container className='h-full'>
        <div className='h-full flex items-center'>
          <h1 className='text-4xl font-semibold -mt-4' data-testid='banner-title'>
            DeFiChain Blockchain Explorer
          </h1>
        </div>
      </Container>
    </div>
  )
}
