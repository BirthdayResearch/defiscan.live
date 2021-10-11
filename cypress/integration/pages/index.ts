context('/ on macbook-13', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have banner-title is DeFiChain Blockchain Explorer', () => {
    cy.findByTestId('Banner').should('have.text', 'DeFiChain Blockchain Explorer')
  })

  it('should have SummaryCard.price', () => {
    cy.findByTestId('SummaryCard.price').should('be.visible')
  })

  it('should have SummaryCard.tvl', () => {
    cy.findByTestId('SummaryCard.tvl').should('be.visible')
  })

  it('should have SummaryCard.masternodes', () => {
    cy.findByTestId('SummaryCard.masternodes').should('be.visible')
  })

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have InternalLink.viewAllBlocksLink', () => {
    cy.findByTestId('InternalLink.viewAllBlocksLink').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })

  it('should have InternalLink.viewAllBlocksButton', () => {
    cy.findByTestId('InternalLink.viewAllBlocksButton').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })

  it('should have ExternalLink.latestTransactionsLink', () => {
    cy.findByTestId('ExternalLink.latestTransactionsLink').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })
  it('should have ExternalLink.latestTransactionsButton', () => {
    cy.findByTestId('ExternalLink.latestTransactionsButton').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })

  it('should have liquidity-pools ', () => {
    cy.findByTestId('LiquidityPools').should('be.visible')
  })

  it('should have liquidity-pools-title ', () => {
    cy.findByTestId('LiquidityPools.title').should('have.text', 'Liquidity Pools')
  })

  // it('should have search', () => {
  //   cy.findByTestId('search').should('be.visible')
  //   cy.findByTestId('search').type('Hello, World')
  // })
})

context('/ on iphone-x', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have Banner is DeFiChain Blockchain Explorer', () => {
    cy.findByTestId('Banner').should('have.text', 'DeFiChain Blockchain Explorer')
  })

  it('should have SummaryCard.price', () => {
    cy.findByTestId('SummaryCard.price').should('be.visible')
  })

  it('should have SummaryCard.tvl', () => {
    cy.findByTestId('SummaryCard.tvl').should('be.visible')
  })

  it('should have SummaryCard.masternodes', () => {
    cy.findByTestId('SummaryCard.masternodes').should('be.visible')
  })

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have InternalLink.viewAllBlocksLink', () => {
    cy.findByTestId('InternalLink.viewAllBlocksLink').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })

  it('should have InternalLink.viewAllBlocksButton', () => {
    cy.findByTestId('InternalLink.viewAllBlocksButton').click()
    cy.location('pathname').should('eq', '/blocks')
    cy.go('back')
  })

  it('should have ExternalLink.latestTransactionsLink', () => {
    cy.findByTestId('ExternalLink.latestTransactionsLink').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })
  it('should have ExternalLink.latestTransactionsButton', () => {
    cy.findByTestId('ExternalLink.latestTransactionsButton').should('have.attr', 'href', 'https://mainnet.defichain.io/#/DFI/mainnet/home')
  })

  it('should have liquidity-pools ', () => {
    cy.findByTestId('LiquidityPools').should('be.visible')
  })

  it('should have liquidity-pools-title ', () => {
    cy.findByTestId('LiquidityPools.title').should('have.text', 'Liquidity Pools')
  })

  // it('should have search', () => {
  //   cy.findByTestId('search').should('be.visible')
  //   cy.findByTestId('search').type('Hello, World')
  // })
})
