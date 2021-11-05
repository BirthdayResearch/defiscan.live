context('/prices/TSLA-USD macbook-13', () => {
  before(function () {
    cy.visit('/prices/TSLA-USD?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
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
      .should('contain.text', 'LOAN TOKEN')
      .should('contain.text', 'Trusted Answer')
      .should('contain.text', ' USD')
      .should('contain.text', 'Last Update')
      .should('contain.text', 'Status')
      .should('contain.text', 'Oracle Responses')
  })

  it('should have pricing graph', () => {
    cy.get('main .recharts-responsive-container').should('exist')
  })

  context('should have <PriceOracleTable>', () => {
    it('should have heading', () => {
      cy.findByTestId('PriceOracleTable')
        .should('contain.text', 'Oracles')
    })

    it('should have table header', () => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('DATE LAST UPDATED').should('be.visible')
        cy.wrap(ele).findByText('ORACLE').should('be.visible')
        cy.wrap(ele).findByText('PRICE').should('be.visible')
        cy.wrap(ele).findByText('TXID').should('be.visible')
        cy.wrap(ele).findByText('AGGREGATED PRICE').should('be.visible')
      })
    })

    it('should have Oracle data', () => {
      cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
        cy.wrap(ele).contains(/[a-zA-Z]{3} [0-9]{1,2}, [0-9]{2}:[0-9]{2}:[0-9]{2} (AM|PM)/)
        cy.wrap(ele).contains(/[0-f]{64}/)
        cy.wrap(ele).should('contain.text', '$')
      })
    })
  })
})

context('/prices/TSLA-USD iphone-x', () => {
  before(function () {
    cy.visit('/prices/TSLA-USD?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
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
      .should('contain.text', 'LOAN TOKEN')
      .should('contain.text', 'Trusted Answer')
      .should('contain.text', ' USD')
      .should('contain.text', 'Last Update')
      .should('contain.text', 'Status')
      .should('contain.text', 'Oracle Responses')
  })

  it('should have pricing graph', () => {
    cy.get('main .recharts-responsive-container').should('exist')
  })

  context('should have <PriceOracleTable>', () => {
    it('should have heading', () => {
      cy.findByTestId('PriceOracleTable')
        .should('contain.text', 'Oracles')
    })

    it('should have table header', () => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('DATE LAST UPDATED').should('be.visible')
        cy.wrap(ele).findByText('ORACLE').should('be.visible')
        cy.wrap(ele).findByText('PRICE').should('be.visible')
        cy.wrap(ele).findByText('TXID').should('exist')
        cy.wrap(ele).findByText('AGGREGATED PRICE').should('exist')
      })
    })

    it('should have Oracle data', () => {
      cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
        cy.wrap(ele).contains(/[a-zA-Z]{3} [0-9]{1,2}, [0-9]{2}:[0-9]{2}:[0-9]{2} (AM|PM)/)
        cy.wrap(ele).contains(/[0-f]{64}/)
        cy.wrap(ele).should('contain.text', '$')
      })
    })
  })
})
