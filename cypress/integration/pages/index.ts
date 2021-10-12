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

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have StatItem.emissionRate', () => {
    cy.findByTestId('StatItem.emissionRate').should('be.visible')
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

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPools').should('be.visible')
  })

  it('should have LiquidityPools.title', () => {
    cy.findByTestId('LiquidityPools.title').should('have.text', 'Liquidity Pools')
  })

  it('should have LiquidityPools.viewLiquidityPools', () => {
    cy.findByTestId('InternalLink.viewLiquidityPools').click()
    cy.location('pathname').should('eq', '/dex')
    cy.go('back')
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

  it('should have StatItem.blocks', () => {
    cy.findByTestId('StatItem.blocks').should('be.visible')
  })

  it('should have StatItem.totalDFIBurned', () => {
    cy.findByTestId('StatItem.totalDFIBurned').should('be.visible')
  })

  it('should have StatItem.difficulty', () => {
    cy.findByTestId('StatItem.difficulty').should('be.visible')
  })

  it('should have StatItem.emissionRate', () => {
    cy.findByTestId('StatItem.emissionRate').should('be.visible')
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

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPools').should('be.visible')
  })

  it('should have LiquidityPools.title', () => {
    cy.findByTestId('LiquidityPools.title').should('have.text', 'Liquidity Pools')
  })

  it('should have LiquidityPools.viewLiquidityPools', () => {
    cy.findByTestId('InternalLink.viewLiquidityPools').click()
    cy.location('pathname').should('eq', '/dex')
    cy.go('back')
  })
})
