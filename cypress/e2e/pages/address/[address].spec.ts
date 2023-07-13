context("/address/[address] on desktop", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit(
      "/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet"
    );
  });

  it("should have heading", () => {
    cy.findByTestId("AddressHeading.address").contains(
      "df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg"
    );
  });

  it("should have address summary", () => {
    cy.findByTestId("AddressSummaryTable.utxoBalance").contains(/\d+.\d+\sDFI/);
    cy.findByTestId("AddressSummaryTable.totalSent").contains(/\d+.\d+\sDFI/);
    cy.findByTestId("AddressSummaryTable.totalReceived").contains(
      /\d+.\d+\sDFI/
    );
    cy.findByTestId("AddressSummaryTable.txCount").contains(/\d+/);
  });

  it("should have Balances", () => {
    cy.findByTestId("Balances").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Balances"
      );

      cy.findAllByTestId("AddressTokenCard", { timeout: 30000 }).each(
        ($tokenCard) => {
          cy.wrap($tokenCard).within(() => {
            cy.findAllByTestId("AddressTokenCard.TokenSymbol").should(
              "be.visible"
            );
            cy.findByTestId("AddressTokenCard.TokenName").should("be.visible");
            cy.findByTestId("AddressTokenCard.Type")
              .should("be.visible")
              .contains(/^[A-Z]{3}$/);
            cy.findByTestId("AddressTokenCard.Amount")
              .should("be.visible")
              .contains(/\d+.\d+/);
          });
        }
      );

      cy.findAllByTestId("AddressTokenCard").should("have.length.at.least", 10);
    });
  });

  it("should have Vaults", () => {
    cy.findByTestId("Vaults").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Vaults"
      );

      it("should have Vaults OverflowTable", () => {
        it("should have OverflowTable header information", () => {
          cy.findByTestId("VaultsTable.VaultID")
            .should("be.visible")
            .should("have.text", "Vault ID");

          cy.findByTestId("VaultsTable.Status")
            .should("be.visible")
            .should("have.text", "Status");
          cy.findByTestId("VaultsTable.Status").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.Loans")
            .should("be.visible")
            .should("have.text", "Loan Taken");

          cy.findByTestId("VaultsTable.LoansValue")
            .should("be.visible")
            .should("have.text", "Loan Value (USD)");
          cy.findByTestId("VaultsTable.LoansValue").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.Collaterals")
            .should("be.visible")
            .should("have.text", "Collaterals");

          cy.findByTestId("VaultsTable.CollateralValue")
            .should("be.visible")
            .should("have.text", "Collateral Value (USD)");
          cy.findByTestId("VaultsTable.CollateralValue").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.CollateralizationRatios")
            .should("be.visible")
            .should("have.text", "Collateralization Ratio / Min.");
          cy.findByTestId("VaultsTable.CollateralizationRatios").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });
        });

        it("should have 8 cells in each row", () => {
          cy.findAllByTestId("OverflowTable.Row").within(() => {
            cy.findAllByTestId("OverflowTable.Cell")
              .should("have.length", 7)
              .should("be.visible");
          });
        });
      });

      it("should have Show More button", () => {
        cy.findByTestId("AddressTransactionTable.showMoreBtn").should(
          "have.text",
          "SHOW MORE"
        );
        cy.findByTestId("AddressTransactionTable.showMoreBtn").click();
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 20);
      });
    });
  });

  it("should have Transactions", () => {
    cy.findByTestId("Transactions").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Transactions"
      );

      it("should have Transactions OverflowTable", () => {
        cy.findByTestId("OverflowTable.Header").then((ele) => {
          cy.wrap(ele).findByText("TX ID").should("be.visible");
          cy.wrap(ele).findByText("BLOCK").should("be.visible");
          cy.wrap(ele).findByText("AGE").should("be.visible");
          cy.wrap(ele).findByText("AMOUNT").should("be.visible");
        });
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 10);
      });

      it("should have Show More button", () => {
        cy.findByTestId("AddressTransactionTable.showMoreBtn").should(
          "have.text",
          "SHOW MORE"
        );
        cy.findByTestId("AddressTransactionTable.showMoreBtn").click();
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 20);
      });
    });
  });
});

context("/address/[address] on desktop - invalid address", () => {
  beforeEach(() => {
    cy.visit(
      "/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet"
    );
    cy.viewport("macbook-16");
  });

  it("should have warning banner", () => {
    cy.findByTestId("AddressHeading.AddressNotFoundHeading").should(
      "have.text",
      "The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found."
    );
  });
});

