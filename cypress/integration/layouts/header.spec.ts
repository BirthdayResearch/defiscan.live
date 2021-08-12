describe('header', () => {
  beforeEach(function () {
    cy.visit('/?network=MainNet')
  })

  it('should not contain empty block count', function () {
    cy.get('header ul li:nth-child(1)').should('not.have.text', 'Blocks: ...')
  })
})
