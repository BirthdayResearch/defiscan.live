context('/transactions/[txid] - DfTx Composite Swap on desktop', () => {
  before(() => {
    cy.visit('/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Composite Swap')
  })

  it('should DftxCompositeSwap To Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapToTitle').should('have.text', 'Swap To')
  })

  it('should DftxCompositeSwap From Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapFromTitle').should('have.text', 'Swap From')
  })

  it('should DftxCompositeSwap From Address', function () {
    cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')
  })

  it('should DftxCompositeSwap To Address', function () {
    cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')
  })

  it('should DftxCompositeSwap From Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenFrom').should('have.text', 'DUSD')
  })

  it('should DftxCompositeSwap From Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap To Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenTo').should('have.text', 'dBTC')
  })

  it('should DftxCompositeSwap To Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap From Amount', function () {
    cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00100000')
  })

  it('should DftxCompositeSwap Max Price', function () {
    cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '51500.00000000')
  })

  it('should DftxCompositeSwap Swap Path Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapPathTitle').should('have.text', 'Swap Path')
  })

  it('should DftxCompositeSwap Swap Path', function () {
    cy.findByTestId('DftxCompositeSwap.SwapPathDiv').should('be.visible')
  })
})

context('/transactions/[txid] - DfTx Composite Swap on mobile', () => {
  before(() => {
    cy.visit('/transactions/8958eb8541bf65a8604b828b4aac33bd2933f5879827b89d4dd25cb52bd6de61?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have DfTx type', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('Type:Composite Swap')
  })

  it('should DftxCompositeSwap To Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapToTitle').should('have.text', 'Swap To')
  })

  it('should DftxCompositeSwap From Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapFromTitle').should('have.text', 'Swap From')
  })

  it('should DftxCompositeSwap From Address', function () {
    cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')
  })

  it('should DftxCompositeSwap To Address', function () {
    cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'df1qcmmkar3spm3q2ts3v5g52xjwqdvtd2a8e72tzm')
  })

  it('should DftxCompositeSwap From Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenFrom').should('have.text', 'DUSD')
  })

  it('should DftxCompositeSwap From Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap To Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenTo').should('have.text', 'dBTC')
  })

  it('should DftxCompositeSwap To Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap From Amount', function () {
    cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00100000')
  })

  it('should DftxCompositeSwap Max Price', function () {
    cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '51500.00000000')
  })

  it('should DftxCompositeSwap Swap Path Title', function () {
    cy.findByTestId('DftxCompositeSwap.SwapPathTitle').should('have.text', 'Swap Path')
  })

  it('should DftxCompositeSwap Swap Path', function () {
    cy.findByTestId('DftxCompositeSwap.SwapPathDiv').should('be.visible')
  })
})
