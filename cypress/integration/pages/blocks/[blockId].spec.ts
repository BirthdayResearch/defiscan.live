context('/blocks/[blockId] on desktop', () => {
  before(() => {
    cy.visit('/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

  it('should have heading', () => {
    cy.findByTestId('block-hash').should('have.text', 'f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('be.visible')
      cy.wrap(ele).findByText('CONFIRMATIONS').should('be.visible')
    })
  })

  // it('should CursorPagination.Next', function () {
  //   cy.wait(500)
  //   cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
  //     const pageOneFirstCell = ele[0].innerText
  //     cy.interceptServerSideWait(() => {
  //       cy.findByTestId('CursorPagination.Next').click()
  //     })
  //     cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
  //       expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
  //     })
  //   })
  // })
});

context('/blocks/[blockId] on mobile', () => {
  before(() => {
    cy.visit('/blocks/f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.get('h1').contains('Block #')
  })

  it('should have heading', () => {
    cy.findByTestId('block-hash').should('have.text', 'f66c334c4aa6ea3f3dd18187447d16ae2c6f73941d80eab3ef0e2f1b10acd4c7')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('HASH').should('be.visible')
      cy.wrap(ele).findByText('TIMESTAMP').should('not.be.visible')
    })
  })

  // it('should CursorPagination.Next', function () {
  //   cy.wait(500)
  //   cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
  //     const pageOneFirstCell = ele[0].innerText
  //     cy.interceptServerSideWait(() => {
  //       cy.findByTestId('CursorPagination.Next').click()
  //     })
  //     cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
  //       expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
  //     })
  //   })
  // })
})
