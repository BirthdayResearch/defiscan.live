context('/masternodes on macbook-16', () => {
  before(() => {
    cy.visit('/masternodes?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Masternodes.Stats.TVL').should('exist')
    cy.findByTestId('Masternodes.Stats.ZeroYearLock').should('exist')
    cy.findByTestId('Masternodes.Stats.FiveYearLock').should('exist')
    cy.findByTestId('Masternodes.Stats.TenYearLock').should('exist')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Masternodes')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Owner').should('be.visible')
      cy.wrap(ele).findByText('Operator').should('be.visible')
      cy.wrap(ele).findByText('Creation Height').should('be.visible')
      cy.wrap(ele).findByText('Resign Height').should('be.visible')
      cy.wrap(ele).findByText('Minted Blocks').should('be.visible')
      cy.wrap(ele).findByText('State').should('be.visible')
      cy.wrap(ele).findByText('Time Lock').should('be.visible')
    })
  })

  it('should have masternode info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 7)
    })
  })

  it('should have 30 masternodes listed', function () {
    cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 30)
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    const pages: Record<number, string> = {}

    cy.findByTestId('OverflowTable').should((ele) => {
      pages[0] = ele.text()
    })

    cy.findByTestId('CursorPagination.Next').click()
    cy.findByTestId('OverflowTable').should((ele) => {
      pages[1] = ele.text()

      expect(pages[1]).not.equals(pages[0])
    })

    cy.findByTestId('CursorPagination.Prev').click()
    cy.findByTestId('OverflowTable').should((ele) => {
      expect(ele.text()).equals(pages[0])
      expect(ele.text()).not.equals(pages[1])
    })
  })
})

context('/masternodes on iphone-x', () => {
  before(() => {
    cy.visit('/masternodes?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Masternodes.Stats.TVL').should('exist')
    cy.findByTestId('Masternodes.Stats.ZeroYearLock').should('exist')
    cy.findByTestId('Masternodes.Stats.FiveYearLock').should('exist')
    cy.findByTestId('Masternodes.Stats.TenYearLock').should('exist')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Masternodes')
  })

  it('should have CardList header information', function () {
    cy.findAllByTestId('MasternodeCard').within(() => {
      cy.findByTestId('BlocksCard.CardList.Operator').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Operator')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.CreationHeight').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Creation Height')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.ResignHeight').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Resign Height')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.MintedBlocks').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Minted Blocks')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.State').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'State')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.TimeLock').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Time Lock')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
    })
  })

  it('should have 30 masternodes listed', function () {
    cy.findAllByTestId('MasternodeCard').should('have.length.at.least', 30)
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    const pages: Record<number, string> = {}

    cy.findByTestId('OverflowTable').should((ele) => {
      pages[0] = ele.text()
    })

    cy.findByTestId('CursorPagination.Next').click()
    cy.findByTestId('OverflowTable').should((ele) => {
      pages[1] = ele.text()

      expect(pages[1]).not.equals(pages[0])
    })

    cy.findByTestId('CursorPagination.Prev').click()
    cy.findByTestId('OverflowTable').should((ele) => {
      expect(ele.text()).equals(pages[0])
      expect(ele.text()).not.equals(pages[1])
    })
  })
})
