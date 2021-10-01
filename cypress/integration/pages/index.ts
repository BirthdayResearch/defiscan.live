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
  it('should have summary-tvl', () => {
    cy.findByTestId('summary-tvl').should('be.visible')
  })
  it('should have summary-masternodes', () => {
    cy.findByTestId('summary-masternodes').should('be.visible')
  })

  it('should have stat-blocks', () => {
    cy.findByTestId('stat-blocks').should('be.visible')
  })
  it('should have stat-total-dfi-burned', () => {
    cy.findByTestId('stat-total-dfi-burned').should('be.visible')
  })
  it('should have stat-difficulty', () => {
    cy.findByTestId('stat-difficulty').should('be.visible')
  })
})
