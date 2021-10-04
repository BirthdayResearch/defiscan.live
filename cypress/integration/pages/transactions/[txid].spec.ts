context('/transactions/[txid] on desktop', () => {
  before(() => {
    cy.visit('/transactions/8f7d241126636c79e17317eef0f84eb565a1886147f0dfdcfbe7a168f095f351?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', '8f7d241126636c79e17317eef0f84eb565a1886147f0dfdcfbe7a168f095f351')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '85063.91431759 DFI')
  })

  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '0.97889014 mDFI')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1171695')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '0.00001024 mDFI/byte')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '95592 bytes')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', 'Sep 8, 2021, 10:00:24 AM') // UTC Time
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
    cy.visit('/transactions/8f7d241126636c79e17317eef0f84eb565a1886147f0dfdcfbe7a168f095f351?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('title').contains('Transaction Hash')
  })

  it('should have hash', () => {
    cy.findByTestId('transaction-hash').should('have.text', '8f7d241126636c79e17317eef0f84eb565a1886147f0dfdcfbe7a168f095f351')
  })

  it('should have transaction-detail-total-amount', () => {
    cy.findByTestId('transaction-detail-total-amount').should('have.text', '85063.91431759 DFI')
  })

  it('should have transaction-detail-fee', () => {
    cy.findByTestId('transaction-detail-fee').should('have.text', '0.97889014 mDFI')
  })

  it('should have transaction-detail-confirmations', () => {
    cy.findByTestId('transaction-detail-confirmations').contains(/\d+/)
  })

  it('should have transaction-detail-block-height', () => {
    cy.findByTestId('transaction-detail-block-height').should('have.text', '1171695')
  })

  it('should have transaction-detail-fee-rate', () => {
    cy.findByTestId('transaction-detail-fee-rate').should('have.text', '0.00001024 mDFI/byte')
  })

  it('should have transaction-detail-size', () => {
    cy.findByTestId('transaction-detail-size').should('have.text', '95592 bytes')
  })

  it('should have transaction-detail-received-time', () => {
    cy.findByTestId('transaction-detail-received-time').should('have.text', 'Sep 8, 2021, 10:00:24 AM') // UTC Time
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
