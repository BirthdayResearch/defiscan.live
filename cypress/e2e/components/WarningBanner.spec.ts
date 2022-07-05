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
    // useApiStatus.getBlockStatus has condition to check for synced blocks
    cy.intercept('**/stats', {
      statusCode: 200,
      data: {
        lastSync: new Date().toString(),
        lastSuccessfulSync: new Date().toString()
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(5000)
    cy.findByTestId('warning_banner').should('not.exist')
    })
  })

  it('should display blockchain is down warning banner after preset interval', () => {
    // to check timing for blockchain sync
    let lastSuccessfulSync = new Date();
    lastSuccessfulSync.setSeconds(lastSuccessfulSync.getSeconds() - 5) // 5 secs interval for playground

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
        lastSuccessfulSync: lastSuccessfulSync
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain.')
    })
  })

  it('should display ocean is down warning banner', () => {
    // to check timing for blockchain sync
    let lastSuccessfulSync = new Date();
    lastSuccessfulSync.setSeconds(lastSuccessfulSync.getSeconds() - 5) // 5 secs interval for playground

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
        lastSuccessfulSync: lastSuccessfulSync
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating connection issues on Ocean API.')
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
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain.')
    })
  })
})