import { DepositToVault, DfTx } from '@defichain/jellyfish-transaction'
import { DfTxHeader } from '@components/transactions/[txid]/DfTx/DfTxHeader'
import { useNetwork } from '@contexts/NetworkContext'
import { fromScript } from '@defichain/jellyfish-address'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Link } from '@components/commons/link/Link'
import { AddressLink } from '@components/commons/link/AddressLink'
import { VaultLink } from '@components/commons/link/VaultLink'

interface DepositToVaultProps {
  dftx: DfTx<DepositToVault>
}
export function DfTxDepositToVault (props: DepositToVaultProps): JSX.Element {
  const network = useNetwork().name
  const address = fromScript(props.dftx.data.from, network)
  return (
    <div>
      <DfTxHeader name='Deposit To Vault' />
      <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Vault Id'>
            <VaultLink
              vault={props.dftx.data.vaultId}
              className='break-all'
              testId='DfTxDepositToVault.VaultId'
            />
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Address'>
            {(() => {
              if (address?.address !== undefined) {
                return (
                  <AddressLink
                    testId='DfTxDepositToVault.Address'
                    address={address.address}
                    className='break-all'
                  />
                )
              }
              return 'N/A'
            })()}
          </AdaptiveList.Row>
        </AdaptiveList>
        <AdaptiveList className='w-full lg:w-1/2'>
          <AdaptiveList.Row name='Token Id' testId='DfTxDepositToVault.Token'>
            <Link href={{ pathname: `/tokens/${props.dftx.data.tokenAmount.token}` }}>
              <a className='content text-primary-500 hover:underline'>
                {props.dftx.data.tokenAmount.token}
              </a>
            </Link>
          </AdaptiveList.Row>
          <AdaptiveList.Row name='Amount' testId='DfTxDepositToVault.Amount'>
            {props.dftx.data.tokenAmount.amount.toFixed(8)}
          </AdaptiveList.Row>
        </AdaptiveList>
      </div>
    </div>
  )
}
