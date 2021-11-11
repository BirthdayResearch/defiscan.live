import { Head } from '@components/commons/Head'
import { OverflowTable } from '@components/commons/OverflowTable'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Container } from '@components/commons/Container'
import NumberFormat from 'react-number-format'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
// import { getWhaleApiClient } from '@contexts/WhaleContext'
import { CursorPage, CursorPagination } from '@components/commons/CursorPagination'
import { VaultStatus } from '@components/vaults/VaultStatus'
import { VaultTokenSymbols } from '@components/vaults/VaultTokenSymbols'
import { VaultMobileCard } from '@components/vaults/VaultMobileCard'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import React from 'react'
import { Link } from '@components/commons/Link'
import { VaultCollateralRatio } from '@components/vaults/VaultCollateralRatio'

interface VaultsPageData {
  vaults: {
    items: Array<LoanVaultActive | LoanVaultLiquidated>
    pages: CursorPage[]
  }
}

export default function Vaults ({ vaults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Container className='pt-12 pb-20'>
      <Head title='Vaults' />

      <h1 className='text-2xl font-medium'>Vaults</h1>

      <div className='my-6 hidden md:block'>
        <OverflowTable>
          <OverflowTable.Header>
            <OverflowTable.Head sticky>Vault ID</OverflowTable.Head>
            <OverflowTable.Head>
              <div className='flex items-center'>
                Status
                <InfoHoverPopover className='ml-1' description={<VaultStatusInfo />} />
              </div>
            </OverflowTable.Head>
            <OverflowTable.Head alignRight>
              <div className='flex items-center justify-end text-left'>
                Loans Value (USD)
                <InfoHoverPopover className='ml-1' description='Loan token(s) and value (in USD) taken by a vault.' />
              </div>
            </OverflowTable.Head>
            <OverflowTable.Head alignRight>
              <div className='flex items-center justify-end text-left'>
                Collateral Value (USD)
                <InfoHoverPopover
                  className='ml-1'
                  description='Type and value of tokens deposited as collaterals in a vault.'
                />
              </div>
            </OverflowTable.Head>
            <OverflowTable.Head alignRight>
              <div className='flex items-center justify-end text-left'>
                Collateral Ratio
                <InfoHoverPopover
                  className='ml-1'
                  description='Percentage of collaterals deposited in a vault in relation to the amount of loan taken.'
                />
              </div>
            </OverflowTable.Head>
          </OverflowTable.Header>

          {vaults.items.map(vault => {
            if (vault.state === LoanVaultState.IN_LIQUIDATION) {
              return <LiquidatedVaultRow vault={vault} key={vault.vaultId} />
            }
            return <ActiveVaultRow vault={vault} key={vault.vaultId} />
          })}
        </OverflowTable>
      </div>

      <div className='my-6 md:hidden'>
        <div className='flex flex-wrap gap-y-2'>
          {vaults.items.map(vault => {
            return (
              <VaultMobileCard vault={vault} key={vault.vaultId} />
            )
          })}
        </div>
      </div>

      <div className='flex justify-end mt-8'>
        <CursorPagination pages={vaults.pages} path='/vaults' />
      </div>
    </Container>
  )
}

