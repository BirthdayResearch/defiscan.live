import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { Head } from '@components/commons/Head'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { CopyButton } from '@components/commons/CopyButton'
import { VaultStatus } from '@components/vaults/VaultStatus'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'

export function VaultHeading (props: { vault: LoanVaultActive | LoanVaultLiquidated }): JSX.Element {
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

      <div className='flex items-center mt-10'>
        <h2 data-testid='PageHeading' className='font-medium text-2xl block'>Vault ID</h2>
        <VaultStatus
          vault={props.vault} className='ml-4 px-2 py-1 inline-block text-xs'
          testId={`VaultRow.${props.vault.vaultId}.VaultStatus`}
        />
      </div>
      <div className='flex items-center'>
        <div
          className='text-lg text-gray-500 font-medium break-all'
          data-testid='VaultHeading.vaultId'
        >{props.vault.vaultId}
        </div>
        <CopyButton className='ml-2' content={props.vault.vaultId} />
      </div>
    </>
  )
}
