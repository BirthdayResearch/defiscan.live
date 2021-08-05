import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitterSquare,
  FaWeixin,
  FaYoutube
} from 'react-icons/fa'
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

        <div className='flex flex-col md:flex-row justify-center md:justify-between mt-3 '>
          <div className='py-3 flex-1'>
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
          <div className='flex-1'>
            <div className='text-2xl font-semibold'>Social</div>
            <div className='flex flex-wrap mt-3  w-84'>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaTwitterSquare size={25} />
                <FooterExternalLink url='https://twitter.com/defichain' text='Twitter' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaGithub size={25} />
                <FooterExternalLink url='https://github.com/DeFiCh/ain' text='Github' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaYoutube size={25} />
                <FooterExternalLink url='https://www.youtube.com/DeFiChain' text='Youtube' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaLinkedin size={25} />
                <FooterExternalLink url='https://www.linkedin.com/company/defichain' text='Linkedin' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaReddit size={25} />
                <FooterExternalLink url='https://www.reddit.com/r/defiblockchain/' text='Reddit' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaFacebook size={25} />
                <FooterExternalLink url='https://www.facebook.com/defichain.official' text='Facebook' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaTelegram size={25} />
                <FooterExternalLink url='https://t.me/defiblockchain' text='Telegram' />
              </div>
              <div className='flex flex-row space-x-2 items-center w-1/2'>
                <FaWeixin size={25} />
                <FooterExternalLink url='https://www.wechat.com/' text='WeChat' />
              </div>
            </div>
          </div>

          <div className='py-3 max-w-lg flex-1 flex flex-col justify-end'>
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
      <a
        href={props.url}
        target='_blank' rel='noreferrer'
      >
        {props.text}
      </a>
    </div>
  )
}
