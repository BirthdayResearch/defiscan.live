context('/transactions/[txid] - DfTx pool create pair on desktop', () => {
  before(() => {
    cy.visit('/transactions/7eb8b89a54f020dc98387f4528d87776aec424677c8a41e71a47c84a3204edbf?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Create Pair')
  })

  it('should have DfTxPoolCreatePair tokenA', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenA').should('have.text', '13')
  })

  it('should have DfTxPoolCreatePair tokenB', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenB').should('have.text', '0')
  })

  it('should have DfTxPoolCreatePair commission', () => {
    cy.findByTestId('DfTxPoolCreatePair.commission').should('have.text', '0.002')
  })

  it('should have DfTxPoolCreatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').should('have.text', '8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
  })

  it('should have DfTxPoolCreatePair status', () => {
    cy.findByTestId('DfTxPoolCreatePair.status').should('have.text', '0')
  })

  it('should have DfTxPoolCreatePair pairSymbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.pairSymbol').should('have.text', '')
  })
})

context('/transactions/[txid] - DfTx Pool Create Pair on mobile', () => {
  before(() => {
    cy.visit('/transactions/7eb8b89a54f020dc98387f4528d87776aec424677c8a41e71a47c84a3204edbf?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Create Pair')
  })

  it('should have DfTxPoolCreatePair tokenA', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenA').should('have.text', '13')
  })

  it('should have DfTxPoolCreatePair tokenB', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenB').should('have.text', '0')
  })

  it('should have DfTxPoolCreatePair commission', () => {
    cy.findByTestId('DfTxPoolCreatePair.commission').should('have.text', '0.002')
  })

  it('should have DfTxPoolCreatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').should('have.text', '8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
  })

  it('should have DfTxPoolCreatePair status', () => {
    cy.findByTestId('DfTxPoolCreatePair.status').should('have.text', '0')
  })

  it('should have DfTxPoolCreatePair pairSymbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.pairSymbol').should('have.text', '')
  })
})
