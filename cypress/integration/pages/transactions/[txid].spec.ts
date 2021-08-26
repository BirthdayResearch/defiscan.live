context('/transactions/[txid] on desktop', () => {
  before(() => {
    cy.visit('/transactions/40d3955015fe1cdc59c2cd92da0b30c34ba435e09120e27100dbc11ef9922b80?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction')
  })

  it('should have summary subtitle', () => {
    cy.findByTestId('summary-subtitle').should('have.text', 'Summary')
  })

  it('should have details subtitle', () => {
    cy.findByTestId('details-subtitle').should('have.text', 'Details')
  })
  
  it('should have raw transaction subtitle', () => {
    cy.findByTestId('raw-transaction-subtitle').should('have.text', 'Raw Transaction')
  })

  it('should have raw transaction', () => {
    cy.scrollTo('bottom')
    cy.findByTestId('raw-transaction').should('be.visible')
  })

  it('should have transaction-size', () => {
    cy.findByTestId('transaction-size').should('have.text', '208')
  })
});

context('/transactions/[txid] on mobile', () => {
  before(() => {
    cy.visit('/transactions/40d3955015fe1cdc59c2cd92da0b30c34ba435e09120e27100dbc11ef9922b80?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction')
  })

  it('should have summary subtitle', () => {
    cy.findByTestId('summary-subtitle').should('have.text', 'Summary')
  })

})
