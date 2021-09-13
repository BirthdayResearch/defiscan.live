context('/prices/TSLA-USD', () => {
  before(function () {
    cy.visit('/prices/TSLA-USD?network=MainNet')
  })

  it('should have <Breadcrumb>', () => {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Prices')
  })

  it('should have price details in <PriceTickerDetail>', () => {
    cy.findByTestId('PriceTickerDetail')
      .should('contain.text', 'TSLA / USD')
      .should('contain.text', 'STOCKS')
      .should('contain.text', 'Trusted answer')
      .should('contain.text', ' USD')
      .should('contain.text', 'Last update')
      .should('contain.text', 'Status')
      .should('contain.text', 'Oracle responses')
  })

  it('should have pricing graph', () => {
    cy.get('main .recharts-responsive-container').should('exist')
  })

  context('<PriceOracleTable>', () => {
    it('should have heading', () => {
      cy.findByTestId('PriceOracleTable')
        .should('contain.text', 'Oracles')
    })

    it('should have table header', () => {
      cy.findByTestId('PriceOracleTable').get('thead')
        .should('contain.text', 'DATE LAST UPDATED')
        .should('contain.text', 'ORACLE')
        .should('contain.text', 'PRICE')
        .should('contain.text', 'AGGREGATED PRICE')
        .should('contain.text', 'TXID')
    })

    it('should have table data', () => {
      cy.findByTestId('PriceOracleTable').get('td')
        .contains(/[a-zA-Z]{3} [0-9]{1,2}, [0-9]{2}:[0-9]{2}:[0-9]{2} (AM|PM)/)

      cy.findByTestId('PriceOracleTable').get('td')
        .should('contain.text', '$')

      cy.findByTestId('PriceOracleTable').get('td')
        .contains(/[0-f]{64}/)
    })
  })

  it('should have section: Pricing feeds by', () => {
    cy.get('main section')
      .should('contain.text', 'Pricing feeds by')
  })
})
