context('/transactions/[txid] - DfTx Remove Oracle on desktop', () => {
  before(() => {
    cy.visit('/transactions/36fb1c89217749e51a0ca268352e1d4a6012817813bdf003bad4a7c9f197eabc?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Remove Oracle')
  })

  it('should have DfTxRemoveOracle Oracle ID', function () {
    cy.findByTestId('DfTxRemoveOracle.OracleId').should('have.text', 'c2cd2623696af16b4bca7bcbfd9f024ad0e07be425cbd5a4f87a5cbc8d2414e0')
  })
})

context('/transactions/[txid] - DfTx Remove Oracle on mobile', () => {
  before(() => {
    cy.visit('/transactions/36fb1c89217749e51a0ca268352e1d4a6012817813bdf003bad4a7c9f197eabc?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Remove Oracle')
  })

  it('should have DfTxRemoveOracle Oracle ID', function () {
    cy.findByTestId('DfTxRemoveOracle.OracleId').should('have.text', 'c2cd2623696af16b4bca7bcbfd9f024ad0e07be425cbd5a4f87a5cbc8d2414e0')
  })
})
