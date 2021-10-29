context('search component macbook-16', () => {
  before(function () {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have SearchBar.Input', () => {
    cy.findByTestId('SearchBar.Input').should('be.visible')
  })

  it('should have search results - blocks', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('123')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Block.123').should('have.attr', 'href', '/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2')
  })

  it('should have search results - txn', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36').should('have.attr', 'href', '/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
  })

  it('should have search results - address', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8').should('have.attr', 'href', '/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
  })
})

context('collapse search component macbook-16', () => {
  before(function () {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have SearchBar.Input', () => {
    cy.findByTestId('SearchBar').click()
    cy.findByTestId('SearchBar.Input').should('be.visible')
  })

  it('should have search results - blocks', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('123')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Block.123').should('have.attr', 'href', '/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2')
  })

  it('should have search results - txn', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36').should('have.attr', 'href', '/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
  })

  it('should have search results - address', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8').should('have.attr', 'href', '/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
  })
})

context('search component iphone-x', () => {
  before(function () {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have SearchBar.Input', () => {
    cy.findByTestId('Header.OpenMenu').click()
    cy.findByTestId('SearchBar.Input').should('be.visible')
  })

  it('should have search results - blocks', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('123')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Block.123').should('have.attr', 'href', '/blocks/61899dc1c56e96e404baadb78af1c9eb06b7800981322d6c2ea453e708d424a2')
  })

  it('should have search results - txn', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Transaction.ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36').should('have.attr', 'href', '/transactions/ef8583af7b8ab2f18a423b0097a82bf38ebf2775d5e7042159dcc0da73450f36')
  })

  it('should have search results - address', () => {
    cy.findByTestId('SearchBar.Input').clear()
    cy.findByTestId('SearchBar.Input').type('8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
    cy.wait(400)
    cy.findByTestId('SearchResultRow.Address.8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8').should('have.attr', 'href', '/address/8MR5RWXEDdy9CpFdN5CG5WBe41EQJZ9ZJ8')
  })
})
