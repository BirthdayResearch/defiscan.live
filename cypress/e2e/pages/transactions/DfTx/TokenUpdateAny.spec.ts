context('/transactions/[txid] - DfTx Token Update Any on desktop', () => {
  before(() => {
    cy.visit('/transactions/fcb131a6616507ed439f9f126723495983d3ec46a97633bf615cbadc8e6af868?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Token Update Any')
  })

  it('should have DfTxTokenUpdateAny CreationTx', () => {
    cy.findByTestId('DfTxTokenUpdateAny.CreationTx').should('have.text', '085949ca1ea998cdc43dddad06b79872b40431dff28234c4f42314e0c74e593d')
    cy.findByTestId('DfTxTokenUpdateAny.CreationTx').find('a').should('have.attr', 'href', '/transactions/085949ca1ea998cdc43dddad06b79872b40431dff28234c4f42314e0c74e593d')
  })

  it('should have DfTxTokenUpdateAny symbol', () => {
    cy.findByTestId('DfTxTokenUpdateAny.symbol').should('have.text', 'BUSH2B')
  })

  it('should have DfTxTokenUpdateAny decimal', () => {
    cy.findByTestId('DfTxTokenUpdateAny.decimal').should('have.text', '8')
  })

  it('should have DfTxTokenUpdateAny name', () => {
    cy.findByTestId('DfTxTokenUpdateAny.name').should('have.text', 'Bush')
  })

  it('should have DfTxTokenUpdateAny limit', () => {
    cy.findByTestId('DfTxTokenUpdateAny.limit').should('have.text', '0.00000000')
  })

  it('should have DfTxTokenUpdateAny Tradeable', () => {
    cy.findByTestId('DfTxTokenUpdateAny.Tradeable').should('have.text', 'true')
  })

  it('should have DfTxTokenUpdateAny Mintable', () => {
    cy.findByTestId('DfTxTokenUpdateAny.Mintable').should('have.text', 'true')
  })
})

context('/transactions/[txid] - DfTx Token Update Any on mobile', () => {
  before(() => {
    cy.visit('/transactions/fcb131a6616507ed439f9f126723495983d3ec46a97633bf615cbadc8e6af868?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Token Update Any')
  })

  it('should have DfTxTokenUpdateAny CreationTx', () => {
    cy.findByTestId('DfTxTokenUpdateAny.CreationTx').should('have.text', '085949ca1ea998cdc43dddad06b79872b40431dff28234c4f42314e0c74e593d')
    cy.findByTestId('DfTxTokenUpdateAny.CreationTx').find('a').should('have.attr', 'href', '/transactions/085949ca1ea998cdc43dddad06b79872b40431dff28234c4f42314e0c74e593d')
  })

  it('should have DfTxTokenUpdateAny symbol', () => {
    cy.findByTestId('DfTxTokenUpdateAny.symbol').should('have.text', 'BUSH2B')
  })

  it('should have DfTxTokenUpdateAny decimal', () => {
    cy.findByTestId('DfTxTokenUpdateAny.decimal').should('have.text', '8')
  })

  it('should have DfTxTokenUpdateAny name', () => {
    cy.findByTestId('DfTxTokenUpdateAny.name').should('have.text', 'Bush')
  })

  it('should have DfTxTokenUpdateAny limit', () => {
    cy.findByTestId('DfTxTokenUpdateAny.limit').should('have.text', '0.00000000')
  })

  it('should have DfTxTokenUpdateAny Tradeable', () => {
    cy.findByTestId('DfTxTokenUpdateAny.Tradeable').should('have.text', 'true')
  })

  it('should have DfTxTokenUpdateAny Mintable', () => {
    cy.findByTestId('DfTxTokenUpdateAny.Mintable').should('have.text', 'true')
  })
})
