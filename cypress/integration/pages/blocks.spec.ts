describe('blocks page', () => {
  beforeEach(function () {
    cy.visit('/blocks')
  })

  it('should contain block table header count', function () {
    cy.get('.blocks-table-header div:nth-child(1)').should('have.text', 'Height')
    cy.get('.blocks-table-header div:nth-child(2)').should('have.text', 'Age')
    cy.get('.blocks-table-header div:nth-child(3)').should('have.text', 'Transactions')
    cy.get('.blocks-table-header div:nth-child(4)').should('have.text', 'Size')
  })
})
