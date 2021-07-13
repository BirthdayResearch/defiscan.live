import Link from "next/link";
import { useEffect, useState } from "react";
import DeFiChainLogo from "../../components/icons/DeFiChainLogo";
import { getEnvironment } from "../contexts/api/Environment";
import { useNetworkContext } from "../contexts/NetworkContext";
import { useWhaleRpcClient } from "../contexts/WhaleContext";

export default function Header (): JSX.Element {
  const { network } = useNetworkContext()
  const rpc = useWhaleRpcClient()
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Temporary Implementation Example Only
    rpc.blockchain.getBlockchainInfo().then(({ blocks }) => {
      setCount(blocks)
    })
  }, [network]);

  return (
    <header className={'bg-white'}>
      <div className={'border-b border-gray-100'}>
        <div className={'container mx-auto px-4 py-1'}>
          <div className={'flex items-center justify-between'}>
            <div>
              <div>
                <ul className={'text-xs'}>
                  <li>Blocks: <span className={'text-primary font-medium'}>{count}</span></li>
                </ul>
              </div>
            </div>
            <div className={'flex items-center'}>
              <div className={'mr-3 text-sm font-medium'}>
                {getEnvironment().name}
              </div>
              <button className={'bg-gray-100 px-2 py-1.5 rounded flex items-center'}>
                <div className={'bg-green-500 h-1.5 w-1.5 rounded-full'} />
                <div className={'text-xs ml-2 font-semibold'}>
                  {network}
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
              <div className={'flex items-center cursor-pointer hover:text-primary'}>
                <DeFiChainLogo className={'w-16 h-full'} />
                <h6 className={'ml-3 text-md font-semibold'}>Explorer</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
