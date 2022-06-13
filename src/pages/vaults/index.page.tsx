import { Head } from '@components/commons/Head'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import { LoanVaultActive, LoanVaultLiquidated } from '@defichain/whale-api-client/dist/api/loan'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { VaultMobileCard } from './_components/VaultMobileCard'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { calculateLiquidationValues } from './utils/LiquidatedVaultDerivedValues'
import { VaultStatsBar } from './_components/VaultStatsBar'
import { VaultTable } from './_components/commons/VaultTable'
import { EmptySection } from '@components/commons/sections/EmptySection'
import React from 'react'
import { CardList } from '@components/commons/CardList'

interface VaultsPageData {
  vaults: {
    items: Array<LoanVaultActive | LoanVaultLiquidated>
    pages: CursorPage[]
  }
}

export default function Vaults ({ vaults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title='Vaults' />

      <VaultStatsBar />
      <Container className='pt-12 pb-20'>
        <Head title='Vaults' />

        <h1 className='text-2xl font-medium dark:text-dark-gray-900'>Vaults</h1>

        <div className='my-6 hidden md:block'>
          {vaults.items.length === 0
            ? (<EmptySection message='There are no vaults at this time' />)
            : (<VaultTable items={vaults.items} />)}
        </div>

        <div className='my-6 md:hidden'>
          {vaults.items.length === 0
            ? (<EmptySection message='There are no vaults at this time' />)
            : (
              <CardList>
                {vaults.items.map(vault => {
                  return (
                    <VaultMobileCard
                      vault={vault} liquidatedVaultDerivedValues={calculateLiquidationValues(vault)}
                      key={vault.vaultId}
                    />
                  )
                })}
              </CardList>
              )}
        </div>

        <div className='flex justify-end mt-8'>
          <CursorPagination pages={vaults.pages} path='/vaults' />
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  try {
    const next = CursorPagination.getNext(context)
    const api = getWhaleApiClient(context)
    const vaults = await api.loan.listVault(30, next)

    return {
      props: {
        vaults: {
          items: vaults,
          pages: CursorPagination.getPages(context, vaults)
        }
      }
    }
  } catch
  (e) {
    return {
      notFound: true
    }
  }
}
