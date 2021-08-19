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

    cy.findByTestId('CursorPagination.Prev').click()
    cy.findByTestId('OverflowTable').should((ele) => {
      expect(ele.text()).equals(pages[0])
      expect(ele.text()).not.equals(pages[1])
    })
  })
})

context('/tokens on mobile', () => {

  before(() => {
    cy.viewport('iphone-x')
    cy.visit('/blocks?network=MainNet')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Blocks')
  })
})
