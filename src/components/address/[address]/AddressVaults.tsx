import React, { useEffect, useState } from 'react'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { Head } from '@components/commons/Head'
import { VaultMobileCard } from '@components/vaults/VaultMobileCard'
import { calculateLiquidationValues } from '../../../utils/vaults/LiquidatedVaultDerivedValues'
import { EmptySection } from '@components/commons/sections/EmptySection'
import { ShowMoreButton } from '@components/commons/ShowMoreButton'
import { VaultTableDesktop } from '@components/vaults/common/VaultTableDesktop'

interface AddressVaultsProps {
  address: string
}

export function AddressVaults (props: AddressVaultsProps): JSX.Element {
  const api = useWhaleApiClient()
  const [vaultsData, setVaultsData] = useState<Array<(LoanVaultActive | LoanVaultLiquidated)>>([])
  const [next, setNext] = useState<string | undefined>(undefined)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)

  function getAddresseVaults (): void {
    setIsLoading(true)

    api.address.listVault(props.address, 10, next).then(data => {
      setVaultsData(vaultsData.concat([...data]))

      if (data.hasNext) {
        setNext(data.nextToken)
        setHasNext(true)
      } else {
        setNext(undefined)
        setHasNext(false)
      }
    }).catch(() => {
      setVaultsData([])
      setNext(undefined)
      setHasNext(false)
    }).finally(() => {
      setIsLoading(false)
      setIsInitialLoad(false)
    })
  }

  useEffect(() => {
    setVaultsData([])
    setNext(undefined)
    setHasNext(false)
    setIsInitialLoad(true)
  }, [props.address])

  useEffect(() => {
    if (isInitialLoad) {
      getAddresseVaults()
    }
  }, [isInitialLoad])

  return (
    <>
      <div className='pt-12'>
        <Head title='Vaults' />
        <h1 className='text-2xl font-medium' data-testid='Vaults.title'>Vaults</h1>
        <div className='my-6 hidden md:block' data-testid='Vaults.list'>
          {vaultsData.length === 0
            ? <EmptySection message='There are no vaults at this time' />
            : <VaultTableDesktop vaults={vaultsData} />}
        </div>

        <div className='my-6 md:hidden'>
          <div className='flex flex-wrap space-y-2'>
            {vaultsData.map(vault => {
              return (
                <VaultMobileCard
                  vault={vault}
                  liquidatedVaultDerivedValues={calculateLiquidationValues(vault)}
                  key={vault.vaultId}
                />
              )
            })}
          </div>
        </div>

        <div className='flex justify-end mt-8'>
          <ShowMoreButton
            isLoading={isLoading}
            testId='AddressVault.ShowMoreButton'
            hasNext={hasNext}
            handleClick={getAddresseVaults}
          />
        </div>
      </div>
    </>
  )
}
