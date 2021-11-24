import { Link } from '@components/commons/link/Link'
import {
  LoanVaultActive,
  LoanVaultLiquidated,
  LoanVaultState,
  LoanVaultTokenAmount
} from '@defichain/whale-api-client/dist/api/loan'
import { OverflowTable } from '@components/commons/OverflowTable'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import ReactNumberFormat from 'react-number-format'
import { VaultDetailsListItem } from '@components/vaults/common/VaultDetailsListItem'
import { VaultNumberValues } from '@components/vaults/common/VaultNumberValues'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { getAssetIcon } from '@components/icons/assets'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { Transition } from '@headlessui/react'
import { LoanTotalInterestRate } from '@components/vaults/[vaultid]/LoanTotalInterestRate'
import { calculateUsdValues } from '@components/vaults/[vaultid]/VaultIdLoansDetails'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import classNames from 'classnames'
import { AddressLink } from '@components/commons/link/AddressLink'

interface LoanStats {
  count?: {
    collateralTokens: number
    loanTokens: number
    openAuctions: number
    openVaults: number
    schemes: number
  }
  value?: {
    collateral: number
    loan: number
  }
}

export function VaultList ({ vaults }: { vaults: Array<LoanVaultActive | LoanVaultLiquidated> }): JSX.Element {
  return (
    <div className='mt-12' data-testid='VaultList'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold' data-testid='VaultList.title'>Decentralized Loans</h1>
        <Link href={{ pathname: '/vaults' }}>
          <a
            className='flex items-center font-medium cursor-pointer text-primary-500'
            data-testid='VaultList.viewVaults'
          >
            VIEW FULL DETAILS
          </a>
        </Link>
      </div>
      <VaultTable />
      <div
        className='mt-10 grid gap-1 lg:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      >
        {vaults.map(vault => {
          if (vault.state !== LoanVaultState.IN_LIQUIDATION) {
            return vault.loanAmounts.map(loan => {
              return (
                <VaultLoanDetailsCard
                  key={loan.id}
                  loan={loan}
                  interest={vault.interestAmounts.filter(interest => interest.id === loan.id)[0]}
                  vault={{
                    interest: vault.loanScheme.interestRate,
                    state: vault.state,
                    vaultId: vault.vaultId,
                    ownerAddress: vault.ownerAddress
                  }}
                />
              )
            }
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

function VaultTable (): JSX.Element {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <>
      <OverflowTable className='mt-6 hidden md:block'>
        <OverflowTable.Header>
          <OverflowTable.Head
            title='No. Of Vaults'
            sticky
          />
          <OverflowTable.Head
            title='Total Loan Taken (USD)'
            alignRight
          />
          <OverflowTable.Head
            title='Collateral Value (USD)'
            infoDesc='Collateral Value (USD)'
            alignRight
          />
          <OverflowTable.Head
            title='Avg. Collateralization Ratio (%)'
            infoDesc='Avg. Collateralization Ratio (%)'
            alignRight
          />
          <OverflowTable.Head
            title='DFI as Collateral (%)'
            infoDesc='DFI as Collateral (%)'
            alignRight
          />
        </OverflowTable.Header>
        <OverflowTable.Row>
          <OverflowTable.Cell>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.loan.count?.openVaults}
              decimalScale={2}
            />
          </OverflowTable.Cell>
          <OverflowTable.Cell alignRight>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.loan.value?.loan}
              decimalScale={0}
              prefix='$'
              suffix=' USD'
            />
          </OverflowTable.Cell>
          <OverflowTable.Cell alignRight>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value={stats.loan.value?.collateral}
              decimalScale={0}
              prefix='$'
              suffix=' USD'
            />
          </OverflowTable.Cell>
          <OverflowTable.Cell alignRight>
            {(() => {
              if (stats.loan.value?.collateral !== undefined && stats.loan.value.loan !== undefined) {
                return (
                  <ReactNumberFormat
                    displayType='text'
                    thousandSeparator
                    value={(stats.loan.value.collateral / stats.loan.value.loan) * 100}
                    decimalScale={0}
                    suffix=' %'
                  />
                )
              }
              return 'N/A'
            })()}
          </OverflowTable.Cell>
          <OverflowTable.Cell alignRight>
            <ReactNumberFormat
              displayType='text'
              thousandSeparator
              value='9000'
              decimalScale={0}
              prefix='$'
              suffix=' USD'
            />
          </OverflowTable.Cell>
        </OverflowTable.Row>
      </OverflowTable>
      <VaultTableMobile stat={stats.loan} />
    </>
  )
}

function VaultTableMobile ({ stat }: { stat: LoanStats }): JSX.Element {
  return (
    <div className='flex flex-col space-y-2 block md:hidden'>
      <VaultDetailsListItem
        title='No. Of Vaults'
        testId='VaultTable.TotalVaultCount'
      >
        <ReactNumberFormat
          displayType='text'
          thousandSeparator
          value={stat.count?.openVaults}
          decimalScale={2}
        />
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Total Loan Taken (USD)'
        testId='VaultTable.TotalLoanTaken'
      >
        {(() => {
          if (stat.value?.loan !== undefined) {
            return (
              <VaultNumberValues
                value={new BigNumber(stat.value.loan)}
                prefix='$'
                suffix=' USD'
              />
            )
          }
          return 'N/A'
        })()}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Collateral Value (USD)'
        testId='VaultTable.CollateralValue'
      >
        {(() => {
          if (stat.value?.collateral !== undefined) {
            return (
              <VaultNumberValues
                value={new BigNumber(stat.value.collateral)}
                prefix='$'
                suffix=' USD'
              />
            )
          }
          return 'N/A'
        })()}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='Avg. Collateralization Ratio'
        testId='VaultTable.CollateralRatio'
        infoDesc='Avg. Collateralization Ratio (%)'
      >
        {(() => {
          if (stat.value?.collateral !== undefined && stat.value.loan !== undefined) {
            return (
              <VaultNumberValues
                value={new BigNumber((stat.value.collateral / stat.value.loan) * 100)}
                suffix='%'
              />
            )
          }
          return 'N/A'
        })()}
      </VaultDetailsListItem>
      <VaultDetailsListItem
        title='DFI as Collateral (%)'
        infoDesc='DFI as Collateral (%)'
        testId='VaultTable.DfiCollateral'
      >
        <VaultNumberValues
          value={new BigNumber('900000')}
          suffix='%'
        />

      </VaultDetailsListItem>
    </div>
  )
}

function VaultLoanDetailsCard (props: {
  loan: LoanVaultTokenAmount
  interest: LoanVaultTokenAmount
  vault: {
    state: LoanVaultState
    interest: string
    vaultId: string
    ownerAddress: string
  }
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [loanUsdAmount, interestUsdAmount] = calculateUsdValues(props.loan, props.interest)

  return (
    <div
      className={classNames('mb-2 p-4 border border-gray-200 rounded w-full justify-self-center md:justify-self-stretch', isOpen && 'row-span-2')}
      data-testid='LoanDetailsCard'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <LoanSymbol className='h-6 w-6' data-testid='LoanDetailsCard.AssetIcon' />
          <span
            className='ml-1.5 font-medium text-gray-900'
            data-testid='LoanDetailsCard.displaySymbol'
          >{props.loan.displaySymbol}
          </span>
        </div>
        <div
          className='flex items-center text-primary-500 cursor-pointer' data-testid='LoanDetailsCard.Toggle'
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>
      <div className='w-full justify-between mt-10'>
        <VaultDetailsListItem
          title='Loan Value (USD)'
          testId='LoanDetailsCard.LoanValue'
          titleClassNames='text-sm'
        >
          {loanUsdAmount === undefined || interestUsdAmount === undefined
            ? ('N/A')
            : (
              <VaultNumberValues value={loanUsdAmount} prefix='$' />
              )}
        </VaultDetailsListItem>
      </div>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        <div className='w-full flex flex-col space-y-1.5 mt-1.5'>
          <VaultDetailsListItem
            title='Loan Amount'
            infoDesc='Loan Amount'
            testId='LoanDetailsCard.LoanAmount'
            titleClassNames='text-sm'
          >
            <ReactNumberFormat
              value={new BigNumber(props.loan.amount).toFixed(8)}
              displayType='text'
              decimalScale={8}
              fixedDecimalScale
              thousandSeparator
            />
          </VaultDetailsListItem>

          <VaultDetailsListItem
            title='Total Interest Rate (APR)'
            infoDesc='Total annual interest rate = Vault Interest Rate + Token Interest Rate.'
            testId='LoanDetailsCard.TotalInterestRate'
            titleClassNames='text-sm'
          >
            <LoanTotalInterestRate vaultInterest={props.vault.interest} loanId={props.interest.id} />
          </VaultDetailsListItem>
          <VaultDetailsListItem
            title='Vault Id'
            testId='LoanDetailsCard.VaultId'
            titleClassNames='text-sm'
          >
            <Link href={{ pathname: `/vaults/${props.vault.vaultId}` }}>
              <a className='contents'>
                <TextMiddleTruncate text={props.vault.vaultId} textLength={6} className='text-primary-500 hover:underline' />
              </a>
            </Link>
          </VaultDetailsListItem>
          <VaultDetailsListItem
            title={'Owner\'s Address'}
            titleClassNames='text-sm'
          >
            <AddressLink address={props.vault.ownerAddress} testId='LoanDetailsCard.OwnersAddress'>
              <TextMiddleTruncate text={props.vault.ownerAddress} textLength={6} />
            </AddressLink>
          </VaultDetailsListItem>
        </div>
      </Transition>
    </div>
  )
}
