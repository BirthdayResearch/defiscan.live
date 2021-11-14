context('/vaults/[vaultid] on desktop', function () {
  before(() => {
    cy.visit('/vaults?network=TestNet')
    cy.findAllByTestId('OverflowTable.Row').within(() => {
      cy.findByTestId('VaultRow.VaultStatus').should('have.text', 'HEALTHY').click()
    })
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have <BreadCrumbs />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Vaults')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Vault ID')
    cy.findByTestId('VaultIdHeading.VaultStatus').should('be.visible')
    cy.findByTestId('VaultIdHeading.vaultId').should('be.visible')
  })

  it('should Vault Details', function () {
    it('should Vault Details Heading', function () {
      cy.findByTestId('VaultDetailsDesktop.Heading').should('have.text', 'Vault Details')
    })

    it('should have OverflowTable header information', function () {
      cy.findByTestId('VaultDetailsDesktop.OwnersId').should('be.visible').should('have.text', 'Owner ID')

      cy.findByTestId('VaultDetailsDesktop.TotalLoanValue').should('be.visible').should('have.text', 'Total Loan Value (USD)')
      // cy.findByTestId('VaultDetailsDesktop.TotalLoanValue').within(() => {
      //   cy.findByTestId('InfoHoverPopover').should('be.visible')
      // })

      cy.findByTestId('VaultDetailsDesktop.TotalCollateralValue').should('be.visible').should('have.text', 'Total Collateral Value (USD)')
      // cy.findByTestId('VaultDetailsDesktop.TotalCollateralValue').within(() => {
      //   cy.findByTestId('InfoHoverPopover').should('be.visible')
      // })

      cy.findByTestId('VaultDetailsDesktop.TotalCollateralRatio').should('be.visible').should('have.text', 'Total Collateral Ratio')
      // cy.findByTestId('VaultDetailsDesktop.TotalCollateralRatio').within(() => {
      //   cy.findByTestId('InfoHoverPopover').should('be.visible')
      // })

      cy.findByTestId('VaultDetailsDesktop.MinCollateralRatio').should('be.visible').should('have.text', 'Min Collateral Ratio')
      // cy.findByTestId('VaultDetailsDesktop.MinCollateralRatio').within(() => {
      //   cy.findByTestId('InfoHoverPopover').should('be.visible')
      // })

      cy.findByTestId('VaultDetailsDesktop.BaseInterestRatio').should('be.visible').should('have.text', 'Base Interest Ratio (APR)')
      // cy.findByTestId('VaultDetailsDesktop.BaseInterestRatio').within(() => {
      //   cy.findByTestId('InfoHoverPopover').should('be.visible')
      // })
    })

    it('should have 6 cells in each row', function () {
      cy.findAllByTestId('OverflowTable.Row').within(() => {
        cy.findAllByTestId('OverflowTable.Cell').should('have.length', 6).should('be.visible')
      })
    })
  })

  it('should Collateral Details', function () {
    it('should Collateral Details Heading', function () {
      cy.findByTestId('CollateralDetailsDesktop.Heading').should('have.text', 'Collateral Details')
    })

    it('should have collateral details card', function () {
      cy.findByTestId('CollateralDetailsDesktop.Cards').within(() => {
        cy.findAllByTestId('CollateralCard').within(() => {
          cy.findByTestId('CollateralCard.AssetIcon').should('be.visible')
          cy.findByTestId('CollateralCard.displaySymbol').should('be.visible')
          cy.findByTestId('CollateralCard.displaySymbol').should('be.visible')
          cy.findByTestId('CollateralCard.CollateralAmountTitle').should('be.visible')
          cy.findByTestId('CollateralCard.CollateralAmount').should('be.visible')
        })
      })
    })
  })

  it('should Loan Details', function () {
    it('should Loan Details Heading', function () {
      cy.findByTestId('VaultLoansDesktop.Heading').should('have.text', 'Loan Details')
    })

    it('should OverflowTable Header Information', function () {
      cy.findByTestId('VaultLoansDesktop.LoanToken').should('be.visible').should('have.text', 'Loan Token')
      cy.findByTestId('VaultLoansDesktop.LoanAmount').should('be.visible').should('have.text', 'Loan Amount')
    })

    it('should have 2 cells in each row', function () {
      cy.findByTestId('VaultLoansDesktop').within(() => {
        cy.findByTestId('OverflowTable.Row').within(() => {
          cy.findAllByTestId('OverflowTable.Cell').should('have.length', 2).should('be.visible')
        })
      })
    })
  })
})

