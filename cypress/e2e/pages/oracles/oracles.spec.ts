context('/oracles on macbook-13', () => {
  before(function () {
    cy.visit('/oracles?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have section: Prices provided by Oracles', () => {
    cy.get('main').should('contain.text', 'Prices provided by Oracles')
  })

  it('should contain at least 5 price feed', function () {
    cy.findAllByTestId('OracleFeed').should('have.length.at.least', 5)
  })

  it('should contain at least 6 filter btns', function () {
    cy.findAllByTestId('FeedFilter.Types').should('have.length.at.least', 6)
  })

  it('should contain at most 1 availability btn', function () {
    cy.findAllByTestId('FeedFilter.Availability.Btn').should('have.length.at.most', 1)
  })

  it('should have common OracleFeed texts', () => {
    cy.findAllByTestId('OracleFeed').eq(0)
      .should('contain.text', 'View')
      .should('contain.text', 'USD')
  })

  it('should be able to click on a OracleFeed', () => {
    cy.interceptServerSideWait(() => {
      cy.findAllByTestId('OracleFeed').eq(0).click()
    })

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains('/oracles/')
    })
  })
})

context('/oracles on iphone-x', () => {
  before(function () {
    cy.visit('/oracles?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have section: Prices provided by Oracles', () => {
    cy.get('main').should('contain.text', 'Prices provided by Oracles')
  })

  it('should contain at least 5 price feed', function () {
    cy.findAllByTestId('OracleFeed').should('have.length.at.least', 5)
  })

  it('should contain at least 6 filter btns', function () {
    cy.findAllByTestId('FeedFilter.Types').should('have.length.at.least', 6)
  })

  it('should contain at most 1 availability btn', function () {
    cy.findAllByTestId('FeedFilter.Availability.Btn').should('have.length.at.most', 1)
  })

  it('should have common OracleFeed texts', () => {
    cy.findAllByTestId('OracleFeed').eq(0)
      .should('contain.text', 'View')
      .should('contain.text', 'USD')
  })

  it('should be able to click on a OracleFeed', () => {
    cy.interceptServerSideWait(() => {
      cy.findAllByTestId('OracleFeed').eq(0).click()
    })

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains('/oracles/')
    })
  })
})
