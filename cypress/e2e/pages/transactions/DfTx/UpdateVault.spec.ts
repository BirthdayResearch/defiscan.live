context('/transaction/[txid] - Dftx Update Vault on Desktop', () => {
  before(() => {
    cy.visit('/transactions/6d69127d805a98ae5b25ee02fb18014fd59dc889f31f8974b4a4f62e6fe9514b')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Update Vault')
  })

  it('should have DfTxUpdateVault Owners Address', () => {
    cy.findByTestId('DfTxUpdateVault.OwnersAddress').should('have.text', 'dMjetXovGLDcas7cJoqpE8sHg4GrrZUdeJ')
  })

  it('should have DfTxUpdateVault SchemeId', () => {
    cy.findByTestId('DfTxUpdateVault.SchemeId').should('have.text', 'MIN350')
  })

  it('should have DfTxUpdateVault VaultId', () => {
    cy.findByTestId('DfTxUpdateVault.VaultID').should('have.text', '5d1d9b003253e7a9b6e4dfa17f14f2796c90fcf480909479d3b5873f73f3b27b')
  })
})

context('/transaction/[txid] - Dftx Update Vault on Mobile', () => {
  before(() => {
    cy.visit('/transactions/6d69127d805a98ae5b25ee02fb18014fd59dc889f31f8974b4a4f62e6fe9514b')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Update Vault')
  })

  it('should have DfTxUpdateVault Owners Address', () => {
    cy.findByTestId('DfTxUpdateVault.OwnersAddress').should('have.text', 'dMjetXovGLDcas7cJoqpE8sHg4GrrZUdeJ')
  })

  it('should have DfTxUpdateVault SchemeId', () => {
    cy.findByTestId('DfTxUpdateVault.SchemeId').should('have.text', 'MIN350')
  })

  it('should have DfTxUpdateVault VaultId', () => {
    cy.findByTestId('DfTxUpdateVault.VaultID').should('have.text', '5d1d9b003253e7a9b6e4dfa17f14f2796c90fcf480909479d3b5873f73f3b27b')
  })
})
