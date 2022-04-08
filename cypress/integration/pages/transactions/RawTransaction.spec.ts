context('/transactions/[txid]?rawTx=[] on desktop', () => {
  before(() => {
    cy.visit('/transactions/invalidtxnid?rawtx=04000000000101b0ed5e4ac2817af0018addd1d418b67654990e5ed5b6407c966f9266b0ee46680100000000ffffffff020000000000000000526a4c4f44665478691600145f787ab67fcbf179a9995b5dded40a0db62abc1c0f5cdddc09000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000300000000000000a5e01a0000000000011100e0ba4c11000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000247304402206e7025dc68f875df20d4de9aa6d25e8de96a6a4ae978b2cb365033d22ce70fa4022061a636fa90b1918d8b14fb3a378b5f9486debde04dd605fe3f945136fb5cb3d601210376893753c38b995acd841d5ea24165b4e1a41635cb7821cffa025e3b42ef5a2300000000')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have RawTransaction Title', function () {
    cy.findByTestId('RawTransaction.title').should('have.text', 'Transaction ID')
  })

  it('should RawTransaction Pending Banner', function () {
    cy.findByTestId('RawTransaction.pending-banner').should('contain.text', 'The requested transaction 6846eeb066926f967c40b6d55e0e995476b618d4d1dd8a01f07a81c24a5eedb0 is still pending, not all transaction information are currently available. Please wait for a few minutes for it to be confirmed.')
  })

  it('should RawTransaction details subtitle', function () {
    cy.findByTestId('RawTransaction.details-subtitle').should('have.text', 'Details')
  })

  it('should RawTransaction Details Left List', function () {
    cy.findAllByTestId('RawTransaction.DetailsLeft.List').eq(0).should('contain.text', 'N/A')
  })

  it('should RawTransaction Details Right List', function () {
    cy.findAllByTestId('RawTransaction.DetailsRight.List').eq(0).should('contain.text', 'OP_DEFI_TX_COMPOSITE_SWAP')
  })

  it('should RawTransaction Details Right List', function () {
    cy.findAllByTestId('RawTransaction.DetailsRight.List').eq(0).should('contain.text', '2.90241248')
  })

  it('should RawTransaction DetailsSummary total', function () {
    cy.findAllByTestId('RawTransaction.DetailsSummary.total').eq(0).should('contain.text', '2.90241248')
  })

  it('should DfTxCompositeSwap Swap From Title', function () {
    cy.findAllByTestId('DfTxCompositeSwap.SwapFromTitle').should('contain.text', 'Swap From')
  })

  it('should DfTxCompositeSwap Swap To Title', function () {
    cy.findAllByTestId('DfTxCompositeSwap.SwapToTitle').should('contain.text', 'Swap To')
  })

  it('should DfTxCompositeSwap Details From Address', function () {
    cy.findAllByTestId('DfTxCompositeSwap.FromAddress').should('contain.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
  })

  it('should DfTxCompositeSwap To Address', function () {
    cy.findAllByTestId('DfTxCompositeSwap.ToAddress').should('contain.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
  })

  it('should DfTxCompositeSwap From Amount', function () {
    cy.findAllByTestId('DfTxCompositeSwap.FromAmount').should('contain.text', '1.65469532')
  })

  it('should DfTxCompositeSwap Max Price', function () {
    cy.findAllByTestId('DfTxCompositeSwap.MaxPrice').should('contain.text', '3.01761445')
  })

  it('should invalid raw transaction', function () {
    cy.visit('/transactions/invalidtxnid?rawtx=invalidrawtx')
    cy.findAllByTestId('RawTransaction.not-found-banner').should('contain.text', 'The requested transaction is either invalid or has yet to be confirmed. Please try again in a few minutes.')
  })
})

context('/transactions/[txid]?rawTx=[] on mobile', () => {
  before(() => {
    cy.visit('/transactions/invalidtxnid?rawtx=04000000000101b0ed5e4ac2817af0018addd1d418b67654990e5ed5b6407c966f9266b0ee46680100000000ffffffff020000000000000000526a4c4f44665478691600145f787ab67fcbf179a9995b5dded40a0db62abc1c0f5cdddc09000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000300000000000000a5e01a0000000000011100e0ba4c11000000001600145f787ab67fcbf179a9995b5dded40a0db62abc1c000247304402206e7025dc68f875df20d4de9aa6d25e8de96a6a4ae978b2cb365033d22ce70fa4022061a636fa90b1918d8b14fb3a378b5f9486debde04dd605fe3f945136fb5cb3d601210376893753c38b995acd841d5ea24165b4e1a41635cb7821cffa025e3b42ef5a2300000000')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have RawTransaction Title', function () {
    cy.findByTestId('RawTransaction.title').should('have.text', 'Transaction ID')
  })

  it('should RawTransaction Pending Banner', function () {
    cy.findByTestId('RawTransaction.pending-banner').should('contain.text', 'The requested transaction 6846eeb066926f967c40b6d55e0e995476b618d4d1dd8a01f07a81c24a5eedb0 is still pending, not all transaction information are currently available. Please wait for a few minutes for it to be confirmed.')
  })

  it('should RawTransaction details subtitle', function () {
    cy.findByTestId('RawTransaction.details-subtitle').should('have.text', 'Details')
  })

  it('should RawTransaction Details Left List', function () {
    cy.findAllByTestId('RawTransaction.DetailsLeft.List').eq(0).should('contain.text', 'N/A')
  })

  it('should RawTransaction Details Right List', function () {
    cy.findAllByTestId('RawTransaction.DetailsRight.List').eq(0).should('contain.text', 'OP_DEFI_TX_COMPOSITE_SWAP')
  })

  it('should RawTransaction Details Right List', function () {
    cy.findAllByTestId('RawTransaction.DetailsRight.List').eq(0).should('contain.text', '2.90241248')
  })

  it('should RawTransaction DetailsSummary total', function () {
    cy.findAllByTestId('RawTransaction.DetailsSummary.total').eq(0).should('contain.text', '2.90241248')
  })

  it('should DfTxCompositeSwap Swap From Title', function () {
    cy.findAllByTestId('DfTxCompositeSwap.SwapFromTitle').should('contain.text', 'Swap From')
  })

  it('should DfTxCompositeSwap Swap To Title', function () {
    cy.findAllByTestId('DfTxCompositeSwap.SwapToTitle').should('contain.text', 'Swap To')
  })

  it('should DfTxCompositeSwap Details From Address', function () {
    cy.findAllByTestId('DfTxCompositeSwap.FromAddress').should('contain.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
  })

  it('should DfTxCompositeSwap To Address', function () {
    cy.findAllByTestId('DfTxCompositeSwap.ToAddress').should('contain.text', 'df1qtau84dnle0chn2vetdwaa4q2pkmz40qu4hqynw')
  })

  it('should DfTxCompositeSwap From Amount', function () {
    cy.findAllByTestId('DfTxCompositeSwap.FromAmount').should('contain.text', '1.65469532')
  })

  it('should DfTxCompositeSwap Max Price', function () {
    cy.findAllByTestId('DfTxCompositeSwap.MaxPrice').should('contain.text', '3.01761445')
  })

  it('should invalid raw transaction', function () {
    cy.visit('/transactions/invalidtxnid?rawtx=invalidrawtx')
    cy.findAllByTestId('RawTransaction.not-found-banner').should('contain.text', 'The requested transaction is either invalid or has yet to be confirmed. Please try again in a few minutes.')
  })
})
