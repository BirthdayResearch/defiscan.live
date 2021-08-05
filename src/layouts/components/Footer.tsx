import { Link } from '@components/commons/Link'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'

export function Footer (): JSX.Element {
  return (
    <footer className='mt-12 border-t border-gray-100'>
      <div className='container mx-auto px-4 py-12'>
        <Link href={{ pathname: '/' }} passHref>
          <div className='cursor-pointer'>
            <DeFiChainLogo className='w-28 h-full' />
          </div>
        </Link>

        <div className='flex flex-wrap mt-3'>
          <div className='py-3 flex-grow'>
            <div className='text-2xl font-semibold'>Scan</div>

            <div className='flex flex-wrap mt-3 -m-2 w-72'>
              <FooterExternalLink url='https://mainnet.defichain.io/#/DFI/mainnet/home' text='Blocks' />
              <FooterExternalLink url='https://dex.defichain.com/mainnet/pool' text='DEX' />
              <FooterInternalLink pathname='/prices' text='Prices' />
              {/* <FooterInternalLink pathname='/icx' text='ICX' /> */}
              <FooterExternalLink url='https://dex.defichain.com/mainnet/token' text='Tokens' />
              {/* <FooterInternalLink pathname='/masternodes' text='Masternodes' /> */}
              <FooterExternalLink url='https://dex.defichain.com/mainnet/anchors' text='BTC Anchors' />
            </div>
          </div>

          <div className='py-3 max-w-lg'>
            <p className='text-sm text-gray-500'>
              DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength
              and immutability. It's a blockchain dedicated to fast, intelligent and transparent financial services,
              accessible by everyone. For more info,
              visit <a className='text-primary cursor-pointer' href='https://defichain.com' target='_blank' rel='noreferrer'>DeFiChain.com</a>
            </p>

            <div className='mt-3'>
              <div className='-mx-2'>
                <FooterTinyLink url='https://defichain.com/white-paper/' text='White Paper' />
                <FooterTinyLink url='https://defichain.com/privacy-policy/' text='Privacy Policy' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterTinyLink (props: { text: string, url: string }): JSX.Element {
  return (
    <a
      className='p-2 text-xs text-gray-700 font-semibold hover:text-primary cursor-pointer'
      href={props.url}
      target='_blank' rel='noreferrer'
    >
      {props.text}
    </a>
  )
}

function FooterInternalLink (props: { text: string, pathname: string }): JSX.Element {
  return (
    <div className='p-2 w-1/2 text-lg hover:text-primary cursor-pointer'>
      <Link href={{ pathname: props.pathname }}>
        {props.text}
      </Link>
    </div>
  )
}

function FooterExternalLink (props: { text: string, url: string }): JSX.Element {
  return (
    <div className='p-2 w-1/2 text-lg hover:text-primary cursor-pointer'>
      <a href={props.url}>
        {props.text}
      </a>
    </div>
  )
}
