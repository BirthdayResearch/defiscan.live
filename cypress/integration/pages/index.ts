context('/blocks on macbook-13', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have summary-price', () => {
    cy.findByTestId('summary-price').should('be.visible')
  })
})
