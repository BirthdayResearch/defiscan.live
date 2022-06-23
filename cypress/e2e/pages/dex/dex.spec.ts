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
      cy.wrap(ele).findByText('Primary Token Price (USD)').should('be.visible')
      cy.wrap(ele).findByText('APR').should('be.visible')
    })
  })

  it('should have dex info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 5)
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
      cy.wrap(ele).findByText('Primary Token Price (USD)').findByTestId('OverflowTable.SortButton').should('exist')
    })
  })

  it('should sort row by chosen order', function () {
    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('Total Liquidity').findByTestId('OverflowTable.SortButton').click()
    })
    const totalLiquid: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(3).then(($ele) => {
          totalLiquid.push(Number.parseInt($ele.text().substring(1).replaceAll(',', '')))
        })
      })
    })

    cy.then(() => {
      for (let s = 0; s < totalLiquid.length; s++) {
        if (s + 1 < totalLiquid.length) {
          cy.wrap(totalLiquid[s]).should('be.lte', totalLiquid[s + 1])
        }
      }
    })

    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('Volume (24H)').findByTestId('OverflowTable.SortButton').click()
    })
    const volume: Number[] = []
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
          cy.wrap(volume[s]).should('be.gte', volume[s + 1])
        }
      }
    })

    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('APR').findByTestId('OverflowTable.SortButton').click()
    })
    const apr: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(4).then(($ele) => {
          const text = $ele.text()
          apr.push(Number.parseFloat(text.substring(0, text.length - 1)))
        })
      })
    })
    cy.then(() => {
      for (let s = 0; s < apr.length; s++) {
        if (s + 1 < apr.length) {
          cy.wrap(apr[s]).should('be.lte', apr[s + 1])
        }
      }
    })

    cy.findByTestId('OverflowTable.Header').within(() => {
      cy.findByText('Primary Token Price (USD)').findByTestId('OverflowTable.SortButton').click()
    })
    const price: Number[] = []
    cy.findAllByTestId('OverflowTable.Row').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('OverflowTable.Cell').eq(1).then(($ele) => {
          price.push(Number.parseInt($ele.text().substring(1).replaceAll(',', '')))
        })
      })
    })
    cy.then(() => {
      for (let s = 0; s < price.length; s++) {
        if (s + 1 < price.length) {
          cy.wrap(price[s]).should('be.gte', price[s + 1])
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

      cy.findByTestId('PoolPairsCard.CardList.TotalLiquidity').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Total Liquidity')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('PoolPairsCard.CardList.24hVolume').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Volume (24H)')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('PoolPairsCard.CardList.TokenPrice').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Primary Token Price (USD)')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findByTestId('PoolPairsCard.CardList.APR').within(() => {
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

  it('should have sort button for card view', function () {
    cy.findByTestId('CardList.DropDownSortButton').findByText('Sort By').should('exist').click()
    cy.findAllByTestId('CardList.DropDownSortOption').eq(0).findByText('Total Liquidity (High to Low)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(1).findByText('Total Liquidity (Low to High)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(2).findByText('Volume (High to Low)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(3).findByText('Volume (Low to High)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(4).findByText('APR (High to Low)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(5).findByText('APR (Low to High)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(6).findByText('Primary Token Price (High to Low)').should('exist')
    cy.findAllByTestId('CardList.DropDownSortOption').eq(7).findByText('Primary Token Price (Low to High)').should('exist')
  })

  it('should sort cards by chosen order', function () {
    cy.findAllByTestId('CardList.DropDownSortOption').eq(1).findByText('Total Liquidity (Low to High)').click()

    const totalLiquid: Number[] = []
    cy.findAllByTestId('PoolPairsCard').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('PoolPairsCard.CardList.TotalLiquidity').then(($ele) => {
          const text = $ele.text().split('$').at(1)
          if (text !== undefined) {
            totalLiquid.push(Number.parseInt(text.replaceAll(',', '')))
          }
        })
      })
    })

    cy.then(() => {
      cy.log(totalLiquid.toString())
      for (let s = 0; s < totalLiquid.length; s++) {
        if (s + 1 < totalLiquid.length) {
          cy.wrap(totalLiquid[s]).should('be.lte', totalLiquid[s + 1])
        }
      }
    })

    cy.findByTestId('CardList.DropDownSortButton').findByText('Sort By').should('exist').click()
    cy.findAllByTestId('CardList.DropDownSortOption').eq(2).findByText('Volume (High to Low)').click()

    const volume: Number[] = []
    cy.findAllByTestId('PoolPairsCard').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('PoolPairsCard.CardList.24hVolume').then(($ele) => {
          const text = $ele.text().split('$').at(1)
          if (text !== undefined) {
            volume.push(Number.parseInt(text.replaceAll(',', '')))
          }
        })
      })
    })

    cy.then(() => {
      cy.log(volume.toString())
      for (let s = 0; s < volume.length; s++) {
        if (s + 1 < volume.length) {
          cy.wrap(volume[s]).should('be.gte', volume[s + 1])
        }
      }
    })

    cy.findByTestId('CardList.DropDownSortButton').findByText('Sort By').should('exist').click()
    cy.findAllByTestId('CardList.DropDownSortOption').eq(4).findByText('APR (High to Low)').click()

    const apr: Number[] = []
    cy.findAllByTestId('PoolPairsCard').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('PoolPairsCard.CardList.APR').then(($ele) => {
          let text = $ele.text().split('%').at(0)
          if (text !== undefined) {
            text = text.split('APR').at(1)
            if (text !== undefined) {
              apr.push(Number.parseFloat(text))
            }
          }
        })
      })
    })

    cy.then(() => {
      for (let s = 0; s < apr.length; s++) {
        if (s + 1 < apr.length) {
          cy.wrap(apr[s]).should('be.gte', apr[s + 1])
        }
      }
    })

    cy.findByTestId('CardList.DropDownSortButton').findByText('Sort By').should('exist').click()
    cy.findAllByTestId('CardList.DropDownSortOption').eq(7).findByText('Primary Token Price (Low to High)').click()

    const price: Number[] = []
    cy.findAllByTestId('PoolPairsCard').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findAllByTestId('PoolPairsCard.CardList.TokenPrice').then(($ele) => {
          let text = $ele.text().split('%').at(0)
          if (text !== undefined) {
            text = text.split('$').at(1)
            if (text !== undefined) {
              price.push(Number.parseInt(text.replaceAll(',', '')))
            }
          }
        })
      })
    })

    cy.then(() => {
      for (let s = 0; s < price.length; s++) {
        if (s + 1 < price.length) {
          cy.wrap(price[s]).should('be.lte', price[s + 1])
        }
      }
    })
  })
})
