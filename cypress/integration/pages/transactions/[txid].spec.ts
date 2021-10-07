context('/transactions/[txid] on desktop', () => {
  before(() => {
    cy.visit('/transactions/c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', '43c6c694354a2ce94722d5256b0bc05e8545da3c12d264fe8184e1c6327552dc')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '3.59205320 DFI')
  })

  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '205 fi')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1230681')
    cy.findByTestId('transaction-detail-block-height').should('have.attr', 'href', '/blocks/1230681')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '0.71678322 fi/byte')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '286 bytes')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', 'Sep 28, 2021, 9:09:44 PM') // UTC Time
  })

  it('should have details heading', () => {
    cy.findByTestId('details-subtitle').should('have.text', 'Details')
  })

  it('should have details input list', () => {
    cy.findByTestId('TransactionDetailsLeft.List').children('div').should('have.length', 1)
    cy.findByTestId('TransactionDetailsLeft.List').within(() => {
      cy.get('div').first().within(() => {
        cy.get('span').eq(0).should('have.text', 'INPUT')
        cy.get('span').eq(1).should('have.text', 'df1ql8xwc5k33a5qq7ttk35xtfk9kn4ghtczds98c6')
        cy.get('span').eq(2).should('have.text', '3.59205525 DFI')
      })
    })
  })

  it('should have details output list', () => {
    cy.findByTestId('TransactionDetailsRight.List').children('div').should('have.length', 2)
    cy.findByTestId('TransactionDetailsRight.List').within(() => {
      cy.get('div').first().within(() => {
        cy.get('span').eq(0).should('have.text', 'OUTPUT')
        cy.get('span').eq(1).should('have.text', 'N/A')
        cy.get('span').eq(2).should('have.text', '0.00000000 DFI')
      })

      cy.get('div').next().within(() => {
        cy.get('span').eq(0).should('have.text', 'OUTPUT')
        cy.get('span').eq(1).should('have.text', 'df1ql8xwc5k33a5qq7ttk35xtfk9kn4ghtczds98c6')
        cy.get('span').eq(2).should('have.text', '3.59205320 DFI')
      })
    })
  })

  it('should have details summary', () => {
    cy.findByTestId('TransactionDetailsSummary.fee').should('have.text', 'Fees:205 fi')
    cy.findByTestId('TransactionDetailsSummary.total').should('have.text', 'Total:3.59205320 DFI')
  })
})

context('/transactions/[txid] on desktop - invalid txn id', () => {
  before(() => {
    cy.visit('/transactions/9693a839caeeb5c161bf5768d9b64cf7d7c1704f1e8e5caf3d9c08b18599ddba?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have warning banner', () => {
    cy.findByTestId('transaction-not-found-banner').should('have.text', 'The requested transaction 9693a839caeeb5c161bf5768d9b64cf7d7c1704f1e8e5caf3d9c08b18599ddba could not be found, it is most likely still being confirmed, please try again in a few minutes.')
  })
})

context('/transactions/[txid] on mobile', () => {
  before(() => {
    cy.visit('/transactions/c9b19726d6ce42beec137f1fe85614ec3341aff83f797ccd51f6494e21ac9df4?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', '43c6c694354a2ce94722d5256b0bc05e8545da3c12d264fe8184e1c6327552dc')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '3.59205320 DFI')
  })

  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '205 fi')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1230681')
    cy.findByTestId('transaction-detail-block-height').should('have.attr', 'href', '/blocks/1230681')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '0.71678322 fi/byte')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '286 bytes')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', 'Sep 28, 2021, 9:09:44 PM') // UTC Time
  })

  it('should have details heading', () => {
    cy.findByTestId('details-subtitle').should('have.text', 'Details')
  })

  it('should have details input list', () => {
    cy.findByTestId('TransactionDetailsLeft.List').children('div').should('have.length', 1)
    cy.findByTestId('TransactionDetailsLeft.List').within(() => {
      cy.get('div').first().within(() => {
        cy.get('span').eq(0).should('have.text', 'INPUT')
        cy.get('span').eq(1).should('have.text', 'df1ql8xwc5k33a5qq7ttk35xtfk9kn4ghtczds98c6')
        cy.get('span').eq(2).should('have.text', '3.59205525 DFI')
      })
    })
  })

  it('should have details output list', () => {
    cy.findByTestId('TransactionDetailsRight.List').children('div').should('have.length', 2)
    cy.findByTestId('TransactionDetailsRight.List').within(() => {
      cy.get('div').first().within(() => {
        cy.get('span').eq(0).should('have.text', 'OUTPUT')
        cy.get('span').eq(1).should('have.text', 'N/A')
        cy.get('span').eq(2).should('have.text', '0.00000000 DFI')
      })

      cy.get('div').next().within(() => {
        cy.get('span').eq(0).should('have.text', 'OUTPUT')
        cy.get('span').eq(1).should('have.text', 'df1ql8xwc5k33a5qq7ttk35xtfk9kn4ghtczds98c6')
        cy.get('span').eq(2).should('have.text', '3.59205320 DFI')
      })
    })
  })

  it('should have details summary', () => {
    cy.findByTestId('TransactionDetailsSummary.fee').should('have.text', 'Fees:205 fi')
    cy.findByTestId('TransactionDetailsSummary.total').should('have.text', 'Total:3.59205320 DFI')
  })
})

context('/transactions/[txid] on mobile - invalid txn id', () => {
  before(() => {
    cy.visit('/transactions/9693a839caeeb5c161bf5768d9b64cf7d7c1704f1e8e5caf3d9c08b18599ddba?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have warning banner', () => {
    cy.findByTestId('transaction-not-found-banner').should('have.text', 'The requested transaction 9693a839caeeb5c161bf5768d9b64cf7d7c1704f1e8e5caf3d9c08b18599ddba could not be found, it is most likely still being confirmed, please try again in a few minutes.')
  })
})
