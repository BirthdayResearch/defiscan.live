context('/transactions/[txid] - DfTx Place Auction Bid on Desktop', () => {
  before(() => {
    cy.visit('/transactions/bddbd785df3e27c817c0e1054ebb04c1e932efd08a0e3f8f97663ddba6cf3d00')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Place Auction Bid')
  })

  it('should DfTxPlaceAuctionBid Vault ID ', function () {
    cy.findByTestId('DfTxPlaceAuctionBid.VaultId').should('have.text', '92dcef48f0109d007f6c02a263fdb9d30e618739a8d749584e0b732c5b968f54')
  })

  it('should DfTxPlaceAuctionBid Bidder\'s Address', function () {
    cy.findByTestId('DfTxPlaceAuctionBid.BidderAddress').should('have.text', 'dEkfruJ7LybfHy1AY1b2EGnN4SyQuyzpxn')
  })

  it('should have DfTxPlaceAuctionBid Auction Batch', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.AuctionBatch').should('have.text', '0')
  })

  it('should have DfTxPlaceAuctionBid Amount', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.Amount').should('have.text', '6021.00000000')
  })

  it('should have DfTxPlaceAuctionBid Amount Symbol', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.AmountSymbol').should('have.text', 'DUSD')
  })
})

context('/transactions/[txid] - DfTx Place Auction Bid on Mobile', () => {
  before(() => {
    cy.visit('/transactions/bddbd785df3e27c817c0e1054ebb04c1e932efd08a0e3f8f97663ddba6cf3d00')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Place Auction Bid')
  })

  it('should DfTxPlaceAuctionBid Vault ID ', function () {
    cy.findByTestId('DfTxPlaceAuctionBid.VaultId').should('have.text', '92dcef48f0109d007f6c02a263fdb9d30e618739a8d749584e0b732c5b968f54')
  })

  it('should DfTxPlaceAuctionBid Bidder\'s Address', function () {
    cy.findByTestId('DfTxPlaceAuctionBid.BidderAddress').should('have.text', 'dEkfruJ7LybfHy1AY1b2EGnN4SyQuyzpxn')
  })

  it('should have DfTxPlaceAuctionBid Auction Batch', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.AuctionBatch').should('have.text', '0')
  })

  it('should have DfTxPlaceAuctionBid Amount', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.Amount').should('have.text', '6021.00000000')
  })

  it('should have DfTxPlaceAuctionBid Amount Symbol', () => {
    cy.findByTestId('DfTxPlaceAuctionBid.AmountSymbol').should('have.text', 'DUSD')
  })
})
