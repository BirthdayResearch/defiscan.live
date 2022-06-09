context('/ on macbook-16', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have banner-title is DeFiChain Explorer', () => {
    cy.findByTestId('Header.title').should('have.text', 'DeFiChain Explorer')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('StatItem.priceUsdt').should('exist')
    cy.findByTestId('StatItem.blockReward').should('exist')
    cy.findByTestId('StatItem.totalDFIBurned').should('exist')
    cy.findByTestId('StatItem.difficulty').should('exist')
  })

  it('should have Supply Stats', function () {
    cy.findByTestId('SupplyStats.Desktop').should('exist')
    cy.findAllByTestId('StatPriceCard').should('exist')
    cy.findByTestId('SupplyStats.Desktop').should('be.visible')

    cy.findByTestId('SupplyStats.Desktop').within(() => {
      cy.findByTestId('StatCard.TotalBurned').should('be.visible')
      cy.findByTestId('StatCard.Tvl').should('be.visible')
      cy.findByTestId('StatCard.TotalMinted').should('be.visible')
      cy.findByTestId('StatCard.Circulating').should('be.visible')
    })
  })

  it('should have Transactions', () => {
    cy.findByTestId('Mobile.TransactionList').should('not.be.visible')
    cy.findByTestId('Desktop.TransactionList').should('be.visible')

    cy.findByTestId('Desktop.TransactionList').within(() => {
      cy.findByTestId('Desktop.TransactionList.Title').should('be.visible').should('have.text', 'Latest Transactions')

      cy.findAllByTestId('Desktop.TransactionCard').within(() => {
        cy.findByTestId('Desktop.TransactionCard.txid').should('be.visible')
        cy.findByTestId('Desktop.TransactionCard.age').should('be.visible')
        cy.findByTestId('Desktop.TransactionCard.AmountLabel').should('be.visible').should('have.text', 'Amount')
        cy.findByTestId('Desktop.TransactionCard.AmountValue').should('be.visible').contains(/\d+.\d+\sDFI/)
      })

      cy.findAllByTestId('Desktop.TransactionCard').should('have.length', 8)
    })
  })

  it('should have Blocks', () => {
    cy.findByTestId('Mobile.BlocksList').should('not.be.visible')
    cy.findByTestId('Desktop.BlocksList').should('be.visible')

    cy.findByTestId('Desktop.BlocksList').within(() => {
      cy.findByTestId('Desktop.BlocksList.Title').should('be.visible').should('have.text', 'Latest Blocks')

      cy.findAllByTestId('BlockCardDetails').within(() => {
        cy.findByTestId('BlockCardDetails.height').should('be.visible')
        cy.findByTestId('BlockCardDetails.age').should('be.visible')
        cy.findByTestId('BlockCardDetails.MintedByLabel').should('be.visible').should('have.text', 'Minted by')
        cy.findByTestId('BlockCardDetails.MintedByValue').should('be.visible')
        cy.findByTestId('BlockCardDetails.TransactionsLabel').should('be.visible').should('have.text', 'Transactions')
        cy.findByTestId('BlockCardDetails.TransactionsValue').should('be.visible').contains(/\d+/)
      })

      cy.findAllByTestId('BlockCardDetails').should('have.length', 8)
    })
    cy.findByTestId('BlocksList.viewAllBlocksButton').should('be.visible').should('have.attr', 'href', '/blocks')
  })

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList').should('be.visible')
    cy.findByTestId('LiquidityPoolList.title').should('be.visible').should('have.text', 'Liquidity Pools')

    cy.findAllByTestId('LiquidityPoolCard').within(() => {
      cy.findByTestId('LiquidityPoolCard.PoolPairSymbol').should('be.visible')

      cy.findByTestId('LiquidityCardStat.APR.Label').should('be.visible').should('have.text', 'APR')
      cy.findByTestId('LiquidityCardStat.APR.Value').should('be.visible').contains(/\d+.\d+%/)

      cy.findByTestId('LiquidityCardStat.Liquidity.Label').should('be.visible').should('have.text', 'Liquidity')
      cy.findByTestId('LiquidityCardStat.Liquidity.Value').should('be.visible').contains(/^\d{1,3}(,\d{3})* USD$/)

      cy.findByTestId('LiquidityCardStat.Ratio.Label').should('be.visible').should('have.text', 'Ratio')
      cy.findByTestId('LiquidityCardStat.Ratio.Value').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+)? .*\/.*$/)
    })

    cy.findAllByTestId('LiquidityPoolCard').should('have.length', 8)
    cy.findByTestId('LiquidityPoolList.viewAllPoolsButton').should('be.visible').should('have.attr', 'href', '/dex')
  })
})

