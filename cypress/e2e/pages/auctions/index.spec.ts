context('/auctions on desktop', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('AuctionTable.TimeLeft').should('be.visible').should('have.text', 'Time Left')
    cy.findByTestId('AuctionTable.TimeLeft').within(() => {
      cy.findByTestId('InfoHoverPopover').should('be.visible')
    })
    cy.findByTestId('AuctionTable.LoanToken').should('be.visible').should('have.text', 'Loan Token')
    cy.findByTestId('AuctionTable.CollateralForAuction').should('be.visible').should('have.text', 'Collateral For Auction')
    cy.findByTestId('AuctionTable.CollateralValue').should('be.visible').should('have.text', 'Collateral Value (USD)')
    cy.findByTestId('AuctionTable.MinNextBid').should('be.visible').should('have.text', 'Min. Next Bid')
  })

  it('should have AuctionsTableRow information', function () {
    cy.findAllByTestId('OverflowTable.Row').within(() => {
      cy.findByTestId('AuctionsTableRow.AuctionTimeLeft').should('be.visible')
      cy.findByTestId('AuctionsTableRow.LoanToken.TokenSymbol').should('be.visible')
      cy.findByTestId('AuctionsTableRow.LoanToken.displaySymbol').should('be.visible')
      cy.findByTestId('AuctionsTableRow.CollateralSymbols').should('be.visible')
      cy.findByTestId('AuctionsTableRow.CollateralValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
      cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
      cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
    })
  })
})

context('/auctions on mobile', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have MobileAuctionDetailsCards', function () {
    cy.findByTestId('MobileAuctionDetailsCards').within(() => {
      cy.findAllByTestId('MobileAuctionDetailCard').within(() => {
        cy.findByTestId('CardList.Header').within(() => {
          cy.findByTestId('MobileAuctionDetailCard.TokenSymbol').should('be.visible')
          cy.findByTestId('MobileAuctionDetailCard.displaySymbol').should('be.visible')

          cy.findByTestId('CardList.Header.Children').should('be.visible')
          cy.findByTestId('CardList.Header.ViewButton').should('be.visible')
          cy.findByTestId('CardList.Header.Toggle').should('be.visible')
        })

        cy.findByTestId('MobileAuctionDetailCard.AuctionTimeLeft').should('be.visible')

        cy.findAllByTestId('MobileAuctionDetailCard.MinNextBid').within(() => {
          cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Min. Next Bid')
          cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
          cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
        })

        cy.findAllByTestId('MobileAuctionDetailCard.CollateralsForAuction').within(() => {
          cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Collateral For Auction')
          cy.findByTestId('MobileAuctionDetailCard.CollateralSymbols').should('be.visible')
        })

        cy.findAllByTestId('MobileAuctionDetailCard.CollateralValue').within(() => {
          cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Collateral Value (USD)')
          cy.findByTestId('MobileAuctionDetailCard.CollateralValue.Value').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
        })
      })
    })
  })
})
