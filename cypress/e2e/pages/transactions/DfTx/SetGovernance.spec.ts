context('/transactions/[txid] - DfTx Set Governance on desktop', () => {
  before(() => {
    cy.visit('/transactions/c4c6a35ea8b5e0abbf30fc914455b39024f42ca95afcf3adf9f0a4d5a41b5d08?network=MainNet')
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
    cy.findByTestId('DfTxSetGovernance.Token4Symbol').contains('ETH-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token4Value').contains('0.14549000')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token5Symbol').contains('BTC-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token5Value').contains('0.77594500')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token6Symbol').contains('USDT-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token6Value').contains('0.04849700')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token8Symbol').contains('DOGE-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token8Value').contains('0.00096900')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token10Symbol').contains('LTC-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token10Value').contains('0.01939900')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token12Symbol').contains('BCH-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token12Value').contains('0.00970000')
  })
})

context('/transactions/[txid] - DfTx Set Governance on mobile', () => {
  before(() => {
    cy.visit('/transactions/c4c6a35ea8b5e0abbf30fc914455b39024f42ca95afcf3adf9f0a4d5a41b5d08?network=MainNet')
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
    cy.findByTestId('DfTxSetGovernance.Token4Symbol').contains('ETH-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token4Value').contains('0.14549000')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token5Symbol').contains('BTC-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token5Value').contains('0.77594500')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token6Symbol').contains('USDT-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token6Value').contains('0.04849700')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token8Symbol').contains('DOGE-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token8Value').contains('0.00096900')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token10Symbol').contains('LTC-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token10Value').contains('0.01939900')
  })

  it('should have DfTxSetGovernance Token ID', function () {
    cy.findByTestId('DfTxSetGovernance.Token12Symbol').contains('BCH-DFI')
  })

  it('should have DfTxSetGovernance Token Value', function () {
    cy.findByTestId('DfTxSetGovernance.Token12Value').contains('0.00970000')
  })
})
