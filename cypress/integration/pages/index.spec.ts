context('/ on macbook-13', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have banner-title is DeFiChain Blockchain Explorer', () => {
    cy.findByTestId('Header.title').should('have.text', 'DeFiChain Blockchain Explorer')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('StatItem.priceUsdt').should('exist')
    cy.findByTestId('StatItem.tvlTotal').should('exist')
    cy.findByTestId('StatItem.blockReward').should('exist')
    cy.findByTestId('StatItem.totalDFIBurned').should('exist')
    cy.findByTestId('StatItem.difficulty').should('exist')
  })

  it('should have BlocksList.viewAllBlocksLink', () => {
    cy.findByTestId('BlocksList.viewAllBlocksLink').should('have.attr', 'href', '/blocks')
  })

  it('should have BlocksList.viewAllBlocksButton', () => {
    cy.findByTestId('BlocksList.viewAllBlocksButton').should('have.attr', 'href', '/blocks')
  })

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList').should('be.visible')
  })

  it('should have LiquidityPools.title', () => {
    cy.findByTestId('LiquidityPoolList.title').should('have.text', 'Liquidity Pools')
  })

  it('should have LiquidityPoolList.viewLiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList.viewLiquidityPools').should('have.attr', 'href', '/dex')
  })
})

context('/ on iphone-x', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have banner-title is DeFiChain Blockchain Explorer', () => {
    cy.findByTestId('Header.title').should('have.text', 'DeFiChain Blockchain Explorer')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('StatItem.priceUsdt').should('exist')
    cy.findByTestId('StatItem.tvlTotal').should('exist')
    cy.findByTestId('StatItem.blockReward').should('exist')
    cy.findByTestId('StatItem.totalDFIBurned').should('exist')
    cy.findByTestId('StatItem.difficulty').should('exist')
  })

  it('should have BlocksList.viewAllBlocksLink', () => {
    cy.findByTestId('BlocksList.viewAllBlocksLink').should('have.attr', 'href', '/blocks')
  })

  it('should have BlocksList.viewAllBlocksButton', () => {
    cy.findByTestId('BlocksList.viewAllBlocksButton').should('have.attr', 'href', '/blocks')
  })

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList').should('be.visible')
  })

  it('should have LiquidityPools.title', () => {
    cy.findByTestId('LiquidityPoolList.title').should('have.text', 'Liquidity Pools')
  })

  it('should have LiquidityPoolList.viewLiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList.viewLiquidityPools').should('have.attr', 'href', '/dex')
  })
})
