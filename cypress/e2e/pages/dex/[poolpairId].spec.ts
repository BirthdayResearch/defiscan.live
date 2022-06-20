context('/dex/[poolpairid] on macbook-16', () => {
  before(() => {
    cy.visit('/dex/5?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should have <BreadCrumbs />', function () {
    cy.findByTestId('Breadcrumb')
      .should('have.length', 1)
      .should('contain.text', 'Scan')
      .should('contain.text', 'DEX')
  })

  it('should have PoolPair Details Bar information', function () {
    cy.findByTestId('PoolPairDetailsBar').within(() => {
      cy.findByTestId('PoolPairSymbol').should('be.visible').should('contain.text', 'dBTC-DFI')
      cy.findByTestId('PriceRatio').should('be.visible')
    })
  })

  it('should poolpair details card information', function () {
    cy.findByTestId('PoolPairDetails').should('be.visible').within(() => {
      cy.findByTestId('PoolPairDetails.Token.Price').should('be.visible').within(() => {
        cy.findByTestId('Price.TokenA').should('be.visible')
        cy.findByTestId('Price.TokenB').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Liquidity').should('be.visible').within(() => {
        cy.findByTestId('24hVolume').should('be.visible')
        cy.findByTestId('TVL').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Token.Pool').should('be.visible').within(() => {
        cy.findByTestId('Pool.TokenA').should('be.visible')
        cy.findByTestId('Pool.TokenB').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Apr').should('be.visible').within(() => {
        cy.findByTestId('APR').should('be.visible')
        cy.findByTestId('Rewards').should('be.visible')
        cy.findByTestId('Commissions').should('be.visible')
      })
    })
  })

  it('should have OverflowTable header information', function () {
    cy.findByTestId('OverflowTable.Header').then(ele => {
      cy.wrap(ele).findByText('Transaction ID').should('be.visible')
      cy.wrap(ele).findByText('Age').should('be.visible')
      cy.wrap(ele).findByText('From').should('be.visible')
      cy.wrap(ele).findByText('To').should('be.visible')
      cy.wrap(ele).findByText('Input Amount').should('be.visible')
      cy.wrap(ele).findByText('Output Amount').should('be.visible')
    })
  })

  it('should have dex info in OverflowTable', function () {
    cy.findAllByTestId('OverflowTable.Row').eq(1).then(ele => {
      cy.wrap(ele).children().should('have.length', 7)
    })
  })

  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })

  it('should redirect to individual poolpair page', () => {
    cy.visit('/dex/dBTC-DFI')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/dBtc')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/dbtc-dfi')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/BTC')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')
  })
})

context('/dex/[poolpairId] on iphone-x', () => {
  before(() => {
    cy.visit('/dex/5?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have PoolPair Details Bar information', function () {
    cy.findByTestId('PoolPairDetailsBar').within(() => {
      cy.findByTestId('PoolPairSymbol').should('be.visible').should('contain.text', 'dBTC-DFI')
      cy.findByTestId('PriceRatio').should('be.visible')
    })
  })

  it('should poolpair details card information', function () {
    cy.findByTestId('PoolPairDetails').should('be.visible').within(() => {
      cy.findByTestId('PoolPairDetails.Token.Price').should('be.visible').within(() => {
        cy.findByTestId('Price.TokenA').should('be.visible')
        cy.findByTestId('Price.TokenB').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Liquidity').should('be.visible').within(() => {
        cy.findByTestId('24hVolume').should('be.visible')
        cy.findByTestId('TVL').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Token.Pool').should('be.visible').within(() => {
        cy.findByTestId('Pool.TokenA').should('be.visible')
        cy.findByTestId('Pool.TokenB').should('be.visible')
      })
      cy.findByTestId('PoolPairDetails.Apr').should('be.visible').within(() => {
        cy.findByTestId('APR').should('be.visible')
        cy.findByTestId('Rewards').should('be.visible')
        cy.findByTestId('Commissions').should('be.visible')
      })
    })
  })

  it('should have CardList', function () {
    cy.findAllByTestId('SwapCard').within(() => {
      cy.findByTestId('CardList.Header').within(() => {
        cy.findByTestId('CardList.Header.Children').should('be.visible')
        cy.findByTestId('CardList.Header.Toggle').should('be.visible')
      })

      cy.findByTestId('CardList.Header.Type').should('be.visible')
      cy.findByTestId('CardList.Header.TxId').should('be.visible')

      cy.findAllByTestId('SwapCard.CardList.Age').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Age')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.From').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'From')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.To').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'To')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.InputAmount').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Input Amount')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
      cy.findAllByTestId('SwapCard.CardList.OutputAmount').within(() => {
        cy.findByTestId('CardList.Row.Title').should('be.visible').should('have.text', 'Output Amount')
        cy.findByTestId('CardList.Row.Child').should('be.visible')
      })
    })
  })

  it('should CursorPagination.Next', function () {
    cy.findAllByTestId('OverflowTable.Cell').then((ele) => {
      cy.scrollTo('bottom')
      const pageOneFirstCell = ele[0].innerText
      cy.interceptServerSideWait(() => {
        cy.findByTestId('CursorPagination.Next').click()
      })
      cy.findAllByTestId('OverflowTable.Cell').then((pageTwoCells) => {
        expect(pageTwoCells[0].innerText).not.equals(pageOneFirstCell)
      })
    })
  })

  it('should redirect to individual poolpair page', () => {
    cy.visit('/dex/dBTC-DFI')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/dBtc')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/dbtc-dfi')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')

    cy.visit('/dex/BTC')
    cy.findByTestId('PoolPairSymbol').should('have.text', 'dBTC-DFI')
  })
})
