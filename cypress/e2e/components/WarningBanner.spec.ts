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

  beforeEach(() => {
    cy.visit('/?network=Playground')
    cy.viewport('macbook-16')
  })

  it('should not display warning banner if nothing is down', function () {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/stats', { 
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    })
    cy.findByTestId('warning_banner').should('not.exist')
  })

  it.only('should display blockchain is down warning banner after preset interval', () => {
    // to check timing for blockchain sync
    var t = new Date();
    t.setSeconds(t.getSeconds() - 5) // 5 secs interval for playground

    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/stats', {
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: t
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain. ')
    })
  })

  it('should display ocean is down warning banner', () => {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/stats', { 
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('have.text', 'We are currently investigating connection issues on Ocean API. ')
    })
  })

  it('should display blockchain is down warning banner if stats is down', () => {
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: outage
    })
    cy.intercept('**/stats', { 
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true'
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('have.text', 'We are currently investigating a syncing issue on the blockchain. ')
    })
  })
})