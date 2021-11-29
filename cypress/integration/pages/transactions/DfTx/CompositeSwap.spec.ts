context('/transactions/[txid] - DfTx Composite Swap on desktop', () => {
  before(() => {
    cy.visit('/transactions/f671bb667c0a283fb73d9ace4961e7e8da933fc616c32872647b21eadce75617?network=MainNet')
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
    cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'dSPPfAPY8BA3TQdqfZRnzJ7212HPWunDms')
  })

  it('should DftxCompositeSwap To Address', function () {
    cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'dV9DpVVVjatib3Ksge4RAeZ5yU2cdcK98q')
  })

  it('should DftxCompositeSwap From Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenFrom').should('have.text', 'ETH')
  })

  it('should DftxCompositeSwap From Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap To Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenTo').should('have.text', 'DFI')
  })

  it('should DftxCompositeSwap To Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap From Amount', function () {
    cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00108176')
  })

  it('should DftxCompositeSwap Max Price', function () {
    cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '9223372036854775807.00000000')
  })
})

context('/transactions/[txid] - DfTx Composite Swap on mobile', () => {
  before(() => {
    cy.visit('/transactions/f671bb667c0a283fb73d9ace4961e7e8da933fc616c32872647b21eadce75617?network=MainNet')
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
    cy.findByTestId('DftxCompositeSwap.FromAddress').should('have.text', 'dSPPfAPY8BA3TQdqfZRnzJ7212HPWunDms')
  })

  it('should DftxCompositeSwap To Address', function () {
    cy.findByTestId('DftxCompositeSwap.ToAddress').should('have.text', 'dV9DpVVVjatib3Ksge4RAeZ5yU2cdcK98q')
  })

  it('should DftxCompositeSwap From Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenFrom').should('have.text', 'ETH')
  })

  it('should DftxCompositeSwap From Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.FromTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap To Token', function () {
    cy.findByTestId('DftxCompositeSwap.TokenTo').should('have.text', 'DFI')
  })

  it('should DftxCompositeSwap To Token Symbol', function () {
    cy.findByTestId('DftxCompositeSwap.ToTokenSymbol').should('be.visible')
  })

  it('should DftxCompositeSwap From Amount', function () {
    cy.findByTestId('DftxCompositeSwap.FromAmount').should('have.text', '0.00108176')
  })

  it('should DftxCompositeSwap Max Price', function () {
    cy.findByTestId('DftxCompositeSwap.MaxPrice').should('have.text', '9223372036854775807.00000000')
  })
})
