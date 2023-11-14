context("/vaults/[vaultid] on desktop", () => {
  beforeEach(() => {
    cy.visit("/vaults");

    cy.findAllByTestId("VaultRow.VaultStatus").each(($status) => {
      if ($status === null) {
        throw new Error("Unable to locate Vault Status");
      }

      if ($status.text().match("ACTIVE") != null) {
        $status.trigger("click");
      }
    });

    cy.viewport("macbook-16");
  });

  it("should have <BreadCrumbs />", () => {
    cy.findByTestId("Breadcrumb")
      .should("have.length", 1)
      .should("contain.text", "Scan")
      .should("contain.text", "Vaults");
  });

  it("should have page header", () => {
    cy.findByTestId("PageHeading").should("contain.text", "Vault ID");
    cy.findByTestId("VaultIdHeading.VaultStatus").should("be.visible");
    cy.findByTestId("VaultIdHeading.vaultId").should("be.visible");
  });

  describe("should Vault Details", () => {
    it("should Vault Details Heading", () => {
      cy.findByTestId("VaultDetailsDesktop.Heading").should(
        "have.text",
        "Vault Details"
      );
    });

    it("should have OverflowTable header information", () => {
      cy.findByTestId("VaultDetailsDesktop.OwnerAddress")
        .should("be.visible")
        .should("have.text", "Owner's Address");

      cy.findByTestId("VaultDetailsDesktop.TotalLoanValue")
        .should("be.visible")
        .should("have.text", "Total Loan Value (USD)");
      cy.findByTestId("VaultDetailsDesktop.TotalLoanValue").within(() => {
        cy.findByTestId("InfoHoverPopover").should("be.visible");
      });

      cy.findByTestId("VaultDetailsDesktop.TotalCollateralValue")
        .should("be.visible")
        .should("have.text", "Total Collateral Value (USD)");
      cy.findByTestId("VaultDetailsDesktop.TotalCollateralValue").within(() => {
        cy.findByTestId("InfoHoverPopover").should("be.visible");
      });

      cy.findByTestId("VaultDetailsDesktop.VaultInterestRate")
        .should("be.visible")
        .should("have.text", "Vault Interest Rate (APR)");
      cy.findByTestId("VaultDetailsDesktop.VaultInterestRate").within(() => {
        cy.findByTestId("InfoHoverPopover").should("be.visible");
      });
    });

    it("should have 4 cells in each row", () => {
      cy.findAllByTestId("OverflowTable.Row").each(($el) => {
        cy.wrap($el).within(() => {
          cy.findAllByTestId("OverflowTable.Cell")
            .should("have.length", 4)
            .should("be.visible");
        });
      });
    });

    it("should have health bar", () => {
      cy.findAllByTestId("VaultDetailsDesktop").within(() => {
        cy.findByTestId("VaultHealthBar.CollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.MinCollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.NextCollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.BarProgress").should("be.visible");
        cy.findByTestId("VaultHealthBar.CurrentLine").should("be.visible");
        cy.findByTestId("VaultHealthBar.NextLine").should("be.visible");
        cy.findByTestId("VaultHealthBar.CollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.ColorScale").should("be.visible");
      });
    });
  });

  describe("should Collateral Details", () => {
    it("should Collateral Details Heading", () => {
      cy.findByTestId("CollateralDetailsDesktop.Heading").should(
        "have.text",
        "Collateral Details"
      );
    });

    it("should have collateral details card", () => {
      cy.findByTestId("CollateralDetailsDesktop.Cards").within(() => {
        cy.findAllByTestId("CollateralCard").each(($el) => {
          cy.wrap($el).within(() => {
            cy.findByTestId("CollateralCard.AssetIcon").should("be.visible");
            cy.findByTestId("CollateralCard.displaySymbol").should(
              "be.visible"
            );
            cy.findByTestId("CollateralCard.displaySymbol").should(
              "be.visible"
            );
            cy.findByTestId("CollateralCard.CollateralAmountTitle").should(
              "be.visible"
            );
            cy.findByTestId("CollateralCard.CollateralAmount").should(
              "be.visible"
            );
          });
        });
      });
    });

    describe("should Loan Details", () => {
      it("should Loan Details Heading", () => {
        cy.findByTestId("VaultLoansDesktop.Heading").should(
          "have.text",
          "Loan Details"
        );
      });

      it("should OverflowTable Header Information", () => {
        cy.findByTestId("VaultLoansDesktop.LoanToken")
          .should("be.visible")
          .should("have.text", "Loan Token");
        cy.findByTestId("VaultLoansDesktop.LoanValue")
          .should("be.visible")
          .should("have.text", "Loan Value (USD)");
        cy.findByTestId("VaultLoansDesktop.LoanAmount")
          .should("be.visible")
          .should("have.text", "Loan Amount");
        cy.findByTestId("VaultLoansDesktop.TotalInterestRate")
          .should("be.visible")
          .should("have.text", "Total Interest Rate (APR)");
        cy.findByTestId("VaultLoansDesktop.TotalInterestRate").within(() => {
          cy.findByTestId("InfoHoverPopover").should("be.visible");
        });
      });

      it("should have 4 cells in each row", () => {
        cy.findByTestId("VaultLoansDesktop").within(() => {
          cy.findAllByTestId("OverflowTable.Row").each(($el) => {
            cy.wrap($el).within(() => {
              cy.findAllByTestId("OverflowTable.Cell")
                .should("have.length", 4)
                .should("be.visible");
            });
          });
        });
      });
    });
  });
});