context('/vaults/[vaultid] on mobile', function () {
  before(() => {
    cy.visit('/vaults?network=TestNet')
    cy.findAllByTestId('OverflowTable.Row').within(() => {
      cy.findByTestId('VaultRow.VaultStatus').should('have.text', 'HEALTHY').click()
    })
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have <BreadCrums />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Vaults')
  })

  it('should have page header', function () {
    cy.findByTestId('PageHeading').should('contain.text', 'Vault ID')
    cy.findByTestId('VaultIdHeading.VaultStatus').should('be.visible')
    cy.findByTestId('VaultIdHeading.vaultId').should('be.visible')
  })

  it('should Vault Details', function () {
    it('should Vault Details Heading', function () {
      cy.findByTestId('VaultCollapsibleSection.VaultIdDetails').within(() => {
        cy.findByTestId('VaultCollapsibleSection.Heading').should('have.text', 'Vault Details')
      })
    })

    it('should have Vault Details', function () {
      cy.findByTestId('VaultDetailList.OwnerID').should('be.visible')
      cy.findByTestId('VaultDetailList.TotalLoanValue').should('be.visible')
      cy.findByTestId('VaultDetailList.TotalCollateralValue').should('be.visible')
      cy.findByTestId('VaultDetailList.TotalCollateralRatio').should('be.visible')
      cy.findByTestId('VaultDetailList.MinCollateralRatio').should('be.visible')
      cy.findByTestId('VaultDetailList.BaseInterestRatio').should('be.visible')
    })
  })

  it('should Collateral Details', function () {
    it('should Collateral Details Heading', function () {
      cy.findByTestId('VaultCollapsibleSection.CollateralDetails').within(() => {
        cy.findByTestId('VaultCollapsibleSection.Heading').should('have.text', 'Collateral Details')
      })
    })

    it('should have collateral details card', function () {
      cy.findByTestId('CollateralDetailsDesktop.Cards').within(() => {
        cy.findAllByTestId('CollateralCard').within(() => {
          cy.findByTestId('CollateralCard.AssetIcon').should('be.visible')
          cy.findByTestId('CollateralCard.displaySymbol').should('be.visible')
          cy.findByTestId('CollateralCard.CollateralAmountTitle').should('be.visible')
          cy.findByTestId('CollateralCard.CollateralAmount').should('be.visible')
        })
      })
    })
  })

  it('should Loan Details', function () {
    it('should Loan Details Heading', function () {
      cy.findByTestId('VaultCollapsibleSection.LoanDetails').within(() => {
        cy.findByTestId('VaultCollapsibleSection.Heading').should('have.text', 'Loan Details')
      })
    })

    it('should have loan details card', function () {
      cy.findByTestId('VaultCollapsibleSection.LoanDetails').within(() => {
        cy.findAllByTestId('LoanDetailsCard').within(() => {
          cy.findByTestId('LoanDetailsCard.AssetIcon').should('be.visible')
          cy.findByTestId('LoanDetailsCard.displaySymbol').should('be.visible')
          cy.findByTestId('LoanDetailsCard.LoanAmountTitle').should('be.visible')
          cy.findByTestId('LoanDetailsCard.LoanAmount').should('be.visible')
        })
      })
    })
  })
})
