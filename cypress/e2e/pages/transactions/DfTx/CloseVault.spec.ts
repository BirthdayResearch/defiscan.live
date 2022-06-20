context('/transactions/[txid] - DfTx Close Vault on desktop', () => {
  before(() => {
    cy.visit('/transactions/dfb1f9f983c4c1e37971c86978ef0c2715cf33ec9df20323307e9515dd7bedcf?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Close Vault')
  })

  it('should have DfTxCloseVault VaultId ', function () {
    cy.findByTestId('DfTxCloseVault.VaultId').should('have.text', 'ba95c96e18651639c9dd4c0d03c29150a79f2fca95fb5e8c972e21b117b7f5b1')
  })

  it('should have DfTxCloseVault Address ', function () {
    cy.findByTestId('DfTxCloseVault.Address').should('have.text', 'dbPyb6DzcgP1Z2Nw6aj4Cq79CR14VESCKW')
  })
})

context('/transactions/[txid] - DfTx Close Vault on mobile', () => {
  before(() => {
    cy.visit('/transactions/dfb1f9f983c4c1e37971c86978ef0c2715cf33ec9df20323307e9515dd7bedcf?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Close Vault')
  })

  it('should have DfTxCloseVault VaultId ', function () {
    cy.findByTestId('DfTxCloseVault.VaultId').should('have.text', 'ba95c96e18651639c9dd4c0d03c29150a79f2fca95fb5e8c972e21b117b7f5b1')
  })

  it('should have DfTxCloseVault Address ', function () {
    cy.findByTestId('DfTxCloseVault.Address').should('have.text', 'dbPyb6DzcgP1Z2Nw6aj4Cq79CR14VESCKW')
  })
})
