context('/transaction/[txid] - DfTx Set Default Loan Scheme on Desktop', () => {
  before(() => {
    cy.visit('/transactions/edbe2c3e57115dd9ff6cfabc37c31c6c9506c4e01ea273ec05bbbe0885f0b1b9')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Default Loan Scheme')
  })

  it('should have DfTxSetDefaultLoanScheme Identifier', function () {
    cy.findByTestId('DfTxSetDefaultLoanScheme.Identifier').should('have.text', 'MIN200')
  })
})

context('/transaction/[txid] - DfTx Set Default Loan Scheme on Mobile', () => {
  before(() => {
    cy.visit('/transactions/edbe2c3e57115dd9ff6cfabc37c31c6c9506c4e01ea273ec05bbbe0885f0b1b9')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Default Loan Scheme')
  })

  it('should have DfTxSetDefaultLoanScheme Identifier', function () {
    cy.findByTestId('DfTxSetDefaultLoanScheme.Identifier').should('have.text', 'MIN200')
  })
})
