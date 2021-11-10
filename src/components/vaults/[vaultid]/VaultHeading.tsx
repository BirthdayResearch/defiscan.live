import { LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { Head } from '@components/commons/Head'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { CopyButton } from '@components/commons/CopyButton'
import { VaultState } from '@components/vaults/[vaultid]/VaultState'

export function VaultHeading ({ vaultId, vaultState }: {vaultId: string, vaultState: LoanVaultState}): JSX.Element {
  return (
    <>
      <Head title={`Vault #${vaultId}`} />
      <Breadcrumb items={[
        { path: '/vaults', name: 'Vaults' },
        { path: '/vaults/1', name: '1' }
      ]}
      />

      <div className='flex items-center my-1 space-x-3 mt-5'>
        <h1 className='font-medium text-2xl mt-1'>Vault ID</h1>
        <VaultState state={vaultState} />
      </div>
      <div className='flex items-center my-1'>
        <div className='ml-1 text-lg break-all' data-testid='block-hash'>{vaultId}</div>
        <CopyButton className='ml-2' content={vaultId} />
      </div>
    </>
  )
}
