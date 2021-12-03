import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'

import { Container } from '@components/commons/Container'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Head } from '@components/commons/Head'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import React from 'react'
import {
  LoanVaultLiquidated,
  LoanVaultLiquidationBatch,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import { getAssetIcon } from '@components/icons/assets'
import BigNumber from 'bignumber.js'
import ReactNumberFormat from 'react-number-format'
import { InfoHoverPopover } from '@components/commons/popover/InfoHoverPopover'
import { VaultLink } from '@components/commons/link/VaultLink'
import { useAuctionTimeLeft } from '../../../../hooks/useAuctionTimeLeft'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

interface ActionsPageProps {
  vault: LoanVaultLiquidated
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
}

export default function VaultIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const { timeRemaining } = useAuctionTimeLeft(props.vault.liquidationHeight, blocks ?? 0)

  const minStartingBid = new BigNumber(props.liquidationBatch.loan.amount).multipliedBy(1.05)
  let minStartingBidValue: BigNumber | undefined

  if (props.liquidationBatch.loan.activePrice?.active != null) {
    minStartingBidValue = new BigNumber(props.liquidationBatch.loan.activePrice.active.amount).multipliedBy(minStartingBid)
  }

  return (
    <>
      <Container className='pt-4 pb-20'>

        <Head title={`Vault #${props.vault.vaultId}`} />
        <Breadcrumb items={[
          {
            path: '/vaults',
            name: 'Vaults'
          },
          {
            path: `/vaults/${props.vault.vaultId}`,
            name: (<TextTruncate text={props.vault.vaultId} />
            )
          },
          {
            path: `/vaults/${props.vault.vaultId}`,
            name: 'Auctions'
          },
          {
            path: `/vaults/${props.vault.vaultId}/auctions/${0}`,
            name: props.batchIndex,
            isCurrentPath: true
          }
        ]}
        />

        <h2 className='text-xl font-semibold mt-8' data-testid='AuctionDetails.Heading'>
          Auction Details
        </h2>

        <DesktopAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          timeRemaining={timeRemaining}
          minStartingBid={{
            amount: minStartingBid,
            value: minStartingBidValue
          }}
        />

        <MobileAuctionDetails
          vaultId={props.vault.vaultId}
          batchIndex={props.batchIndex}
          liquidationBatch={props.liquidationBatch}
          timeRemaining={timeRemaining}
          minStartingBid={{
            amount: minStartingBid,
            value: minStartingBidValue
          }}
        />

        <BiddingHistory />
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
        vault: vault,
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

function DesktopAuctionDetails (props: {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
  timeRemaining: string | undefined
  minStartingBid: {
    amount: BigNumber
    value: BigNumber | undefined
  }
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 hidden md:block'>
      <div className='flex border border-gray-200 rounded-lg p-6'>
        <div className='flex items-center self-start mr-10'>
          <LoanSymbol className='h-8 w-8' />
          <span className='ml-1.5 font-medium text-gray-900'>{props.liquidationBatch.loan.displaySymbol}</span>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full flex flex-wrap -m-4'>
            <div className='flex flex-wrap w-1/2 lg:w-1/4 p-4'>
              <div className='w-full text-sm text-gray-500'>{`BATCH #${Number(props.batchIndex) + 1}`}</div>
              <div className='text-sm text-gray-500'>{props.timeRemaining ?? '0 hr 0 mins'} left</div>
            </div>
            <div className='w-1/2 lg:w-1/4 flex flex-wrap p-4'>
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
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap'>
              <div className='w-full text-gray-500 text-sm'>Min. Starting Bid</div>
              <div>
                <div>
                  <span>{props.minStartingBid.amount.toFixed(8)}</span>
                  <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
                </div>
                <div className='text-sm text-gray-500 text-right'>
                  {
                    (props.minStartingBid.value != null) && (
                      <ReactNumberFormat
                        value={props.minStartingBid.value.toFixed(2, BigNumber.ROUND_HALF_UP)}
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
            <div className='w-1/2 lg:w-1/4 p-4 flex flex-wrap'>
              <div className='w-full text-sm text-gray-500'>
                Vault ID
              </div>
              <VaultLink vault={props.vaultId} className='overflow-hidden overflow-ellipsis'>
                {props.vaultId}
              </VaultLink>
            </div>
          </div>
          <div className='w-full flex flex-wrap border-t mt-4'>
            <div className='text-sm text-gray-500 mt-4'>
              Collaterals for Auction
            </div>
            <div className='w-full flex flex-wrap mt-1 -my-2'>
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
  )
}

function MobileAuctionDetails (props: {
  vaultId: string
  batchIndex: string
  liquidationBatch: LoanVaultLiquidationBatch
  timeRemaining: string | undefined
  minStartingBid: {
    amount: BigNumber
    value: BigNumber | undefined
  }
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.liquidationBatch.loan.symbol)

  return (
    <div className='mt-8 md:hidden'>
      <div
        className='p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch'
        data-testid='VaultLoanDetailsCard'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <LoanSymbol className='h-6 w-6' />
            <span className='ml-1.5 font-medium text-gray-900'>{props.liquidationBatch.loan.displaySymbol}</span>
          </div>
        </div>

        <div className='items-center mt-2'>
          <div className='font-medium text-gray-500 text-xs'>{`BATCH #${Number(props.batchIndex) + 1}`}</div>
          <div className='text-sm text-gray-500'>{props.timeRemaining ?? '0 hr 0 mins'} left</div>
        </div>

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Current Highest Bid</span>
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

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Min. Starting Bid</span>
          <div>
            <div>
              <span>{props.minStartingBid.amount.toFixed(8)}</span>
              <span className='ml-1'>{props.liquidationBatch.loan.displaySymbol}</span>
            </div>
            <div className='text-sm text-gray-500 text-right'>
              {
                (props.minStartingBid.value != null) && (
                  <ReactNumberFormat
                    value={props.minStartingBid.value.toFixed(2, BigNumber.ROUND_HALF_UP)}
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

        <div className='flex justify-between mt-6'>
          <span className='text-gray-500 text-sm'>Vault ID</span>
          <VaultLink vault={props.vaultId}>
            <TextTruncate text={props.vaultId} />
          </VaultLink>
        </div>

        <div className='w-full mt-4 pt-4 flex flex-col border-t-2 border-gray-100'>
          <div className='flex items-center mb-2'>
            <span className='text-sm text-gray-500'>Collaterals for Auction</span>
            <InfoHoverPopover className='ml-1' description='The winning bidder will receive the tokens listed here.' />
          </div>
          {
            props.liquidationBatch.collaterals.map(collateral => (
              <CollateralListItem collateral={collateral} key={collateral.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function BiddingHistory (): JSX.Element {
  return (
    <>
      <h2 className='text-xl font-semibold mt-8' data-testid='BiddingHistory.Heading'>
        Bidding Details
      </h2>
      <div className='text-gray-400 flex w-full justify-center p-12'>
        Bidding history is not supported at this time
      </div>
    </>
  )
}

function CollateralListItem (props: { collateral: LoanVaultTokenAmount }): JSX.Element {
  const CollateralSymbol = getAssetIcon(props.collateral.symbol)
  let collateralValue: BigNumber | undefined

  if (props.collateral.activePrice?.active != null) {
    const price = new BigNumber(props.collateral.activePrice.active.amount)
    collateralValue = price.multipliedBy(props.collateral.amount)
  }

  return (
    <div className='w-1/2 lg:w-1/4 flex py-2 items-middle'>
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