context('/ on iphone-x', () => {
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have banner-title is DeFiChain Explorer', () => {
    cy.findByTestId('Header.title').should('have.text', 'DeFiChain Explorer')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('StatItem.priceUsdt').should('exist')
    cy.findByTestId('StatItem.blockReward').should('exist')
    cy.findByTestId('StatItem.totalDFIBurned').should('exist')
    cy.findByTestId('StatItem.difficulty').should('exist')
  })

  it('should have Supply Stats', function () {
    cy.findByTestId('SupplyStats.Desktop').should('exist')
    cy.findAllByTestId('StatPriceCard').should('exist')
    cy.findByTestId('SupplyStats.Desktop').should('be.visible')

    cy.findByTestId('SupplyStats.Desktop').within(() => {
      cy.findByTestId('StatCard.Tvl').should('be.visible')
      cy.findByTestId('StatCard.TotalBurned').should('be.visible')
      cy.findByTestId('StatCard.TotalMinted').should('be.visible')
      cy.findByTestId('StatCard.Circulating').should('be.visible')
    })
  })

  it('should have Transactions', () => {
    cy.findByTestId('Desktop.TransactionList').should('not.be.visible')
    cy.findByTestId('Mobile.TransactionList').should('be.visible')

    cy.findByTestId('Mobile.TransactionList').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('be.visible').should('have.text', 'Latest Transactions')

      cy.findAllByTestId('Mobile.TransactionCard').within(() => {
        cy.findByTestId('Mobile.TransactionCard.txid').should('be.visible')
        cy.findByTestId('Mobile.TransactionCard.age').should('be.visible')
        cy.findByTestId('Mobile.TransactionCard.AmountLabel').should('be.visible').should('have.text', 'Amount')
        cy.findByTestId('Mobile.TransactionCard.AmountValue').should('be.visible').contains(/\d+.\d+\sDFI/)
      })
    })

    cy.findAllByTestId('Mobile.TransactionCard').should('have.length', 8)
  })

  it('should have Blocks', () => {
    cy.findByTestId('Desktop.BlocksList').should('not.be.visible')
    cy.findByTestId('Mobile.BlocksList').should('be.visible')

    cy.findByTestId('Mobile.BlocksList').within(() => {
      cy.findByTestId('CollapsibleSection.Heading').should('be.visible').should('have.text', 'Latest Blocks')

      cy.findAllByTestId('BlockCardDetails').within(() => {
        cy.findByTestId('BlockCardDetails.height').should('be.visible')
        cy.findByTestId('BlockCardDetails.age').should('be.visible')
        cy.findByTestId('BlockCardDetails.MintedByLabel').should('be.visible').should('have.text', 'Minted by')
        cy.findByTestId('BlockCardDetails.MintedByValue').should('be.visible')
        cy.findByTestId('BlockCardDetails.TransactionsLabel').should('be.visible').should('have.text', 'Transactions')
        cy.findByTestId('BlockCardDetails.TransactionsValue').should('be.visible').contains(/\d+/)
      })

      cy.findAllByTestId('BlockCardDetails').should('have.length', 8)
    })

    cy.findByTestId('BlocksList.viewAllBlocksButton').should('be.visible').should('have.attr', 'href', '/blocks')
  })

  it('should have LiquidityPools', () => {
    cy.findByTestId('LiquidityPoolList').should('be.visible')

    cy.findAllByTestId('LiquidityPoolCard').within(() => {
      cy.findByTestId('LiquidityPoolCard.PoolPairSymbol').should('be.visible')

      cy.findByTestId('LiquidityCardStat.APR.Label').should('be.visible').should('have.text', 'APR')
      cy.findByTestId('LiquidityCardStat.APR.Value').should('be.visible').contains(/\d+.\d+%/)

      cy.findByTestId('LiquidityCardStat.Liquidity.Label').should('be.visible').should('have.text', 'Liquidity')
      cy.findByTestId('LiquidityCardStat.Liquidity.Value').should('be.visible').contains(/^\d{1,3}(,\d{3})* USD$/)

      cy.findByTestId('LiquidityCardStat.Ratio.Label').should('be.visible').should('have.text', 'Ratio')
      cy.findByTestId('LiquidityCardStat.Ratio.Value').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+)? .*\/.*$/)
    })

    cy.findAllByTestId('LiquidityPoolCard').should('have.length', 8)
    cy.findByTestId('LiquidityPoolList.viewAllPoolsButton').should('be.visible').should('have.attr', 'href', '/dex')
  })
})
