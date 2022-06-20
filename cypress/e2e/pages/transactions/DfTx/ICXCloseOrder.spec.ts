context('/transactions/[txid] - DfTx ICX Close Order on desktop', () => {
  before(() => {
    cy.visit('/transactions/bb6a3829e8b469d601ed8cb7189c4640566c85e0c8932b20c4dc4d27be0cac99?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Close Order')
  })

  it('should have DfTxICXCloseOrder OrderTx', () => {
    cy.findByTestId('DfTxICXCloseOrder.OrderTx').should('have.text', '0c2eb1c3b69a37204c452d99cd77c04fbe8549865ef80b86838a6dd9662bf59a')
    cy.findByTestId('DfTxICXCloseOrder.OrderTx').find('a').should('have.attr', 'href', '/transactions/0c2eb1c3b69a37204c452d99cd77c04fbe8549865ef80b86838a6dd9662bf59a')
  })
})

context('/transactions/[txid] - DfTx ICX Close Offer on mobile', () => {
  before(() => {
    cy.visit('/transactions/bb6a3829e8b469d601ed8cb7189c4640566c85e0c8932b20c4dc4d27be0cac99?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Close Order')
  })

  it('should have DfTxICXCloseOrder OrderTx', () => {
    cy.findByTestId('DfTxICXCloseOrder.OrderTx').should('have.text', '0c2eb1c3b69a37204c452d99cd77c04fbe8549865ef80b86838a6dd9662bf59a')
    cy.findByTestId('DfTxICXCloseOrder.OrderTx').find('a').should('have.attr', 'href', '/transactions/0c2eb1c3b69a37204c452d99cd77c04fbe8549865ef80b86838a6dd9662bf59a')
  })
})
