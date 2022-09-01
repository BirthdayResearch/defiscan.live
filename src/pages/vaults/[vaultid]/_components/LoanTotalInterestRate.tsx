import { useWhaleApiClient } from "@contexts/WhaleContext";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { LoanToken } from "@defichain/whale-api-client/dist/api/loan";
import BigNumber from "bignumber.js";
import { VaultNumberValues } from "../../_components/commons/VaultNumberValues";

interface LoanTotalInterestRateProps {
  vaultInterest: string;
  loanId: string;
}

export function LoanTotalInterestRate(
  props: LoanTotalInterestRateProps
): JSX.Element {
  const api = useWhaleApiClient();
  const [loanTokenData, setLoanTokenData] = useState<LoanToken | undefined>(
    undefined
  );
  const [showTotalInterest, setShowTotalInterest] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowTotalInterest(true), 30000);

    api.loan
      .getLoanToken(props.loanId)
      .then((data) => {
        setLoanTokenData(data);
      })
      .catch(() => {
        setLoanTokenData(undefined);
        setShowTotalInterest(true);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  if (loanTokenData === undefined && !showTotalInterest) {
    return (
      <div
        className={classNames(
          "animate-pulse py-2.5 w-1/2 rounded-md bg-gray-200 inline"
        )}
      />
    );
  }

  if (loanTokenData === undefined || showTotalInterest) {
    return <>N/A</>;
  }

  const totalInterestRate = new BigNumber(props.vaultInterest).plus(
    new BigNumber(loanTokenData.interest)
  );

  return <VaultNumberValues value={totalInterestRate} suffix="%" />;
}
