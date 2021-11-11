context('/vaults', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have OverflowTable header information', function () {
    cy.visit('/vaults?network=Local')

    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Vault ID').should('be.visible')
      cy.wrap(ele).findByText('Status').should('be.visible')
      cy.wrap(ele).findByText('Loans Value (USD)').should('be.visible')
      cy.wrap(ele).findByText('Collateral Value (USD)').should('be.visible')
      cy.wrap(ele).findByText('Collateral Ratio').should('be.visible')
    })
  })
})

context('/vaults on mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should not have OverflowTable header information', function () {
    cy.visit('/vaults?network=Local')

    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Vault ID').should('not.be.visible')
      cy.wrap(ele).findByText('Status').should('not.be.visible')
      cy.wrap(ele).findByText('Loans Value (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('Collateral Value (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('Collateral Ratio').should('not.be.visible')
    })
  })
})
