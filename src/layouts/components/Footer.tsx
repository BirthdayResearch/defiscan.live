import { Link } from '@components/commons/Link'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import { PropsWithChildren } from 'react'
import { FaFacebook, FaGithub, FaLinkedin, FaReddit, FaTelegram, FaTwitterSquare, FaYoutube } from 'react-icons/fa'
import { Container } from '@components/commons/Container'

export function Footer (): JSX.Element {
  return (
    <footer className='mt-12 bg-gray-50'>
      <Container className='py-12'>
        <Link href={{ pathname: '/' }}>
          <a className='cursor-pointer'>
            <DeFiChainLogo className='w-28 h-full' />
          </a>
        </Link>

        <div className='mt-4 flex flex-wrap'>
          <div className='py-4 flex-grow max-w-sm'>
            <FooterSectionSitemap />
          </div>

          <div className='py-4 flex-grow max-w-sm'>
            <FooterSectionSocial />
          </div>

          <div className='flex-grow' />

          <div className='py-4'>
            <FooterSectionAbout />
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterSectionSocial (): JSX.Element {
  function FooterSocialRow (props: PropsWithChildren<{ url: string, text: string }>): JSX.Element {
    return (
      <div className='flex flex-row space-x-2 py-2 items-center w-1/2'>
        {props.children}
        <FooterExternalLink url={props.url} text={props.text} />
      </div>
    )
  }

  return (
    <section>
      <h3 className='text-2xl font-semibold'>Social</h3>
      <div className='flex flex-wrap mt-3'>
        <FooterSocialRow url='https://twitter.com/defichain' text='Twitter'>
          <FaTwitterSquare size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://github.com/DeFiCh/ain' text='Github'>
          <FaGithub size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://www.youtube.com/DeFiChain' text='Youtube'>
          <FaYoutube size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://www.linkedin.com/company/defichain' text='Linkedin'>
          <FaLinkedin size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://www.reddit.com/r/defiblockchain/' text='Reddit'>
          <FaReddit size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://www.facebook.com/defichain.official' text='Facebook'>
          <FaFacebook size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://t.me/defiblockchain' text='Telegram'>
          <FaTelegram size={24} />
        </FooterSocialRow>
      </div>
    </section>
  )
}

function FooterSectionSitemap (): JSX.Element {
  return (
    <section>
      <h3 className='text-2xl font-semibold'>Scan</h3>
      <div className='flex flex-wrap mt-3'>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/blocks' text='Blocks' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/dex' text='DEX' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/prices' text='Prices' />
        </div>
        {/* <FooterInternalLink pathname='/icx' text='ICX' /> */}
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/tokens' text='Tokens' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/masternodes' text='Masternodes' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterExternalLink url='https://dex.defichain.com/mainnet/anchors' text='BTC Anchors' />
        </div>
      </div>
    </section>
  )
}

function FooterSectionAbout (): JSX.Element {
  return (
    <section className='max-w-md'>
      <p className='text-sm text-gray-500'>
        DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength
        and immutability. It's a blockchain dedicated to fast, intelligent and transparent financial services,
        accessible by everyone. For more info,
        visit <a className='text-primary cursor-pointer' href='https://defichain.com' target='_blank' rel='noreferrer'>DeFiChain.com</a>
      </p>
      <div className='mt-3 -mx-2 flex flex-wrap'>
        <div className='px-2'>
          <FooterTinyLink url='https://defichain.com/white-paper/' text='White Paper' />
        </div>
        <div className='px-2'>
          <FooterTinyLink url='https://defichain.com/privacy-policy/' text='Privacy Policy' />
        </div>
      </div>

      <div className='mt-6'>
        <a href='https://www.netlify.com' target='_blank' rel='nofollow noopener noreferrer'>
          <img src='https://www.netlify.com/img/global/badges/netlify-light.svg' alt='Deploys by Netlify' />
        </a>
      </div>
    </section>
  )
}

function FooterTinyLink (props: { text: string, url: string }): JSX.Element {
  return (
    <a
      className='text-xs text-gray-700 font-semibold hover:text-primary cursor-pointer'
      href={props.url}
      target='_blank' rel='noreferrer'
    >
      {props.text}
    </a>
  )
}

function FooterInternalLink (props: { text: string, pathname: string }): JSX.Element {
  return (
    <div className='text-lg hover:text-primary cursor-pointer'>
      <Link href={{ pathname: props.pathname }}>
        {props.text}
      </Link>
    </div>
  )
}

function FooterExternalLink (props: { text: string, url: string }): JSX.Element {
  return (
    <div className='text-lg hover:text-primary cursor-pointer'>
      <a href={props.url} target='_blank' rel='noreferrer'>
        {props.text}
      </a>
    </div>
  )
}
