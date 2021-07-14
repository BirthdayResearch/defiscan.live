import {} from 'cypress'

context('header', () => {
  beforeEach(function () {
    cy.visit(Cypress.env('URL'))
  })

  it('should contain block count', function () {
    cy.get('header ul li:nth-child(1)').should('not.have.text', 'Blocks: 0')
  })
})
