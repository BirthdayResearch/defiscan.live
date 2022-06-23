context('/vaults/[vaultid] - In Liquidation on desktop', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
    cy.findAllByTestId('OverflowTable.Row').first().click()
    cy.findByTestId('DesktopAuctionDetails.VaultID.Value').click()
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have <BreadCrumbs />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Vaults')
  })

  describe('should Vault Details', function () {
    it('should Vault Details Heading', function () {
      cy.findByTestId('VaultDetailsDesktop.Heading').should('have.text', 'Vault Details')
    })

    it('should have OverflowTable header information', function () {
      cy.findByTestId('VaultDetailsDesktop.OwnerAddress').should('be.visible').should('have.text', 'Owner\'s Address')

      cy.findByTestId('VaultDetailsDesktop.TotalLoanValue').should('be.visible').should('have.text', 'Total Loan Value (USD)')
      cy.findByTestId('VaultDetailsDesktop.TotalLoanValue').within(() => {
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })

      cy.findByTestId('VaultDetailsDesktop.TotalCollateralValue').should('be.visible').should('have.text', 'Total Collateral Value (USD)')
      cy.findByTestId('VaultDetailsDesktop.TotalCollateralValue').within(() => {
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })

      cy.findByTestId('VaultDetailsDesktop.VaultInterestRate').should('be.visible').should('have.text', 'Vault Interest Rate (APR)')
      cy.findByTestId('VaultDetailsDesktop.VaultInterestRate').within(() => {
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })
    })

    it('should have Vault Details and 4 cells in each row', function () {
      cy.findAllByTestId('OverflowTable.Row').within(() => {
        cy.findAllByTestId('OverflowTable.Cell').should('have.length', 4).should('be.visible')

        cy.findByTestId('DesktopVaultDetailsRow.OwnerId').should('be.visible')
        cy.findByTestId('DesktopVaultDetailsRow.TotalLoanValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
        cy.findByTestId('DesktopVaultDetailsRow.TotalCollateralValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
        cy.findByTestId('DesktopVaultDetailsRow.APR').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+)%$/)
      })
    })

    it('should not have health bar', function () {
      cy.findByTestId('VaultHealthBar').should('not.exist')
    })
  })

  describe('should have Auctions Details', function () {
    it('should Vault Details Heading', function () {
      cy.findByTestId('VaultAuctionsDesktop.Heading').should('have.text', 'In Auction')
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

    it('should have Auction Details and 5 cells in each row', function () {
      cy.findAllByTestId('VaultAuctionsDesktop').within(() => {
        cy.findAllByTestId('OverflowTable.Row').within(() => {
          cy.findAllByTestId('OverflowTable.Cell').should('have.length', 5).should('be.visible')

          cy.findByTestId('AuctionsTableRow.AuctionTimeLeft').should('be.visible').contains(/^.* left$/)

          cy.findByTestId('AuctionsTableRow.LoanToken.TokenSymbol').should('be.visible')
          cy.findByTestId('AuctionsTableRow.LoanToken.displaySymbol').should('be.visible')

          cy.findByTestId('AuctionsTableRow.CollateralSymbols').should('be.visible')

          cy.findByTestId('AuctionsTableRow.CollateralValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)

          cy.findAllByTestId('AuctionsTableRow.MinNextBid').within(() => {
            cy.findByTestId('BidAmountValue.MinBidAmount').should('be.visible').contains(/^\d{1,3}(,\d{3})*(\.\d+) [a-zA-Z]+$/)
            cy.findByTestId('BidAmountValue.MinBidValue').should('be.visible').contains(/^\$\d{1,3}(,\d{3})*(\.\d+)$/)
          })
        })
      })
    })
  })
})

context('/vaults/[vaultid] - In Liquidation on mobile', () => {
  before(() => {
    cy.request('https://ocean.defichain.com/v0/mainnet/loans/auctions?size=1')
      .then(function (response) {
        if (response.body.data.length !== 1) {
          this.skip()
        }
      })

    cy.visit('/auctions')
    cy.findAllByTestId('OverflowTable.Row').first().click()
    cy.findByTestId('DesktopAuctionDetails.VaultID.Value').click()
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have <BreadCrumbs />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Vaults')
  })

  describe('should Vault Details', function () {
    it('should Vault Details Heading', function () {
      cy.findByTestId('VaultDetailsDesktop.Heading').should('have.text', 'Vault Details')
    })

    it('should have Vault Details', function () {
      cy.findByTestId('VaultDetailList.OwnerAddress').within(() => {
        cy.findByTestId('VaultDetailsListItem.Title').should('be.visible').should('have.text', 'Owner\'s Address')
        cy.findByTestId('VaultDetailList.OwnerAddress.Value').should('be.visible')
      })

      cy.findByTestId('VaultDetailList.TotalLoanValue').within(() => {
        cy.findByTestId('VaultDetailsListItem.Title').should('be.visible').should('have.text', 'Total Loan Value (USD)')
        cy.findByTestId('VaultDetailList.TotalLoanValue.Value').should('be.visible')
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })

      cy.findByTestId('VaultDetailList.TotalCollateralValue').within(() => {
        cy.findByTestId('VaultDetailsListItem.Title').should('be.visible').should('have.text', 'Total Collateral Value (USD)')
        cy.findByTestId('VaultDetailList.TotalCollateralValue.Value').should('be.visible')
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })

      cy.findByTestId('VaultDetailList.VaultInterestRate').within(() => {
        cy.findByTestId('VaultDetailsListItem.Title').should('be.visible').should('have.text', 'Vault Interest Rate (APR)')
        cy.findByTestId('VaultDetailList.VaultInterestRate.Value').should('be.visible')
        cy.findByTestId('InfoHoverPopover').should('be.visible')
      })
    })

    it('should not have health bar', function () {
      cy.findByTestId('VaultHealthBar').should('not.exist')
    })
  })

  describe('should have Auction Details', function () {
    it('should have Auction Details', function () {
      cy.findByTestId('MobileVaultAuctions').within(() => {
        cy.findByTestId('CollapsibleSection.Heading').should('have.text', 'In Auction')

        cy.findByTestId('MobileAuctionDetailsCards').within(() => {
          cy.findAllByTestId('MobileAuctionDetailCard').within(() => {
            cy.findByTestId('MobileAuctionDetailCard.TokenSymbol').should('be.visible')
            cy.findByTestId('MobileAuctionDetailCard.displaySymbol').should('be.visible')
            cy.findByTestId('CardList.Header.ViewButton').should('be.visible').should('have.text', 'VIEW')

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
  })
})
