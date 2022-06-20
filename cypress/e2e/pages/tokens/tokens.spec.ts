context('/tokens on macbook-16', () => {
  before(() => {
    cy.visit('/tokens?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Tokens')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Token').should('be.visible')
      cy.wrap(ele).findByText('Name').should('be.visible')
      cy.wrap(ele).findByText('Category').should('be.visible')
      cy.wrap(ele).findByText('Minted').should('be.visible')
    })
  })

  it('should have Tether in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(3).then(ele => {
      cy.wrap(ele).findByText('dUSDT').should('be.visible')
      cy.wrap(ele).findByText('Tether USD').should('be.visible')
      cy.wrap(ele).findByText('DAT').should('be.visible')
    })
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
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

context('/tokens on iphone-x', () => {
  before(() => {
    cy.visit('/tokens?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Tokens')
  })

  it('should have CardList list information', function () {
    cy.findAllByTestId('TokenCard').within(() => {
      cy.findByTestId('CardList.Header').within(() => {
        cy.findByTestId('CardList.Header.Children').should('be.visible')
        cy.findByTestId('CardList.Header.ViewButton').should('be.visible')
        cy.findByTestId('CardList.Header.Toggle').should('be.visible')
      })

      cy.findAllByTestId('TokenCard.CardList.Name').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Name')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('TokenCard.CardList.Category').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Category')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('TokenCard.CardList.Minted').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Minted')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
    })
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
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
