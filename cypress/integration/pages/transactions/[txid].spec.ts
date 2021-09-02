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

  it('should have details subtitle', () => {
    cy.findByTestId('block-reward').should('have.text', 'xxxx DFI')
  })
  
  it('should have fee', () => {
    cy.findByTestId('fee').should('have.text', 'xxxx DFI')
  })

  it('should have confirmations', () => {
    cy.findByTestId('confirmations').should('be.visible')
  })

  it('should have block height', () => {
    cy.findByTestId('block-height').should('have.text', '1133915')
  })

  it('should have custom transaction', () => {
    cy.findByTestId('custom-transaction').should('have.text', 'xxxx')
  })

  it('should have fee rate', () => {
    cy.findByTestId('fee-rate').should('have.text', 'xxxx DFI')
  })

  it('should have size', () => {
    cy.findByTestId('size').should('have.text', '208')
  })
  
  it('should have received time', () => {
    cy.findByTestId('received-time').should('have.text', '(received time)')
  })

  it('should have mined time', () => {
    cy.findByTestId('mined-time').should('have.text', '(mined time)')
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

  it('should have details subtitle', () => {
    cy.findByTestId('block-reward').should('have.text', 'xxxx DFI')
  })
  
  it('should have fee', () => {
    cy.findByTestId('fee').should('have.text', 'xxxx DFI')
  })

  it('should have confirmations', () => {
    cy.findByTestId('confirmations').should('be.visible')
  })

  it('should have block height', () => {
    cy.findByTestId('block-height').should('have.text', '1133915')
  })

  it('should have custom transaction', () => {
    cy.findByTestId('custom-transaction').should('have.text', 'xxxx')
  })

  it('should have fee rate', () => {
    cy.findByTestId('fee-rate').should('have.text', 'xxxx DFI')
  })

  it('should have size', () => {
    cy.findByTestId('size').should('have.text', '208')
  })
  
  it('should have received time', () => {
    cy.findByTestId('received-time').should('have.text', '(received time)')
  })

  it('should have mined time', () => {
    cy.findByTestId('mined-time').should('have.text', '(mined time)')
  })


})
