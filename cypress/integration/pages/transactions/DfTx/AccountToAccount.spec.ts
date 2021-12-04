context('/transactions/[txid] - DfTx account to account on desktop', () => {
  before(() => {
    cy.visit('/transactions/05aa1b9629cffb3afcb03b3b483ff760957aa93d49ca9ffba9f5adaf81238ebc?network=MainNet')
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
    cy.findByTestId('DfTxAccountToAccount.fromAddress').should('have.text', 'df1qgzpjmmrv7v4gkkl7avymh63wvtn7n5zzau9hyy')
    cy.findByTestId('DfTxAccountToAccount.fromAddress').find('a').should('have.attr', 'href', '/address/df1qgzpjmmrv7v4gkkl7avymh63wvtn7n5zzau9hyy')
  })

  it('should have DfTxAccountToAccount to', () => {
    cy.findByTestId('DfTxAccountToAccount.to').should('have.text', 'dQPChD3qab1N2XwvL6U5hucnz3Vz948rMi')
    cy.findByTestId('DfTxAccountToAccount.to').find('a').should('have.attr', 'href', '/address/dQPChD3qab1N2XwvL6U5hucnz3Vz948rMi')
  })

  it('should have DfTxAccountToAccount toAmount', () => {
    cy.findByTestId('DfTxAccountToAccount.toAmount').should('have.text', '2.00000000')
  })

  it('should have DfTxAccountToAccount toSymbol', () => {
    cy.findByTestId('DfTxAccountToAccount.toSymbol').should('have.text', 'dBTC-DFI')
  })
})

context('/transactions/[txid] - DfTx account to account on mobile', () => {
  before(() => {
    cy.visit('/transactions/05aa1b9629cffb3afcb03b3b483ff760957aa93d49ca9ffba9f5adaf81238ebc?network=MainNet')
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
    cy.findByTestId('DfTxAccountToAccount.fromAddress').should('have.text', 'df1qgzpjmmrv7v4gkkl7avymh63wvtn7n5zzau9hyy')
    cy.findByTestId('DfTxAccountToAccount.fromAddress').find('a').should('have.attr', 'href', '/address/df1qgzpjmmrv7v4gkkl7avymh63wvtn7n5zzau9hyy')
  })

  it('should have DfTxAccountToAccount to', () => {
    cy.findByTestId('DfTxAccountToAccount.to').should('have.text', 'dQPChD3qab1N2XwvL6U5hucnz3Vz948rMi')
    cy.findByTestId('DfTxAccountToAccount.to').find('a').should('have.attr', 'href', '/address/dQPChD3qab1N2XwvL6U5hucnz3Vz948rMi')
  })

  it('should have DfTxAccountToAccount toAmount', () => {
    cy.findByTestId('DfTxAccountToAccount.toAmount').should('have.text', '2.00000000')
  })

  it('should have DfTxAccountToAccount toSymbol', () => {
    cy.findByTestId('DfTxAccountToAccount.toSymbol').should('have.text', 'dBTC-DFI')
  })
})
