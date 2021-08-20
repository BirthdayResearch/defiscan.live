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
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      const pageOneFirstCell = ele[0].innerText
      cy.findByTestId('CursorPagination.Next').click()
      cy.wait(300)
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
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
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      const pageOneFirstCell = ele[0].innerText
      cy.findByTestId('CursorPagination.Next').click()
      cy.wait(300)
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })
})
