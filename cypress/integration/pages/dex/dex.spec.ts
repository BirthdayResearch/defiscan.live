context('/dex on macbook-16', () => {
  before(() => {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Dex.Stats.TVL').should('exist')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'DEX Pool Pairs')
  })

  it('should have AdaptiveTable header information', function () {
    cy.findByTestId('AdaptiveTable.Header').then(ele => {
      cy.wrap(ele).findByText('PAIR').should('be.visible')
      cy.wrap(ele).findByText('TOTAL LIQUIDITY').should('be.visible')
      cy.wrap(ele).findByText('VOLUME (24H)').should('be.visible')
      cy.wrap(ele).findByText('LIQUIDITY').should('be.visible')
      cy.wrap(ele).findByText('PRICE RATIO').should('be.visible')
      cy.wrap(ele).findByText('APR').should('be.visible')
    })
  })

  it('should have dex info in AdaptiveTable', function () {
    cy.findAllByTestId('AdaptiveTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 6)
    })
  })

  it('should have at least 9 pairs listed', function () {
    cy.findAllByTestId('AdaptiveTable.Row').should('have.length.at.least', 9)
  })

  // it('should CursorPagination.Next and CursorPagination.Prev', function () {
  //   const pages: Record<number, string> = {}
  //
  //   cy.findByTestId('AdaptiveTable').should((ele) => {
  //     pages[0] = ele.text()
  //   })
  //
  //   cy.findByTestId('CursorPagination.Next').click()
  //   cy.findByTestId('AdaptiveTable').should((ele) => {
  //     pages[1] = ele.text()
  //
  //     expect(pages[1]).not.equals(pages[0])
  //   })
  //
  //   cy.findByTestId('CursorPagination.Prev').click()
  //   cy.findByTestId('AdaptiveTable').should((ele) => {
  //     expect(ele.text()).equals(pages[0])
  //     expect(ele.text()).not.equals(pages[1])
  //   })
  // })
})

context('/dex on iphone-x', () => {
  before(() => {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Dex.Stats.TVL').should('exist')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'DEX Pool Pairs')
  })

  it('should have Tether in AdaptiveTable', function () {
    cy.findAllByTestId('AdaptiveTable.Row').eq(6).then(ele => {
      cy.wrap(ele).findByText('PAIR').should('be.visible')
      cy.wrap(ele).findByText('TOTAL LIQUIDITY').should('be.visible')
      cy.wrap(ele).findByText('VOLUME (24H)').should('be.visible')
      cy.wrap(ele).findByText('LIQUIDITY').should('be.visible')
      cy.wrap(ele).findByText('PRICE RATIO').should('be.visible')
      cy.wrap(ele).findByText('APR').should('be.visible')
    })
  })

  it('should have at least 9 pairs listed', function () {
    cy.findAllByTestId('AdaptiveTable.Row').should('have.length.at.least', 9)
  })

  // it('should CursorPagination.Next and CursorPagination.Prev', function () {
  //   const pages: Record<number, string> = {}
  //
  //   cy.findByTestId('OverflowTable').should((ele) => {
  //     pages[0] = ele.text()
  //   })
  //
  //   cy.findByTestId('CursorPagination.Next').click()
  //   cy.findByTestId('OverflowTable').should((ele) => {
  //     pages[1] = ele.text()
  //
  //     expect(pages[1]).not.equals(pages[0])
  //   })
  //
  //   cy.findByTestId('CursorPagination.Prev').click()
  //   cy.findByTestId('OverflowTable').should((ele) => {
  //     expect(ele.text()).equals(pages[0])
  //     expect(ele.text()).not.equals(pages[1])
  //   })
  // })
})
