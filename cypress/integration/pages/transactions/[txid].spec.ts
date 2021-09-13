context('/transactions/[txid] on desktop', () => {
  before(() => {
    cy.visit('/transactions/40d3955015fe1cdc59c2cd92da0b30c34ba435e09120e27100dbc11ef9922b80?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', 'f5f619011d0c79747ae269b545156d2b3dcba2045dec05f5568181452bbcbe02')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '')
  })
  
  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1133915')
  })

  it('should have transaction-detail-custom-transaction', () => {
    cy.findByTestId('transaction-detail-custom-transaction').should('have.text', '')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '208')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', '')
  })

  it('should have transaction-detail-mined-time', () => {
    cy.findByTestId('transaction-detail-mined-time').should('have.text', '')
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
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', 'f5f619011d0c79747ae269b545156d2b3dcba2045dec05f5568181452bbcbe02')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '')
  })
  
  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1133915')
  })

  it('should have transaction-detail-custom-transaction', () => {
    cy.findByTestId('transaction-detail-custom-transaction').should('have.text', '')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '208')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', '')
  })

  it('should have transaction-detail-mined-time', () => {
    cy.findByTestId('transaction-detail-mined-time').should('have.text', '')
  })
})