function ActiveVaultRow ({ vault }: { vault: LoanVaultActive }): JSX.Element {
  return (
    <Link href={{ pathname: `/vaults/${vault.vaultId}` }}>
      <OverflowTable.Row className='cursor-pointer'>
        <OverflowTable.Cell sticky>
          <TextMiddleTruncate
            textLength={6} text={vault.vaultId} className='text-primary-500 group-hover:underline'
            testId={`VaultRow.VaultID.${vault.vaultId}`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <VaultStatus
            vault={vault}
            className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${vault.vaultId}.VaultStatus`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${vault.vaultId}.LoansValue`}>
            <VaultTokenSymbols tokens={vault.loanAmounts} />
            <NumberFormat
              value={vault.loanValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <div className='flex gap-x-6 justify-end' data-testid={`VaultRow.${vault.vaultId}.CollateralValue`}>
            <VaultTokenSymbols tokens={vault.collateralAmounts} />
            <NumberFormat
              value={vault.collateralValue}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
            />
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <VaultCollateralRatio
            collateralRatio={vault.collateralRatio} loanScheme={vault.loanScheme}
            testId={`VaultRow.${vault.vaultId}.CollateralRatio`}
          />
        </OverflowTable.Cell>
      </OverflowTable.Row>
    </Link>
  )
}

function LiquidatedVaultRow ({ vault }: { vault: LoanVaultLiquidated }): JSX.Element {
  return (
    <Link href={{ pathname: `/vaults/${vault.vaultId}` }}>
      <OverflowTable.Row className='cursor-pointer'>
        <OverflowTable.Cell sticky>
          <TextMiddleTruncate
            textLength={6} text={vault.vaultId} className='text-primary-500 group-hover:underline'
            testId={`VaultRow.VaultID.${vault.vaultId}`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <VaultStatus
            vault={vault}
            className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${vault.vaultId}.VaultStatus`}
          />
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.LoansValue`}>N/A</span>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.CollateralValue`}>N/A</span>
        </OverflowTable.Cell>
        <OverflowTable.Cell alignRight>
          <span data-testid={`VaultRow.${vault.vaultId}.CollateralRatio`}>N/A</span>
        </OverflowTable.Cell>
      </OverflowTable.Row>
    </Link>
  )
}

function VaultStatusInfo (): JSX.Element {
  return (
    <div
      className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      A vault's status is determined by its collateral ratio:
      <br /><br />
      <span className='font-medium'>Active</span>: A vault that has been created but there are no loans
      taken yet.
      <br /><br />
      <span className='font-medium'>Healthy</span>: The vault's collateral ratio is sufficiently high.
      <br /><br />
      <span className='font-medium'>At Risk</span>: The vault is at risk of liquidation within the next
      hour.
      <br /><br />
      <span className='font-medium'>Liquidated</span>: The vault's collateral ratio has fallen below its
      minimum and is now in
      auction.
      <br /><br />
      <span className='font-medium'>Halted</span>: The price of one or more token in the vault has
      fluctuated more than 30% in the
      past hour.
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  if (context.query.network?.toString() !== 'Local') {
    return {
      notFound: true
    }
  }

  try {
    // const next = CursorPagination.getNext(context)
    // const api = getWhaleApiClient(context)
    // const vaults = await api.loan.listVault(10, next)

    const vaults: Array<LoanVaultActive | LoanVaultLiquidated> =
      [
        {
          vaultId: 'b57e9cfd8f4c8aaa267fd57f81074d8b38d2c5aff554841102414aedfbe89548',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.ACTIVE,
          collateralRatio: '226',
          collateralValue: '10000',
          informativeRatio: '16666.61600015',
          loanValue: '0',
          interestValue: '0',
          collateralAmounts: [],
          loanAmounts: [],
          interestAmounts: []
        },
        {
          vaultId: 'b57e9cfd8f4c8aaa267fd57f81074d8b38d2c5aff554841102414aedfbe89548',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.ACTIVE,
          collateralRatio: '226',
          collateralValue: '10000',
          informativeRatio: '16666.61600015',
          loanValue: '-1',
          interestValue: '0.0001824',
          collateralAmounts: [
            {
              amount: '10000.00000000',
              displaySymbol: 'DFI',
              id: '0',
              name: 'Default Defi token',
              symbol: 'DFI',
              symbolKey: 'DFI'
            }
          ],
          loanAmounts: [
            {
              amount: '30.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            }
          ],
          interestAmounts: [
            {
              amount: '0.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            }
          ]
        },
        {
          vaultId: 'b6832ecb6dad347d66ae9a481168eb4895933f43342d471ed5d5517d83d69798',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.FROZEN,
          collateralRatio: '76',
          collateralValue: '10000',
          informativeRatio: '16666.61600015',
          loanValue: '60.0001824',
          interestValue: '0.0001824',
          collateralAmounts: [
            {
              amount: '10000.00000000',
              displaySymbol: 'DFI',
              id: '0',
              name: 'Default Defi token',
              symbol: 'DFI',
              symbolKey: 'DFI'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dBTC',
              id: '0',
              name: 'Default Defi token',
              symbol: 'BTC',
              symbolKey: 'BTC'
            }
          ],
          loanAmounts: [
            {
              amount: '30.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dAAPL',
              id: '1',
              name: '',
              symbol: 'AAPL',
              symbolKey: 'AAPL'
            }
          ],
          interestAmounts: [
            {
              amount: '0.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            }
          ]
        },
        {
          vaultId: '2f9b79b4e60b51bb88e06807072a88d024de62325b6e52ac7ab325085bec379b',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.MAY_LIQUIDATE,
          collateralRatio: '0',
          collateralValue: '10000',
          informativeRatio: '16666.61600015',
          loanValue: '60.0001824',
          interestValue: '0.0001824',
          collateralAmounts: [
            {
              amount: '10000.00000000',
              displaySymbol: 'DFI',
              id: '0',
              name: 'Default Defi token',
              symbol: 'DFI',
              symbolKey: 'DFI'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dBTC',
              id: '0',
              name: 'Default Defi token',
              symbol: 'BTC',
              symbolKey: 'BTC'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dETH',
              id: '0',
              name: 'Default Defi token',
              symbol: 'ETH',
              symbolKey: 'ETH'
            }
          ],
          loanAmounts: [
            {
              amount: '30.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dAAPL',
              id: '1',
              name: '',
              symbol: 'AAPL',
              symbolKey: 'AAPL'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dUSDT',
              id: '1',
              name: '',
              symbol: 'USDT',
              symbolKey: 'USDT'
            }
          ],
          interestAmounts: [
            {
              amount: '0.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            }
          ]
        },
        {
          vaultId: 'b55f1d24f1a8a90738d74d238d01ab232bab50da44522a812b1dad486c7e0c5f',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.ACTIVE,
          collateralRatio: '500',
          collateralValue: '10000',
          informativeRatio: '16666.61600015',
          loanValue: '60.0001824',
          interestValue: '0.0001824',
          collateralAmounts: [
            {
              amount: '10000.00000000',
              displaySymbol: 'DFI',
              id: '0',
              name: 'Default Defi token',
              symbol: 'DFI',
              symbolKey: 'DFI'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dBTC',
              id: '0',
              name: 'Default Defi token',
              symbol: 'BTC',
              symbolKey: 'BTC'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dETH',
              id: '0',
              name: 'Default Defi token',
              symbol: 'ETH',
              symbolKey: 'ETH'
            },
            {
              amount: '10000.00000000',
              displaySymbol: 'dDOGE',
              id: '0',
              name: 'Default Defi token',
              symbol: 'DOGE',
              symbolKey: 'DOGE'
            }
          ],
          loanAmounts: [
            {
              amount: '30.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dAAPL',
              id: '1',
              name: '',
              symbol: 'AAPL',
              symbolKey: 'AAPL'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dUSDT',
              id: '1',
              name: '',
              symbol: 'USDT',
              symbolKey: 'USDT'
            },
            {
              amount: '30.00009120',
              displaySymbol: 'dTWTR',
              id: '1',
              name: '',
              symbol: 'TWTR',
              symbolKey: 'TWTR'
            }
          ],
          interestAmounts: [
            {
              amount: '0.00009120',
              displaySymbol: 'dTSLA',
              id: '1',
              name: '',
              symbol: 'TSLA',
              symbolKey: 'TSLA'
            }
          ]
        },
        {
          vaultId: 'b92d886570fe048eb8d36cb736871cafa594f38f4b3a1feee3034c60e8d087d0',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.IN_LIQUIDATION,
          liquidationHeight: 123333,
          liquidationPenalty: 123,
          batchCount: 2,
          batches: []
        },
        {
          vaultId: 'b9b3e6f9a325a8a33c06202401deb786ea9bd3a64b4d123a3730a7c921262ce7',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.IN_LIQUIDATION,
          liquidationHeight: 123333,
          liquidationPenalty: 123,
          batchCount: 2,
          batches: []
        },
        {
          vaultId: 'fc176f6d67ece8f840858c1ab5b80c6d94915c9cdb08cb6102b26ed165f7f85f',
          loanScheme: {
            id: '1',
            interestRate: '2.5',
            minColRatio: '150'
          },
          ownerAddress: 'kjlasd9780907231hjklAddress',
          state: LoanVaultState.IN_LIQUIDATION,
          liquidationHeight: 123333,
          liquidationPenalty: 123,
          batchCount: 2,
          batches: []
        }
      ]

    const pages: CursorPage[] = [{
      n: 1,
      active: true,
      cursors: ['test']
    }]

    return {
      props: {
        vaults: {
          items: vaults,
          // pages: CursorPagination.getPages(context, vaults)
          pages: pages
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
