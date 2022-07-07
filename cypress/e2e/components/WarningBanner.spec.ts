/* eslint-disable cypress/no-unnecessary-waiting */

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
    }).as('getAnnouncements')
    cy.wait('@getAnnouncements').then(() => {
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'Other announcements')
    })
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
    }).as('getAnnouncements')
    // Pierre - testing why github e2e is failing but not in local 30sec timeout
    cy.wait('@getAnnouncements').then(() => {
      cy.wait(5000)
      cy.findByTestId('warning_banner').should('not.exist')
    })
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
      body: []
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
  const sampleNetworkData = {
    data: {
      count: {
        blocks: 8895,
        prices: 15,
        tokens: 32,
        masternodes: 10
      },
      burned: {
        address: 0,
        fee: 15,
        auction: 0,
        payback: 0.50574055,
        emission: 334807.59827419,
        total: 334822.59827419
      },
      tvl: {
        dex: 222050572.00136113,
        masternodes: 840000,
        loan: 28631944.99842,
        total: 251522516.99978113
      },
      price: {
        usd: 10000,
        usdt: 10000
      },
      masternodes: {
        locked: [{
          weeks: 0,
          count: 10,
          tvl: 840000
        }]
      },
      loan: {
        count: {
          collateralTokens: 12,
          loanTokens: 5,
          openAuctions: 0,
          openVaults: 4,
          schemes: 6
        },
        value: {
          collateral: 28631944.99842,
          loan: 118101.94192486
        }
      },
      emission: {
        masternode: 134.999832,
        dex: 103.08268,
        community: 19.887464,
        anchor: 0.081008,
        burned: 146.989016,
        total: 405.04
      },
      net: {
        version: 2090000,
        subversion: '/DeFiChain:2.9.0/',
        protocolversion: 70029
      },
      blockchain: {
        difficulty: 4.656542373906925e-10
      }
    }
  }

  beforeEach(() => {
    cy.visit('/?network=Playground')
    cy.viewport('macbook-16')
  })

  it('should not display warning banner if nothing is down', function () {
    cy.intercept('**/announcements', {
      statusCode: 200,
      body: []
    })
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/stats', {
      statusCode: 200,
      body: sampleNetworkData
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(5000)
      cy.findByTestId('warning_banner').should('not.exist')
    })
  })

  it('should display blockchain is down warning banner after preset interval and hide existing announcements', () => {
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
      cy.wait(5000)
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
      body: undefined
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(5000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain.')
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
      body: undefined
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(5000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating connection issues on Ocean API.')
    })
  })

  it('should display blockchain is down warning banner if stats is down', () => {
    cy.intercept('**/announcements', {
      statusCode: 200,
      body: []
    })
    cy.intercept('**/blockchain', {
      statusCode: 200,
      body: operational
    })
    cy.intercept('**/overall', {
      statusCode: 200,
      body: operational
    })
    // if stats' body is undefined or has error = only lastSync will be updated = blockchain is down
    cy.intercept('**/stats', {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true'
      }
    }).as('getStats')
    cy.wait('@getStats').then(() => {
      cy.wait(5000)
      cy.findByTestId('warning_banner').should('exist')
      cy.findByTestId('warning_banner').should('contain', 'We are currently investigating a syncing issue on the blockchain.')
    })
  })
})
