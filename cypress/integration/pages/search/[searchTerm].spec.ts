context('search macbook-13', () => {
  before(function () {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have IndexHeader.SearchInput', () => {
    cy.findByTestId('IndexHeader.SearchInput').should('be.visible')
  })

  it('should show no result alert', () => {
    cy.findByTestId('IndexHeader.SearchInput').type('asd123asd321').type('{enter}')
    cy.findByTestId('SearchPage.NoResults').should('contain.text', 'The requested search term asd123asd321 could not be found')
  })

  it('should redirect to transaction', () => {
    cy.visit('/search/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
    cy.url().should('contain', '/transactions/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
  })

  it('should redirect to block - hash', () => {
    cy.visit('/search/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
    cy.url().should('contain', '/blocks/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
  })

  it('should redirect to block - height', () => {
    cy.visit('/search/1292821')
    cy.url().should('contain', '/blocks/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
  })

  it('should redirect to address', () => {
    cy.visit('/search/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
    cy.url().should('contain', '/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })
})

context('/oracles/TSLA-USD iphone-x', () => {
  before(function () {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have IndexHeader.SearchInput', () => {
    cy.findByTestId('IndexHeader.SearchInput').should('be.visible')
  })

  it('should show no result alert', () => {
    cy.findByTestId('IndexHeader.SearchInput').type('asd123asd321').type('{enter}')
    cy.findByTestId('SearchPage.NoResults').should('contain.text', 'The requested search term asd123asd321 could not be found')
  })

  it('should redirect to transaction', () => {
    cy.visit('/search/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
    cy.url().should('contain', '/transactions/2b260d10f92a7416168112ffcf74942c13ac80894a5d4bde391def174bf97dac')
  })

  it('should redirect to block - hash', () => {
    cy.visit('/search/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
    cy.url().should('contain', '/blocks/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
  })

  it('should redirect to block - height', () => {
    cy.visit('/search/1292821')
    cy.url().should('contain', '/blocks/def78eabef69c249ffac8d4fe5bbd18f8d74c6fd95e856794e0bd5052e2286b4')
  })

  it('should redirect to address', () => {
    cy.visit('/search/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
    cy.url().should('contain', '/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })
})
