context('/dex/[poolpairid] on macbook-16', () => {
  before(() => {
    cy.visit('/dex/5?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have PoolPair Details', function () {
    cy.findByTestId('APRDetails').within(() => {
      cy.findByTestId('APRDetails.Title').should('be.visible').should('have.text', 'APR')
      cy.findByTestId('APRDetails.Value').should('be.visible')
      cy.findByTestId('MoreHoverPopover').should('be.visible')
    })

    cy.findByTestId('TokensLocked').within(() => {
      cy.findByTestId('TokensLocked.Title').should('be.visible').should('have.text', 'Tokens Locked')
      cy.findByTestId('TokenA').within(() => {
        cy.findByTestId('Token.Symbol').should('be.visible')
        cy.findByTestId('Token.Value').should('be.visible')
      })
      cy.findByTestId('TokenB').within(() => {
        cy.findByTestId('Token.Symbol').should('be.visible')
        cy.findByTestId('Token.Value').should('be.visible')
      })
    })

    cy.findByTestId('TVL').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'TVL')
      cy.findByTestId('Value').should('be.visible')
    })
    cy.findByTestId('24hVol').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume (24H)')
      cy.findByTestId('Value').should('be.visible')
    })
    cy.findByTestId('30dVol').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume (30D)')
      cy.findByTestId('Value').should('be.visible')
    })
  })

  it('should have PoolPair Graph', function () {
    cy.findByTestId('PoolPairGraph').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume')
      cy.get('.recharts-responsive-container').should('exist')
    })
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Tx ID').should('be.visible')
      cy.wrap(ele).findByText('Age').should('be.visible')
      cy.wrap(ele).findByText('From').should('be.visible')
      cy.wrap(ele).findByText('To').should('be.visible')
      cy.wrap(ele).findByText('Amount').should('be.visible')
    })
  })

  it('should have dex info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 5)
    })
  })

  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })
})

context('/dex/[poolpairId] on iphone-x', () => {
  before(() => {
    cy.visit('/dex/5?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have PoolPair Details', function () {
    cy.findByTestId('APRDetails').within(() => {
      cy.findByTestId('APRDetails.Title').should('be.visible').should('have.text', 'APR')
      cy.findByTestId('APRDetails.Value').should('be.visible')
      cy.findByTestId('MoreHoverPopover').should('be.visible')
    })

    cy.findByTestId('TokensLocked').within(() => {
      cy.findByTestId('TokensLocked.Title').should('be.visible').should('have.text', 'Tokens Locked')
      cy.findByTestId('TokenA').within(() => {
        cy.findByTestId('Token.Symbol').should('be.visible')
        cy.findByTestId('Token.Value').should('be.visible')
      })
      cy.findByTestId('TokenB').within(() => {
        cy.findByTestId('Token.Symbol').should('be.visible')
        cy.findByTestId('Token.Value').should('be.visible')
      })
    })

    cy.findByTestId('TVL').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'TVL')
      cy.findByTestId('Value').should('be.visible')
    })
    cy.findByTestId('24hVol').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume (24H)')
      cy.findByTestId('Value').should('be.visible')
    })
    cy.findByTestId('30dVol').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume (30D)')
      cy.findByTestId('Value').should('be.visible')
    })
  })

  it('should have PoolPair Graph', function () {
    cy.findByTestId('PoolPairGraph').within(() => {
      cy.findByTestId('Title').should('be.visible').should('have.text', 'Volume')
      cy.get('.recharts-responsive-container').should('exist')
    })
  })

  it('should have CardList', function () {
    cy.findAllByTestId('SwapCard').within(() => {
      cy.findByTestId('CardList.Header').within(() => {
        cy.findByTestId('CardList.Header.Children').should('be.visible')
        cy.findByTestId('CardList.Header.ViewButton').should('be.visible')
        cy.findByTestId('CardList.Header.Toggle').should('be.visible')
      })

      cy.findAllByTestId('SwapCard.CardList.Age').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Age')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.From').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'From')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.To').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'To')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.Amount').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Amount')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
    })
  })

  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })
})