context("/vaults/[vaultid] on mobile", () => {
  beforeEach(() => {
    cy.visit("/vaults");

    cy.findAllByTestId("VaultRow.VaultStatus").each(($status) => {
      if ($status === null) {
        throw new Error("Unable to locate Vault Status");
      }

      if ($status.text().match("ACTIVE") != null) {
        $status.trigger("click");
      }
    });

    cy.viewport("iphone-x");
  });

  it("should have <BreadCrums />", () => {
    cy.findByTestId("Breadcrumb")
      .should("have.length", 1)
      .should("contain.text", "Scan")
      .should("contain.text", "Vaults");
  });

  it("should have page header", () => {
    cy.findByTestId("PageHeading").should("contain.text", "Vault ID");
    cy.findByTestId("VaultIdHeading.VaultStatus").should("be.visible");
    cy.findByTestId("VaultIdHeading.vaultId").should("be.visible");
  });

  describe("should Vault Details", () => {
    it("should Vault Details Heading", () => {
      cy.findByTestId("VaultCollapsibleSection.VaultIdDetails").within(() => {
        cy.findByTestId("CollapsibleSection.Heading").should(
          "have.text",
          "Vault Details"
        );
      });
    });

    it("should have Vault Details", () => {
      cy.findByTestId("VaultDetailList.OwnerAddress").should("be.visible");
      cy.findByTestId("VaultDetailList.TotalLoanValue").should("be.visible");
      cy.findByTestId("VaultDetailList.TotalCollateralValue").should(
        "be.visible"
      );
      cy.findByTestId("VaultDetailList.VaultInterestRate").should("be.visible");
    });

    it("should have health bar", () => {
      cy.findAllByTestId("VaultDetailsMobile").within(() => {
        cy.findByTestId("VaultHealthBar.CollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.MinCollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.NextCollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.BarProgress").should("be.visible");
        cy.findByTestId("VaultHealthBar.CurrentLine").should("be.visible");
        cy.findByTestId("VaultHealthBar.NextLine").should("be.visible");
        cy.findByTestId("VaultHealthBar.CollateralizationRatio").should(
          "be.visible"
        );
        cy.findByTestId("VaultHealthBar.ColorScale").should("be.visible");
      });
    });
  });

  describe("should Collateral Details", () => {
    it("should Collateral Details Heading", () => {
      cy.findByTestId("VaultCollapsibleSection.CollateralDetails").within(
        () => {
          cy.findByTestId("CollapsibleSection.Heading").should(
            "have.text",
            "Collateral Details"
          );
        }
      );
    });

    it("should have collateral details card", () => {
      cy.findByTestId("CollateralDetailsMobile.Cards").within(() => {
        cy.findAllByTestId("CollateralCard").each(($el) => {
          cy.wrap($el).within(() => {
            cy.findByTestId("CollateralCard.AssetIcon").should("be.visible");
            cy.findByTestId("CollateralCard.displaySymbol").should(
              "be.visible"
            );
            cy.findByTestId("CollateralCard.CollateralAmountTitle").should(
              "be.visible"
            );
            cy.findByTestId("CollateralCard.CollateralAmount").should(
              "be.visible"
            );
          });
        });
      });
    });
  });

  describe("should Loan Details", () => {
    it("should Loan Details Heading", () => {
      cy.findByTestId("VaultCollapsibleSection.LoanDetails").within(() => {
        cy.findByTestId("CollapsibleSection.Heading").should(
          "have.text",
          "Loan Details"
        );
      });
    });

    it("should have loan details card", () => {
      cy.findAllByTestId("VaultCollapsibleSection.LoanDetails").each(($el) => {
        cy.wrap($el).within(() => {
          cy.findAllByTestId("LoanDetailsCard.AssetIcon").should("be.visible");
          cy.findAllByTestId("LoanDetailsCard.displaySymbol").should(
            "be.visible"
          );
          cy.findAllByTestId("LoanDetailsCard.LoanValue").should("be.visible");
          cy.findAllByTestId("LoanDetailsCard.LoanAmount").should("be.visible");
          cy.findAllByTestId("LoanDetailsCard.TotalInterestRate").should(
            "be.visible"
          );
        });
      });
    });
  });
});
