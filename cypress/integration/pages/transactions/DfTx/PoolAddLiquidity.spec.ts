context('/transactions/[txid] - DfTx Pool Add Liquidity on desktop', () => {
  before(() => {
    cy.visit('/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Add Liquidity')
  })

  it('should have DfTxAddPoolLiquidity Share Address', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.ShareAddress').should('have.text', '8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24')
  })

  it('should have DfTxAddPoolLiquidity Token 1 ID', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenId1').should('have.text', '0')
  })

  it('should have DfTxAddPoolLiquidity Token 2 ID', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenId2').should('have.text', '3')
  })

  it('should have DfTxAddPoolLiquidity Token 1 Amount', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenAmount1').should('have.text', '6.3e-7 DFI')
  })

  it('should have DfTxAddPoolLiquidity Token 2 Amount', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenAmount2').should('have.text', '0.00000205 DFI')
  })
})

context('/transactions/[txid] - DfTx Pool Add Liquidity on mobile', () => {
  before(() => {
    cy.visit('/transactions/c940fd028bfb2f7dad1663b2c77ce203cbc5b49897e76b61472c9f76b81b3fa0?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Add Liquidity')
  })

  it('should have DfTxAddPoolLiquidity Share Address', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.ShareAddress').should('have.text', '8cEN6YMPPg2GUeXN8RrfL7LXaSWoWw7a24')
  })

  it('should have DfTxAddPoolLiquidity Token 1 ID', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenId1').should('have.text', '0')
  })

  it('should have DfTxAddPoolLiquidity Token 2 ID', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenId2').should('have.text', '3')
  })

  it('should have DfTxAddPoolLiquidity Token 1 Amount', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenAmount1').should('have.text', '6.3e-7 DFI')
  })

  it('should have DfTxAddPoolLiquidity Token 2 Amount', () => {
    cy.findByTestId('DfTxPoolAddLiquidity.TokenAmount2').should('have.text', '0.00000205 DFI')
  })
})
