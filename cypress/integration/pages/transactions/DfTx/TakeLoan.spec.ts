context('/transactions/[txid] - Take Loan on desktop', () => {
  before(() => {
    cy.visit('/transactions/04fe77d0176dd8c22a135253c4cc71a4fdefc48ca2bb6aa8d33954714585a186?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have subtitle', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('OP_DEFI_TX_TAKE_LOAN')
  })

  it('should have type number', () => {
    cy.findByTestId('transaction-take-loan-type-number').contains('88')
  })

  it('should have a vaultId', () => {
    cy.findByTestId('transaction-take-loan-vaultId').contains('27a8209d6b851d9aa4b1402aa5e50368c40aaf360eb547a905e1d8b4c5a2e2d9')
  })

  it('should have a clickable vaultId', () => {
    const a = cy.findByTestId('transaction-take-loan-vaultId').children('a')
    a.contains('27a8209d6b851d9aa4b1402aa5e50368c40aaf360eb547a905e1d8b4c5a2e2d9')
  })

  it('should have a signature', () => {
    cy.findByTestId('transaction-take-loan-signature').contains('1147556984')
  })

  it('should have data stack to', () => {
    cy.findByTestId('transaction-take-loan-data-to-stack-type-0').contains('OP_HASH160')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-0').contains('169')

    cy.findByTestId('transaction-take-loan-data-to-stack-type-1').contains('OP_PUSHDATA')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-1').contains('18c2a5b07a220de462e46aa32d704fc849bdb71d')

    cy.findByTestId('transaction-take-loan-data-to-stack-type-2').contains('OP_EQUAL')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-2').contains('135')
  })

  it('should have a token amounts', () => {
    cy.findByTestId('transaction-take-loan-data-tokenAmounts-token-0').contains('15')
    cy.findByTestId('transaction-take-loan-data-tokenAmounts-amount-0').contains('25')
  })
})

context('/transactions/[txid] - DfTx Token Create on mobile', () => {
  before(() => {
    cy.visit('/transactions/04fe77d0176dd8c22a135253c4cc71a4fdefc48ca2bb6aa8d33954714585a186?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('DfTxHeader.Title').contains('DeFi Transaction')
  })

  it('should have subtitle', () => {
    cy.findByTestId('DfTxHeader.Subtitle').contains('OP_DEFI_TX_TAKE_LOAN')
  })

  it('should have type number', () => {
    cy.findByTestId('transaction-take-loan-type-number').contains('88')
  })

  it('should have a vaultId', () => {
    cy.findByTestId('transaction-take-loan-vaultId').contains('27a8209d6b851d9aa4b1402aa5e50368c40aaf360eb547a905e1d8b4c5a2e2d9')
  })

  it('should have a clickable vaultId', () => {
    cy.findByTestId('transaction-take-loan-vaultId').children('a')
  })

  it('should have a signature', () => {
    cy.findByTestId('transaction-take-loan-signature').contains('1147556984')
  })

  it('should have data stack to', () => {
    cy.findByTestId('transaction-take-loan-data-to-stack-type-0').contains('OP_HASH160')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-0').contains('169')

    cy.findByTestId('transaction-take-loan-data-to-stack-type-1').contains('OP_PUSHDATA')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-1').contains('18c2a5b07a220de462e46aa32d704fc849bdb71d')

    cy.findByTestId('transaction-take-loan-data-to-stack-type-2').contains('OP_EQUAL')
    cy.findByTestId('transaction-take-loan-data-to-stack-code-2').contains('135')
  })

  it('should have a token amounts', () => {
    cy.findByTestId('transaction-take-loan-data-tokenAmounts-token-0').contains('15')
    cy.findByTestId('transaction-take-loan-data-tokenAmounts-amount-0').contains('25')
  })
})
