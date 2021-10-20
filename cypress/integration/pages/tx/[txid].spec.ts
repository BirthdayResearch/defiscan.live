context('tx redirection macbook-13', () => {
  before(function () {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should redirect to transaction', () => {
    cy.visit('/tx/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
    cy.url().should('contain', '/transactions/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
  })
})

context('tx redirection iphone-x', () => {
  before(function () {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should redirect to transaction', () => {
    cy.visit('/tx/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
    cy.url().should('contain', '/transactions/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
  })
})
