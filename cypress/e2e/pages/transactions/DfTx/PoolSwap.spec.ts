context('/transactions/[txid] - DfTx pool swap on desktop', () => {
  before(() => {
    cy.visit('/transactions/594e08557c66649717ca0db669344f2bdef6671e42b4c98942eaa3c76a0d75e6?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Swap')
  })

  it('should have DfTxPoolSwap fromAddress', () => {
    cy.findByTestId('DfTxPoolSwap.fromAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
    cy.findByTestId('DfTxPoolSwap.fromAddress').find('a').should('have.attr', 'href', '/address/df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
  })

  it('should have DfTxPoolSwap fromAmount', () => {
    cy.findByTestId('DfTxPoolSwap.fromAmount').should('have.text', '5.43601003')
  })

  it('should have DfTxPoolSwap fromAmountSymbol', () => {
    cy.findByTestId('DfTxPoolSwap.fromAmountSymbol').should('have.text', 'DFI')
  })

  it('should have DfTxPoolSwap toAddress', () => {
    cy.findByTestId('DfTxPoolSwap.toAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
    cy.findByTestId('DfTxPoolSwap.toAddress').find('a').should('have.attr', 'href', '/address/df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
  })

  it('should have DfTxPoolSwap maxPrice', () => {
    cy.findByTestId('DfTxPoolSwap.maxPrice').should('have.text', '22284.93664040')
  })

  it('should have DfTxPoolSwap maxPriceSymbol', () => {
    cy.findByTestId('DfTxPoolSwap.maxPriceSymbol').should('have.text', 'dBTC')
  })
})

context('/transactions/[txid] - DfTx pool swap on mobile', () => {
  before(() => {
    cy.visit('/transactions/594e08557c66649717ca0db669344f2bdef6671e42b4c98942eaa3c76a0d75e6?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Swap')
  })

  it('should have DfTxPoolSwap fromAddress', () => {
    cy.findByTestId('DfTxPoolSwap.fromAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
    cy.findByTestId('DfTxPoolSwap.fromAddress').find('a').should('have.attr', 'href', '/address/df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
  })

  it('should have DfTxPoolSwap fromAmount', () => {
    cy.findByTestId('DfTxPoolSwap.fromAmount').should('have.text', '5.43601003')
  })

  it('should have DfTxPoolSwap fromAmountSymbol', () => {
    cy.findByTestId('DfTxPoolSwap.fromAmountSymbol').should('have.text', 'DFI')
  })

  it('should have DfTxPoolSwap toAddress', () => {
    cy.findByTestId('DfTxPoolSwap.toAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
    cy.findByTestId('DfTxPoolSwap.toAddress').find('a').should('have.attr', 'href', '/address/df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
  })

  it('should have DfTxPoolSwap maxPrice', () => {
    cy.findByTestId('DfTxPoolSwap.maxPrice').should('have.text', '22284.93664040')
  })

  it('should have DfTxPoolSwap maxPriceSymbol', () => {
    cy.findByTestId('DfTxPoolSwap.maxPriceSymbol').should('have.text', 'dBTC')
  })
})
