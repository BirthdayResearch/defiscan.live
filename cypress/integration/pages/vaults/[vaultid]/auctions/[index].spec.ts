context('/vaults/[vaultid]/auctions/[index] on desktop', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
    cy.findAllByTestId('OverflowTable.Row').first().click()
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', function () {
    cy.findByTestId('AuctionDetails.Heading').should('be.visible').should('have.text', 'Auction Details')
  })

  it('should have Auction Details', function () {
    cy.findByTestId('DesktopAuctionDetails.LoanSymbol').should('be.visible')
    cy.findByTestId('DesktopAuctionDetails.displaySymbol').should('be.visible')

    cy.findByTestId('DesktopAuctionDetails.BatchNumber').should('be.visible').contains(/^BATCH #\d+$/)
    cy.findByTestId('DesktopAuctionDetails.AuctionTimeLeft').should('be.visible').contains(/^~.* left$/)

    cy.findAllByTestId('DesktopAuctionDetails.MinNextBid').within(() => {
      cy.findByTestId('DesktopAuctionDetails.MinNextBid.Label').should('be.visible').should('have.text', 'Min. Next Bid')
      cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
      cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
    })

    cy.findAllByTestId('DesktopAuctionDetails.MinStartingBid').within(() => {
      cy.findByTestId('DesktopAuctionDetails.MinStartingBid.Label').should('be.visible').should('have.text', 'Min. Starting Bid')
      cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
      cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
    })

    cy.findAllByTestId('DesktopAuctionDetails.VaultID').within(() => {
      cy.findByTestId('DesktopAuctionDetails.VaultID.Label').should('be.visible').should('have.text', 'Vault ID')
      cy.findByTestId('DesktopAuctionDetails.VaultID.Value').should('be.visible')
    })

    cy.findAllByTestId('DesktopAuctionDetails.CollateralsForAuctions').within(() => {
      cy.findByTestId('DesktopAuctionDetails.CollateralsForAuctions.Label').should('be.visible').should('have.text', 'Collaterals For Auction')
      cy.findAllByTestId('DesktopCollateralListItem').within(() => {
        cy.findByTestId('DesktopCollateralListItem.CollateralSymbol').should('be.visible')

        cy.findByTestId('DesktopCollateralListItem.Amount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
        cy.findByTestId('DesktopCollateralListItem.Value').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
      })
    })
  })
})

context('/vaults/[vaultid]/auctions/[index] on mobile', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
    cy.findAllByTestId('OverflowTable.Row').first().click()
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', function () {
    cy.findByTestId('AuctionDetails.Heading').should('be.visible').should('have.text', 'Auction Details')
  })

  it('should have Auction Details', function () {
    cy.findByTestId('MobileAuctionDetails.LoanSymbol').should('be.visible')
    cy.findByTestId('MobileAuctionDetails.displaySymbol').should('be.visible')

    cy.findByTestId('MobileAuctionDetails.BatchNumber').should('be.visible').contains(/^BATCH #\d+$/)
    cy.findByTestId('MobileAuctionDetails.AuctionTimeLeft').should('be.visible').contains(/^~.* left$/)

    cy.findAllByTestId('MobileAuctionDetails.MinNextBid').within(() => {
      cy.findByTestId('MobileAuctionDetails.MinNextBid.Label').should('be.visible').should('have.text', 'Min. Next Bid')
      cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
      cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
    })

    cy.findAllByTestId('MobileAuctionDetails.MinStartingBid').within(() => {
      cy.findByTestId('MobileAuctionDetails.MinStartingBid.Label').should('be.visible').should('have.text', 'Min. Starting Bid')
      cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
      cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
    })

    cy.findAllByTestId('MobileAuctionDetails.VaultID').within(() => {
      cy.findByTestId('MobileAuctionDetails.VaultID.Label').should('be.visible').should('have.text', 'Vault ID')
      cy.findByTestId('MobileAuctionDetails.VaultID.Value').should('be.visible')
    })

    cy.findAllByTestId('MobileAuctionDetails.CollateralsForAuctions').within(() => {
      cy.findByTestId('MobileAuctionDetails.CollateralsForAuctions.Label').should('be.visible').should('have.text', 'Collaterals For Auction')
      cy.findAllByTestId('MobileCollateralListItem').within(() => {
        cy.findByTestId('MobileCollateralListItem.CollateralSymbol').should('be.visible')
        cy.findByTestId('MobileCollateralListItem.displaySymbol').should('be.visible')

        cy.findByTestId('MobileCollateralListItem.Amount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+)$/)
        cy.findByTestId('MobileCollateralListItem.Value').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+) USD$/)
      })
    })
  })
})
