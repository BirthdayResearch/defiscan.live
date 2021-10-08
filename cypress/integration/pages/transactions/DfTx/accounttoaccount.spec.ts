context('/transactions/[txid] - DfTx account to account on desktop', () => {
  before(() => {
    cy.visit('/transactions/fce2a107795a1e8ffc63d02a3e95680d2aa2e4ef2089f6007f225eca3967e118?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Account To Account')
  })

  it('should have DfTxAccountToAccount fromAddress', () => {
    cy.findByTestId('DfTxAccountToAccount.fromAddress').should('have.text', 'dc6pHWvWNwaqy68xn7SKEVbJFSefGspQ3C')
  })

  it('should have DfTxAccountToAccount to', () => {
    cy.findByTestId('DfTxAccountToAccount.to').should('have.text', 'dYQw2KcELYeqEezYZHFGuvQJMLYLjr1tmt: ["0.03761657@DFI"]')
  })
})

context('/transactions/[txid] - DfTx account to account on mobile', () => {
  before(() => {
    cy.visit('/transactions/fce2a107795a1e8ffc63d02a3e95680d2aa2e4ef2089f6007f225eca3967e118?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Account To Account')
  })

  it('should have DfTxAccountToAccount fromAddress', () => {
    cy.findByTestId('DfTxAccountToAccount.fromAddress').should('have.text', 'dc6pHWvWNwaqy68xn7SKEVbJFSefGspQ3C')
  })
  it('should have DfTxAccountToAccount to', () => {
    cy.findByTestId('DfTxAccountToAccount.to').should('have.text', 'dYQw2KcELYeqEezYZHFGuvQJMLYLjr1tmt: ["0.03761657@DFI"]')
  })
})
