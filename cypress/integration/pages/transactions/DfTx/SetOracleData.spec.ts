context('/transactions/[txid] - DfTx Set Oracle Data on desktop', () => {
  before(() => {
    cy.visit('/transactions/34ad754a5e48b8c36239a4a3ce3c707269c8b4afdc7539c7ed63856e84b9d80b?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Oracle Data')
  })

  it('should have DfTxSetOracleData Oracle ID ',  ()  =>{
    cy.findByTestId('DfTxSetOracleData.OracleId').should('have.text', 'd96d04bd4b5b35d12d20d9c6b70809f8e83118ccffff307b82459dd42a6b5f07')
  })

  it('should have DfTxSetOracleData Received Time',  ()  =>{
    cy.findByTestId('DfTxSetOracleData.Timestamp').should('have.text', 'Oct 7, 2021, 5:43:25 PM')
  })

  it('should have DfTxSetOracleData Token DFI Amount',  () => {
    cy.findByTestId('DfTxSetOracleData.DFIAmount').should('have.text', '2.50350398 DFI')
  })

  it('should have DfTxSetOracleData Token DFI Currency',  () => {
    cy.findByTestId('DfTxSetOracleData.DFICurrency').should('have.text', 'USD')
  })
})


context('/transactions/[txid] - DfTx Set Oracle Data on mobile', () => {
  before(() => {
    cy.visit('/transactions/34ad754a5e48b8c36239a4a3ce3c707269c8b4afdc7539c7ed63856e84b9d80b?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Set Oracle Data')
  })

  it('should have DfTxSetOracleData Oracle ID ',  ()  =>{
    cy.findByTestId('DfTxSetOracleData.OracleId').should('have.text', 'd96d04bd4b5b35d12d20d9c6b70809f8e83118ccffff307b82459dd42a6b5f07')
  })

  it('should have DfTxSetOracleData Received Time',  ()  =>{
    cy.findByTestId('DfTxSetOracleData.Timestamp').should('have.text', 'Oct 7, 2021, 5:43:25 PM')
  })

  it('should have DfTxSetOracleData Token DFI Amount',  () => {
    cy.findByTestId('DfTxSetOracleData.DFIAmount').should('have.text', '2.50350398 DFI')
  })

  it('should have DfTxSetOracleData Token DFI Currency',  () => {
    cy.findByTestId('DfTxSetOracleData.DFICurrency').should('have.text', 'USD')
  })
})
