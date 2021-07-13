import Link from "next/link";
import React from "react";
import DeFiChainLogo from "../../components/icons/DeFiChainLogo";

export default function Header (): JSX.Element {
  return (
    <header className={'bg-white'}>
      <div className={'border-b border-gray-100'}>
        <div className={'container mx-auto px-4 py-1'}>
          <div className={'flex items-center justify-between'}>
            <div>
              <div>
                <ul className={'text-xs'}>
                  <li>Blocks: <span className={'text-primary font-medium'}>999,999</span></li>
                </ul>
              </div>
            </div>
            <div>
              <button className={'text-xs font-medium bg-gray-100 px-2 py-1 rounded flex items-center'}>
                <div className={'bg-green-500 h-1.5 w-1.5 rounded-full'} />
                <div className={'ml-2'}>
                  MainNet
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={'border-b border-gray-100'}>
        <div className={'container mx-auto px-4 py-8'}>
          <div className={'flex items-center'}>
            <Link href={'/'}>
              <div className={'flex items-center'}>
                <DeFiChainLogo className={'w-16 h-full cursor-pointer'} />
                <h6 className={'ml-3 text-md font-semibold'}>Explorer</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
