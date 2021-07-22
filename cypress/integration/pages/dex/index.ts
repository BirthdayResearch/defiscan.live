import {} from 'cypress'

context('dex', () => {
  beforeEach(function () {
    cy.visit('/dex')
  })  
  
  it('should contain pool pair list information', function () {
    cy.get('table thead tr th:nth-child(1)').should('have.value', 'Name')
    cy.get('table thead tr th:nth-child(2)').should('have.value', 'Total Liquidity USD')
    cy.get('table thead tr th:nth-child(3)').should('have.value', 'Daily Volume USD (30d avg)')
    cy.get('table thead tr th:nth-child(4)').should('have.value', 'Liquidity')
    cy.get('table thead tr th:nth-child(5)').should('have.value', 'Price Ratio')
    cy.get('table thead tr th:nth-child(6)').should('have.value', 'APR')
  })
})
