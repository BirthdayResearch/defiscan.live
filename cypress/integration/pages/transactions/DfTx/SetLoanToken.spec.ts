context('/transactions/[txid] - DfTx Set Loan Token on Desktop', () => {
  before(() => {
    cy.visit('/transactions/080438d4401d1257b537896a335e041d8efa47e6a71c2ffeb6491f0f4dc0e531')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Loan Token')
  })

  it('should have DfTxSetLoanToken Token Symbol', () => {
    cy.findByTestId('DfTxSetLoanToken.TokenSymbol').should('have.text', 'DUSD')
  })

  it('should have DfTxSetLoanToken Token Name', () => {
    cy.findByTestId('DfTxSetLoanToken.TokenName').should('have.text', 'Decentralized USD')
  })

  it('should have DfTxSetLoanToken currency pair', () => {
    cy.findByTestId('DfTxSetLoanToken.CurrencyPair').should('have.text', 'DUSD-USD')
  })

  it('should have DfTxSetLoanToken Mintable', () => {
    cy.findByTestId('DfTxSetLoanToken.Mintable').should('have.text', 'Yes')
  })

  it('should have DfTxSetLoanToken Interest', () => {
    cy.findByTestId('DfTxSetLoanToken.Interest').should('have.text', '0.00000000')
  })
})

context('/transactions/[txid] - DfTx Set Loan Token on Mobile', () => {
  before(() => {
    cy.visit('/transactions/080438d4401d1257b537896a335e041d8efa47e6a71c2ffeb6491f0f4dc0e531')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Loan Token')
  })

  it('should have DfTxSetLoanToken Token Symbol', () => {
    cy.findByTestId('DfTxSetLoanToken.TokenSymbol').should('have.text', 'DUSD')
  })

  it('should have DfTxSetLoanToken Token Name', () => {
    cy.findByTestId('DfTxSetLoanToken.TokenName').should('have.text', 'Decentralized USD')
  })

  it('should have DfTxSetLoanToken currency pair', () => {
    cy.findByTestId('DfTxSetLoanToken.CurrencyPair').should('have.text', 'DUSD-USD')
  })

  it('should have DfTxSetLoanToken Mintable', () => {
    cy.findByTestId('DfTxSetLoanToken.Mintable').should('have.text', 'Yes')
  })

  it('should have DfTxSetLoanToken Interest', () => {
    cy.findByTestId('DfTxSetLoanToken.Interest').should('have.text', '0.00000000')
  })
})