context("/address/[address] on mobile", () => {
  beforeEach(() => {
    cy.visit(
      "/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet"
    );
    cy.viewport("iphone-x");
  });

  it("should have heading", () => {
    cy.findByTestId("AddressHeading.address").contains(
      "df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg"
    );
  });

  it("should have address summary", () => {
    cy.findByTestId("AddressSummaryTable.utxoBalance").contains(/\d+.\d+\sDFI/);
    cy.findByTestId("AddressSummaryTable.totalSent").contains(/\d+.\d+\sDFI/);
    cy.findByTestId("AddressSummaryTable.totalReceived").contains(
      /\d+.\d+\sDFI/
    );
    cy.findByTestId("AddressSummaryTable.txCount").contains(/\d+/);
  });

  it("should have Balances", () => {
    cy.findByTestId("Balances").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Balances"
      );

      cy.findAllByTestId("AddressTokenCard", { timeout: 30000 }).each(
        ($tokenCard) => {
          cy.wrap($tokenCard).within(() => {
            cy.findAllByTestId("AddressTokenCard.TokenSymbol").should(
              "be.visible"
            );
            cy.findByTestId("AddressTokenCard.TokenName").should("be.visible");
            cy.findByTestId("AddressTokenCard.Type")
              .should("be.visible")
              .contains(/^[A-Z]{3}$/);
            cy.findByTestId("AddressTokenCard.Amount")
              .should("be.visible")
              .contains(/\d+.\d+/);
          });
        }
      );

      cy.findAllByTestId("AddressTokenCard").should("have.length.at.least", 10);
    });
  });

  it("should have Vaults", () => {
    cy.findByTestId("Vaults").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Vaults"
      );

      it("should have Vaults OverflowTable", () => {
        it("should have OverflowTable header information", () => {
          cy.findByTestId("VaultsTable.VaultID")
            .should("be.visible")
            .should("have.text", "Vault ID");

          cy.findByTestId("VaultsTable.Status")
            .should("be.visible")
            .should("have.text", "Status");
          cy.findByTestId("VaultsTable.Status").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.Loans")
            .should("be.visible")
            .should("have.text", "Loan Taken");

          cy.findByTestId("VaultsTable.LoansValue")
            .should("be.visible")
            .should("have.text", "Loan Value (USD)");
          cy.findByTestId("VaultsTable.LoansValue").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.Collaterals")
            .should("be.visible")
            .should("have.text", "Collaterals");

          cy.findByTestId("VaultsTable.CollateralValue")
            .should("be.visible")
            .should("have.text", "Collateral Value (USD)");
          cy.findByTestId("VaultsTable.CollateralValue").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });

          cy.findByTestId("VaultsTable.CollateralizationRatios")
            .should("be.visible")
            .should("have.text", "Collateralization Ratio / Min.");
          cy.findByTestId("VaultsTable.CollateralizationRatios").within(() => {
            cy.findByTestId("InfoHoverPopover").should("be.visible");
          });
        });

        it("should have 8 cells in each row", () => {
          cy.findAllByTestId("OverflowTable.Row").within(() => {
            cy.findAllByTestId("OverflowTable.Cell")
              .should("have.length", 7)
              .should("be.visible");
          });
        });
      });

      it("should have Show More button", () => {
        cy.findByTestId("AddressTransactionTable.showMoreBtn").should(
          "have.text",
          "SHOW MORE"
        );
        cy.findByTestId("AddressTransactionTable.showMoreBtn").click();
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 20);
      });
    });
  });

  it("should have Transactions", () => {
    cy.findByTestId("Transactions").within(() => {
      cy.findByTestId("CollapsibleSection.Heading").should(
        "have.text",
        "Transactions"
      );

      it("should have Transactions OverflowTable", () => {
        cy.findByTestId("OverflowTable.Header").then((ele) => {
          cy.wrap(ele).findByText("TX ID").should("be.visible");
          cy.wrap(ele).findByText("BLOCK").should("be.visible");
          cy.wrap(ele).findByText("AGE").should("be.visible");
          cy.wrap(ele).findByText("AMOUNT").should("be.visible");
        });
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 10);
      });

      it("should have Show More button", () => {
        cy.findByTestId("AddressTransactionTable.showMoreBtn").should(
          "have.text",
          "SHOW MORE"
        );
        cy.findByTestId("AddressTransactionTable.showMoreBtn").click();
        cy.findAllByTestId("OverflowTable.Row").should("have.length", 20);
      });
    });
  });
});

context("/address/[address] on mobile - invalid address", () => {
  beforeEach(() => {
    cy.visit(
      "/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet"
    );
    cy.viewport("iphone-x");
  });

  it("should have warning banner", () => {
    cy.findByTestId("AddressHeading.AddressNotFoundHeading").should(
      "have.text",
      "The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found."
    );
  });
});
