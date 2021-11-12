context('/vaults', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have OverflowTable header information', function () {
    cy.visit('/vaults?network=TestNet')

    cy.findByTestId('VaultsTable.VaultID').should('be.visible').should('have.text', 'Vault ID')

    cy.findByTestId('VaultsTable.Status').should('be.visible').should('have.text', 'Status')
    cy.findByTestId('VaultsTable.Status').within(() => {
      cy.findByTestId('InfoHoverPopover').should('be.visible')
    })

    cy.findByTestId('VaultsTable.LoansValue').should('be.visible').should('have.text', 'Loans Value (USD)')
    cy.findByTestId('VaultsTable.LoansValue').within(() => {
      cy.findByTestId('InfoHoverPopover').should('be.visible')
    })

    cy.findByTestId('VaultsTable.CollateralValue').should('be.visible').should('have.text', 'Collateral Value (USD)')
    cy.findByTestId('VaultsTable.CollateralValue').within(() => {
      cy.findByTestId('InfoHoverPopover').should('be.visible')
    })

    cy.findByTestId('VaultsTable.CollateralizationRatio').should('be.visible').should('have.text', 'Collateralization Ratio')
    cy.findByTestId('VaultsTable.CollateralizationRatio').within(() => {
      cy.findByTestId('InfoHoverPopover').should('be.visible')
    })
  })

  it('should have 5 cells in each row', function () {
    cy.findAllByTestId('OverflowTable.Row').within(() => {
      cy.findAllByTestId('OverflowTable.Cell').should('have.length', 5).should('be.visible')
    })
  })
})

context('/vaults on mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should not have OverflowTable header information', function () {
    cy.visit('/vaults?network=TestNet')

    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Vault ID').should('not.be.visible')
      cy.wrap(ele).findByText('Status').should('not.be.visible')
      cy.wrap(ele).findByText('Loans Value (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('Collateral Value (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('Collateralization Ratio').should('not.be.visible')
    })

    it('should have vault mobile cards', function () {
      cy.findAllByTestId('VaultMobileCard').within(() => {
        cy.findByTestId('VaultMobileCard.VaultStatus').should('be.visible')
        cy.findByTestId('VaultMobileCard.VaultID').should('be.visible')
        cy.findByTestId('VaultMobileCard.Toggle').should('be.visible')
        cy.findByTestId('VaultMobileCard.Toggle').click()
        cy.findByTestId('VaultDetails.Loans').should('be.visible')
        cy.findByTestId('VaultDetails.LoansValue').should('be.visible')
        cy.findByTestId('VaultDetails.Collateral').should('be.visible')
        cy.findByTestId('VaultDetails.CollateralValue').should('be.visible')
        cy.findByTestId('VaultDetails.CollateralizationRatio').should('be.visible')
      })
    })
  })
})
