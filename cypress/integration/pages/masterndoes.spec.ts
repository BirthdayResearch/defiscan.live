context('/masternodes on desktop', () => {
  before(() => {
    cy.visit('/masternodes?network=MainNet')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Masternodes')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('OWNER').should('be.visible')
      cy.wrap(ele).findByText('OPERATOR').should('be.visible')
      cy.wrap(ele).findByText('CREATION HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('RESIGN HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('MINTED BLOCKS').should('be.visible')

      //should not be visble due to overflow table
      cy.wrap(ele).findByText('STATE').should('not.be.visible')
    })
  })

  it('should have masternode info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 6)
    })
  })

  it('should have 20 masternodes listed', function () {
    cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 20)
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

context('/masternodes on mobile', () => {
  before(() => {
    cy.viewport('iphone-x')
    cy.visit('/masternodes?network=MainNet')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Masternodes')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('OWNER').should('be.visible')
      cy.wrap(ele).findByText('OPERATOR').should('be.visible')
      cy.wrap(ele).findByText('CREATION HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('RESIGN HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('MINTED BLOCKS').should('be.visible')
      cy.wrap(ele).findByText('STATE').should('not.be.visible')
    })
  })

  it('should have masternode info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 20)
  })

  it('should have 20 masternodes listed', function () {
    cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 20)
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
