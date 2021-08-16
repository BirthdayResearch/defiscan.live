describe('blocks page', () => {
  beforeEach(function () {
    cy.visit('/blocks')
  })

  it('should have 6 column headers', function () {
    cy.get('.table-row-group > .hidden > .table-cell').should('have.length', 5)
  })

  it('should contain the appropriate headers', function () {
    cy.get('.table-row-group > .hidden > .table-cell:nth-child(1)').should('have.text', 'height')
    cy.get('.table-row-group > .hidden > .table-cell:nth-child(2)').should('have.text', 'age')
    cy.get('.table-row-group > .hidden > .table-cell:nth-child(3)').should('have.text', 'transactions')
    cy.get('.table-row-group > .hidden > .table-cell:nth-child(4)').should('have.text', 'size')
    cy.get('.table-row-group > .hidden > .table-cell:nth-child(5)').should('have.text', 'difficulty')
  })
})
