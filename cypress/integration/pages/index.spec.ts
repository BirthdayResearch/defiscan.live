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

  it('should have StatItem.priceUsdt', () => {
    cy.findByTestId('StatItem.priceUsdt').should('be.visible')
  })

  it('should have StatItem.tvlTotal', () => {
    cy.findByTestId('StatItem.tvlTotal').should('be.visible')
  })

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have StatItem.blockReward', () => {
    cy.findByTestId('StatItem.blockReward').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
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

  it('should have StatItem.priceUsdt', () => {
    cy.findByTestId('StatItem.priceUsdt').should('be.visible')
  })

  it('should have StatItem.tvlTotal', () => {
    cy.findByTestId('StatItem.tvlTotal').should('be.visible')
  })

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have StatItem.blockReward', () => {
    cy.findByTestId('StatItem.blockReward').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
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
