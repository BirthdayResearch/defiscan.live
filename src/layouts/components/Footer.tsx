import Link from 'next/link'
import DeFiChainLogo from "../../components/icons/DeFiChainLogo";

export default function Footer (): JSX.Element {
  return (
    <footer className={'mt-12'}>
      <div className={'container mx-auto px-4 py-12'}>
        <Link href={'/'}>
          <DeFiChainLogo className={'w-28 h-full cursor-pointer'} />
        </Link>

        <div className={'flex flex-wrap mt-4 -mx-8'}>
          <div className={'px-8 py-3 flex-grow'}>
            <div className={'text-2xl font-semibold'}>Explorer</div>

            <div className={'flex flex-wrap mt-3 -m-2 w-72'}>
              <FooterInternalLink href={'/blocks'} text={'Blocks'} />
              <FooterInternalLink href={'/dex'} text={'DEX'} />
              <FooterInternalLink href={'/prices'} text={'Prices'} />
              <FooterInternalLink href={'/tokens'} text={'Tokens'} />
              <FooterInternalLink href={'/masternodes'} text={'Masternodes'} />
            </div>
          </div>

          <div className={'px-8 py-3 max-w-lg'}>
            <p className={'text-sm text-gray-600'}>
              DeFi Blockchain’s primary vision is to enable decentralized finance with Bitcoin-grade security, strength
              and immutability. It's a blockchain dedicated to fast, intelligent and transparent financial services,
              accessible by everyone. For more info, visit <a className={'hover:text-primary cursor-pointer'}
                                                              href={'https://defichain.com'}
                                                              target={'_blank'}>DeFiChain.com</a>
            </p>

            <div className={'mt-3'}>
              <div className={'-mx-2'}>
                <FooterExternalLink href={'https://defichain.com/white-paper/'} text={'White Paper'} />
                <FooterExternalLink href={'https://defichain.com/privacy-policy/'} text={'Privacy Policy'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterExternalLink (props: { text: string, href: string }): JSX.Element {
  return (
    <a
      className={'p-2 text-xs text-gray-800 font-semibold hover:text-primary cursor-pointer'}
      href={props.href}
      target={'_blank'}
    >
      {props.text}
    </a>
  )
}

function FooterInternalLink (props: { text: string, href: string }): JSX.Element {
  return (
    <div className={'p-2 w-1/2 text-lg text-gray-700 hover:text-primary cursor-pointer'}>
      <Link href={props.href}>
        {props.text}
      </Link>
    </div>
  )
}
