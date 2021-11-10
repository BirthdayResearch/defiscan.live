context('/vaults', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have OverflowTable header information', function () {
    cy.visit('/vaults?network=Local')

    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('VAULT ID').should('be.visible')
      cy.wrap(ele).findByText('STATUS').should('be.visible')
      cy.wrap(ele).findByText('LOANS VALUE (USD)').should('be.visible')
      cy.wrap(ele).findByText('COLLATERAL VALUE (USD)').should('be.visible')
      cy.wrap(ele).findByText('COLLATERAL RATIO').should('be.visible')
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
      cy.wrap(ele).findByText('VAULT ID').should('not.be.visible')
      cy.wrap(ele).findByText('STATUS').should('not.be.visible')
      cy.wrap(ele).findByText('LOANS VALUE (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('COLLATERAL VALUE (USD)').should('not.be.visible')
      cy.wrap(ele).findByText('COLLATERAL RATIO').should('not.be.visible')
    })
  })
})
