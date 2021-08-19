context('/blocks on desktop', () => {
  before(() => {
    cy.visit('/blocks?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Blocks')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('AGE').should('be.visible')
      cy.wrap(ele).findByText('TRANSACTIONS').should('be.visible')
      cy.wrap(ele).findByText('MINTER').should('be.visible')
      cy.wrap(ele).findByText('SIZE (B)').should('be.visible')
      cy.wrap(ele).findByText('DIFFICULTY').should('be.visible')
    })
  })

  it('should have minutes ago in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Cell').then(ele => {
      cy.wrap(ele).contains('minutes ago').should('be.visible')
    })
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
  })
})

context('/blocks on mobile', () => {

  before(() => {
    cy.visit('/blocks?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Blocks')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HEIGHT').should('be.visible')
      cy.wrap(ele).findByText('AGE').should('be.visible')
      cy.wrap(ele).findByText('TRANSACTIONS').should('be.visible')
      cy.wrap(ele).findByText('MINTER').should('not.be.visible')
    })
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    const pages: Record<number, string> = {}

    cy.findByTestId('OverflowTable').should((ele) => {
      pages[0] = ele.text()
    })

    cy.findByTestId('CursorPagination.Next').click()
    cy.wait(1000)
    cy.findByTestId('OverflowTable').should((ele) => {
      pages[1] = ele.text()

      expect(pages[1]).not.equals(pages[0])
    })
  })
})
