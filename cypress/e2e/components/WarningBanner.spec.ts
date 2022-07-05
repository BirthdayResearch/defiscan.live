context('Warning banner on desktop - Announcements', () => {

  beforeEach(() => {
    cy.visit('/?network=Playground')
    cy.viewport('macbook-16')
  })

  it('should display warning banner if there is existing announcement', function () {
    cy.intercept('**/announcements', {
      statusCode: 200,
      body: [{
        lang: {
          en: 'Other announcements'
        },
        type: 'SCAN'
      }]
    })
    cy.findByTestId('warning_banner').should('exist')
    cy.findByTestId('warning_banner').should('contain', 'Other announcements')
  })

  it('should not display warning banner if there is existing announcement with other types', function () {
    cy.intercept('**/announcements', {
      statusCode: 200,
      body: [{
        lang: {
          en: 'Other announcements'
        },
        type: 'OTHER_ANNOUNCEMENT'
      }]
    })
    cy.findByTestId('warning_banner').should('not.exist')
  })

  it('should not display warning banner if there are no existing announcement', function () {
    cy.intercept('**/announcements', {
      statusCode: 200,
      body: []
    })
    cy.findByTestId('warning_banner').should('not.exist')
  })

  it('should not display warning banner if not successful', function () {
    cy.intercept('**/announcements', {
      statusCode: 404,
      // body: []
    })
    cy.findByTestId('warning_banner').should('not.exist')
  })
})

context('Warning banner on desktop - Blockchain and Ocean warning messages', () => {
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

  it('should display blockchain is down warning banner after preset interval and hide existing announcements', () => {
    // to check timing for blockchain sync
    let lastSuccessfulSync = new Date();
    lastSuccessfulSync.setSeconds(lastSuccessfulSync.getSeconds() - 5) // 5 secs interval for playground

    cy.intercept('**/announcements', {
      statusCode: 200,
      body: [{
        lang: {
          en: 'Other announcements'
        },
        type: 'SCAN'
      }]
    }).as('getAnnouncements')
    cy.wait('@getAnnouncements').then(() => {
      cy.wait(3000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'Other announcements')
    })

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