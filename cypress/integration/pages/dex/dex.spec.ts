context('/dex on macbook-16', () => {
  before(() => {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Dex.Stats.TVL').should('exist').should('be.visible')
    cy.findByTestId('Dex.Stats.24hVolume').should('exist').should('be.visible')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'DEX Pool Pairs')
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Pair').should('be.visible')
      cy.wrap(ele).findByText('Total Liquidity').should('be.visible')
      cy.wrap(ele).findByText('Volume (24H)').should('be.visible')
      cy.wrap(ele).findByText('Liquidity').should('be.visible')
      cy.wrap(ele).findByText('Price Ratio').should('be.visible')
      cy.wrap(ele).findByText('APR').should('be.visible')
    })
  })

  it('should have dex info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 6)
    })
  })

  it('should have at least 9 pairs listed', function () {
    cy.findAllByTestId('OverflowTable.Row').should('have.length.at.least', 9)
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
  it('should have sort button for table view', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Total Liquidity').findByTestId('OverflowTable.SortButton').should('exist')
      cy.wrap(ele).findByText('Volume (24H)').findByTestId('OverflowTable.SortButton').should('exist')
      cy.wrap(ele).findByText('APR').findByTestId('OverflowTable.SortButton').should('exist')
    })
  })

  it('should sort by chosen order', function () {
    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('Total Liquidity').findByTestId('OverflowTable.SortButton').click()
    })
    let totalLiquid: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(1).then(($ele) => {
          totalLiquid.push(Number.parseInt($ele.text().substring(1).replaceAll(',', '')))
        })
      })
    })

    cy.then(() => {
      for (let s = 0; s < totalLiquid.length; s++) {
        if (s + 1 < totalLiquid.length) {
          cy.wrap(totalLiquid[s]).should('be.lessThan', totalLiquid[s + 1])
        }
      }
    })

    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('Volume (24H)').findByTestId('OverflowTable.SortButton').click()
    })
    let volume: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(2).then(($ele) => {
          volume.push(Number.parseInt($ele.text().substring(1).replaceAll(',', '')))
        })
      })
    })
    cy.then(() => {
      for (let s = 0; s < volume.length; s++) {
        if (s + 1 < volume.length) {
          cy.wrap(volume[s]).should('be.greaterThan', volume[s + 1])
        }
      }
    })

    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('APR').findByTestId('OverflowTable.SortButton').click()
    })
    let apr: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(5).then(($ele) => {
          let text = $ele.text()
          apr.push(Number.parseFloat(text.substring(0,text.length-1)))
        })
      })
    })
    cy.then(() => {
      for (let s = 0; s < apr.length; s++) {
        if (s + 1 < apr.length) {
          cy.wrap(apr[s]).should('be.lessThan', apr[s + 1])
        }
      }
    })
  })
})

context('/dex on iphone-x', () => {
  before(() => {
    cy.visit('/dex?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have Stats Bar', () => {
    cy.findByTestId('Dex.Stats.TVL').should('exist').should('be.visible')
    cy.findByTestId('Dex.Stats.24hVolume').should('exist').should('be.visible')
  })

  it('should have heading', () => {
    cy.get('h1').should('have.text', 'DEX Pool Pairs')
  })

  it('should have CardList list items', function () {
    cy.findAllByTestId('PoolPairsCard').within(() => {
      cy.findByTestId('CardList.Header').within(() => {
        cy.findByTestId('CardList.Header.Children').should('be.visible')
        cy.findByTestId('CardList.Header.Toggle').should('be.visible')
      })

      cy.findByTestId('BlocksCard.CardList.TotalLiquidity').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Total Liquidity')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.24hVolume').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Volume (24H)')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.Liquidity').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Liquidity')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.PriceRatio').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Price Ratio')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('BlocksCard.CardList.APR').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'APR')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
    })
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
