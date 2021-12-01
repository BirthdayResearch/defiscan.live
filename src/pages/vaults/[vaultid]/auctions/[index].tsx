import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import React from 'react'
import {
  LoanVaultLiquidationBatch,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'

interface ActionsPageProps {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
}

export default function VaultIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)
  const minStartingBid = new BigNumber(props.liquidationBatch.loan.amount).multipliedBy(1.05)
  let minStartingBidValue: BigNumber | undefined

  if (props.liquidationBatch.loan.activePrice?.active != null) {
    minStartingBidValue = new BigNumber(props.liquidationBatch.loan.activePrice.active.amount).multipliedBy(minStartingBid)
  }

  return (
    <>
      <Container className='pt-4 pb-20'>

        <Head title={`Vault #${props.vaultId}`} />
        <Breadcrumb items={[
          {
            path: '/vaults',
            name: 'Vaults'
          },
          {
            path: `/vaults/${props.vaultId}`,
            name: (<TextTruncate text={props.vaultId} />
            )
          },
          {
            path: `/vaults/${props.vaultId}`,
            name: 'Auctions'
          },
          {
            path: `/vaults/${props.vaultId}/auctions/${0}`,
            name: props.batchIndex,
            isCurrentPath: true
          }
        ]}
        />

        <div>
          <div className='mt-8 hidden md:block'>
            <div className='border border-gray-200 rounded-lg p-6 pb-2'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center'>
                  <LoanSymbol className='h-6 w-6' />
                  <span className='ml-1.5 font-medium text-gray-900'>{props.liquidationBatch.loan.displaySymbol}</span>
                </div>
                <div className='text-sm text-gray-500'>
                  {`BATCH #${props.batchIndex}`}
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full text-gray-500 text-sm'>Current Highest Bid</div>
                  <div>
                    {
                      props.liquidationBatch.highestBid === undefined ? (
                        <span>N/A</span>
                      )
                        : (
                          <>
                            <span>{new BigNumber(props.liquidationBatch.highestBid.amount.amount).toFixed(8)}</span>
                            <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                          </>
                          )
                    }
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full text-gray-500 text-sm'>Min. Starting Bid</div>
                  <div>
                    <div>
                      <span>{minStartingBid.toFixed(8)}</span>
                      <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                    </div>
                    <div className='text-sm text-gray-500'>
                      {
                        (minStartingBidValue != null) && (
                          <ReactNumberFormat
                            value={minStartingBidValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
                            displayType='text'
                            decimalScale={2}
                            prefix='$'
                            suffix=' USD'
                            fixedDecimalScale
                            thousandSeparator
                          />
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full text-sm text-gray-500'>
                    Vault ID
                  </div>
                  <TextTruncate text={props.vaultId} className='w-64' />
                </div>
              </div>
              <div className='flex items-start mt-4 pt-4 border-t border-gray-200'>
                <div className='text-xs text-gray-500'>
                  Collateral for Auction
                </div>
                <div className='flex flex-wrap'>
                  {
                    props.liquidationBatch.collaterals.map(collateral => (
                      <CollateralListItem collateral={collateral} key={collateral.id} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ActionsPageProps>> {
  const vaultid = context.params?.vaultid?.toString().trim() as string
  const batchIndex = context.params?.index?.toString().trim() as string

  try {
    const vault = await getWhaleApiClient(context).loan.getVault(vaultid)
    if (vault.state !== LoanVaultState.IN_LIQUIDATION) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        vaultId: vault.vaultId,
        batchIndex: batchIndex,
        liquidationBatch: vault.batches[batchIndex]
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}

function CollateralListItem (props: { collateral: LoanVaultTokenAmount }): JSX.Element {
  const CollateralSymbol = getAssetIcon(props.collateral.symbol)
  let collateralValue: BigNumber | undefined

  if (props.collateral.activePrice?.active != null) {
    const price = new BigNumber(props.collateral.activePrice.active.amount)
    collateralValue = price.multipliedBy(props.collateral.amount)
  }

  return (
    <div className='flex justify-between -px-10 mx-10 -pb-2 mb-2'>
      <div className='flex'>
        <CollateralSymbol className='h-6 w-6' />
      </div>
      <div className='ml-1.5'>
        <div>
          <ReactNumberFormat
            value={props.collateral.amount}
            displayType='text'
            suffix={` ${props.collateral.displaySymbol}`}
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
          />
        </div>
        <div className='text-sm text-gray-500 text-right'>
          {
            (collateralValue != null) && (
              <ReactNumberFormat
                value={collateralValue.toFixed(2, BigNumber.ROUND_HALF_UP)}
                displayType='text'
                decimalScale={2}
                prefix='$'
                suffix=' USD'
                fixedDecimalScale
                thousandSeparator
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
