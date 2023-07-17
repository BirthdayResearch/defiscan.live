context("/vaults", () => {
  beforeEach(() => {
    cy.visit("/vaults");
    cy.viewport("macbook-16");
  });

  it("should have Vaults Stat Bar", () => {
    cy.findByTestId("VaultStatsBar.Vaults").should("exist");
    cy.findByTestId("VaultStatsBar.TotalCollateralValue").should("exist");
    cy.findByTestId("VaultStatsBar.TotalLoanValue").should("exist");
    cy.findByTestId("VaultStatsBar.ActiveAuctions").should("exist");
  });

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
    cy.findAllByTestId("OverflowTable.Row").each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId("OverflowTable.Cell")
          .should("have.length", 7)
          .should("be.visible");
      });
    });
  });
});

context("/vaults on mobile", () => {
  beforeEach(() => {
    cy.visit("/vaults");
    cy.viewport("iphone-x");
  });

  it("should have Vaults Stat Bar", () => {
    cy.findByTestId("VaultStatsBar.Vaults").should("exist");
    cy.findByTestId("VaultStatsBar.TotalCollateralValue").should("exist");
    cy.findByTestId("VaultStatsBar.TotalLoanValue").should("exist");
    cy.findByTestId("VaultStatsBar.ActiveAuctions").should("exist");
  });

  it("should not have OverflowTable header information", () => {
    cy.findByTestId("OverflowTable.Header").then((ele) => {
      cy.wrap(ele).findByText("Vault ID").should("not.be.visible");
      cy.wrap(ele).findByText("Status").should("not.be.visible");
      cy.wrap(ele).findByText("Loan Taken").should("not.be.visible");
      cy.wrap(ele).findByText("Loan Value (USD)").should("not.be.visible");
      cy.wrap(ele).findByText("Collaterals").should("not.be.visible");
      cy.wrap(ele)
        .findByText("Collateral Value (USD)")
        .should("not.be.visible");
      cy.wrap(ele)
        .findByText("Collateralization Ratio / Min.")
        .should("not.be.visible");
    });

    it("should have vault mobile cards", () => {
      cy.findAllByTestId("VaultMobileCard").each(($el) => {
        cy.wrap($el).within(() => {
          cy.findByTestId("VaultMobileCard.VaultStatus").should("be.visible");
          cy.findByTestId("VaultMobileCard.VaultID").should("be.visible");
          cy.findByTestId("VaultMobileCard.Toggle").should("be.visible");
          cy.findByTestId("VaultMobileCard.Toggle").click();
          cy.findByTestId("VaultMobileCard.Loans").should("be.visible");
          cy.findByTestId("VaultMobileCard.LoansValue").should("be.visible");
          cy.findByTestId("VaultMobileCard.Collateral").should("be.visible");
          cy.findByTestId("VaultMobileCard.CollateralValue").should(
            "be.visible"
          );
          cy.findByTestId("VaultMobileCard.MinCollateralizationRatio").should(
            "be.visible"
          );
        });
      });
    });
  });
});
