import { useWhaleApiClient } from "@contexts/WhaleContext";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { EmptySection } from "@components/commons/sections/EmptySection";
import {
  LoanVaultActive,
  LoanVaultLiquidated,
} from "@defichain/whale-api-client/dist/api/loan";
import { VaultMobileCard } from "../../vaults/_components/VaultMobileCard";
import { VaultTable } from "../../vaults/_components/commons/VaultTable";
import { calculateLiquidationValues } from "../../vaults/utils/LiquidatedVaultDerivedValues";
import { ShowMoreButton } from "./ShowMoreButton";

interface AddressVaultsProps {
  address: string;
}

export function AddressVaults(props: AddressVaultsProps): JSX.Element {
  const api = useWhaleApiClient();
  const [vaultsData, setVaultsData] = useState<
    Array<LoanVaultActive | LoanVaultLiquidated>
  >([]);
  const [next, setNext] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  function getVaults(): void {
    setIsLoading(true);

    api.address
      .listVault(props.address, 10, next)
      .then((data) => {
        setVaultsData(vaultsData.concat([...data]));

        if (data.hasNext) {
          setNext(data.nextToken);
        } else {
          setNext(undefined);
        }
      })
      .catch(() => {
        setVaultsData([]);
        setNext(undefined);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      });
  }

  useEffect(() => {
    setVaultsData([]);
    setNext(undefined);
    setIsInitialLoad(true);
  }, [props.address]);

  useEffect(() => {
    if (isInitialLoad) {
      getVaults();
    }
  }, [isInitialLoad]);

  if (isInitialLoad) {
    return (
      <div className="flex flex-wrap">
        <div className="flex w-full h-40 items-center justify-center rounded p-4 border border-gray-100">
          <CgSpinner size={32} className="animate-spin text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block" data-testid="Vaults.list">
        {vaultsData.length === 0 ? (
          <EmptySection message="No Vaults" />
        ) : (
          <VaultTable items={vaultsData} />
        )}
      </div>

      <div className="md:hidden">
        {vaultsData.length === 0 ? (
          <EmptySection message="No Vaults" />
        ) : (
          <div className="flex flex-wrap space-y-2">
            {vaultsData.map((vault) => {
              return (
                <VaultMobileCard
                  vault={vault}
                  liquidatedVaultDerivedValues={calculateLiquidationValues(
                    vault
                  )}
                  key={vault.vaultId}
                />
              );
            })}
          </div>
        )}
      </div>

      <ShowMoreButton
        isLoading={isLoading}
        next={next}
        handleOnClick={getVaults}
      />
    </>
  );
}
