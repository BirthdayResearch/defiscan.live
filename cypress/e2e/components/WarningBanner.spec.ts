context('Warning banner on desktop', () => {
  const outage = {
    status: {
      description: 'outage'
    }
  }
  const operational = {
    status: {
      description: 'operational'
    }
  }
  before(() => {
    cy.visit('/?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should not display warning banner if nothing is down', function () {
    cy.intercept('**/mainnet/stats', { 
      statusCode: 200,
      data: {
        count: {
          blocks: 2026879,
          masternodes: 11461,
          prices: 119,
          tokens: 173
        },
        price: {
          usd: 0.8560906031201264,
          usdt: 0.8560906031201264
        },
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    })
    cy.findByTestId('warning_banner').should('not.exist')
  })

  // TODO: test fails before api is down to display the warning banner
  it.only('should display blockchain is down warning banner', () => {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/mainnet/stats', { 
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(100000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain. View more details on the DeFiChain Status Page.')
    })
  })

  it.only('should display ocean is down warning banner', () => {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/mainnet/stats', { 
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(100000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('announcements_text').should('not.contain', 'We are currently investigating connection issues on Ocean API. View more details on the DeFiChain Status Page.')
    })
  })

  it.only('should display blockchain is down warning banner if stats is down', () => {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/mainnet/stats', { 
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true'
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(100000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain.')
    })
  })
})