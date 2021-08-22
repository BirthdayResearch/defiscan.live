context('/tokens on desktop', () => {
  before(() => {
    cy.visit('/tokens?network=MainNet')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'Tokens')
  })

  it('should have AdaptiveTable header information', function () {
    cy.findByTestId('AdaptiveTable.Header').then(ele => {
      cy.wrap(ele).findByText('TOKEN').should('be.visible')
      cy.wrap(ele).findByText('NAME').should('be.visible')
      cy.wrap(ele).findByText('CATEGORY').should('be.visible')
      cy.wrap(ele).findByText('MINTED').should('be.visible')
    })
  })

  it('should have Tether in AdaptiveTable', function () {
    cy.findAllByTestId('AdaptiveTable.Row').eq(3).then(ele => {
      cy.wrap(ele).findByText('USDT').should('be.visible')
      cy.wrap(ele).findByText('Tether USD').should('be.visible')
      cy.wrap(ele).findByText('DAT').should('be.visible')
    })
  })

  it('should CursorPagination.Next and CursorPagination.Prev', function () {
    const pages: Record<number, string> = {}

    cy.findByTestId('AdaptiveTable').should((ele) => {
      pages[0] = ele.text()
    })

    cy.interceptServerSideWait(() => {
      cy.findByTestId('CursorPagination.Next').click()
    })

    cy.findByTestId('AdaptiveTable').should((ele) => {
      pages[1] = ele.text()

      expect(pages[1]).not.equals(pages[0])
    })

    cy.interceptServerSideWait(() => {
      cy.findByTestId('CursorPagination.Prev').click()
    })

    cy.findByTestId('AdaptiveTable').should((ele) => {
      expect(ele.text()).equals(pages[0])
      expect(ele.text()).not.equals(pages[1])
    })
  })
})

context('/tokens on mobile', () => {
  // TODO(suraj):
})
