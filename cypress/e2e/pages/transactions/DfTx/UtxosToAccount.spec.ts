context('/transactions/[txid] - DfTx Utxos to Account on desktop', () => {
  before(() => {
    cy.visit('/transactions/3bd52ca1383be28bbbf994417f012b12a63951627e580cffe24d3f751263b720?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Utxos To Account')
  })

  it('should have DfTxUtxosToAccount.to', () => {
    cy.findByTestId('DfTxUtxosToAccount.to').should('have.text', 'dbsUzdJkF2ebnj1AkKAV9XY31FZSud37Cf')
    cy.findByTestId('DfTxUtxosToAccount.to').find('a').should('have.attr', 'href', '/address/dbsUzdJkF2ebnj1AkKAV9XY31FZSud37Cf')
  })

  it('should have DfTxUtxosToAccount.toAmount', () => {
    cy.findByTestId('DfTxUtxosToAccount.toAmount').should('have.text', '370.89997304')
  })

  it('should have DfTxUtxosToAccount.toSymbol', () => {
    cy.findByTestId('DfTxUtxosToAccount.toSymbol').should('have.text', 'DFI')
  })
})

context('/transactions/[txid] - DfTx Utxos to Account on mobile', () => {
  before(() => {
    cy.visit('/transactions/3bd52ca1383be28bbbf994417f012b12a63951627e580cffe24d3f751263b720?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Utxos To Account')
  })

  it('should have DfTxUtxosToAccount.to', () => {
    cy.findByTestId('DfTxUtxosToAccount.to').should('have.text', 'dbsUzdJkF2ebnj1AkKAV9XY31FZSud37Cf')
    cy.findByTestId('DfTxUtxosToAccount.to').find('a').should('have.attr', 'href', '/address/dbsUzdJkF2ebnj1AkKAV9XY31FZSud37Cf')
  })

  it('should have DfTxUtxosToAccount.toAmount', () => {
    cy.findByTestId('DfTxUtxosToAccount.toAmount').should('have.text', '370.89997304')
  })

  it('should have DfTxUtxosToAccount.toSymbol', () => {
    cy.findByTestId('DfTxUtxosToAccount.toSymbol').should('have.text', 'DFI')
  })
})
