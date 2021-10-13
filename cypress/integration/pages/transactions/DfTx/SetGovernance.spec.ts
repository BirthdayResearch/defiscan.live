context('/transactions/[txid] - DfTx Set Governance on desktop', () => {
  before(() => {
    cy.visit('/transactions/9d8704e033335ec3dab1911cb0311c7b45d97805f31c04b14af65afc44a4840c?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Governance')
  })

  it('should have DfTxSetGovernance Key', function () {
    cy.findByTestId('DfTxSetGovernance.Key').contains('LP_SPLITS')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token4').contains('4')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token4Value').contains('0.14549000')
  })
})

context('/transactions/[txid] - DfTx Set Governance on mobile', () => {
  before(() => {
    cy.visit('/transactions/9d8704e033335ec3dab1911cb0311c7b45d97805f31c04b14af65afc44a4840c?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Governance')
  })

  it('should have DfTxSetGovernance Key', function () {
    cy.findByTestId('DfTxSetGovernance.Key').contains('LP_SPLITS')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token4').contains('4')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token4Value').contains('0.14549000')
  })
})
