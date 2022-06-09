import { Link } from '@components/commons/link/Link'
import { DeFiChainLogo } from '@components/icons/DeFiChainLogo'
import { PropsWithChildren } from 'react'
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitterSquare,
  FaYoutube
} from 'react-icons/fa'
import { Container } from '@components/commons/Container'
import { NetlifyLightLogo } from '@components/icons/NetlifyLightLogo'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { HoverPopover } from '@components/commons/popover/HoverPopover'

export function Footer (): JSX.Element {
  return (
    <footer className='mt-12 bg-gray-50 dark:bg-gray-900'>
      <Container className='py-12'>
        <Link href={{ pathname: '/' }}>
          <a className='cursor-pointer inline-block'>
            <DeFiChainLogo className='w-28 h-full' />
          </a>
        </Link>
        <div className='mt-4 flex flex-wrap lg:flex-nowrap'>
          <div className='py-4 flex-grow max-w-sm'>
            <FooterSectionSitemap />
          </div>

          <div className='py-4 flex-grow max-w-sm'>
            <FooterSectionSocial />
          </div>

          <div className='flex-grow' />

          <div className='py-4 self-end'>
            <FooterSectionAbout />
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterSectionSocial (): JSX.Element {
  function FooterSocialRow (props: PropsWithChildren<{ url: string, text: string, testId: string }>): JSX.Element {
    return (
      <div className='flex flex-row space-x-2 py-2 items-center w-1/2 dark:text-dark-gray-900 hover:text-primary'>
        {props.children}
        <FooterExternalLink url={props.url} text={props.text} testId={props.testId} />
      </div>
    )
  }

  return (
    <section data-testid='FooterSectionSocial'>
      <h3 className='text-2xl font-semibold dark:text-dark-gray-900' data-testid='FooterSectionSocial.Header'>Social</h3>
      <div className='flex flex-wrap mt-3' data-testid='FooterSectionSocial.div'>
        <FooterSocialRow url='https://twitter.com/defichain' text='Twitter' testId='FooterSectionSocial.Twitter'>
          <FaTwitterSquare size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://github.com/DeFiCh' text='GitHub' testId='FooterSectionSocial.Github'>
          <FaGithub size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://www.youtube.com/DeFiChain' text='YouTube' testId='FooterSectionSocial.YouTube'>
          <FaYoutube size={24} />
        </FooterSocialRow>
        <FooterSocialRow
          url='https://www.linkedin.com/company/defichain' text='LinkedIn'
          testId='FooterSectionSocial.LinkedIn'
        >
          <FaLinkedin size={24} />
        </FooterSocialRow>
        <FooterSocialRow
          url='https://www.reddit.com/r/defiblockchain/' text='Reddit'
          testId='FooterSectionSocial.Reddit'
        >
          <FaReddit size={24} />
        </FooterSocialRow>
        <FooterSocialRow
          url='https://www.facebook.com/defichain.official' text='Facebook'
          testId='FooterSectionSocial.Facebook'
        >
          <FaFacebook size={24} />
        </FooterSocialRow>
        <FooterSocialRow url='https://t.me/defiblockchain' text='Telegram' testId='FooterSectionSocial.Telegram'>
          <FaTelegram size={24} />
        </FooterSocialRow>
        <FooterSocialRow
          url='https://discord.com/invite/py55egyaGy' text='Discord'
          testId='FooterSectionSocial.Discord'
        >
          <FaDiscord size={24} />
        </FooterSocialRow>
      </div>
    </section>
  )
}

function FooterSectionSitemap (): JSX.Element {
  return (
    <section data-testid='FooterSectionSitemap'>
      <h3 className='text-2xl font-semibold dark:text-dark-gray-900' data-testid='FooterSectionSitemap.Header'>Scan</h3>
      <div className='flex flex-wrap mt-3' data-testid='FooterSectionSitemap.div'>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/dex' text='DEX' testId='FooterSectionSitemap.Dex' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/blocks' text='Blocks' testId='FooterSectionSitemap.Blocks' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/vaults' text='Vaults' testId='FooterSectionSitemap.Vaults' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/auctions' text='Auctions' testId='FooterSectionSitemap.Auctions' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/oracles' text='Oracles' testId='FooterSectionSitemap.Oracles' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink pathname='/tokens' text='Tokens' testId='FooterSectionSitemap.Tokens' />
        </div>
        <div className='space-x-2 py-2 w-1/2'>
          <FooterInternalLink
            pathname='/masternodes' text='Masternodes'
            testId='FooterSectionSitemap.Masternodes'
          />
        </div>
      </div>
    </section>
  )
}

function FooterSectionAbout (): JSX.Element {
  const {
    net
  } = useSelector((state: RootState) => state.stats)

  function NetworkStatus (): JSX.Element {
    return (
      <div className='p-3 bg-white shadow-md rounded-lg text-sm'>
        <div className='text-gray-900 dark:text-gray-400  grid grid-cols-2 grid'>
          <span>Protocol</span>
          <span className='font-medium ml-2'>{net.protocolversion}</span>
        </div>
        <div className='text-gray-900 dark:text-gray-400 grid grid-cols-2'>
          <span>Version</span>
          <span className='font-medium ml-2'>{net.version}</span>
        </div>
      </div>
    )
  }

  return (
    <section className='max-w-md' data-testid='FooterSectionAbout'>
      <div className='text-sm text-gray-500 dark:text-gray-400'>
        <span data-testid='FooterSectionAbout.Desc'>
          DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength
          and immutability. It's a blockchain dedicated to fast, intelligent and transparent financial services,
          accessible by everyone. For more info, visit
        </span>
        <a
          className='ml-1 text-blue-500 cursor-pointer' href='https://defichain.com' target='_blank'
          rel='noreferrer' data-testid='FooterSectionAbout.DFCLink'
        >
          DeFiChain.com
        </a>
      </div>
      <div className='mt-3 -mx-2 flex flex-wrap'>
        <div className='px-2'>
          <FooterTinyLink
            url='https://defichain.com/white-paper/' text='White Paper'
            testId='FooterSectionAbout.WhitePaperLink'
          />
        </div>
        <div className='px-2'>
          <FooterTinyLink
            url='https://defichain.com/privacy-policy/' text='Privacy Policy'
            testId='FooterSectionAbout.PrivacyPolicyLink'
          />
        </div>
      </div>

      <div className='mt-6 flex justify-between'>
        <a href='https://www.netlify.com' target='_blank' rel='nofollow noopener noreferrer' className='inline-block'>
          <NetlifyLightLogo className='bg-white fill-[#313D3E] dark:bg-gray-700 dark:fill-white rounded' />
        </a>

        {net !== undefined && (
          <HoverPopover popover={<NetworkStatus />} placement='top' className='inline-block float-right'>
            <div className='text-sm bg-white text-gray-900 p-2 dark:bg-dark-gray-200 dark:text-dark-gray-900 rounded cursor-help'>
              <span className='font-medium'>{net.subversion?.replaceAll('/', '').replace(':', ' Node v')}</span>
            </div>
          </HoverPopover>
        )}
      </div>
    </section>
  )
}

function FooterTinyLink (props: { text: string, url: string, testId: string }): JSX.Element {
  return (
    <a
      className='text-xs text-gray-700 font-semibold hover:text-primary-500 dark:text-dark-gray-900 dark:hover:text-primary-500 cursor-pointer'
      href={props.url}
      target='_blank' rel='noreferrer'
      data-testid={props.testId}
    >
      {props.text}
    </a>
  )
}

function FooterInternalLink (props: { text: string, pathname: string, testId: string }): JSX.Element {
  return (
    <div className='text-lg hover:text-primary-500 cursor-pointer dark:text-dark-gray-900 dark:hover:text-primary-500'>
      <Link href={{ pathname: props.pathname }}>
        <a data-testid={props.testId}>{props.text}</a>
      </Link>
    </div>
  )
}

function FooterExternalLink (props: { text: string, url: string, testId: string }): JSX.Element {
  return (
    <div className='text-lg hover:text-primary-500 cursor-pointer'>
      <a href={props.url} target='_blank' rel='noreferrer' data-testid={props.testId}>
        {props.text}
      </a>
    </div>
  )
}
