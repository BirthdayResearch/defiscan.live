context('/transactions/[txid] - DfTx ICX Submit EXTHTLC  on desktop', () => {
  before(() => {
    cy.visit('/transactions/9d768a8cdb9764ad2283a6b4d7f729b076962af115dfa3e95b95b516546ab7ba?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Submit EXTHTLC')
  })

  it('should have DfTxICXSubmitEXTHTLC OfferTx', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OfferTx').should('have.text', '8b0e6bcbc8ae43b017bce42d33ff3b73f6aa2cd54d51342194e51f46b76a5764')
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OfferTx').find('a').should('have.attr', 'href', '/transactions/8b0e6bcbc8ae43b017bce42d33ff3b73f6aa2cd54d51342194e51f46b76a5764')
  })

  it('should have DfTxICXSubmitEXTHTLC Hash', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Hash').should('have.text', '01376dbc27d4d2ac78c59e8e13057e9f9c4e84a573e22b908b6a8abe3504d191')
  })

  it('should have DfTxICXSubmitEXTHTLC Amount', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Amount').should('have.text', '0.10000000')
  })

  it('should have DfTxICXSubmitEXTHTLC HTLC Script Address', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.HTLCScriptAddress').should('have.text', '3EDv3fAXzW5B5JtVBX5Epy6h8seFXorNyq')
    cy.findByTestId('DfTxICXSubmitEXTHTLC.HTLCScriptAddress').find('a').should('have.attr', 'href', '/address/3EDv3fAXzW5B5JtVBX5Epy6h8seFXorNyq')
  })

  it('should have DfTxICXSubmitEXTHTLC OwnerPubKey', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OwnerPubKey').should('have.text', '035c7e47fe0c39b2df57c943362b654fe7f69bdb300c7c09b066664c17966f9313')
  })

  it('should have DfTxICXSubmitEXTHTLC Timeout', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Timeout').should('have.text', '60 Blocks')
  })
})

context('/transactions/[txid] - DfTx ICX Submit EXTHTLC  on mobile', () => {
  before(() => {
    cy.visit('/transactions/9d768a8cdb9764ad2283a6b4d7f729b076962af115dfa3e95b95b516546ab7ba?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:ICX Submit EXTHTLC')
  })

  it('should have DfTxICXSubmitEXTHTLC OfferTx', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OfferTx').should('have.text', '8b0e6bcbc8ae43b017bce42d33ff3b73f6aa2cd54d51342194e51f46b76a5764')
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OfferTx').find('a').should('have.attr', 'href', '/transactions/8b0e6bcbc8ae43b017bce42d33ff3b73f6aa2cd54d51342194e51f46b76a5764')
  })

  it('should have DfTxICXSubmitEXTHTLC Hash', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Hash').should('have.text', '01376dbc27d4d2ac78c59e8e13057e9f9c4e84a573e22b908b6a8abe3504d191')
  })

  it('should have DfTxICXSubmitEXTHTLC Amount', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Amount').should('have.text', '0.10000000')
  })

  it('should have DfTxICXSubmitEXTHTLC HTLC Script Address', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.HTLCScriptAddress').should('have.text', '3EDv3fAXzW5B5JtVBX5Epy6h8seFXorNyq')
    cy.findByTestId('DfTxICXSubmitEXTHTLC.HTLCScriptAddress').find('a').should('have.attr', 'href', '/address/3EDv3fAXzW5B5JtVBX5Epy6h8seFXorNyq')
  })

  it('should have DfTxICXSubmitEXTHTLC OwnerPubKey', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.OwnerPubKey').should('have.text', '035c7e47fe0c39b2df57c943362b654fe7f69bdb300c7c09b066664c17966f9313')
  })

  it('should have DfTxICXSubmitEXTHTLC Timeout', () => {
    cy.findByTestId('DfTxICXSubmitEXTHTLC.Timeout').should('have.text', '60 Blocks')
  })
})
