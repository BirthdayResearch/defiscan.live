import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { Head } from '@components/commons/Head'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { CopyButton } from '@components/commons/CopyButton'
import { VaultStatus } from '@components/vaults/common/VaultStatus'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { FcInfo } from 'react-icons/fc'

export function VaultIdHeading (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
  return (
    <>
      <Head title={`Vault #${props.vault.vaultId}`} />
      <Breadcrumb items={[
        {
          path: '/vaults',
          name: 'Vaults'
        },
        {
          path: `/vaults/${props.vault.vaultId}`,
          name: (<TextMiddleTruncate text={props.vault.vaultId} textLength={6} />),
          isCurrentPath: true
        }
      ]}
      />

      {props.vault.state === LoanVaultState.FROZEN && (
        <div className='px-3 py-2 flex items-center max-w-max bg-blue-50 mt-8 rounded ring-2 ring-blue-200'>
          <FcInfo size={18} />
          <div className='ml-2 text-gray-600 text-sm'>
            The activity of this vault has been temporarily halted due to price volatility in the market. This vault will
            resume its activity once the market stabilizes.
          </div>
        </div>
      )}

      <div className='flex items-center pt-10'>
        <h2 data-testid='PageHeading' className='font-medium text-2xl block'>Vault ID</h2>
        <VaultStatus
          vault={props.vault} className='ml-4 px-2 py-1 inline-block text-xs'
          testId='VaultIdHeading.VaultStatus'
        />
      </div>
      <div className='flex items-center'>
        <div
          className='text-lg text-gray-500 font-medium break-all'
          data-testid='VaultIdHeading.vaultId'
        >{props.vault.vaultId}
        </div>
        <CopyButton className='ml-2' content={props.vault.vaultId} />
      </div>
    </>
  )
}
