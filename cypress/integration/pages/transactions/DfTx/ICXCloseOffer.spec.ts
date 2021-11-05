context('/transactions/[txid] - DfTx ICX Close Offer on desktop', () => {
  before(() => {
    cy.visit('/transactions/3a041c2a3ec11839fe84d6fe96b21af5ca720d1dd2292ff080f2154e5c472608?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Close Offer')
  })

  it('should have DfTxICXCloseOffer OfferTx', () => {
    cy.findByTestId('DfTxICXCloseOffer.OfferTx').should('have.text', '6b4375241e1860f8e0a8bfbe6a88756f5f0d1bacefd55fe26b790f1a3ba763ca')
    cy.findByTestId('DfTxICXCloseOffer.OfferTx').find('a').should('have.attr', 'href', '/transactions/6b4375241e1860f8e0a8bfbe6a88756f5f0d1bacefd55fe26b790f1a3ba763ca')
  })
})

context('/transactions/[txid] - DfTx ICX Close Offer on mobile', () => {
  before(() => {
    cy.visit('/transactions/3a041c2a3ec11839fe84d6fe96b21af5ca720d1dd2292ff080f2154e5c472608?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Close Offer')
  })

  it('should have DfTxICXCloseOffer OfferTx', () => {
    cy.findByTestId('DfTxICXCloseOffer.OfferTx').should('have.text', '6b4375241e1860f8e0a8bfbe6a88756f5f0d1bacefd55fe26b790f1a3ba763ca')
    cy.findByTestId('DfTxICXCloseOffer.OfferTx').find('a').should('have.attr', 'href', '/transactions/6b4375241e1860f8e0a8bfbe6a88756f5f0d1bacefd55fe26b790f1a3ba763ca')
  })
})
