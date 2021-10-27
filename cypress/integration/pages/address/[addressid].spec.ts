context('/address/[addressid] on desktop', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have heading', () => {
    cy.findByTestId('AddressHeading.address').contains('df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })

  it('should have address summary', () => {
    cy.findByTestId('AddressSummaryTable.balance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have Balances', function () {
    cy.findByTestId('Balances.title').should('have.text', 'Balances')
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TOKEN').should('be.visible')
        cy.wrap(ele).findByText('NAME').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
      })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions.title').should('have.text', 'Transactions')
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TX ID').should('be.visible')
        cy.wrap(ele).findByText('BLOCK').should('be.visible')
        cy.wrap(ele).findByText('AGE').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })
})

context('/address/[addressid] on desktop - invalid address', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('macbook-13')
  })

  it('should have warning banner', () => {
    cy.findByTestId('AddressHeading.AddressNotFoundHeading').should('have.text', 'The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found.')
  })
})

context('/address/[addressid] on mobile', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have heading', () => {
    cy.findByTestId('AddressHeading.address').contains('df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzeg')
  })

  it('should have address summary', () => {
    cy.findByTestId('AddressSummaryTable.balance').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalSent').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.totalReceived').contains(/\d+.\d+\sDFI/)
    cy.findByTestId('AddressSummaryTable.txCount').contains(/\d+/)
  })

  it('should have Balances', function () {
    cy.findByTestId('Balances.title').should('have.text', 'Balances')
    cy.findByTestId('Balances').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TOKEN').should('be.visible')
        cy.wrap(ele).findByText('NAME').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
      })
    })
  })

  it('should have Transactions', function () {
    cy.findByTestId('Transactions.title').should('have.text', 'Transactions')
    cy.findByTestId('Transactions').within(() => {
      cy.findByTestId('OverflowTable.Header').then(ele => {
        cy.wrap(ele).findByText('TX ID').should('be.visible')
        cy.wrap(ele).findByText('BLOCK').should('be.visible')
        cy.wrap(ele).findByText('AGE').should('be.visible')
        cy.wrap(ele).findByText('AMOUNT').should('be.visible')
      })
      cy.findAllByTestId('OverflowTable.Row').should('have.length', 10)

      it('should have Show More button', function () {
        cy.findByTestId('AddressTransactionTable.showMoreBtn').should('have.text', 'SHOW MORE')
        cy.findByTestId('AddressTransactionTable.showMoreBtn').click()
        cy.findAllByTestId('OverflowTable.Row').should('have.length', 20)
      })
    })
  })
})

context('/address/[addressid] on mobile - invalid address', () => {
  before(() => {
    cy.visit('/address/df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA?network=MainNet')
  })

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('should have warning banner', () => {
    cy.findByTestId('AddressHeading.AddressNotFoundHeading').should('have.text', 'The requested address df1q65ap3tf6mpqx6m5kmdynltu5pxpxmavq5hzzegASDDSA could not be found.')
  })
})
