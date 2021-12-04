context('/auctions', () => {
  before(() => {
    cy.visit('/auctions')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('AuctionTable.TimeLeft').should('be.visible').should('have.text', 'Time Left')
    cy.findByTestId('AuctionTable.LoanToken').should('be.visible').should('have.text', 'Loan Token')
    cy.findByTestId('AuctionTable.HighestBid').should('be.visible').should('have.text', 'Highest Bid')
    cy.findByTestId('AuctionTable.CollateralForAuction').should('be.visible').should('have.text', 'Collateral For Auction')
    cy.findByTestId('AuctionTable.CollateralValue').should('be.visible').should('have.text', 'Collateral Value (USD)')
  })

  it('should have 5 cells in each row', function () {
    cy.findAllByTestId('OverflowTable.Row').within(() => {
      cy.findAllByTestId('OverflowTable.Cell').should('have.length', 5).should('be.visible')
    })
  })
})

context('/auctions on mobile', () => {
  before(() => {
    cy.visit('/auctions')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have auction mobile cards', function () {
    cy.findByTestId('MobileAuctionDetailsCards').within(() => {
      cy.findAllByTestId('VaultMobileCard').each(($card) => {
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.Token').should('be.visible')
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.View').should('be.visible').should('have.text', 'View')
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.TimeLeft').should('be.visible')
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.CurrentHighestBid').should('be.visible').should('contain.text', 'Current Highest Bid')
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.CollateralsForAuction').should('be.visible').should('contain.text', 'Collateral For Auction')
        cy.wrap($card).findByTestId('MobileAuctionDetailCard.CollateralValue').should('be.visible').should('contain.text', 'Collateral Value (USD)')
      })
    })
  })
})
