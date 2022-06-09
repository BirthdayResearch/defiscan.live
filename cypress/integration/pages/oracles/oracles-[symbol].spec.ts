context('/oracles/TSLA-USD macbook-13', () => {
  before(function () {
    cy.visit('/oracles/TSLA-USD?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have <Breadcrumb>', () => {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Oracles')
  })

  it('should have price details in <OracleTickerDetail>', () => {
    cy.findByTestId('OracleTickerDetail')
      .should('contain.text', 'TSLA / USD')
      .should('contain.text', 'STOCKS')
      .should('contain.text', 'Trusted Answer')
      .should('contain.text', ' USD')
      .should('contain.text', 'Last Update')
      .should('contain.text', 'Status')
      .should('contain.text', 'Oracle Responses')
  })

  it('should have pricing graph', () => {
    cy.get('main .recharts-responsive-container').should('exist')
  })

  it('should have oracles graph period buttons', () => {
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(0).findByText('24H').should('exist')
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(1).findByText('7D').should('exist')
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).findByText('30D').should('exist')
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(3).findByText('90D').should('exist')
  })

  it('should select button and reload graph when clicked', () => {
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).click()
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(3).should('have.class', 'text-gray-900 dark:text-dark-primary-500 dark:border-gray-700 dark:hover:bg-dark-primary-500 dark:hover:text-white dark:bg-gray-900 bg-gray-200 border-gray-200 hover:bg-primary-50 hover:border-primary-50')
    cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).should('have.class', 'text-primary-500 bg-primary-100 border-primary-100')
    cy.get('#oraclesGraphArea').should('not.exist')
    cy.findAllByTestId('Oracles.Spinner').should('exist')
    cy.get('#oraclesGraphArea').should('exist')
  })

  context('should have <OracleTable>', () => {
    it('should have heading', () => {
      cy.findByTestId('OracleTable')
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

context('/oracles/TSLA-USD iphone-x', () => {
  before(function () {
    cy.visit('/oracles/TSLA-USD?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have <Breadcrumb>', () => {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'Oracles')
  })

  it('should have price details in <OracleTickerDetail>', () => {
    cy.findByTestId('OracleTickerDetail')
      .should('contain.text', 'TSLA / USD')
      .should('contain.text', 'STOCKS')
      .should('contain.text', 'Trusted Answer')
      .should('contain.text', ' USD')
      .should('contain.text', 'Last Update')
      .should('contain.text', 'Status')
      .should('contain.text', 'Oracle Responses')
  })

  it('should have pricing graph', () => {
    cy.get('main .recharts-responsive-container').should('exist')
  })

  context('should have <OracleTable>', () => {
    it('should have heading', () => {
      cy.findByTestId('OracleTable')
        .should('contain.text', 'Oracles')
    })
    it('should have oracles graph period buttons', () => {
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(0).findByText('24H').should('exist')
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(1).findByText('7D').should('exist')
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).findByText('30D').should('exist')
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(3).findByText('90D').should('exist')
    })

    it('should select button and reload graph when clicked', () => {
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).click()
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(2).should('have.class', 'text-primary-500 bg-primary-100 border-primary-100 dark:bg-dark-primary-500 dark:border-dark-primary-500 dark:text-dark-gray-900')
      cy.findAllByTestId('Oracles.GraphPeriodButton').eq(3).should('have.class', 'text-gray-900 dark:text-dark-primary-500 dark:border-gray-700 dark:hover:bg-dark-primary-500 dark:hover:text-white dark:bg-gray-900 bg-gray-200 border-gray-200 hover:bg-primary-50 hover:border-primary-50')
      cy.get('#oraclesGraphArea').should('not.exist')
      cy.findAllByTestId('Oracles.Spinner').should('exist')
      cy.get('#oraclesGraphArea').should('exist')
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
