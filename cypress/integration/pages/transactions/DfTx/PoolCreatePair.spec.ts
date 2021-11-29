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

  it('should have DfTxPoolCreatePair tokenA Symbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenASymbol').should('have.text', 'dUSDC')
  })

  it('should have DfTxPoolCreatePair tokenB Symbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenBSymbol').should('have.text', 'DFI')
  })

  it('should have DfTxPoolCreatePair commission', () => {
    cy.findByTestId('DfTxPoolCreatePair.commission').should('have.text', '0.00200000')
  })

  it('should have DfTxPoolCreatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').should('have.text', '8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').find('a').should('have.attr', 'href', '/address/8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
  })

  it('should have DfTxPoolCreatePair status', () => {
    cy.findByTestId('DfTxPoolCreatePair.status').should('have.text', '0')
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

  it('should have DfTxPoolCreatePair tokenA Symbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenASymbol').should('have.text', 'dUSDC')
  })

  it('should have DfTxPoolCreatePair tokenB Symbol', () => {
    cy.findByTestId('DfTxPoolCreatePair.tokenBSymbol').should('have.text', 'DFI')
  })

  it('should have DfTxPoolCreatePair commission', () => {
    cy.findByTestId('DfTxPoolCreatePair.commission').should('have.text', '0.00200000')
  })

  it('should have DfTxPoolCreatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').should('have.text', '8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
    cy.findByTestId('DfTxPoolCreatePair.ownerAddress').find('a').should('have.attr', 'href', '/address/8UAhRuUFCyFUHEPD7qvtj8Zy2HxF5HH5nb')
  })

  it('should have DfTxPoolCreatePair status', () => {
    cy.findByTestId('DfTxPoolCreatePair.status').should('have.text', '0')
  })
})
