context('/transactions/[txid] - DfTx any account to account on desktop', () => {
  before(() => {
    cy.visit('/transactions/8dc36085de6d1605f055891770f92c20e5e62249966124e48c3577c91ad6f8b3?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Any Account To Account')
  })

  it('should have DfTxAnyAccountToAccount from', () => {
    cy.findByTestId('DfTxAnyAccountToAccount.from').should('have.text', 'dMqFUH75XaqEAefp1wHt36h3MPxo1nZByf: ["0.5@DFI"]')
  })

  it('should have DfTxAnyAccountToAccount to', () => {
    cy.findByTestId('DfTxAnyAccountToAccount.to').should('have.text', 'dVQfdjzaz8ydWrJMJuMmFjxKkFHuRiDPJh: ["0.5@DFI"]')
  })
})

// context('/transactions/[txid] - DfTx pool swap on mobile', () => {
//   before(() => {
//     cy.visit('/transactions/594e08557c66649717ca0db669344f2bdef6671e42b4c98942eaa3c76a0d75e6?network=MainNet')
//   })
//
//   beforeEach(() => {
//     cy.viewport('iphone-x')
//   })
//
//   it('should have heading', () => {
//     cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
//   })
//
//   it('should have DfTx type', () => {
//     cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Pool Swap')
//   })
//
//   it('should have DfTxPoolSwap fromAddress', () => {
//     cy.findByTestId('DfTxPoolSwap.fromAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
//   })
//
//   it('should have DfTxPoolSwap fromTokenId', () => {
//     cy.findByTestId('DfTxPoolSwap.fromTokenId').should('have.text', '0')
//   })
//
//   it('should have DfTxPoolSwap fromAmount', () => {
//     cy.findByTestId('DfTxPoolSwap.fromAmount').should('have.text', '5.43601003 DFI')
//   })
//
//   it('should have DfTxPoolSwap toAddress', () => {
//     cy.findByTestId('DfTxPoolSwap.toAddress').should('have.text', 'df1qly3cfl93dqjuu3k8jnp768w02d8738hsnagxsk')
//   })
//
//   it('should have DfTxPoolSwap toTokenId', () => {
//     cy.findByTestId('DfTxPoolSwap.toTokenId').should('have.text', '2')
//   })
//
//   it('should have DfTxPoolSwap maxPrice', () => {
//     cy.findByTestId('DfTxPoolSwap.maxPrice').should('have.text', '22284.9366404 DFI')
//   })
// })
