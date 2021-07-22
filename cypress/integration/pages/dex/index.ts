import {} from 'cypress'

context('dex', () => {
  beforeEach(function () {
    cy.visit('/dex')
  })  
  
  it('should list pool pair information', function () {
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(1)').should('have.text', 'Name')
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(2)').should('have.text', 'Total Liquidity USD')
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(3)').should('have.text', 'Daily Volume USD (30d avg)')
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(4)').should('have.text', 'Liquidity')
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(5)').should('have.text', 'Price Ratio')
    cy.get('div.table div.table-row-group:nth-child(1) div.table-row div.table-cell:nth-child(6)').should('have.text', 'APR')
  })
})
