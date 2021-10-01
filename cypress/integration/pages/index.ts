context('/blocks on macbook-13', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have summary-price', () => {
    cy.findByTestId('summary-price').should('be.visible')
  })
  it('should have summary-tvl', () => {
    cy.findByTestId('summary-tvl').should('be.visible')
  })
  it('should have summary-masternodes', () => {
    cy.findByTestId('summary-masternodes').should('be.visible')
  })

  it('should have stat-blocks', () => {
    cy.findByTestId('stat-blocks').should('be.visible')
  })
  it('should have stat-total-dfi-burned', () => {
    cy.findByTestId('stat-total-dfi-burned').should('be.visible')
  })
  it('should have stat-difficulty', () => {
    cy.findByTestId('stat-difficulty').should('be.visible')
  })
  it('should have view-all-blocks-link', () => {
    cy.findByTestId('view-all-blocks-link').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })
  it('should have view-all-blocks-button', () => {
    cy.findByTestId('view-all-blocks-button').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })

  it('should have latest-transactions-link', () => {
    cy.findByTestId('latest-transactions-link').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })
  it('should have latest-transactions-button', () => {
    cy.findByTestId('latest-transactions-button').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })

  it('should have liquidity-pools ', () => {
    cy.findByTestId('liquidity-pools').should('be.visible')
  })
  it('should have liquidity-pools-title ', () => {
    cy.findByTestId('liquidity-pools-title').should('have.text', 'Liquidity Pools')
  })
})
