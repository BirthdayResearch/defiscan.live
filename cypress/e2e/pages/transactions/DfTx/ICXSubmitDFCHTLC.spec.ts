context('/transactions/[txid] - DfTx ICX Submit DFCHTLC  on desktop', () => {
  before(() => {
    cy.visit('/transactions/50aa59b22bfba92b8a9f57cfed140b55e5a586454077ab3615903dfac669cf57?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Submit DFCHTLC')
  })

  it('should have DfTxICXSubmitDFCHTLC OfferTx', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.OfferTx').should('have.text', '3e0726e7c5a970f8670559d51f9e4ca119d5a22bc2405ae2ff092596929290ac')
    cy.findByTestId('DfTxICXSubmitDFCHTLC.OfferTx').find('a').should('have.attr', 'href', '/transactions/3e0726e7c5a970f8670559d51f9e4ca119d5a22bc2405ae2ff092596929290ac')
  })

  it('should have DfTxICXSubmitDFCHTLC Hash', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Hash').should('have.text', '664e63c049e09db655a280069f668ccd992d44d44b271b79cd586b6ed0e75f17')
  })

  it('should have DfTxICXSubmitDFCHTLC Amount', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Amount').should('have.text', '0.10000000')
  })

  it('should have DfTxICXSubmitDFCHTLC Timeout', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Timeout').should('have.text', '1440 Blocks')
  })
})

context('/transactions/[txid] - DfTx ICX Submit DFCHTLC  on mobile', () => {
  before(() => {
    cy.visit('/transactions/50aa59b22bfba92b8a9f57cfed140b55e5a586454077ab3615903dfac669cf57?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Submit DFCHTLC')
  })

  it('should have DfTxICXSubmitDFCHTLC OfferTx', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.OfferTx').should('have.text', '3e0726e7c5a970f8670559d51f9e4ca119d5a22bc2405ae2ff092596929290ac')
    cy.findByTestId('DfTxICXSubmitDFCHTLC.OfferTx').find('a').should('have.attr', 'href', '/transactions/3e0726e7c5a970f8670559d51f9e4ca119d5a22bc2405ae2ff092596929290ac')
  })

  it('should have DfTxICXSubmitDFCHTLC Hash', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Hash').should('have.text', '664e63c049e09db655a280069f668ccd992d44d44b271b79cd586b6ed0e75f17')
  })

  it('should have DfTxICXSubmitDFCHTLC Amount', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Amount').should('have.text', '0.10000000')
  })

  it('should have DfTxICXSubmitDFCHTLC Timeout', () => {
    cy.findByTestId('DfTxICXSubmitDFCHTLC.Timeout').should('have.text', '1440 Blocks')
  })
})
