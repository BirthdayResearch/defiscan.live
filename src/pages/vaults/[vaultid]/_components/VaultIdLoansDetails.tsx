import {
  LoanVaultState,
  LoanVaultTokenAmount,
} from "@defichain/whale-api-client/dist/api/loan";
import { getAssetIcon } from "@components/icons/assets/tokens";
import { CollapsibleSection } from "@components/commons/sections/CollapsibleSection";
import { OverflowTable } from "@components/commons/OverflowTable";
import React from "react";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { EmptySection } from "@components/commons/sections/EmptySection";
import { CardList } from "@components/commons/CardList";
import { IconTooltip } from "@components/commons/IconsTooltip";
import { VaultNumberValues } from "../../_components/commons/VaultNumberValues";
import { LoanTotalInterestRate } from "./LoanTotalInterestRate";

interface VaultIdLoansDetailsProps {
  vault: {
    state: LoanVaultState;
    interest: string;
  };
  loans: LoanVaultTokenAmount[];
  interests: LoanVaultTokenAmount[];
}

export function VaultIdLoansDetails(
  props: VaultIdLoansDetailsProps
): JSX.Element {
  return (
    <>
      <div className="hidden md:block mt-10" data-testid="VaultLoansDesktop">
        <h2
          className="text-xl font-semibold dark:text-dark-gray-900"
          data-testid="VaultLoansDesktop.Heading"
        >
          Loan Details
        </h2>

        {props.loans.length === 0 ? (
          <EmptySection message="There are no loans taken in the vault at this time" />
        ) : (
          <OverflowTable className="mt-4">
            <OverflowTable.Header>
              <OverflowTable.Head
                title="Loan Token"
                testId="VaultLoansDesktop.LoanToken"
              />
              <OverflowTable.Head
                title="Loan Value (USD)"
                testId="VaultLoansDesktop.LoanValue"
                alignRight
              />
              <OverflowTable.Head
                title="Loan Amount"
                testId="VaultLoansDesktop.LoanAmount"
                alignRight
              />
              <OverflowTable.Head
                title="Total Interest Rate (APR)"
                infoDesc="Total annual interest rate = Vault Interest Rate + Token Interest Rate."
                testId="VaultLoansDesktop.TotalInterestRate"
                alignRight
              />
            </OverflowTable.Header>
            {props.loans.map((loan) => (
              <VaultLoansTableRow
                loan={loan}
                interest={
                  props.interests.filter(
                    (interest) => interest.id === loan.id
                  )[0]
                }
                vault={props.vault}
                key={loan.id}
              />
            ))}
          </OverflowTable>
        )}
      </div>

      <CollapsibleSection
        heading="Loan Details"
        className="block md:hidden"
        testId="VaultCollapsibleSection.LoanDetails"
      >
        {props.loans.length === 0 ? (
          <EmptySection message="There are no loans taken in the vault at this time" />
        ) : (
          <CardList>
            {props.loans.map((loan) => (
              <VaultLoanDetailsCard
                loan={loan}
                interest={
                  props.interests.filter(
                    (interest) => interest.id === loan.id
                  )[0]
                }
                vault={props.vault}
                key={loan.id}
              />
            ))}
          </CardList>
        )}
      </CollapsibleSection>
    </>
  );
}

function calculateUsdValues(
  loan: LoanVaultTokenAmount,
  interest: LoanVaultTokenAmount
): [BigNumber | undefined, BigNumber | undefined] {
  let loanUsdAmount =
    loan?.activePrice?.active != null
      ? new BigNumber(loan.activePrice.active.amount).multipliedBy(
          new BigNumber(loan.amount)
        )
      : undefined;
  let interestUsdAmount =
    loan?.activePrice?.active != null
      ? new BigNumber(loan.activePrice.active.amount).multipliedBy(
          new BigNumber(interest.amount)
        )
      : undefined;

  if (loan.symbol === "DUSD") {
    loanUsdAmount = new BigNumber(loan.amount);
    interestUsdAmount = new BigNumber(interest.amount);
  }

  return [loanUsdAmount, interestUsdAmount];
}

function VaultLoansTableRow(props: {
  loan: LoanVaultTokenAmount;
  interest: LoanVaultTokenAmount;
  vault: {
    state: LoanVaultState;
    interest: string;
  };
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol);
  const [loanUsdAmount, interestUsdAmount] = calculateUsdValues(
    props.loan,
    props.interest
  );

  return (
    <OverflowTable.Row
      className={classNames(
        props.vault.state === LoanVaultState.FROZEN
          ? "text-gray-200"
          : "text-gray-900 dark:text-gray-100"
      )}
    >
      <OverflowTable.Cell>
        <div className="flex items-center space-x-1">
          <LoanSymbol className="h-6 w-6" />
          <span>{props.loan.name}</span>
        </div>
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        {loanUsdAmount === undefined || interestUsdAmount === undefined ? (
          "N/A"
        ) : (
          <div className="flex justify-end items-center">
            <VaultNumberValues value={loanUsdAmount} prefix="$" />
            <IconTooltip />
          </div>
        )}
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <NumericFormat
          value={new BigNumber(props.loan.amount).toFixed(8)}
          displayType="text"
          decimalScale={8}
          fixedDecimalScale
          thousandSeparator
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell alignRight>
        <div className="flex justify-end">
          <LoanTotalInterestRate
            vaultInterest={props.vault.interest}
            loanId={props.interest.id}
          />
        </div>
      </OverflowTable.Cell>
    </OverflowTable.Row>
  );
}

function VaultLoanDetailsCard(props: {
  loan: LoanVaultTokenAmount;
  interest: LoanVaultTokenAmount;
  vault: {
    state: LoanVaultState;
    interest: string;
  };
}): JSX.Element {
  const LoanSymbol = getAssetIcon(props.loan.symbol);

  const [loanUsdAmount, interestUsdAmount] = calculateUsdValues(
    props.loan,
    props.interest
  );

  return (
    <CardList.Card testId="LoanDetailsCard">
      <CardList.Header>
        <LoanSymbol
          className="h-6 w-6"
          data-testid="LoanDetailsCard.AssetIcon"
        />
        <div
          className="ml-1.5 font-medium text-gray-900 dark:text-gray-100"
          data-testid="LoanDetailsCard.displaySymbol"
        >
          {props.loan.displaySymbol}
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title="Loan Value (USD)"
          testId="LoanDetailsCard.LoanValue"
          titleClassNames="text-sm"
        >
          {loanUsdAmount === undefined || interestUsdAmount === undefined ? (
            "N/A"
          ) : (
            <div className="flex justify-end items-center">
              <VaultNumberValues value={loanUsdAmount} prefix="$" />
              <IconTooltip />
            </div>
          )}
        </CardList.ListItem>

        <CardList.ListItem
          title="Loan Amount"
          testId="LoanDetailsCard.LoanAmount"
          titleClassNames="text-sm"
        >
          <NumericFormat
            value={new BigNumber(props.loan.amount).toFixed(8)}
            displayType="text"
            decimalScale={8}
            fixedDecimalScale
            thousandSeparator
          />
        </CardList.ListItem>

        <CardList.ListItem
          title="Total Interest Rate (APR)"
          infoDesc="Total annual interest rate = Vault Interest Rate + Token Interest Rate."
          testId="LoanDetailsCard.TotalInterestRate"
          titleClassNames="text-sm"
        >
          <LoanTotalInterestRate
            vaultInterest={props.vault.interest}
            loanId={props.interest.id}
          />
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  );
}
