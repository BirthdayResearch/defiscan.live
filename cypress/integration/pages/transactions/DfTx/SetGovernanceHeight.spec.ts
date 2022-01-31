context('/transactions/[txid] - DfTx Set Governance Height on desktop', () => {
  before(() => {
    cy.visit('/transactions/e4624d61d490acca9018ca23205b7f89eaefeb9918ea6abc2c8151c716207fe7?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Governance Height')
  })

  it('should have DfTxSetGovernanceHeight Key', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.Key').contains('LP_LOAN_TOKEN_SPLITS')
  })

  it('should have DfTxSetGovernanceHeight Activation Height', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.ActivationHeight').contains('1585500')
  })

  it('should have DfTxSetGovernance Value', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.Value').contains('141180f0fa020000000012345b6b000000000019ac062f00000000002050c319000000000021ac7529000000000023b83e1d00000000002464273800000000002698077900000000002744294c00000000002824fc0700000000002944d40a00000000002a38e82000000000002becea0a00000000002c7c300800000000002d047e0f00000000002e24eb0e000000000035000410000000000036ac882a0000000000372c2838000000000038a4cc2a0000000000')
  })
})

context('/transactions/[txid] - DfTx Set Governance Height on mobile', () => {
  before(() => {
    cy.visit('/transactions/e4624d61d490acca9018ca23205b7f89eaefeb9918ea6abc2c8151c716207fe7?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Governance Height')
  })

  it('should have DfTxSetGovernanceHeight Key', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.Key').contains('LP_LOAN_TOKEN_SPLITS')
  })

  it('should have DfTxSetGovernanceHeight Activation Height', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.ActivationHeight').contains('1585500')
  })

  it('should have DfTxSetGovernance Value', function () {
    cy.findByTestId('DfTxSetGovernanceHeight.Value').contains('141180f0fa020000000012345b6b000000000019ac062f00000000002050c319000000000021ac7529000000000023b83e1d00000000002464273800000000002698077900000000002744294c00000000002824fc0700000000002944d40a00000000002a38e82000000000002becea0a00000000002c7c300800000000002d047e0f00000000002e24eb0e000000000035000410000000000036ac882a0000000000372c2838000000000038a4cc2a0000000000')
  })
})
