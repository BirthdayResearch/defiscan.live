context('/transactions/[txid] - DfTx pool update pair on desktop', () => {
  before(() => {
    cy.visit('/transactions/3bfdb2058e9c0127a774e5a74ba260767fe74abb02024c3da5b4d0582d89631b?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Update Pair')
  })

  it('should have DfTxPoolUpdatePair poolId', () => {
    cy.findByTestId('DfTxPoolUpdatePair.poolId').should('have.text', '12')
  })

  it('should have DfTxPoolUpdatePair status', () => {
    cy.findByTestId('DfTxPoolUpdatePair.status').should('have.text', '1')
  })

  it('should have DfTxPoolUpdatePair commission', () => {
    cy.findByTestId('DfTxPoolUpdatePair.commission').should('have.text', '184467440737.09551615')
  })

  it('should have DfTxPoolUpdatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolUpdatePair.ownerAddress').should('have.text', 'N/A')
  })

  it('should have DfTxPoolUpdatePair Token', () => {
    cy.findByTestId('DfTxPoolUpdatePair.Token').should('have.text', 'DFI')
  })

  it('should have DfTxPoolUpdatePair Amount', () => {
    cy.findByTestId('DfTxPoolUpdatePair.Amount').should('have.text', '0.56350000')
  })
})

context('/transactions/[txid] - DfTx pool update pair on mobile', () => {
  before(() => {
    cy.visit('/transactions/3bfdb2058e9c0127a774e5a74ba260767fe74abb02024c3da5b4d0582d89631b?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Update Pair')
  })

  it('should have DfTxPoolUpdatePair poolId', () => {
    cy.findByTestId('DfTxPoolUpdatePair.poolId').should('have.text', '12')
  })

  it('should have DfTxPoolUpdatePair status', () => {
    cy.findByTestId('DfTxPoolUpdatePair.status').should('have.text', '1')
  })

  it('should have DfTxPoolUpdatePair commission', () => {
    cy.findByTestId('DfTxPoolUpdatePair.commission').should('have.text', '184467440737.09551615')
  })

  it('should have DfTxPoolUpdatePair ownerAddress', () => {
    cy.findByTestId('DfTxPoolUpdatePair.ownerAddress').should('have.text', 'N/A')
  })

  it('should have DfTxPoolUpdatePair Token', () => {
    cy.findByTestId('DfTxPoolUpdatePair.Token').should('have.text', 'DFI')
  })

  it('should have DfTxPoolUpdatePair Amount', () => {
    cy.findByTestId('DfTxPoolUpdatePair.Amount').should('have.text', '0.56350000')
  })
})
