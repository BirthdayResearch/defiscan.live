context('/prices on macbook-13', () => {
  before(function () {
    cy.visit('/prices?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have section: Price Feeds', () => {
    cy.get('main').should('contain.text', 'Price Feeds')
  })

  it('should contain at least 5 price feed', function () {
    cy.findAllByTestId('PriceFeed').should('have.length.above', 5)
  })

  it('should contain at least 6 filter btns', function () {
    cy.findAllByTestId('FeedFilter.Types').should('have.length.at.least', 6)
  })

  it('should contain at most 1 availability btn', function () {
    cy.findAllByTestId('FeedFilter.Availability.Btn').should('have.length.at.most', 1)
  })

  it('should have common PriceFeed texts', () => {
    cy.findAllByTestId('PriceFeed').eq(0)
      .should('contain.text', 'View')
      .should('contain.text', 'USD')
  })

  it('should be able to click on a PriceFeed', () => {
    cy.interceptServerSideWait(() => {
      cy.findAllByTestId('PriceFeed').eq(0).click()
    })

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains('/prices/')
    })
  })
})

context('/prices on iphone-x', () => {
  before(function () {
    cy.visit('/prices?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have section: Price Feeds', () => {
    cy.get('main').should('contain.text', 'Price Feeds')
  })

  it('should contain at least 5 price feed', function () {
    cy.findAllByTestId('PriceFeed').should('have.length.above', 5)
  })

  it('should contain at least 6 filter btns', function () {
    cy.findAllByTestId('FeedFilter.Types').should('have.length.at.least', 6)
  })

  it('should contain at most 1 availability btn', function () {
    cy.findAllByTestId('FeedFilter.Availability.Btn').should('have.length.at.most', 1)
  })

  it('should have common PriceFeed texts', () => {
    cy.findAllByTestId('PriceFeed').eq(0)
      .should('contain.text', 'View')
      .should('contain.text', 'USD')
  })

  it('should be able to click on a PriceFeed', () => {
    cy.interceptServerSideWait(() => {
      cy.findAllByTestId('PriceFeed').eq(0).click()
    })

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains('/prices/')
    })
  })
})
